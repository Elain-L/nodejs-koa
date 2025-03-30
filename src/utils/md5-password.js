const crypto = require("crypto");
//md5加密
function md5password(password) {
  const md5 = crypto.createHash("md5");
  //加密之后，转化为16进制digest("hex")
  const md5pwd = md5.update(password).digest("hex");

  return md5pwd;
}

module.exports = md5password;
