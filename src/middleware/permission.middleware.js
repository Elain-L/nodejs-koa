const { OPERATION_IS_NOT_ALLOWED } = require("../config/error");
const permissionServer = require("../service/permission.server");

//
const verifyMomentPermission = async (ctx, next) => {
  //1.获取登录的用户id和被修改内容的发布者的id
  //因为修改的时候，查询的是moment的表里面的id，不限制user_id
  const { momentId } = ctx.params;
  const { id } = ctx.user;
  //查询user的id是否有修改momentId的权限
  const isPermission = await permissionServer.checkMoment(momentId, id);
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }

  //有权限执行下一个中间件
  await next();
};
const verifyPermission = async (ctx, next) => {
  //获取资源的名称（  "/list/:momentId",），就是这个号id前面的moment，用来限制表的查询
  //ctx.params拿到的是{momentId：321}

  //[momentId]
  const keys = Object.keys(ctx.params);

  //获得params的名字
  const keyName = keys[0];

  //获得对应资源的id
  const resourceId = ctx.params[keyName];
  //获得名字
  const resourceName = keyName.replace(/Id$/g, "");

  const { id } = ctx.user;

  const isPermission = await permissionServer.checkResouce(
    resourceName,
    resourceId,
    id
  );
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }

  await next();
};

module.exports = {
  verifyMomentPermission,
  verifyPermission,
};
