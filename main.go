package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	_ "github.com/lib/pq"

	COMMON "github.com/eom/comicstack_prototype/DBSQL/COMMON"
	LOGIN "github.com/eom/comicstack_prototype/DBSQL/LOGIN"
	SIGNIN "github.com/eom/comicstack_prototype/DBSQL/SIGNIN"
	TOONS "github.com/eom/comicstack_prototype/DBSQL/TOONS"
	ToonUpload "github.com/eom/comicstack_prototype/DBSQL/TOONUPLOAD"
)

var db *sql.DB

// go to env_var
const (
	S3_REGION = "ap-northeast-2"
	S3_BUCKET = "comicstack-bucket"
)

// go to env_var
const (
	DB_USER     = "postgres"
	DB_PASSWORD = "800326"
	DB_NAME     = "postgres"
)

func DoRoot(c echo.Context) error {
	return c.String(http.StatusOK, "you in root")
}

func ConfirmId(c echo.Context) error {
	idConfrim := new(COMMON.IdConfirm)
	if err := c.Bind(idConfrim); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer c.Request().Body.Close()

	confirmIdResult := SIGNIN.ConfirmId(db, idConfrim.USER_ID)
	e, _ := json.Marshal(confirmIdResult)

	return c.String(http.StatusOK, string(e))
}

func TryLogin(c echo.Context) error {
	loginInfo := new(COMMON.LoginInfo)
	if err := c.Bind(loginInfo); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer c.Request().Body.Close()
	// fmt.Println(loginInfo)

	loginResult := LOGIN.TryLogin(db, loginInfo.USER_ID, loginInfo.PASSWORD)
	e, _ := json.Marshal(loginResult)

	return c.String(http.StatusOK, string(e))
}

func TrySignIn(c echo.Context) error {
	signinInfo := new(COMMON.SigninInfo)
	if err := c.Bind(signinInfo); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer c.Request().Body.Close()

	SigninResult := SIGNIN.TrySignIn(db, signinInfo)
	e, _ := json.Marshal(SigninResult)

	return c.String(http.StatusOK, string(e))
}

func TryToonRegist(c echo.Context) error {

	toonRegist := new(COMMON.ToonRegist)
	if err := c.Bind(toonRegist); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer c.Request().Body.Close()

	form, err := c.MultipartForm()
	if err != nil {
		return err
	}
	thumbnailPath := ""

	// html파일에 file을 받는 input 태그에 name 값이 키 값과 같아야 한다.
	files := form.File["thumbnail_file"]

	sess, _ := session.NewSession(&aws.Config{
		Region: aws.String(S3_REGION),
	})

	for _, file := range files {
		src, err := file.Open()
		if err != nil {
			return err
		}
		defer src.Close()

		mkfilepath := ""

		fileContent, _ := file.Open()
		defer fileContent.Close()

		buf := bytes.NewBuffer(nil)
		if _, err := io.Copy(buf, fileContent); err != nil {
			return nil
		}

		uploader := s3manager.NewUploader(sess)
		_, err = uploader.Upload(&s3manager.UploadInput{
			Bucket: aws.String(S3_BUCKET),
			Key:    aws.String(file.Filename),
			Body:   buf,
		})

		if err != nil {
			fmt.Println("file upload error")
			log.Println(err)
		} else {
			fmt.Println(aws.String(S3_BUCKET), aws.String(file.Filename))
			mkfilepath = "https://" + S3_BUCKET + "." + "s3." + S3_REGION + ".amazonaws.com/" + file.Filename
			fmt.Println(mkfilepath)
		}

		mkfilepath = "https://" + S3_BUCKET + "." + "s3." + S3_REGION + ".amazonaws.com/" + file.Filename
		thumbnailPath = COMMON.InsertImagePath(db, mkfilepath, toonRegist.USER_ID, "thumbnail")
	}

	fmt.Println("thumbnailPath : asdfasfdasdf", thumbnailPath)
	toonRegistResult := ToonUpload.TryToonRegist(db, toonRegist, thumbnailPath)
	e, _ := json.Marshal(toonRegistResult)

	return c.String(http.StatusOK, string(e))
}

func TryToonUpload(c echo.Context) error {
	fmt.Println("TryToonUpload")
	form, err := c.MultipartForm()
	if err != nil {
		return err
	}

	// html파일에 file을 받는 input 태그에 name 값이 키 값과 같아야 한다.
	toonFiles := form.File["toon_files"]
	thumbnailFiles := form.File["thumbnail_files"]
	thumbnailPath := ""

	sess, _ := session.NewSession(&aws.Config{
		Region:      aws.String(S3_REGION),
		Credentials: credentials.NewEnvCredentials(),
	})

	toonUpload := new(COMMON.ToonUpload)
	if err := c.Bind(toonUpload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer c.Request().Body.Close()

	fmt.Println(toonFiles)
	fmt.Println(thumbnailFiles)
	for _, file := range toonFiles {
		mkfilepath := ""

		fileContent, _ := file.Open()
		defer fileContent.Close()

		buf := bytes.NewBuffer(nil)
		if _, err := io.Copy(buf, fileContent); err != nil {
			return nil
		}

		uploader := s3manager.NewUploader(sess)
		_, err = uploader.Upload(&s3manager.UploadInput{
			Bucket: aws.String(S3_BUCKET),
			Key:    aws.String(file.Filename),
			Body:   buf,
		})
		fmt.Println(err)

		episodeValue := COMMON.GetNextEpisodeValue(db, toonUpload.TOON_SID)
		fmt.Println("episodeValue sadfasdf:", episodeValue)
		fmt.Println(strconv.Itoa(episodeValue))
		toonSidEpi := strconv.Itoa(toonUpload.TOON_SID) + "_" + strconv.Itoa(episodeValue)
		mkfilepath = "https://" + S3_BUCKET + "." + "s3." + S3_REGION + ".amazonaws.com/" + file.Filename

		COMMON.InsertImagePath(db, mkfilepath, toonUpload.USER_ID, toonSidEpi)
	}

	for _, file := range thumbnailFiles {
		mkfilepath := ""

		fileContent, _ := file.Open()
		defer fileContent.Close()

		buf := bytes.NewBuffer(nil)
		if _, err := io.Copy(buf, fileContent); err != nil {
			return nil
		}

		uploader := s3manager.NewUploader(sess)
		_, err = uploader.Upload(&s3manager.UploadInput{
			Bucket: aws.String(S3_BUCKET),
			Key:    aws.String(file.Filename),
			Body:   buf,
		})

		mkfilepath = "https://" + S3_BUCKET + "." + "s3." + S3_REGION + ".amazonaws.com/" + file.Filename
		thumbnailPath = COMMON.InsertImagePath(db, mkfilepath, toonUpload.USER_ID, "thumbnail")
	}

	episodeValue := COMMON.GetEpisodeValue(db, toonUpload.TOON_SID, toonUpload.EPISODE_NAME)
	toonSidEpi := strconv.Itoa(toonUpload.TOON_SID) + "_" + strconv.Itoa(episodeValue)
	toonUploadResult := ToonUpload.TryToonUpload(db, toonUpload, toonSidEpi, thumbnailPath)
	e, _ := json.Marshal(toonUploadResult)

	return c.String(http.StatusOK, string(e))
}

func GetToons(c echo.Context) error {
	toonsReuslt := TOONS.GetToons(db)
	e, _ := json.Marshal(toonsReuslt)

	fmt.Println(toonsReuslt)
	return c.String(http.StatusOK, string(e))
}

func GetEpisodes(c echo.Context) error {
	fmt.Println("GetEpisodes")
	selectedToon := new(COMMON.SelectedToon)
	fmt.Println(c)
	if err := c.Bind(selectedToon); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer c.Request().Body.Close()

	// TOONS.
	getEpisodes := TOONS.GetEpisodes(db, selectedToon)
	e, _ := json.Marshal(getEpisodes)
	fmt.Println(getEpisodes)

	return c.String(http.StatusOK, string(e))
}

func DoToon(c echo.Context) error {
	fmt.Println("DoToon")
	selectedEpisode := new(COMMON.DoToon)
	if err := c.Bind(selectedEpisode); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer c.Request().Body.Close()
	fmt.Println("selectedEpisode: ", selectedEpisode)

	episodeValue := COMMON.GetEpisodeValue(db, selectedEpisode.TOON_SID, selectedEpisode.EPISODE_NAME)
	fmt.Println("episode value: ", episodeValue)
	selectedEpisodeResult := TOONS.GetSelectedEpisode(db, selectedEpisode, episodeValue)
	e, _ := json.Marshal(selectedEpisodeResult)
	return c.String(http.StatusOK, string(e))
}

func GetReigistedToons(c echo.Context) error {
	loginUser := new(COMMON.IdConfirm)
	if err := c.Bind(loginUser); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer c.Request().Body.Close()

	registedToonsReuslt := TOONS.GetReigistedToons(db, loginUser)
	//registedToonsReuslt.Toons.THUMBNAIL_PATH = norm.NFC.String(registedToonsReuslt.Toons.THUMBNAIL_PATH)
	e, _ := json.Marshal(registedToonsReuslt)

	return c.String(http.StatusOK, string(e))
}

func main() {
	var err error

	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	db, err = sql.Open("postgres", dbinfo)
	if err != nil {
		log.Print(err)
	}

	e := echo.New()
	e.Use(middleware.CORS())

	e.GET("/", DoRoot)
	e.POST("/api/login", TryLogin)
	e.POST("/api/signin", TrySignIn)
	e.POST("/api/idcheck", ConfirmId)
	//-----------------------------------------------------------------------------
	e.POST("/api/toon/regist", TryToonRegist)
	e.POST("/api/toon/getmytoon", GetReigistedToons)
	e.POST("/api/toon/upload", TryToonUpload)
	//-----------------------------------------------------------------------------
	e.GET("/api/toon/gettoons", GetToons)
	e.POST("/api/toon/getepisodes", GetEpisodes)
	e.POST("/api/toon/dotoon", DoToon)

	e.Start(":80")
}
