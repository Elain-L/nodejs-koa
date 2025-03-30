const fs = require("fs");
const path = require("path");
//默认情况，使用相对路径，是node服务启动的目录
//    "start": "nodemon ./src/main.js"
//所以是根目录
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "./keys/private_key.pem")
);
const publickey = fs.readFileSync("./src/config/keys/public_key.pem");

module.exports = {
  privateKey,
  publickey,
};
