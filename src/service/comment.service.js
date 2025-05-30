const connection = require("../app/database");

class CommentService {
  async create(content, momentId, userId) {
    const statement =
      "INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);";
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    console.log(result);
    return result;
  }
  async reply(content, momentId, commentId, userId) {
    const statement =
      "INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?,?,?, ?);";
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      commentId,
      userId,
    ]);
    console.log(result);
    return result;
  }
}

module.exports = new CommentService();
