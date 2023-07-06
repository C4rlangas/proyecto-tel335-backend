const queries = require('../queries/page.js')

const tableInitializer = async (database) => {

    await database.query(queries.createTable)

    database.end()

    return "Tabla creada"
}


const getPagesbyNotebookID = async (database, userID, notebookID) => {

    const [note] = await database.query(
        queries.checkNotebookbyUserID,
        [userID, notebookID]);
    
    if(note.length === 0){
        return false
    }

    const [rows] = await database.query(
        queries.getPagesbyNotebookID,
        [notebookID]);

    database.end()

    return rows
}


const insertPage = async (database, userID, notebookID, text, title, date) => {
    
    const [note] = await database.query(
        queries.checkNotebookbyUserID,
        [userID, notebookID]);
    
    if(note.length === 0){
        return false
    }

    if(!text){
        text = ""
    }

    if(!title){
        title = ""
    }
    
    await database.query(
        queries.addPage,
        [notebookID, text, title, date])

    database.end()

    return true
}


const updatePage = async (database, userID, pageID, text, title, date) => {

    const [note] = await database.query(
        queries.checkPagebyUserID,
        [userID, pageID]);
    
    if(note.length === 0){
        return false
    }

    if(!text){
        text = ""
    }

    if(!title){
        title = ""
    }

    await database.query(
        queries.updatePage,
        [text, title, date, pageID])

    database.end()

    return true
}

const removePage = async (database, userID, pageID) => {

    const [note] = await database.query(
        queries.checkPagebyUserID,
        [userID, pageID]);
    
    if(note.length === 0){
        return false
    }

    await database.query(
        queries.removePage,
        [pageID])

    database.end()

    return true
}

module.exports = {
    tableInitializer,
    getPagesbyNotebookID,
    insertPage,
    updatePage,
    removePage
}