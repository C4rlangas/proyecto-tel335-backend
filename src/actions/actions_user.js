//* All code logic related with SignUp and LogIn body request is here *//
const queries = require('../queries/user.js')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

require('dotenv').config();

//Parameters
const saltRounds = 2

const getUserbyID = async (database, userID) => {

    const [rows] = await database.query(
        queries.getUserbyID,
        [userID]);

    return rows

}

const getUsers = async (database) => {

    const [rows] = await database.query(
        queries.getUsers);

    return rows

}

const tableInitializer = async (database) => {

    await database.query(queries.createTable)

    return "Tabla creada"
}

const insertUser = async (database, name, lastname, userName, userEmail, userPassword) => {

    //Check if user already in system by email
    const [rows] = await database.query(
        queries.checkUserbyEmail,
        [userEmail]);

    if (rows[0]['COUNT(*)'] >= 1) {
        return false
    }

    //Hashing password
    const h_password = await bcrypt.hash(userPassword, saltRounds)

    //Register in System
    await database.query(
        queries.addUser,
        [name, lastname, userName, userEmail, h_password])

    return true
}

const checkUser = async (database, userEmail, userPassword) => {

    //Check if user already in system by email
    const [rows] = await database.query(
        queries.getPassbyEmail,
        [userEmail]);
    const data = rows[0]

    if (data === undefined) {
        return [false, null]
    }

    //Check if password matches
    const passMatches = await bcrypt.compare(userPassword, data.password) //El orden importa, primero la clave normal y luego la hasheada
    if (!passMatches) {
        return [false, null]
    }

    const secret = process.env.CLAVE_SECRETA
    const token = jwt.sign({
        sub: data.user_id,
        username: data.username,
    }, secret, { expiresIn: '1d'})

    return [true, token]
}

module.exports = {
    getUserbyID,
    getUsers,
    checkUser,
    insertUser,
    tableInitializer
}