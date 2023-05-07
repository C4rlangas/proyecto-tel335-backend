//* All code logic related with SignUp and LogIn body request is here *//

//* DEPENDENCIES AND MODULES*/
const database = require('../../db.js');

const bcrypt = require('bcrypt')

id = 3
saltRounds = 2

const users = [{
    id: 1,
    name: "Carlos",
    email: "carlos.sotod@sansano.usm.cl",
    password: "123"
},
{
    id: 2,
    name: "Tomo",
    email: "tomoaki.iwaya@sansano.usm.cl",
    password: "momia es"
}]


//* Functions */

const getUserbyID = (id) => {
    const user = users.find((user) => (user.id === id))
    return user
}

const signUser = async (u_name, u_email, u_password) => {
    //Check if user already in system by email
    const userExists = users.find((user) => user.email === u_email)
    if (userExists !== undefined) {
        return `Email ${u_email} already in use`
    }


    //Hashing password
    const h_password = await bcrypt.hash(u_password, saltRounds)

    //Register in System
    let newUser = {
        id: id,
        name: u_name,
        email: u_email,
        password: h_password
    }
    id = id + 1
    users.push(newUser)
    const message = `User Signed Up, user_id = ${newUser.id}`
    return message
}

const logUser = async (u_email, u_password) => {
    //Check if user already in system by email
    const userExists = users.find((user) => user.email === u_email)
    if (userExists === undefined) {
        return `Email ${u_email} not valid`
    }

    //Check if password matches
    const passMatches = await bcrypt.compare(u_password, userExists.password) //El orden importa, primero la clave normal y luego la hasheada
    if (!passMatches) {
        return `Incorrect Password`
    }

    //Login Logic
    //...
    return "LogIn Success"
}

const insertUser = async (name, lastname, u_name ,u_email, u_password) => {

    //Hashing password
    const h_password = await bcrypt.hash(u_password, saltRounds)

    //Register in System
    const query = `INSERT INTO Usuarios (nombre, apellido, username, email, password) VALUES ("${name}", "${lastname}", "${u_name}", "${u_email}", "${h_password}")`

    database.query(query, (err) => {
        if (err) throw err;
        
    });

    const message = `User Inserted in DB`
    return message
}

module.exports = {
    getUserbyID,
    signUser,
    logUser,
    insertUser
}