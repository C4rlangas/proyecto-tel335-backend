//* DEPENDENCIES AND MODULES*/
const Router = require('koa-router')
const User = require("./user/user.js")

const router = new Router()

router.get('/api', (ctx) => {
    ctx.body = {"Message":"Welcome to the API"}
    return ctx
})

router.get('/api/user/:id_user', User.getUser)

router.post('/api/user/signup',User.signUp)









//* Exports */
module.exports = router