
export const validateLoginName = function (rule, value, callback) {
  if (value) {
    const EMAIL_REG = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    const PHONE_REG = /^1[34578]\d{9}$/
    if (!EMAIL_REG.test(value) && !PHONE_REG.test(value)) {
      callback(new Error('账号格式有误，输入正确的手机号或邮箱'))
    } else {
      callback()
    }
  } else {
    callback(new Error('账号不能为空'))
  }
}
