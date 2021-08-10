package login

import (
	"database/sql"
	"encoding/base64"
	"fmt"
	"log"
	"time"

	CIPHER "github.com/eom/comicstack_prototype/CIPHER"
	COMMON "github.com/eom/comicstack_prototype/DBSQL/COMMON"
	JWT "github.com/eom/comicstack_prototype/JWT"
	"github.com/go-redis/redis/v7"
)

func GetUserInfo(db *sql.DB, UserId string) COMMON.UserInfo {
	fmt.Println("GetUserInfo")

	sqlString := fmt.Sprintf(`SELECT * FROM users WHERE id='%s'`, UserId)
	rows, err := db.Query(sqlString)
	if err != nil {
		log.Print(err)
	}

	defer rows.Close()

	userInfoStruct := COMMON.UserInfoToStruct(rows)

	return userInfoStruct
}

func GetUserPassword(db *sql.DB, username string) string {
	fmt.Println("GetUserPassowrd")

	userInfo := GetUserInfo(db, username)
	userPassword := userInfo.PASSWORD

	return userPassword
}

func CreateLoginRecode(db *sql.DB, InputID string, TF bool) {
	var tf bool
	if TF == true {
		tf = true
	} else {
		tf = false
	}

	nowTime := time.Now()
	toDbTime := fmt.Sprintf("%d-%02d-%02d-%02d-%02d-%02d", nowTime.Year(), nowTime.Month(), nowTime.Day(), nowTime.Hour(), nowTime.Minute(), nowTime.Second())
	loginRecordSQL := fmt.Sprintf("insert into LOGIN_TIMESTEMP (USER_ID, LOGIN_TIME, TF) values ('%s', '%s', '%t')", InputID, toDbTime, tf)
	row, err := db.Query(loginRecordSQL)
	if err != nil {
		log.Print(err)
	}
	defer row.Close()
}

func TryLogin(db *sql.DB, InputID string, InputPASSWORD string, client *redis.Client) *COMMON.LoginResult {
	sKey := COMMON.GetSKey(db)
	userInfoStruct := GetUserInfo(db, InputID)
	// fmt.Println(userInfoStruct)
	if userInfoStruct.USER_ID == "" {
		loginResult := new(COMMON.LoginResult)
		loginResult.STATUS = false
		return loginResult
	}

	base64Password, _ := base64.URLEncoding.DecodeString(userInfoStruct.PASSWORD)
	decry := CIPHER.Decrypt(string(base64Password), sKey)

	if string(decry) == InputPASSWORD {
		// fmt.Println(InputID + ":" + "login pass")
		CreateLoginRecode(db, InputID, true)
		loginResult := new(COMMON.LoginResult)
		loginResult.STATUS = true
		loginResult.ADDRESS = userInfoStruct.ADDRESS
		loginResult.PHONE_NUMBER = userInfoStruct.PHONE_NUMBER
		loginResult.EMAIL = userInfoStruct.EMAIL
		loginResult.SMS_AGREE = userInfoStruct.SMS_AGREE
		loginResult.EMAIL_AGREE = userInfoStruct.EMAIL_AGREE
		loginResult.NAME = userInfoStruct.NAME
		loginResult.USER_ID = InputID
		loginResult.JWT, _ = JWT.CreateToken(InputID)
		saveErr := JWT.CreateAuth(InputID, loginResult.JWT, client)
		if saveErr != nil {
			log.Print(saveErr.Error())
		}
		return loginResult
	} else {
		// fmt.Println(InputID + ":" + "login fail")
		CreateLoginRecode(db, InputID, false)
		loginResult := new(COMMON.LoginResult)
		loginResult.STATUS = false
		loginResult.USER_ID = InputID
		return loginResult
	}
}
