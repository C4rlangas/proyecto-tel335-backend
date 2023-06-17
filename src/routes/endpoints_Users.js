const Router = require('koa-router')
const User = require("../controllers/controller_users.js")

const router = new Router()

router.get('/api/user', User.getHealth) //Ver forma de awaitear las endpints
router.get('/api/users', User.getUsers)
router.get('/api/user/:id_user', User.getUser)
router.get('/api/userTable', User.Init)
router.post('/api/signup', User.signUp)
router.post('/api/login', User.logIn)

module.exports = router