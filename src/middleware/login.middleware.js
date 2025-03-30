const jwt = require("jsonwebtoken");

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHOTIZATION,
} = require("../config/error");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const { publickey } = require("../config/screct");
//用户输入账号的使用
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //1.用户或者密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  //2.用户是否存在
  const users = await userService.findUserByName(name);
  //拿到是一个数组，第一个是name
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  //3.查询数据库看密码是否一样
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  ctx.user = user;
  await next();
};
//用户token的验证
const vertifyAuth = async (ctx, next) => {
  //1.获取token
  const authorization = ctx.headers.authorization;
  //如果验证没有值，直接返回
  // console.log(authorization);
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHOTIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  //2.验证token是否有效
  try {
    const res = jwt.verify(token, publickey, {
      algorithms: ["RS256"],
    });
    ctx.user = res;

    //验证通过之后，调用下一个中间件的操作
    await next();
  } catch (error) {
    return ctx.app.emit("error", UNAUTHOTIZATION, ctx);
  }
};
module.exports = { verifyLogin, vertifyAuth };
