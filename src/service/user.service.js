const connection = require("../app/database");

class UserService {
  async create(user) {
    // 1.获取用户 user
    const { name, password } = user;

    // 2.拼接statement
    const statement = "INSERT INTO `user` (name, password) VALUES (?, ?);";

    // 3.执行sql语句
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }
  //查找用户是否存在表中
  async findUserByName(name) {
    const statement = "SELECT * FROM `user` WHERE name = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }

  //用户上传头像时，添加到表中
  async updateUserAvatar(avatarUrl, userId) {
    const statement = "UPDATE `user` SET avatar_url = ? WHERE id= ?;";
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
