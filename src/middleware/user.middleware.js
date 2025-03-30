const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
//用户输入的验证
const verifyUser = async (ctx, next) => {
  // 验证客户端传递过来的user是否可以保存到数据库中
  // 1.验证用户名和密码是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    //发送事件，然后将ctx传入，在错误里面用于发送错误信息
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 2.判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 3.执行下一个中间件，这里一定是，异步，要不然回不来。
  await next();
};
//用户密码的加密
const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body;

  // 2.对密码进行加密，放到body里面的password，这里body被之前的中间件处理，即是request的body
  ctx.request.body.password = md5password(password);

  // 3.执行下一个中间件
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
