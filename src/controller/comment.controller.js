const commentService = require("../service/comment.service");

class CommentController {
  //评论
  async create(ctx, next) {
    //1.拿到body的参数
    const { content, momentId } = ctx.request.body;
    //拿到用户的id
    const { id } = ctx.user;
    //2.操作数据库
    try {
      const res = await commentService.create(content, momentId, id);
      ctx.body = {
        code: 0,
        message: "发表成功，O(∩_∩)O~~",
        // data: res,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: -1,
        message: "发布失败",
      };
    }
  }
  //回复评论
  async reply(ctx, next) {
    try {
      const { content, momentId, commentId } = ctx.request.body;
      const { id } = ctx.user;

      const result = await commentService.reply(
        content,
        momentId,
        commentId,
        id
      );
      ctx.body = {
        code: 0,
        message: "回复成功啦，O(∩_∩)O~~",
        result,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        message: "可恶回复失败了，(〃＞皿＜)",
      };
    }
  }
}

module.exports = new CommentController();
