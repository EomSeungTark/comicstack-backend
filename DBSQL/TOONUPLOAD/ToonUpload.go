package toonupload

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	COMMON "github.com/eom/comicstack_prototype/DBSQL/COMMON"
)

func TryToonRegist(db *sql.DB, toonRegist *COMMON.ToonRegist, thumbnailPath string) *COMMON.BasicResult {
	fmt.Println("TryToonRegist")

	nowTime := time.Now()
	toDbTime := fmt.Sprintf("%d-%02d-%02d-%02d-%02d-%02d", nowTime.Year(), nowTime.Month(), nowTime.Day(), nowTime.Hour(), nowTime.Minute(), nowTime.Second())

	userInterestSQL := fmt.Sprintf("INSERT INTO TOONS (USER_ID, DAY, TITLE, THUMBNAIL_PATH, PASS, CONTEXT, GENRE, ENDING, AUTHORITY, CREATE_AT) values ('%s', '%s', '%s', '%s', '%t', '%s', '%s', '%t', '%s', '%s')",
		toonRegist.USER_ID, toonRegist.DAY, toonRegist.TITLE, thumbnailPath, toonRegist.PASS, toonRegist.CONTEXT, toonRegist.GENRE, false, "-", toDbTime)
	row, err := db.Query(userInterestSQL)
	if err != nil {
		log.Print(err)
		returnStruct := new(COMMON.BasicResult)
		returnStruct.STATUS = false
		return returnStruct
	}
	defer row.Close()

	returnStruct := new(COMMON.BasicResult)
	returnStruct.STATUS = true
	return returnStruct
}

func TryToonUpload(db *sql.DB, toonUpload *COMMON.ToonUpload, toonSidEpi string, thumbnailPath string) *COMMON.BasicResult {
	fmt.Println("TryToonUpload")

	nowTime := time.Now()
	toDbTime := fmt.Sprintf("%d-%02d-%02d-%02d-%02d-%02d", nowTime.Year(), nowTime.Month(), nowTime.Day(), nowTime.Hour(), nowTime.Minute(), nowTime.Second())

	var resentEpisode int

	rows, _ := db.Query("SELECT EPISODE FROM TOONS_CONTEXT WHERE TOON_SID='%d' ORDER BY DATE DESC LIMIT 1", toonUpload.TOON_SID)
	for rows.Next() {
		rows.Scan(&resentEpisode)
	}

	// num, err := strconv.Atoi(resentEpisode)
	episodeNum := resentEpisode
	episodeNum = episodeNum + 1

	userInterestSQL := fmt.Sprintf("INSERT INTO TOONS_CONTEXT (EPISODE, CONTEXT_PATH, THUMBNAIL_PATH, TOON_SID, CREATE_AT, EPISODE_NAME, VIEWS) values ('%d', '%s', '%s', '%d', '%s', '%s', '%d')",
		episodeNum, toonSidEpi, thumbnailPath, toonUpload.TOON_SID, toDbTime, toonUpload.EPISODE_NAME, 0)
	row, err := db.Query(userInterestSQL)
	if err != nil {
		log.Print(err)
	}
	defer row.Close()

	basicResult := new(COMMON.BasicResult)
	basicResult.STATUS = true

	return basicResult
}
