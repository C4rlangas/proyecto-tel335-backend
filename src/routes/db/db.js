const dbActions = require("../../actions/db.js")

const Init = (ctx) => {

    const message = dbActions.tableInitializer()

    ctx.body = {"Message": message}
    return ctx
}

module.exports = {
    Init
}