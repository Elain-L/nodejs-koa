const NAME_OR_PASSWORD_IS_REQUIRED = "name_or_password_is_required";
const NAME_IS_ALREADY_EXISTS = "name_is_already_exists";
const NAME_IS_NOT_EXISTS = "name_is_not_exists";
const PASSWORD_IS_INCORRENT = "password_is_incorrent";
const UNAUTHOTIZATION = "unauthorization";
const OPERATION_IS_NOT_ALLOWED = "operation_is_not_allowed";
//错误常量，用于在服务器里面，中间件里面，发送不同的常量，来判断不同的错误
module.exports = {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHOTIZATION,
  OPERATION_IS_NOT_ALLOWED,
};
