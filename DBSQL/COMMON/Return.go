package common

import (
	JWT "github.com/eom/comicstack_prototype/JWT"
)

type BasicResult struct {
	STATUS bool `json:"status"`
}

type LoginResult struct {
	STATUS       bool              `json:"status"`
	USER_ID      string            `json:"user_id"`
	ADDRESS      string            `json:"address"`
	PHONE_NUMBER string            `json:"phone_number"`
	EMAIL        string            `json:"email"`
	SMS_AGREE    bool              `json:"sms_agree"`
	EMAIL_AGREE  bool              `json:"email_agree"`
	NAME         string            `json:"name"`
	JWT          *JWT.TokenDetails `json:"jwt"`
}

type GetToonsResult struct {
	STATUS bool        `json:"status"`
	Toons  []ToonsInfo `json:"toons"`
}

type UserComment struct {
	USER_ID string `json:"user_id"`
	COMMENT string `json:"comment"`
	GOOD    int    `json:"good"`
	BAD     int    `json:"bad"`
}

type GetSelectedEpisodeResult struct {
	THUMBNAIL_PATH string        `json:"thumbnail_path"`
	TOON_CONTEXT   []string      `json:"toon_context"`
	UserComments   []UserComment `json:"usercomments"`
}

type NextEpisode struct {
	STATUS       bool `json:"status"`
	NEXT_EPISODE int  `json:"next_episode"`
}
