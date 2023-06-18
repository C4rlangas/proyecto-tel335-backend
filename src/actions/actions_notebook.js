const queries = require('../queries/notebook.js')

const tableInitializer = async (database) => {

    await database.query(queries.createTable)

    return "Tabla creada"
}


const getNotebooksbyUserID = async (database, userID) => {

    const [rows] = await database.query(
        queries.getNotebooksbyUserID,
        [userID]);

    return rows
}


const insertNotebook = async (database, userID, title, color) => {

    await database.query(
        queries.addNotebook,
        [userID, title, color])

    return "Notebook Inserted in DB"
}


const updateNotebook = async (database, notebookID, title, color) => {
    
    await database.query(
        queries.updateNotebook,
        [title, color, notebookID])

    return "Notebook Updated in DB"
}

const removeNotebook = async (database, notebookID) => {

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