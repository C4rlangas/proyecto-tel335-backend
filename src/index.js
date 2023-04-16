const koa = require('koa')
const bodyParser = require('koa-body')
const router = require('./routes/index.js')

const app = new koa()
const port = 3001

app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(router.routes())

app.listen(port, () => {
    console.log(`Listening in port ${port}`)
})
