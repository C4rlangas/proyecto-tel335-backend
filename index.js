const koa = require('koa')
const bodyParser = require('koa-body')
const User_router = require('./src/routes/endpoints_Users.js')

const app = new koa()
const port = 3001

app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(User_router.routes())

app.listen(port, () => {
    console.log(`Listening in port ${port}`)
})
