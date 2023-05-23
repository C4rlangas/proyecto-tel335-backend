const pageActions = require("../actions/actions_page.js")


const Init = async (ctx) => {
    const message = await pageActions.tableInitializer()
    ctx.body = {"Message": message}
    return ctx
}

const getPages = async (ctx) => {
    const notebookID = Number(ctx.params.notebook_id)

    const message = await pageActions.getPagesbyNotebookID(notebookID) 

    ctx.body = message
    return ctx
}

const postPage = async (ctx) => {
    const notebookID = Number(ctx.request.body.notebook_id)
    const text = ctx.request.body.texto
    const title = ctx.request.body.titulo
    const date = ctx.request.body.fecha

    const message = await pageActions.insertPage(notebookID, text, title, date)

    ctx.body = message
    return ctx
}

const putPage = async (ctx) => {
    const pageID = Number(ctx.request.body.page_id)
    const text = ctx.request.body.texto
    const title = ctx.request.body.titulo
    const date = ctx.request.body.fecha

    const message = await pageActions.updatePage(pageID, text, title, date)

    ctx.body = message
    return ctx
}

const deletePage = async (ctx) => {
    const pageID = Number(ctx.params.page_id)

    const message = await pageActions.removePage(pageID)

    ctx.body = message
    return ctx
}



module.exports = {
    Init,
    getPages,
    postPage,
    putPage,
    deletePage
}