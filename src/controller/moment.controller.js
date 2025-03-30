const momentService = require("../service/moment.service");
const MomentService = require("../service/moment.service");

class MomentController {
  //添加动态
  async create(ctx, next) {
    //1.拿到动态的内容
    const { content } = ctx.request.body;

    //2.判断动态由谁发布
    const { id } = ctx.user;

    //3.动态相关的内容保存到数据库
    const res = await MomentService.create(content, id);
    ctx.body = {
      code: 0,
      message: "发表成功",
      data: res,
    };
  }
  async list(ctx, next) {
    //获取偏移量，大小
    const { offset, size } = ctx.query;
    //数据库里面查询动态列表
    const result = await momentService.queryList(offset, size);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  //获取具体的动态
  async detail(ctx, next) {
    const { momentId } = ctx.params;
    //根据id获取动态唉
    const result = await momentService.queryById(momentId);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async remove(ctx, next) {
    //获得删除的评论的id
    const { momentId } = ctx.params;
    //判断评论id是否存在
    if (momentService.queryMomentId(momentId)) {
      const res = await momentService.remove(momentId);
      ctx.body = {
        code: 0,
        message: "删除成功",
        res,
      };
    } else {
      ctx.body = {
        code: -1,
        message: "评论不存在",
      };
    }
  }
  //更新动态
  async update(ctx, next) {
    const { momentId } = ctx.params;
    //拿到修改的内容
    const { content } = ctx.request.body;
    //执行sql语句
    const res = await momentService.update(content, momentId);
    ctx.body = {
      code: 0,
      message: "修改成功",
      res,
    };
  }

  //为moment，添加label
  async addLabels(ctx, next) {
    //1.获取上一步处理后的参数
    const labels = ctx.labels;
    const { momentId } = ctx.params;
    try {
      //2.将moment_id和和label_id建立联系
      for (const label of labels) {
        //2.1 判断label_id是否存在于moment
        const isExists = await momentService.hasLabel(momentId, label.id);
        if (!isExists) {
          //不存在的话，直接插入两个id
          const res = await momentService.addLabel(momentId, label.id);
        } else {
          continue;
        }
      }
      ctx.body = {
        code: 0,
        message: "添加列表成功",
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: -1,
        message: "添加列表失败",
      };
    }
  }
}

module.exports = new MomentController();
