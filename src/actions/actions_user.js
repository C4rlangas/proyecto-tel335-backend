//* All code logic related with SignUp and LogIn body request is here *//
const connection = require('../db.js');
const queries = require('../queries/user.js')
const bcrypt = require('bcrypt')

//Parameters
saltRounds = 2

//Falta trabajar en esta accion
const getUserbyID = async (userID) => {

    const database = await connection()

    const [rows] = await database.query(
        queries.getUserbyID,
        [userID]);

    return rows
}

const tableInitializer = async () => {
    const database = await connection()
    await database.query(queries.createTable)
    return "Tabla creada"
}

const insertUser = async (name, lastname, userName, userEmail, userPassword) => {
    //Database Connection
    const database = await connection()

    //Check if user already in system by email
    const [rows] = await database.query(
        queries.checkUserbyEmail,
        [userEmail]);

    if (rows[0]['COUNT(*)'] >= 1) {
        return `Email ${userEmail} already in use`
    }

    //Hashing password
    const h_password = await bcrypt.hash(userPassword, saltRounds)

    //Register in System
    await database.query(
        queries.addUser,
        [name, lastname, userName, userEmail, h_password])

    return "User Inserted in DB"
}

const checkUser = async (userEmail, userPassword) => {

    //Database Connection
    const database = await connection()

    //Check if user already in system by email
    const [rows] = await database.query(
        queries.getPassbyEmail,
        [userEmail]);

    if (rows[0] === undefined) {
        return {Message:`Email ${userEmail} not valid`}
    }

    //Check if password matches
    const passMatches = await bcrypt.compare(userPassword, rows[0].password) //El orden importa, primero la clave normal y luego la hasheada
    if (!passMatches) {
        return {Message:"Incorrect Password"}
    }

    return {Message:"LogIn Success", user_id:rows[0].user_id}
}

module.exports = {
    getUserbyID,
    checkUser,
    insertUser,
    tableInitializer
}