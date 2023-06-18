const userActions = require("../actions/actions_user.js")
const connection = require('../db.js');
const ERROR = require("../error.js")

const getHealth = (ctx) => {
    ctx.body = "User API working"
    return ctx
}

const Init = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }
        
        const message = await userActions.tableInitializer(database)
        ctx.body = message
        
        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const getUser = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const id = Number(ctx.params.id_user) //Acceder a un numero desde la URL lo devuelve como string
        if(isNaN(id)){
            throw ERROR.VALUE_ERROR
        }

        const message = await userActions.getUserbyID(database, id)  
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const getUsers = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const message = await userActions.getUsers(database)  
        ctx.body = message

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

const signUp = async (ctx) => {
    try{

        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }

        const name = ctx.request.body.name
        const lastname = ctx.request.body.lastname
        const username = ctx.request.body.username
        const email = ctx.request.body.email
        const password = ctx.request.body.password
        if((!username) || (!email) || (!password)){
            throw ERROR.VALUE_ERROR
        }
        
        const succed = await userActions.insertUser(database,name,lastname,username,email,password)
        if(!succed){
            throw ERROR.CONFLICT_ERROR
        }

        ctx.body = "Signup Successful"

        return ctx
    }
    catch(err){
        switch(err.code){
            case 409:
                ctx.throw(err.code, err.message + ' Email')
                break;
            default:
                ctx.throw(err.code, err.message)
        }
    }
}

const logIn = async (ctx) => {

    try{
        const database = await connection()
        if(!database){
            throw ERROR.DB_ERROR
        }
        
        const email = ctx.request.body.email
        const password = ctx.request.body.password
        if((!email) || (!password)){
            throw ERROR.VALUE_ERROR
        }
    
        const succeed = await userActions.checkUser(database, email,password)

        if(!succeed){
            throw ERROR.CRED_ERROR
        }

        ctx.body = "Login Successful"

        return ctx
    }
    catch(err){
        ctx.throw(err.code, err.message)
    }
}

module.exports = {
    getHealth,
    Init,
    getUser,
    getUsers,
    signUp,
    logIn,
}