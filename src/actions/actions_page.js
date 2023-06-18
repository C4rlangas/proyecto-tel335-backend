const queries = require('../queries/page.js')

const tableInitializer = async (database) => {

    await database.query(queries.createTable)

    return "Tabla creada"
}


const getPagesbyNotebookID = async (database, notebookID) => {

    const [rows] = await database.query(
        queries.getPagesbyNotebookID,
        [notebookID]);

    return rows
}


const insertPage = async (database, notebookID, text, title, date) => {
    
    await database.query(
        queries.addPage,
        [notebookID, text, title, date])

    return "Page Inserted in DB"
}


const updatePage = async (database, pageID, text, title, date) => {

    await database.query(
        queries.updatePage,
        [text, title, date, pageID])

    return "Page Updated in DB"
}

const removePage = async (database, pageID) => {

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