const getUserbyID = `
SELECT nombre, apellido, username, email
FROM Usuarios
WHERE user_id = ?
`

const getUsers = `
SELECT *
FROM Usuarios
`

const createTable = `
CREATE TABLE IF NOT EXISTS Usuarios(user_id int AUTO_INCREMENT, nombre VARCHAR(50), apellido VARCHAR(50), username VARCHAR(20),
email VARCHAR(50), password VARCHAR(60), PRIMARY KEY(user_id))
`

const checkUserbyEmail = `
SELECT email 
FROM Usuarios 
WHERE email= ?
`

const checkUserbyUsername = `
SELECT username 
FROM Usuarios 
WHERE username= ?
`

const addUser = `
INSERT INTO Usuarios (nombre, apellido, username, email, password) 
VALUES (?, ?, ?, ?, ?)
`

const getPassbyEmail = `
SELECT user_id, nombre, apellido, username, password 
FROM Usuarios 
WHERE email=?
`

module.exports = {
    getUserbyID,
    getUsers,
    checkUserbyEmail,
    checkUserbyUsername,
    addUser,
    getPassbyEmail,
    createTable
}