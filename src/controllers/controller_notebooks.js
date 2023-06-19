const notebookActions = require("../actions/actions_notebook.js")
const connection = require('../db.js');
const ERROR = require("../error.js")
const jwt = require("jsonwebtoken")

require('dotenv').config();


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

        const auth = ctx.header.authorization
        if(!auth){
            throw ERROR.TOKEN_ERROR
        }

        const token = auth.split(" ")[1]
        const token_data = jwt.verify(token, process.env.CLAVE_SECRETA, (err, decoded) => {
            if(!err){
                return decoded
            }

            switch(err.message){
                case "jwt expired":
                    throw ERROR.EXP_ERROR
                default:
                    throw ERROR.TOKEN_ERROR
            }
        })

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const userID = token_data.sub
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

        const auth = ctx.header.authorization
        if(!auth){
            throw ERROR.TOKEN_ERROR
        }

        const token = auth.split(" ")[1]
        const token_data = jwt.verify(token, process.env.CLAVE_SECRETA, (err, decoded) => {
            if(!err){
                return decoded
            }

            switch(err.message){
                case "jwt expired":
                    throw ERROR.EXP_ERROR
                default:
                    throw ERROR.TOKEN_ERROR
            }
        })

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const userID = token_data.sub
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

        const auth = ctx.header.authorization
        if(!auth){
            throw ERROR.TOKEN_ERROR
        }

        const token = auth.split(" ")[1]
        const token_data = jwt.verify(token, process.env.CLAVE_SECRETA, (err, decoded) => {
            if(!err){
                return decoded
            }

            switch(err.message){
                case "jwt expired":
                    throw ERROR.EXP_ERROR
                default:
                    throw ERROR.TOKEN_ERROR
            }
        })

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
    
        const succeed = await notebookActions.updateNotebook(database, token_data.sub, notebookID, title, color)
        if(!succeed){
            throw ERROR.NOTE_ERROR
        }

        ctx.body = "Notebook Updated in DB"

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const deleteNotebook = async (ctx) => {
    try{

        const auth = ctx.header.authorization
        if(!auth){
            throw ERROR.TOKEN_ERROR
        }

        const token = auth.split(" ")[1]
        const token_data = jwt.verify(token, process.env.CLAVE_SECRETA, (err, decoded) => {
            if(!err){
                return decoded
            }

            switch(err.message){
                case "jwt expired":
                    throw ERROR.EXP_ERROR
                default:
                    throw ERROR.TOKEN_ERROR
            }
        })

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const notebookID = Number(ctx.params.notebook_id)
        if((!notebookID) || (isNaN(notebookID))){
            throw ERROR.VALUE_ERROR
        }
    
        const succeed = await notebookActions.removeNotebook(database, token_data.sub, notebookID)
        if(!succeed){
            throw ERROR.NOTE_ERROR
        }

        ctx.body = "Notebook deleted from DB"
        
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