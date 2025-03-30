// 1.导入app
const app = require("./app");
const { SERVER_PORT } = require("./config/server");
//导入这个，让里面的代码
require("./utils/handle-error");

// 2.将app启动起来
app.listen(SERVER_PORT, () => {
  console.log("hub的服务器启动成功~");
});
