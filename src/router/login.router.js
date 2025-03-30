const KoaRouter = require("@koa/router");
const { sign, te, test } = require("../controller/login.controller");
const { verifyLogin, vertifyAuth } = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyLogin, sign);
loginRouter.get("/test", vertifyAuth, test);
module.exports = loginRouter;
