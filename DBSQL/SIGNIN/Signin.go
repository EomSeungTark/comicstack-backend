package signin

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	CIPHER "github.com/eom/comicstack_prototype/CIPHER"
	COMMON "github.com/eom/comicstack_prototype/DBSQL/COMMON"
)

func ConfirmId(db *sql.DB, UserId string) *COMMON.BasicResult {
	fmt.Println("ConfirmId")
	fmt.Println(UserId, " : try check id")
	sqlString := fmt.Sprintf(`SELECT id FROM users WHERE id='%s'`, UserId)
	rows, err := db.Query(sqlString)
	if err != nil {
		log.Print(err)
	}
	defer rows.Close()

	var dbId string

	for rows.Next() {
		rows.Scan(&dbId)
	}

	if dbId == "" {
		returnStruct := new(COMMON.BasicResult)
		returnStruct.STATUS = true
		return returnStruct
	} else {
		returnStruct := new(COMMON.BasicResult)
		returnStruct.STATUS = false
		return returnStruct
	}
}

func GetEncryptPassword(db *sql.DB, inputPassword string) string {
	sKey := COMMON.GetSKey(db)
	fmt.Println("end get key")
	EncryptedPassword := CIPHER.Encrypt(inputPassword, sKey)

	fmt.Println("return Encrypted password")
	return EncryptedPassword
}

func CreateUser(db *sql.DB, SigninInfo *COMMON.SigninInfo) *COMMON.BasicResult {
	t := time.Now()
	formattedNowTime := fmt.Sprintf("%d-%02d-%02d-%02d-%02d-%02d",
		t.Year(), t.Month(), t.Day(),
		t.Hour(), t.Minute(), t.Second())

	encryptedPassword := GetEncryptPassword(db, SigninInfo.PASSWORD)

	sqlState := fmt.Sprintf(`INSERT INTO USERS (ID, PASSWORD, ADDRESS, PHONE_NUMBER, PERSNAL_BASIC_AGREE, PERSNAL_SHARE_AGREE, EMAIL,
		SMS_AGREE, EMAIL_AGREE, CREATE_AT, UPDATE_AT, AUTHORITY, NAME) VALUES 
		('%s', '%s', '%s', '%s', '%t', '%t', '%s', '%t', '%t', '%s', '%s', '%s', '%s')`,
		SigninInfo.USER_ID, encryptedPassword, SigninInfo.ADDRESS, SigninInfo.PHONE_NUMBER, SigninInfo.PERSNAL_BASIC_AGREE, SigninInfo.PERSNAL_SHARE_AGREE,
		SigninInfo.EMAIL, SigninInfo.SMS_AGREE, SigninInfo.EMAIL_AGREE, formattedNowTime, formattedNowTime, "", SigninInfo.NAME)
	rows, err := db.Query(sqlState)
	if err != nil {
		returnStruct := new(COMMON.BasicResult)
		returnStruct.STATUS = false
		return returnStruct
	}

	defer rows.Close()

	returnStruct := new(COMMON.BasicResult)
	returnStruct.STATUS = true
	return returnStruct
}

func TrySignIn(db *sql.DB, SigninInfo *COMMON.SigninInfo) *COMMON.BasicResult {
	fmt.Println("TrySignIn")

	return CreateUser(db, SigninInfo)
}
