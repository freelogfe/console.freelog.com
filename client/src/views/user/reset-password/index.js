import {storage} from '@/lib'
import {isSafeUrl} from '@/lib/security'
import {validateLoginName} from '../validator'

export default {
  name: 'reset-password',

  data() {
    // form validate rules
    const rules = {
      loginName: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {validator: validateLoginName, trigger: 'blur'}
      ],
      verifyCode: [
        {required: true, message: '请输入验证码', trigger: 'blur'}
      ]
    }

    return {
      model: {
        loginName: '',
        // verifyCode: '',
        password: ''
      },
      rules: rules,
      error: null,
      loading: false
    }
  },

  methods: {
    submit(ref) {
      this.$refs[ref].validate(valid => {
        if (!valid) {
          return false
        }

        this.error = null
        this.loading = true

        this.$services.other.resetPassword(this.model).then((res) => {
          if (res.data.errcode === 0) {
            var redirect = this.$route.query.redirect;
            if (!redirect || !isSafeUrl(redirect)) {
              redirect = '/'
            }
            this.$router.replace(redirect)
          } else {
            this.error = {title: '', message: res.data.msg}
          }
          this.loading = false
        }).catch(err => {
          this.loading = false
          this.error = {title: '发生错误', message: '出现异常，请稍后再试！'}



          switch (err.response && err.response.status) {
            case 401:
              this.error.message = '用户名或密码错误！'
              break
            case 500:
              this.error.message = '服务器内部异常，请稍后再试！'
              break
          }
        });
      })
    }
  }
}
