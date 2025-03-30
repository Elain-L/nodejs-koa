const connection = require("../app/database");

class MomentService {
  //创建评论
  async create(content, userId) {
    const statement = "INSERT INTO moment (content,user_id) VALUE (?,?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  //查询列表
  //新增显示评论个数
  //显示标签个数
  //对应用户的头像
  async queryList(offset = 0, size = 5) {
    const statement = `SELECT 
	  m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
	  JSON_OBJECT('id', u.id, 'name', u.name,"avatarURL",u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
	  (SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount,
		(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
    FROM moment m
    LEFT JOIN user u ON u.id = m.user_id
    LIMIT 10 OFFSET 0;`;
    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }
  //新增
  //查询具体动态的时候显示label对象
  //对应用户的头像
  async queryById(momentId) {
    const statement = `SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, "avatarURL",u.avatar_url,'createTime', u.createAt, 'updateTime', u.updateAt) user,
				(
					SELECT 
						JSON_ARRAYAGG(JSON_OBJECT(
							"id",c.id,"content",c.content,"commentId",c.comment_id,
							"user",JSON_OBJECT("id",cu.id,"name",cu.name,"avatarURL",u.avatar_url)
						))
					FROM comment c
					LEFT JOIN user cu ON c.user_id = cu.id
					WHERE c.moment_id = m.id
				) comments,
        (
					JSON_ARRAYAGG(JSON_OBJECT(
						"id",l.id,"name",l.name
					))
        ) labels
        FROM moment m
        LEFT JOIN user u ON u.id = m.user_id
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
				LEFT JOIN label l ON ml.label_id = l.id
        WHERE m.id = ?
        GROUP BY m.id`;
    const [result] = await connection.execute(statement, [String(momentId)]);
    return result;
  }
  //删除前查找动态的id是否存在
  async queryMomentId(momentId) {
    const statement = "SELECT * FROM moment WHERE moment.id = ?;";
    const [result] = await connection.execute(statement, [momentId]);
    return !!result;
  }
  //删除
  async remove(momentId) {
    const statement = "DELETE FROM moment WHERE id = ?;";
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  //更新
  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  //查找里面动态和标签是否存在关系
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);

    return !!result.length;
  }

  //建立联系
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id ) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);

    return result;
  }
}

module.exports = new MomentService();
