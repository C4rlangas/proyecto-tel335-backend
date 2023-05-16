//* All code logic related with SignUp and LogIn body request is here *//

//* DEPENDENCIES AND MODULES*/
const connection = require('../db.js');
const queries = require('../queries/user.js')
const bcrypt = require('bcrypt')

//Parameters
saltRounds = 2


//* Functions */

//Falta trabajar en esta accion
const getUserbyID = async (u_id) => {
    
    const database = await connection()

    const [rows] = await database.query(
                            queries.getUserbyID,
                            [u_id]);
                            
    return rows
}

const tableInitializer = async () => {

    const database = await connection()
    await database.query(queries.createTable)

    return "Tabla creada"

}


const insertUser = async (name, lastname, u_name ,u_email, u_password) => {
    //Database Connection
    const database = await connection()

    //Check if user already in system by email
    const [rows] = await database.query(
                            queries.checkUserbyEmail,
                            [u_email]);

    if(rows[0]['COUNT(*)'] >= 1){
        return `Email ${u_email} already in use`
    }
    
    //Hashing password
    const h_password = await bcrypt.hash(u_password, saltRounds)

    //Register in System
    await database.query(
            queries.addUser,
            [name, lastname, u_name, u_email, h_password])

    //Succesful return message
    const message = `User Inserted in DB`
    return message
}

const checkUser = async (u_email, u_password) => {

    //Database Connection
    const database = await connection()

    //Check if user already in system by email
    const [rows] = await database.query(
                            queries.getPassbyEmail,
                            [u_email]);

    if(rows[0] === undefined){
        return `Email ${u_email} not valid`
    }
    
    //Check if password matches
    const passMatches = await bcrypt.compare(u_password, rows[0].password) //El orden importa, primero la clave normal y luego la hasheada
    if (!passMatches) {
        return `Incorrect Password`
    }
    
    return "LogIn Success"
}

module.exports = {
    getUserbyID,
    checkUser,
    insertUser,
    tableInitializer
}