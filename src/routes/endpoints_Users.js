//* DEPENDENCIES AND MODULES*/
const Router = require('koa-router')
const User = require("../controllers/controller_users.js")

const router = new Router()

router.get('/api/user', User.getHealth)

//Not working
router.get('/api/user/:id_user', User.getUser)
router.get('/api/userTable', User.Init)

//SignUp, Login and SignOut
router.post('/api/signup', User.signUp)
router.post('/api/login', User.logIn)

//* Exports */
module.exports = router