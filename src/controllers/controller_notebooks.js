const notebookActions = require("../actions/actions_notebook.js")


const Init = async (ctx) => {
    const message = await notebookActions.tableInitializer()
    ctx.body = {"Message": message}
    return ctx
}

const getNotebooks = async (ctx) => {
    const userID = Number(ctx.params.userID)

    const message = await notebookActions.getNotebooksbyUserID(userID) 

    ctx.body = message
    return ctx
}

const postNotebook = async (ctx) => {
    const userID = Number(ctx.request.body.user_id)
    const title = ctx.request.body.titulo
    const color = ctx.request.body.color

    const message = await notebookActions.insertNotebook(userID, title, color)
    
    ctx.body = message
    return ctx
}

const putNotebook = async (ctx) => {
    const notebookID = Number(ctx.request.body.notebook_id)
    const title = ctx.request.body.titulo
    const color = ctx.request.body.color

    const message = await notebookActions.updateNotebook(notebookID, title, color)

    ctx.body = message
    return ctx
}

const deleteNotebook = async (ctx) => {
    const notebookID = Number(ctx.params.notebook_id)

    const message = await notebookActions.removeNotebook(notebookID)

    ctx.body = message
    return ctx
}



module.exports = {
    Init,
    getNotebooks,
    postNotebook,
    putNotebook,
    deleteNotebook
}