const jwt = require("jsonwebtoken");
const { privateKey } = require("../config/screct");

class LoginController {
  //签名的颁发
  sign(ctx, next) {
    const { id, name } = ctx.user;
    //4.颁发令牌
    const token = jwt.sign({ id, name }, privateKey, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token,
      },
    };
  }

  test(ctx, next) {
    ctx.body = "验证通过-";
  }
}

module.exports = new LoginController();
