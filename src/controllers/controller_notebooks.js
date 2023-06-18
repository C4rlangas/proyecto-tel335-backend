const notebookActions = require("../actions/actions_notebook.js")
const connection = require('../db.js');
const ERROR = require("../error.js")


const Init = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const message = await notebookActions.tableInitializer(database)
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const getNotebooks = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const userID = Number(ctx.params.userID)
        if((!userID) || (isNaN(userID))){
            throw ERROR.VALUE_ERROR
        }
    
        const message = await notebookActions.getNotebooksbyUserID(database, userID) 
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const postNotebook = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const userID = Number(ctx.request.body.user_id)
        const title = ctx.request.body.titulo
        const color = ctx.request.body.color
        if((!userID) || (!title) || (isNaN(userID))){
            throw ERROR.VALUE_ERROR
        }
    
        const message = await notebookActions.insertNotebook(database, userID, title, color)
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const putNotebook = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const notebookID = Number(ctx.request.body.notebook_id)
        const title = ctx.request.body.titulo
        const color = ctx.request.body.color
        if((!notebookID) || (!title) || (isNaN(notebookID))){
            throw ERROR.VALUE_ERROR
        }
    
        const message = await notebookActions.updateNotebook(database, notebookID, title, color)
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const deleteNotebook = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const notebookID = Number(ctx.params.notebook_id)
        if((!notebookID) || (isNaN(notebookID))){
            throw ERROR.VALUE_ERROR
        }
    
        const message = await notebookActions.removeNotebook(database, notebookID)
        ctx.body = message
        
        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}



module.exports = {
    Init,
    getNotebooks,
    postNotebook,
    putNotebook,
    deleteNotebook
}