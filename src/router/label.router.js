const KoaRouter = require("@koa/router");
const { vertifyAuth } = require("../middleware/login.middleware");
const { create, list } = require("../controller/label.controller");
const labelRouter = new KoaRouter({ prefix: "/label" });

labelRouter.post("/", vertifyAuth, create);
labelRouter.get("/list", vertifyAuth, list);

module.exports = labelRouter;
