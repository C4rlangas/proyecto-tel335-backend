const DB_ERROR = new Error("Could not connect to database")
DB_ERROR.code = 500

const VALUE_ERROR = new Error("Missing or invalid parameter")
VALUE_ERROR.code = 400

const CRED_ERROR = new Error("Wrong Email or password")
CRED_ERROR.code = 401

const CONFLICT_ERROR = new Error("Parameter already exist:")
CONFLICT_ERROR.code = 409


module.exports = {
    DB_ERROR,
    VALUE_ERROR,
    CRED_ERROR,
    CONFLICT_ERROR
}