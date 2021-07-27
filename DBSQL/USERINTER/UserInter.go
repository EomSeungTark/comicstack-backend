package userinter

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	COMMON "github.com/eom/comicstack_prototype/DBSQL/COMMON"
)

// have to test this func
func GetInterestsLength(db *sql.DB) int {
	rows, err := db.Query(`SELECT COUNT(*) FROM INTEREST`)
	var num int
	for rows.Next() {
		err = rows.Scan(&num)
		if err != nil {
			log.Print(err)
		}
	}
	return num
}

func SetInterests(db *sql.DB, interest *COMMON.Interest) string {
	fmt.Println("SetInterests")

	sqlState := fmt.Sprintf(`INSERT INTO INTEREST (SUBJECTNAME) VALUES ('%s')`, interest.SUBJECTNAME)
	rows, err := db.Query(sqlState)
	if err != nil {
		return "fail"
	}

	defer rows.Close()
	return "true"
}

func GetInterests(db *sql.DB) []COMMON.Interest {
	fmt.Println("GetInterests")

	interestLength := GetInterestsLength(db)
	interests := make([]COMMON.Interest, interestLength)

	sqlString := fmt.Sprintf(`SELECT SUBJECTNAME FROM FROM INTEREST`)
	rows, err := db.Query(sqlString)
	if err != nil {
		log.Fatal(err)
	}

	var i int = 0
	for rows.Next() {
		rows.Scan(&interests[i].SUBJECTNAME)
		i++
	}

	return interests
}

func SetUserInterest(db *sql.DB, UserId string, Interests string) string {
	fmt.Println("GetUserInterest")

	nowTime := time.Now()
	toDbTime := fmt.Sprintf("%d-%02d-%02d-%02d-%02d-%02d", nowTime.Year(), nowTime.Month(), nowTime.Day(), nowTime.Hour(), nowTime.Minute(), nowTime.Second())
	userInterestSQL := fmt.Sprintf("INSERT INTO USER_INTERESTS (USER_ID, INTERESTS, CREATE_AT) values ('%s', '%s', '%s')", UserId, Interests, toDbTime)
	row, err := db.Query(userInterestSQL)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	return "true"
}

// have to test this func
func GetUserInterest(db *sql.DB, UserId string) COMMON.UserInterest {
	fmt.Println("GetUserInterest")

	sqlString := fmt.Sprintf(`SELECT * FROM INTEREST WHERE USER_ID='%s' AND max(CREATE_AT)`, UserId)
	rows, err := db.Query(sqlString)
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()

	userInterStruct := COMMON.UserInterToSturct(rows)

	return userInterStruct
}
