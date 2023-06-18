const pageActions = require("../actions/actions_page.js")
const connection = require('../db.js');
const ERROR = require("../error.js")


const Init = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const message = await pageActions.tableInitializer(database)
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const getPages = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const notebookID = Number(ctx.params.notebook_id)
        if((!notebookID) || (isNaN(notebookID))){
            throw ERROR.VALUE_ERROR
        }

        const message = await pageActions.getPagesbyNotebookID(database, notebookID) 
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const postPage = async (ctx) => { //***** Falta lógica para evitar ingresar páginas con mismo titulo ********//
    try{
        
        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const notebookID = Number(ctx.request.body.notebook_id)
        const text = ctx.request.body.texto
        const title = ctx.request.body.titulo
        const date = ctx.request.body.fecha
        if((!notebookID) || (!title) || (isNaN(notebookID))){
            throw ERROR.VALUE_ERROR
        }
        
        const message = await pageActions.insertPage(database, notebookID, text, title, date)
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const putPage = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const pageID = Number(ctx.request.body.page_id)
        const text = ctx.request.body.texto
        const title = ctx.request.body.titulo
        const date = ctx.request.body.fecha
        if((!pageID) || (!title) || (isNaN(pageID))){
            throw ERROR.VALUE_ERROR
        }
    
        const message = await pageActions.updatePage(database, pageID, text, title, date)
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const deletePage = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const pageID = Number(ctx.params.page_id)
        if((!pageID) || (isNaN(pageID))){
            throw ERROR.VALUE_ERROR
        }
    
        const message = await pageActions.removePage(database, pageID)
        ctx.body = message
        
        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}



module.exports = {
    Init,
    getPages,
    postPage,
    putPage,
    deletePage
}