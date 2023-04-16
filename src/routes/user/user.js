const userActions = require("../../actions/user/user.js")




const getUser = (ctx) => {
    const id = ctx.params.id_user
    user = userActions.getUserbyID(Number(id))  //Acceder a un numero desde la URL lo devuelve como string
    ctx.body = user

    return ctx
}

const signUp = (ctx) => {
    const name = ctx.request.body.name
    const email = ctx.request.body.email
    const password = ctx.request.body.password
    
    const message = userActions.signUser(name,email,password)
    ctx.body = {"Message": message}
    return ctx
}


module.exports = {
    getUser,
    signUp
}