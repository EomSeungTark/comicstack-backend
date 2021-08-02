package common

import (
	"database/sql"
	"fmt"
	"log"
	"time"
)

type IdConfirm struct {
	USER_ID string `json:"user_id"`
}

type LoginInfo struct {
	USER_ID  string `json:"user_id"`
	PASSWORD string `json:"password"`
}

type UserInfo struct {
	USER_ID             string `json:"user_id"`
	PASSWORD            string `json:"password"`
	ADDRESS             string `json:"address"`
	PHONE_NUMBER        string `json:"phone_number"`
	PERSNAL_BASIC_AGREE bool   `json:"persnal_basic_agree"`
	PERSNAL_SHARE_AGREE bool   `json:"persnal_share_agree"`
	EMAIL               string `json:"email"`
	SMS_AGREE           bool   `json:"sms_agree"`
	EMAIL_AGREE         bool   `json:"email_agree"`
	CREATE_AT           string `json:"create_at"`
	UPDATE_AT           string `json:"update_at"`
	AUTHORITY           string `json:"authority"`
	NAME                string `json:"name"`
}

type SigninInfo struct {
	USER_ID             string `json:"user_id"`
	PASSWORD            string `json:"password"`
	ADDRESS             string `json:"address"`
	PHONE_NUMBER        string `json:"phone_number"`
	PERSNAL_BASIC_AGREE bool   `json:"persnal_basic_agree"`
	PERSNAL_SHARE_AGREE bool   `json:"persnal_share_agree"`
	EMAIL               string `json:"email"`
	SMS_AGREE           bool   `json:"sms_agree"`
	EMAIL_AGREE         bool   `json:"email_agree"`
	NAME                string `json:"name"`
}

type Interest struct {
	SUBJECTNAME string `json:"subjectname"`
}

type SelectInterest struct {
	SUBJECTS string `json:"subjects"`
}

type UserInterest struct {
	SID       string `json:"sid"`
	USER_ID   string `json:"user_id"`
	INTERESTS string `json:"interests"`
	CREATE_AT string `json:"create_at"`
}

type ToonUpload struct {
	USER_ID      string `json:"user_id"`
	TOON_SID     int    `json:"toon_sid"`
	EPISODE_NAME string `json:"episode_name"`
}

type ToonRegist struct {
	USER_ID string `json:"user_id"`
	DAY     string `json:"day"`
	TITLE   string `json:"title"`
	PASS    bool   `json:"pass"`
	CONTEXT string `json:"context"`
	GENRE   string `json:"genre"`
}

type RegistedToon struct {
	SID            string `json:"sid"`
	USER_ID        string `json:"user_id"`
	DAY            string `json:"day"`
	TITLE          string `json:"title"`
	VIEWS          int    `json:"views"`
	THUMBNAIL_PATH string `json:"thumbnail_path"`
	PASS           bool   `json:"pass"`
	CONTEXT        string `json:"context"`
	GENRE          string `json:"genre"`
	END            string `json:"end"`
	AUTHORITY      string `json:"authority"`
}

type ToonSid struct {
	TOON_SID int `json:"toon_sid"`
}

type ToonsInfo struct {
	USER_ID        string `json:"user_id"`
	DAY            string `json:"day"`
	TITLE          string `json:"title"`
	THUMBNAIL_PATH string `json:"thumbnail_path"`
	CONTEXT        string `json:"context"`
	TOON_SID       int    `json:"toon_sid"`
}

type SelectedToon struct {
	TOON_SID int `json:"toon_sid"`
}

type EpisodeInfo struct {
	EPISODE        int    `json:"episode"`
	EPISODE_NAME   string `json:"episode_name"`
	THUMBNAIL_PATH string `json:"thumbnail_path"`
	VIEWS          int    `json:"views"`
	TOON_SID       int    `json:"toon_sid"`
	CREATE_AT      string `json:"create_at"`
}

type EpisodesInfo struct {
	EPISODES_INFO []EpisodeInfo `json:"episodes_info"`
}

type DoToon struct {
	USER_ID      string `json:"user_id"`
	TOON_SID     int    `json:"toon_sid"`
	EPISODE_NAME string `json:"episode_name"`
}

type CheckImagePath struct {
	USER_ID string `json:"user_id"`
	PATH    string `json:"path"`
}

func GetSKey(db *sql.DB) string {
	var sKey string

	keyRow, _ := db.Query("SELECT KEY FROM KEYTABLE ORDER BY DATE DESC LIMIT 1")
	for keyRow.Next() {
		keyRow.Scan(&sKey)
	}

	return sKey
}

func UserInfoToStruct(rows *sql.Rows) UserInfo {
	valueStruct := make([]UserInfo, 1)
	for rows.Next() {
		rows.Scan(&valueStruct[0].USER_ID, &valueStruct[0].PASSWORD, &valueStruct[0].ADDRESS, &valueStruct[0].PHONE_NUMBER,
			&valueStruct[0].PERSNAL_BASIC_AGREE, &valueStruct[0].PERSNAL_SHARE_AGREE, &valueStruct[0].EMAIL, &valueStruct[0].SMS_AGREE,
			&valueStruct[0].EMAIL_AGREE, &valueStruct[0].CREATE_AT, &valueStruct[0].UPDATE_AT, &valueStruct[0].AUTHORITY, &valueStruct[0].NAME)
	}

	return valueStruct[0]
}

func UserInterToSturct(rows *sql.Rows) UserInterest {
	valueStruct := make([]UserInterest, 1)
	for rows.Next() {
		rows.Scan(&valueStruct[0].SID, &valueStruct[0].USER_ID, &valueStruct[0].INTERESTS, &valueStruct[0].CREATE_AT)
	}

	return valueStruct[0]
}

func InsertImagePath(db *sql.DB, filepath string, userId string, toonSidEpisode string) string {
	fmt.Println("InsertImagePath")

	nowTime := time.Now()
	toDbTime := fmt.Sprintf("%d-%02d-%02d-%02d-%02d-%02d", nowTime.Year(), nowTime.Month(), nowTime.Day(), nowTime.Hour(), nowTime.Minute(), nowTime.Second())

	ImageCheckSQL := fmt.Sprintf("SELECT USER_ID, PATH FROM IMAGEPATH WHERE PATH='%s' AND USER_ID='%s'", filepath, userId)
	row, err := db.Query(ImageCheckSQL)
	if err != nil {
		fmt.Println("image path check error")
		log.Print(err)
	}
	checkImagePath := new(CheckImagePath)
	for row.Next() {
		row.Scan(&checkImagePath.USER_ID, &checkImagePath.PATH)
	}

	if checkImagePath.USER_ID == "" && checkImagePath.PATH == "" {
		InsertImagetSQL := fmt.Sprintf("INSERT INTO IMAGEPATH (USER_ID, PATH, CREATE_AT, UPDATE_AT, TOON_SID_EPISODE) values ('%s', '%s', '%s', '%s', '%s')",
			userId, filepath, toDbTime, toDbTime, toonSidEpisode)
		row, err := db.Query(InsertImagetSQL)
		if err != nil {
			log.Print(err)
		}
		defer row.Close()

		return filepath
	} else {
		UpdateImagetSQL := fmt.Sprintf("UPDATE IMAGEPATH SET UPDATE_AT='%s' WHERE PATH='%s' AND USER_ID='%s'", toDbTime, filepath, userId)
		row, err := db.Query(UpdateImagetSQL)
		if err != nil {
			fmt.Println("image update check error")
			log.Print(err)
		}
		defer row.Close()

		return filepath
	}
}

func GetEpisodeValue(db *sql.DB, toonSid int, episode_name string) int {
	fmt.Println("GetEpisodeValue")
	var resentEpisode int

	fmt.Println(toonSid, episode_name)
	getEpisodeSQL := fmt.Sprintf("SELECT EPISODE FROM TOONS_CONTEXT WHERE TOON_SID='%d' AND EPISODE_NAME='%s'", toonSid, episode_name)
	rows, _ := db.Query(getEpisodeSQL)
	fmt.Println(rows)
	if rows == nil {
		return 0
	} else {
		for rows.Next() {
			rows.Scan(&resentEpisode)
		}
	}

	return resentEpisode
}
