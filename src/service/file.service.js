const connection = require("../app/database");

class FileService {
  //存储照片的逻辑
  async create(fileName, mimetype, size, userId) {
    const statement =
      "INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);";
    const [result] = await connection.execute(statement, [
      fileName,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }

  //通过用户的id查找用户的头像
  async queryAvatarWithUserId(userId) {
    const statement = "SELECT* FROM avatar WHERE user_id = ?;";
    const [result] = await connection.execute(statement, [userId]);
    //拿到最后一条的数据（图像）
    return result[result.length - 1];
  }
}

module.exports = new FileService();
