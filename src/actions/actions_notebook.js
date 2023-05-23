const connection = require('../db.js');
const queries = require('../queries/notebook.js')

const tableInitializer = async () => {

    const database = await connection()

    await database.query(queries.createTable)

    return "Tabla creada"
}


const getNotebooksbyUserID = async (userID) => {

    const database = await connection()

    const [rows] = await database.query(
        queries.getNotebooksbyUserID,
        [userID]);

    return rows
}


const insertNotebook = async (userID, title, color) => {
    //Database Connection
    const database = await connection()

    //Insert in Database
    await database.query(
        queries.addNotebook,
        [userID, title, color])

    return "Notebook Inserted in DB"
}


const updateNotebook = async (notebookID, title, color) => {
    const database = await connection()
    
    await database.query(
        queries.updateNotebook,
        [title, color, notebookID])

    return "Notebook Updated in DB"
}

const removeNotebook = async (notebookID) => {
    const database = await connection()

    await database.query(
        queries.removeNotebook,
        [notebookID])

    return "Notebook Deleted from DB"
}

module.exports = {
    tableInitializer,
    getNotebooksbyUserID,
    insertNotebook,
    updateNotebook,
    removeNotebook
}