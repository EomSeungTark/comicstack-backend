package jwt

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-redis/redis/v7"
	"github.com/labstack/echo"
	"github.com/twinj/uuid"
)

type TokenDetails struct {
	AccessToken  string `json:"accesstoken"`
	RefreshToken string `json:"refreshtoken"`
	AccessUuid   string `json:"accessuuid"`
	RefreshUuid  string `json:"refreshuuid"`
	AtExpires    int64  `json:"atexpires"`
	RtExpires    int64  `json:"rtexpires"`
}

type AccessDetails struct {
	AccessUuid string `json:"accessuuid"`
	UserId     string `json:"userid"`
}

func CreateToken(userid string) (*TokenDetails, error) {
	td := &TokenDetails{}
	// td.AtExpires = time.Now().Add(time.Minute * 15).Unix()
	td.AtExpires = time.Now().Add(time.Minute * 1).Unix()
	td.AccessUuid = uuid.NewV4().String()

	// td.RtExpires = time.Now().Add(time.Hour * 24 * 7).Unix()
	td.RtExpires = time.Now().Add(time.Minute * 10).Unix()
	td.RefreshUuid = uuid.NewV4().String()

	var err error

	// idToNumber, err := strconv.ParseUint(userid, 10, 64)

	//Creating Access Token
	os.Setenv("ACCESS_SECRET_TOKEN", "zn80qjr03m2f6")
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["access_uuid"] = td.AccessUuid
	atClaims["user_id"] = userid
	atClaims["exp"] = td.AtExpires
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	td.AccessToken, err = at.SignedString([]byte(os.Getenv("ACCESS_SECRET_TOKEN")))
	if err != nil {
		return nil, err
	}

	//Creating Refresh Token
	os.Setenv("REFRESH_SECRET_TOKEN", "mckmsdnfsdmfdsjf")
	rtClaims := jwt.MapClaims{}
	rtClaims["refresh_uuid"] = td.RefreshUuid
	rtClaims["user_id"] = userid
	rtClaims["exp"] = td.RtExpires
	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	td.RefreshToken, err = rt.SignedString([]byte(os.Getenv("REFRESH_SECRET_TOKEN")))
	if err != nil {
		return nil, err
	}

	return td, nil
}

func CreateAuth(userid string, td *TokenDetails, client *redis.Client) error {
	// idToNumber, _ := strconv.ParseUint(userid, 10, 64)
	at := time.Unix(td.AtExpires, 0) //converting Unix to UTC
	rt := time.Unix(td.RtExpires, 0)
	now := time.Now()

	errAccess := client.Set(td.AccessUuid, userid, at.Sub(now)).Err()
	if errAccess != nil {
		return errAccess
	}
	errRefresh := client.Set(td.RefreshUuid, userid, rt.Sub(now)).Err()
	if errRefresh != nil {
		return errRefresh
	}
	return nil
}

func ExtractToken(c echo.Context) string {
	bearToken := c.Request().Header.Get("Authorization")
	fmt.Println("ExtractToken : ", bearToken)
	//normally Authorization the_token_xxx
	//if strings.Contains(bearToken, "\"") {
	bearToken = strings.ReplaceAll(bearToken, "\"", "")
	//}
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}

	return strArr[0]
}

func VerifyToken(c echo.Context) (*jwt.Token, error) {
	tokenString := ExtractToken(c)
	fmt.Println("VerifyToken1 : ", tokenString)
	fmt.Println([]byte(os.Getenv("ACCESS_SECRET_TOKEN")), os.Getenv("ACCESS_SECRET_TOKEN"), "fgkejrieji")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		//Make sure that the token method conform to "SigningMethodHMAC"
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("ACCESS_SECRET_TOKEN")), nil
	})
	fmt.Println("VerifyToken2 : ", token, err)
	if err != nil {
		return nil, err
	}
	return token, nil
}

func ExtractTokenMetadata(c echo.Context) (*AccessDetails, error) {
	token, err := VerifyToken(c)
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		accessUuid, ok := claims["access_uuid"].(string)
		if !ok {
			return nil, err
		}
		userId := claims["user_id"].(string)

		return &AccessDetails{
			AccessUuid: accessUuid,
			UserId:     userId,
		}, nil
	}
	return nil, err
}

func FetchAuth(authD *AccessDetails, client *redis.Client) (uint64, error) {
	userid, err := client.Get(authD.AccessUuid).Result()
	if err != nil {
		return 0, err
	}
	userID, _ := strconv.ParseUint(userid, 10, 64)
	return userID, nil
}

func DeleteAuth(givenUuid string, client *redis.Client) (int64, error) {
	deleted, err := client.Del(givenUuid).Result()
	if err != nil {
		return 0, err
	}
	return deleted, nil
}

func TokenValid(c echo.Context) error {
	token, err := VerifyToken(c)
	if err != nil {
		fmt.Println("TokenValid", " 1")
		return err
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		fmt.Println("TokenValid", " 2")
		return err
	}
	fmt.Println("TokenValid", " 3")
	return nil
}

func Refresh(c echo.Context, client *redis.Client) error {
	// mapToken := map[string]string{}
	// if err := c.Bind(&mapToken); err != nil {
	// 	c.JSON(http.StatusUnprocessableEntity, err.Error())
	// 	return
	// }
	// refreshToken := mapToken["refresh_token"]
	refreshToken := c.Request().Header.Get("Refresh_Token")
	fmt.Println("refreshToken1 : ", refreshToken)

	//verify the token
	os.Setenv("REFRESH_SECRET_TOKEN", "mckmsdnfsdmfdsjf") //this should be in an env file
	token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
		//Make sure that the token method conform to "SigningMethodHMAC"
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("REFRESH_SECRET_TOKEN")), nil
	})
	fmt.Println("refreshToken2 : ", token, err)
	//if there is an error, the token must have expired
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "Refresh token expired")
	}
	//is token valid?
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return c.JSON(http.StatusUnauthorized, err)
	}
	//Since token is valid, get the uuid:
	claims, ok := token.Claims.(jwt.MapClaims) //the token claims should conform to MapClaims
	if ok && token.Valid {
		refreshUuid, ok := claims["refresh_uuid"].(string) //convert the interface to string
		if !ok {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}
		fmt.Println(claims["user_id"])
		userId := claims["user_id"].(string)
		// if err != nil {
		// 	return c.JSON(http.StatusUnprocessableEntity, "Error occurred")
		// }
		//Delete the previous Refresh Token
		deleted, delErr := DeleteAuth(refreshUuid, client)
		if delErr != nil || deleted == 0 {
			return c.JSON(http.StatusUnauthorized, "unauthorized")
		}
		//Create new pairs of refresh and access tokens
		ts, createErr := CreateToken(userId)
		if createErr != nil {
			return c.JSON(http.StatusForbidden, createErr.Error())
		}
		//save the tokens metadata to redis
		saveErr := CreateAuth(userId, ts, client)
		if saveErr != nil {
			return c.JSON(http.StatusForbidden, saveErr.Error())
		}
		tokens := map[string]string{
			"access_token":  ts.AccessToken,
			"refresh_token": ts.RefreshToken,
		}
		return c.JSON(http.StatusCreated, tokens)
	} else {
		return c.JSON(http.StatusUnauthorized, "refresh expired")
	}
}
