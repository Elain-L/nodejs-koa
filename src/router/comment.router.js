const KoaRouter = require("@koa/router");
const { vertifyAuth } = require("../middleware/login.middleware");
const { create, reply } = require("../controller/comment.controller");

const commentRouter = new KoaRouter({ prefix: "/comment" });
commentRouter.post("/", vertifyAuth, create);
commentRouter.post("/reply", vertifyAuth, reply);
module.exports = commentRouter;
