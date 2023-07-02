const DB_ERROR = new Error("Could not connect to database")
DB_ERROR.code = 500

const VALUE_ERROR = new Error("Missing or invalid parameter")
VALUE_ERROR.code = 400

const CRED_ERROR = new Error("Wrong Email or password")
CRED_ERROR.code = 401

const NOTE_ERROR = new Error("Not User's Notebook")
NOTE_ERROR.code = 401

const PAGE_ERROR = new Error("Page not from User's Notebooks")
PAGE_ERROR.code = 401

const TOKEN_ERROR = new Error("Missing or Invalid token")
TOKEN_ERROR.code = 401

const EXP_ERROR = new Error("Session expired")
EXP_ERROR.code = 401

const CONFLICT_ERROR_EMAIL = new Error("Email already exist")
CONFLICT_ERROR_EMAIL.code = 409

const CONFLICT_ERROR_USERNAME = new Error("Username already exist")
CONFLICT_ERROR_USERNAME.code = 409


module.exports = {
    DB_ERROR,
    VALUE_ERROR,
    CRED_ERROR,
    NOTE_ERROR,
    PAGE_ERROR,
    TOKEN_ERROR,
    EXP_ERROR,
    CONFLICT_ERROR_EMAIL,
    CONFLICT_ERROR_USERNAME
}