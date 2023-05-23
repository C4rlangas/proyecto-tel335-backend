const Router = require('koa-router')
const Notebook = require("../controllers/controller_notebooks.js")

const router = new Router()

router.get('/api/notebookTable', Notebook.Init)

router.get('/api/notebook/:userID', Notebook.getNotebooks)
router.post('/api/notebook', Notebook.postNotebook)
router.put('/api/notebook', Notebook.putNotebook)
router.delete('/api/notebook/:notebook_id', Notebook.deleteNotebook)


module.exports = router