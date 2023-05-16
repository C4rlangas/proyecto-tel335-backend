const userActions = require("../actions/actions_user.js")

const getHealth = (ctx) => {
    ctx.body = "User API working"
    return ctx
}

const Init = async (ctx) => {

    const message = await userActions.tableInitializer()

    ctx.body = {"Message": message}
    return ctx
}

const getUser = async (ctx) => {
    const id = ctx.params.id_user
    const message = await userActions.getUserbyID(Number(id))  //Acceder a un numero desde la URL lo devuelve como string
    ctx.body = message
    return ctx
}

const signUp = async (ctx) => {

    const name = ctx.request.body.name
    const lastname = ctx.request.body.lastname
    const username = ctx.request.body.username
    const email = ctx.request.body.email
    const password = ctx.request.body.password
    
    const message = await userActions.insertUser(name,lastname,username,email,password)
    
    ctx.body = {"Message": message}
    return ctx
}

const logIn = async (ctx) => {
    const email = ctx.request.body.email
    const password = ctx.request.body.password

    const message = await userActions.checkUser(email,password)

    ctx.body = {"Message": message}
    return ctx
}

module.exports = {
    getHealth,
    Init,
    getUser,
    signUp,
    logIn,
}