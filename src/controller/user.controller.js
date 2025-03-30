const fs = require("fs");

const { queryAvatarWithUserId } = require("../service/file.service");
const userService = require("../service/user.service");
const { UPLOAD_PATH } = require("../config/path");

class UserController {
  async create(ctx, next) {
    // 1.获取用户传递过来信息
    const user = ctx.request.body;

    // 2.将user信息存储到数据库中
    const result = await userService.create(user);

    // 3.查看存储的结果, 告知前端创建成功
    ctx.body = {
      message: "创建用户成功~",
      data: result,
    };
  }

  //展示用户图像的逻辑
  async showAvatarImage(ctx, next) {
    try {
      //1.获取用户的id

      const { userId } = ctx.params;

      //2.获取userId对应的头像信息
      const avatarInfo = await queryAvatarWithUserId(userId);

      //3.读取头像所在的文件

      const { filename, mimetype } = avatarInfo;

      //4.返回并且告知类型
      ctx.type = mimetype;
      ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`); //如果不指定类型的话，他会在浏览器上当成文件下载下来，告知是图片就会显示出来。
    } catch (error) {
      ctx.body = "图片信息错误";
      console.log(error);
    }
  }
}

module.exports = new UserController();
