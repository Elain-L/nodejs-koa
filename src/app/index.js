const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/user.router");
const loginRouter = require("../router/login.router");
const { registerRouter } = require("../router/index");
// 1.创建app
const app = new Koa();

// 2.对app使用中间件
app.use(bodyParser());
//自动导入
registerRouter(app);

// 3.将app导出
module.exports = app;
