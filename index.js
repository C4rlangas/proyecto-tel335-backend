const koa = require('koa')
const bodyParser = require('koa-body')
const cors = require('@koa/cors');

const User_router = require('./src/routes/endpoints_Users.js')
const Notebook_router = require('./src/routes/endpoints_Notebooks.js')
const Pages_router = require('./src/routes/endpoints_Pages.js')

const app = new koa()
const port = 3001

app.use(cors());
app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(User_router.routes())
app.use(Notebook_router.routes())
app.use(Pages_router.routes())

app.on('error', (err,ctx) => {
    console.log(err.message)
    ctx.body = err
    return ctx
})

app.listen(port, () => {
    console.log(`Listening in port ${port}`)
})
