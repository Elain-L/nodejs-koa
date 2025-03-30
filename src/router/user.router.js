const KoaRouter = require("@koa/router");
const { create, showAvatarImage } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" });

// 2.定义路由中映射
// 2.1.用户注册接口
//2.2使用多个中间件，里面依次调用await next()
//先判断密码不能为空，重复，在对密码进行加密，第三个对名字和密码进行存储操作
userRouter.post("/", verifyUser, handlePassword, create);

//2.3获得用户的头像
userRouter.get("/avatar/:userId", showAvatarImage);

// 3.导出路由
module.exports = userRouter;
