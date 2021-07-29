package toons

import (
	"database/sql"
	"fmt"
	"log"
	"sort"
	"strconv"

	COMMON "github.com/eom/comicstack_prototype/DBSQL/COMMON"
	"golang.org/x/text/unicode/norm"
)

func GetReigistedToons(db *sql.DB, LoginUser *COMMON.IdConfirm) *COMMON.GetToonsResult {
	fmt.Println("GetReigistedToons")
	getToonsResult := new(COMMON.GetToonsResult)

	fmt.Println(LoginUser.USER_ID)
	sqlString := fmt.Sprintf(`SELECT USER_ID, DAY, TITLE, THUMBNAIL_PATH, CONTEXT, SID FROM TOONS WHERE ENDING = false AND PASS = true AND USER_ID = '%s'`, LoginUser.USER_ID)
	rows, err := db.Query(sqlString)
	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		valueStruct := new(COMMON.ToonsInfo)
		rows.Scan(&valueStruct.USER_ID, &valueStruct.DAY, &valueStruct.TITLE, &valueStruct.THUMBNAIL_PATH, &valueStruct.CONTEXT, &valueStruct.TOON_SID)
		valueStruct.THUMBNAIL_PATH = norm.NFC.String(valueStruct.THUMBNAIL_PATH)
		getToonsResult.Toons = append(getToonsResult.Toons, *valueStruct)
	}

	getToonsResult.STATUS = true
	return getToonsResult
}

func GetToons(db *sql.DB) *COMMON.GetToonsResult {
	fmt.Println("GetToons")
	getToonsResult := new(COMMON.GetToonsResult)

	sqlString := fmt.Sprintf(`SELECT USER_ID, DAY, TITLE, THUMBNAIL_PATH, CONTEXT FROM TOONS WHERE ENDING = false AND PASS = true`)
	rows, err := db.Query(sqlString)
	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		valueStruct := new(COMMON.ToonsInfo)
		rows.Scan(&valueStruct.USER_ID, &valueStruct.DAY, &valueStruct.TITLE, &valueStruct.THUMBNAIL_PATH, &valueStruct.CONTEXT)
		getToonsResult.Toons = append(getToonsResult.Toons, *valueStruct)
	}

	return getToonsResult
}

func GetEpisodes(db *sql.DB, SelectToon *COMMON.SelectedToon) *COMMON.EpisodesInfo {
	// SelectToon.USER_ID - do persnal log recode
	fmt.Println("GetEpisodes")
	episodesInfo := new(COMMON.EpisodesInfo)

	sqlString := fmt.Sprintf(`SELECT EPISODE_NAME, THUMBNAIL_PATH, VIEWS, TOON_SID FROM TOONS_CONTEXT WHERE TOON_SID='%d'`, SelectToon.TOON_SID)
	rows, err := db.Query(sqlString)
	if err != nil {
		log.Print(err)
	}

	for rows.Next() {
		episodeInfo := new(COMMON.EpisodeInfo)
		rows.Scan(&episodeInfo.EPISODE_NAME, &episodeInfo.THUMBNAIL_PATH, &episodeInfo.VIEWS, &episodeInfo.TOON_SID)

		// getImagePathSQL := fmt.Sprintf(`SELECT PATH FROM IMAGEPATH WHERE TOON_SID_EPISODE='%s'`, toonSidEpi)
		// pathRows, err := db.Query(getImagePathSQL)
		// if err != nil {
		// 	log.Fatal(err)
		// }
		// for pathRows.Next() {
		// 	var tempPath string
		// 	rows.Scan(&tempPath)
		// 	episodeInfo.CONTEXT_PATH = append(episodeInfo.CONTEXT_PATH, tempPath)
		// }

		episodesInfo.EPISODES_INFO = append(episodesInfo.EPISODES_INFO, *episodeInfo)
	}

	return episodesInfo
}

func GetSelectedEpisode(db *sql.DB, SelectEpisode *COMMON.DoToon, EpisodeValue int) *COMMON.GetSelectedEpisodeResult {
	fmt.Println("GetEpisodes")
	selectedEpisodesInfo := new(COMMON.GetSelectedEpisodeResult)

	sqlString := fmt.Sprintf(`SELECT THUMBNAIL_PATH, TOON_SID, EPISODE_NAME FROM TOONS_CONTEXT WHERE TOON_SID=%d AND EPISODE_NAME='%s' AND EPISODE=%d`,
		SelectEpisode.TOON_SID, SelectEpisode.EPISODE_NAME, EpisodeValue)
	rows, err := db.Query(sqlString)
	if err != nil {
		log.Print(err)
	}
	for rows.Next() {
		rows.Scan(&selectedEpisodesInfo.THUMBNAIL_PATH, &selectedEpisodesInfo.TOON_SID, &selectedEpisodesInfo.EPISODE_NAME)
	}

	getImagePathSQL := fmt.Sprintf(`SELECT PATH FROM IMAGEPATH WHERE TOON_SID_EPISODE='%s'`,
		strconv.Itoa(SelectEpisode.TOON_SID)+"_"+strconv.Itoa(EpisodeValue))
	pathRows, err := db.Query(getImagePathSQL)
	if err != nil {
		log.Print(err)
	}
	for pathRows.Next() {
		var tempPath string
		rows.Scan(&tempPath)
		selectedEpisodesInfo.TOON_CONTEXT = append(selectedEpisodesInfo.TOON_CONTEXT, tempPath)
	}
	sort.Strings(selectedEpisodesInfo.TOON_CONTEXT)

	return selectedEpisodesInfo
}
