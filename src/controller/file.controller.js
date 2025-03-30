const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { SERVER_PORT, SERVER_HOST } = require("../config/server");

class FileController {
  //上传文件并且保存下来
  //同时给user字段更新图像地址
  async create(ctx, next) {
    //1.拿到对应的信息
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    //console.log(filename, mimetype, size, id);
    //2.将本次的图片信息和user_id存储起来
    const res = await fileService.create(filename, mimetype, size, id);
    //2.1更新图像地址
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`;
    try {
      const res2 = await userService.updateUserAvatar(avatarUrl, id);
    } catch (error) {
      ctx.body = "错误";
    }
    //3.返回结果
    ctx.body = {
      code: 0,
      message: "图片上传成功",
      data: avatarUrl,
    };
  }
}

module.exports = new FileController();
