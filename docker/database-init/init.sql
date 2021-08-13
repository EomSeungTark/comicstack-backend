-- TOONS_CONTEXT Table Create SQL
CREATE TABLE TOONS_CONTEXT
(
    EPISODE           int            NOT NULL,
    THUMBNAIL_PATH    text           NOT NULL,
    TOON_SID          int            NOT NULL,
    CREATE_AT         varchar(19)    NOT NULL,
    EPISODE_NAME      text           NOT NULL,
    VIEWS             int            NOT NULL,
    CONSTRAINT PK_TOONS_CONTEXT PRIMARY KEY (EPISODE, TOON_SID)
);


-- USERS Table Create SQL
CREATE TABLE USERS
(
    ID                     varchar(12)    NOT NULL,
    PASSWORD               text           NOT NULL,
    ADDRESS                varchar(50)    NULL,
    PHONE_NUMBER           varchar(50)    NULL,
    PERSNAL_BASIC_AGREE    boolean        NOT NULL,
    PERSNAL_SHARE_AGREE    boolean        NOT NULL,
    EMAIL                  varchar(50)    NULL,
    SMS_AGREE              boolean        NOT NULL,
    EMAIL_AGREE            boolean        NOT NULL,
    CREATE_AT              varchar(19)    NOT NULL,
    UPDATE_AT              varchar(19)    NOT NULL,
    AUTHORITY              varchar(50)    NOT NULL,
    NAME                   text           NOT NULL,
    CONSTRAINT PK_USERS PRIMARY KEY (ID)
);


-- BANK_ACCOUNT Table Create SQL
CREATE TABLE BANK_ACCOUNT
(
    SID          int             GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    USER_ID      varchar(12)     NOT NULL,
    BANK         varchar(100)    NOT NULL,
    ACCOUNT      varchar(100)    NOT NULL,
    CREATE_AT    varchar(19)     NOT NULL,
    UPDATE_AT    varchar(19)     NULL,
    CONSTRAINT PK_ADDRESS PRIMARY KEY (SID)
);

ALTER TABLE BANK_ACCOUNT
    ADD CONSTRAINT FK_BANK_ACCOUNT_USER_ID_USERS_ID FOREIGN KEY (USER_ID)
        REFERENCES USERS (ID);


-- IMAGEPATH Table Create SQL
CREATE TABLE IMAGEPATH
(
    USER_ID             varchar(12)    NOT NULL,
    PATH                text           NOT NULL,
    CREATE_AT           varchar(19)    NOT NULL,
    UPDATE_AT           varchar(19)    NULL,
    TOON_SID_EPISODE    text           NULL,
    CONSTRAINT PK_TOONPATH PRIMARY KEY (USER_ID, PATH, TOON_SID_EPISODE)
);

ALTER TABLE IMAGEPATH
    ADD CONSTRAINT FK_IMAGEPATH_USER_ID_USERS_ID FOREIGN KEY (USER_ID)
        REFERENCES USERS (ID);


-- LOGIN_TIMESTEMP Table Create SQL
CREATE TABLE LOGIN_TIMESTEMP
(
    SID           int            GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    USER_ID       varchar(12)    NOT NULL,
    LOGIN_TIME    varchar(19)    NOT NULL,
    TF            boolean        NOT NULL,
    CONSTRAINT PK_LOGIN_TIMESTEMP PRIMARY KEY (SID)
);

ALTER TABLE LOGIN_TIMESTEMP
    ADD CONSTRAINT FK_LOGIN_TIMESTEMP_USER_ID_USERS_ID FOREIGN KEY (USER_ID)
        REFERENCES USERS (ID);


-- LOGOUT_TIMESTEMP Table Create SQL
CREATE TABLE LOGOUT_TIMESTEMP
(
    SID            int            GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    USER_ID        varchar(12)    NOT NULL,
    LOGOUT_TIME    varchar(19)    NOT NULL,
    CONSTRAINT PK_LOGOUT_TIMESTEMP PRIMARY KEY (SID)
);

ALTER TABLE LOGOUT_TIMESTEMP
    ADD CONSTRAINT FK_LOGOUT_TIMESTEMP_USER_ID_USERS_ID FOREIGN KEY (USER_ID)
        REFERENCES USERS (ID);


-- USER_INTERESTS Table Create SQL
CREATE TABLE USER_INTERESTS
(
    USER_ID      varchar(12)    NOT NULL,
    INTERESTS    text           NOT NULL,
    UPDATE_AT    varchar(19)    NOT NULL,
    CONSTRAINT PK_USER_INTERESTS PRIMARY KEY (USER_ID)
);

ALTER TABLE USER_INTERESTS
    ADD CONSTRAINT FK_USER_INTERESTS_USER_ID_USERS_ID FOREIGN KEY (USER_ID)
        REFERENCES USERS (ID);


-- TOONS Table Create SQL
CREATE TABLE TOONS
(
    SID               int            GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    USER_ID           varchar(12)    NOT NULL,
    DAY               varchar(50)    NOT NULL,
    TITLE             varchar(50)    NOT NULL,
    THUMBNAIL_PATH    text           NOT NULL,
    PASS              boolean        NOT NULL,
    CONTEXT           text           NOT NULL,
    GENRE             text           NOT NULL,
    ENDING            boolean        NOT NULL,
    AUTHORITY         varchar(50)    NOT NULL,
    CREATE_AT         varchar(19)    NOT NULL,
    CONSTRAINT PK_TOONS PRIMARY KEY (SID, TITLE)
);

ALTER TABLE TOONS
    ADD CONSTRAINT FK_TOONS_USER_ID_USERS_ID FOREIGN KEY (USER_ID)
        REFERENCES USERS (ID);


-- AUTHORITY Table Create SQL
CREATE TABLE AUTHORITY
(
    NAME    varchar(50)    NOT NULL,
    CONSTRAINT PK_AUTHORITY PRIMARY KEY (NAME)
);


-- INTEREST Table Create SQL
CREATE TABLE INTEREST
(
    SID            int     GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    SUBJECTNAME    text    NULL,
    CONSTRAINT PK_INTEREST PRIMARY KEY (SID)
);


-- TOON_USER_COMMENT Table Create SQL
CREATE TABLE TOON_USER_COMMENT
(
    SID          int            GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    TITLE        varchar(50)    NOT NULL,
    EPISODE      int            NOT NULL,
    CREATE_AT    varchar(19)    NOT NULL,
    USER_ID      varchar(12)    NOT NULL,
    COMMENT      text           NOT NULL,
    GOOD         int            NOT NULL,
    BAD          int            NOT NULL,
    BLIND        boolean        NOT NULL,
    UPDATE_AT    varchar(19)    NULL,
    TOON_SID     int            NOT NULL,
    CONSTRAINT PK_TOON_USER_COMENT PRIMARY KEY (SID)
);

ALTER TABLE TOON_USER_COMMENT
    ADD CONSTRAINT FK_TOON_USER_COMMENT_EPISODE_TOONS_CONTEXT_EPISODE FOREIGN KEY (EPISODE, TOON_SID)
        REFERENCES TOONS_CONTEXT (EPISODE, TOON_SID);

ALTER TABLE TOON_USER_COMMENT
    ADD CONSTRAINT FK_TOON_USER_COMMENT_USER_ID_USERS_ID FOREIGN KEY (USER_ID)
        REFERENCES USERS (ID);


-- Table: keytable

-- DROP TABLE public.keytable;

CREATE TABLE keytable
(
    key character varying(16) COLLATE pg_catalog."default" NOT NULL,
    date character varying(19) COLLATE pg_catalog."default",
    CONSTRAINT keytable_pkey PRIMARY KEY (key)
);

INSERT INTO keytable(key, date) VALUES ('zk8n0bej3r45yebk', '2021-07-28-15-53-28');

