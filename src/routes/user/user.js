const userActions = require("../../actions/user.js")

const getUser = (ctx) => {
    const id = ctx.params.id_user
    user = userActions.getUserbyID(Number(id))  //Acceder a un numero desde la URL lo devuelve como string
    ctx.body = user
    return ctx
}

const signUp = async (ctx) => {
    const name = ctx.request.body.name
    const email = ctx.request.body.email
    const password = ctx.request.body.password
    
    const message = await userActions.signUser(name,email,password)
    
    ctx.body = {"Message": message}
    return ctx
}

const logIn = async (ctx) => {
    const email = ctx.request.body.email
    const password = ctx.request.body.password

    const message = await userActions.logUser(email,password)
    ctx.body = {"Message": message}
    return ctx
}

const Insert = async (ctx) => {

    const name = ctx.request.body.name
    const lastname = ctx.request.body.lastname
    const username = ctx.request.body.username
    const email = ctx.request.body.email
    const password = ctx.request.body.password
    
    const message = await userActions.insertUser(name,lastname,username,email,password)
    
    ctx.body = {"Message": message}
    return ctx
}

module.exports = {
    getUser,
    signUp,
    logIn,
    Insert
}