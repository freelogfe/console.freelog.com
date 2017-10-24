
export const validateLoginName = function(rule, value, callback) {
  if (value) {
    const EMAIL_REG = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}/
    const PHONE_REG = /1[3|5|7|8|][0-9]{9}/
    if (!EMAIL_REG.test(value) && !PHONE_REG.test(value)) {
      callback(new Error('账号格式有误，输入正确的手机号或邮箱'));
    } else {
      callback()
    }
  } else {
    callback(new Error('账号不能为空'));
  }
};
