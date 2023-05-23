const connection = require('../db.js');
const queries = require('../queries/page.js')

const tableInitializer = async () => {

    const database = await connection()

    await database.query(queries.createTable)

    return "Tabla creada"
}


const getPagesbyNotebookID = async (notebookID) => {

    const database = await connection()

    const [rows] = await database.query(
        queries.getPagesbyNotebookID,
        [notebookID]);

    return rows
}


const insertPage = async (notebookID, text, title, date) => {
    //Database Connection
    const database = await connection()

    //Register in System
    await database.query(
        queries.addPage,
        [notebookID, text, title, date])

    return "Page Inserted in DB"
}


const updatePage = async (pageID, text, title, date) => {
    const database = await connection()

    await database.query(
        queries.updatePage,
        [text, title, date, pageID])

    return "Page Updated in DB"
}

const removePage = async (pageID) => {
    const database = await connection()

    await database.query(
        queries.removePage,
        [pageID])

    return "Page Deleted from DB"
}

module.exports = {
    tableInitializer,
    getPagesbyNotebookID,
    insertPage,
    updatePage,
    removePage
}