const multer = require("@koa/multer");
const { UPLOAD_PATH } = require("../config/path");

const uploadAvatar = multer({
  //记住这个是在跟目录的
  dest: UPLOAD_PATH,
});

const handleAvatar = uploadAvatar.single("avatar");

module.exports = {
  handleAvatar,
};
