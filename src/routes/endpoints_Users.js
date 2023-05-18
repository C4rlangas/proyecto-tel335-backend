const Router = require('koa-router')
const User = require("../controllers/controller_users.js")

const router = new Router()

router.get('/api/user', await User.getHealth)
router.get('/api/user/:id_user', await User.getUser)
router.get('/api/userTable', await User.Init)
router.post('/api/signup', await User.signUp)
router.post('/api/login', await User.logIn)

module.exports = router