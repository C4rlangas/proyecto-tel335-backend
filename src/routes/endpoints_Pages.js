const Router = require('koa-router')
const Pages = require("../controllers/controller_pages.js")

const router = new Router()

router.get('/api/pageTable', Pages.Init)

router.get('/api/page/:notebook_id', Pages.getPages)
router.post('/api/page', Pages.postPage)
router.put('/api/page', Pages.putPage)
router.delete('/api/page/:page_id', Pages.deletePage)


module.exports = router