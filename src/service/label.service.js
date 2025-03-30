const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = "INSERT INTO label (name) VALUE (?);";
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  async queryLabelByname(name) {
    const statement = "SELECT * FROM label WHERE label.name = ?;";
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();
