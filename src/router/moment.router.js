const KoaRouter = require("@koa/router");
const { vertifyAuth } = require("../middleware/login.middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const {
  verifyMomentPermission,
  verifyPermission,
} = require("../middleware/permission.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });
momentRouter.post("/", vertifyAuth, create);
//查找动态
momentRouter.get("/list", list);
momentRouter.get("/list/:momentId", detail);
//删除动态
momentRouter.delete(
  "/list/:momentId",
  vertifyAuth,
  verifyPermission,
  //verifyMomentPermission,
  remove
);
//修改动态
//先验证身份，在进行修改
momentRouter.patch(
  "/list/:momentId",
  verifyMomentPermission,
  vertifyAuth,
  update
);

//给对应动态添加标签
momentRouter.post(
  "/:momentId/labels",
  vertifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);
module.exports = momentRouter;
