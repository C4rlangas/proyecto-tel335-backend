const pageActions = require("../actions/actions_page.js")
const connection = require('../db.js');
const ERROR = require("../error.js")
const jwt = require("jsonwebtoken")


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

        const message = await pageActions.getPagesbyNotebookID(database, token_data.sub, notebookID) 
        if(!message){
            throw ERROR.NOTE_ERROR
        }

        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const postPage = async (ctx) => { //***** Falta lógica para evitar ingresar páginas con mismo titulo ********//
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
        const text = ctx.request.body.texto
        const title = ctx.request.body.titulo
        const date = ctx.request.body.fecha
        if((!notebookID) || (!title) || (isNaN(notebookID))){
            throw ERROR.VALUE_ERROR
        }
        
        const succeed = await pageActions.insertPage(database, token_data.sub, notebookID, text, title, date)
        if(!succeed){
            throw ERROR.NOTE_ERROR
        }

        ctx.body = "Page Inserted in DB"

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const putPage = async (ctx) => {
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

        const pageID = Number(ctx.request.body.page_id)
        const text = ctx.request.body.texto
        const title = ctx.request.body.titulo
        const date = ctx.request.body.fecha
        if((!pageID) || (!title) || (isNaN(pageID))){
            throw ERROR.VALUE_ERROR
        }
    
        const succeed = await pageActions.updatePage(database, token_data.sub, pageID, text, title, date)
        if(!succeed){
            throw ERROR.PAGE_ERROR
        }

        ctx.body = "Page Updated in DB"

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const deletePage = async (ctx) => {
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

        const pageID = Number(ctx.params.page_id)
        if((!pageID) || (isNaN(pageID))){
            throw ERROR.VALUE_ERROR
        }
    
        const succeed = await pageActions.removePage(database, token_data.sub, pageID)
        if(!succeed){
            throw ERROR.PAGE_ERROR
        }

        ctx.body = "Page Deleted from DB"
        
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