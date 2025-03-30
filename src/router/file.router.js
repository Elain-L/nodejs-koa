const KoaRouter = require("@koa/router");

const { vertifyAuth } = require("../middleware/login.middleware");
const { handleAvatar } = require("../middleware/file.middleware");
const { create } = require("../controller/file.controller");

const fileRouter = new KoaRouter({ prefix: "/file" });

fileRouter.post("/avatar", vertifyAuth, handleAvatar, create);
module.exports = fileRouter;
