const { create } = require("../service/label.service");

class LableController {
  async create(ctx, next) {
    //1.获取标签的名称
    const { name } = ctx.request.body;

    //2.操作数据库，存储name
    const res = await create(name);
    console.log(name);
    ctx.body = {
      code: 0,
      message: "创建成功，O(∩_∩)O~~",
      res,
    };
  }

  async list(ctx, next) {
    ctx.body = "标签列表";
  }
}

module.exports = new LableController();
