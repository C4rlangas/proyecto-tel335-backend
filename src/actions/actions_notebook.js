const queries = require('../queries/notebook.js')

const tableInitializer = async (database) => {

    await database.query(queries.createTable)

    database.end()

    return "Tabla creada"
}


const getNotebooksbyUserID = async (database, userID) => {

    const [rows] = await database.query(
        queries.getNotebooksbyUserID,
        [userID]);

    database.end()

    return rows
}


const insertNotebook = async (database, userID, title, color) => {

    if(!color){
        color = '#FFFFFF'
    }

    await database.query(
        queries.addNotebook,
        [userID, title, color])

    database.end()

    return "Notebook Inserted in DB"
}


const updateNotebook = async (database, userID, notebookID, title, color) => {

    const [rows] = await database.query(
        queries.checkNotebookbyUserID,
        [userID, notebookID]);
    
    if(rows.length === 0){
        return false
    }

    if(!color){
        color = '#FFFFFF'
    }

    await database.query(
        queries.updateNotebook,
        [title, color, notebookID])

    database.end()

    return true
}

const removeNotebook = async (database, userID, notebookID) => {

    const [rows] = await database.query(
        queries.checkNotebookbyUserID,
        [userID, notebookID]);
    
    if(rows.length === 0){
        return false
    }
    
    await database.query(
        queries.removeNotebook,
        [notebookID])

    database.end()

    return "Notebook Deleted from DB"
}

module.exports = {
    tableInitializer,
    getNotebooksbyUserID,
    insertNotebook,
    updateNotebook,
    removeNotebook
}