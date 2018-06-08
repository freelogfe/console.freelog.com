import {storage} from '@/lib'
import {validateLoginName} from '../validator'
import {isSafeUrl} from '@/lib/security'

export default {
  name: 'login',

  data() {
    const rules = {
      loginName: [
        {required: true, message: '请输入账号', trigger: 'blur'},
        {validator: validateLoginName, trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, message: '长度至少6个字符', trigger: 'blur'}
      ]
    }

    return {
      model: {
        loginName: storage.get('loginName') || '',
        password: '',
      },
      signUpLink: '/user/signup',
      rules: rules,
      error: null,
      loading: false,
      rememberUser: false
    }
  },
  mounted() {
    var redirect = this.$route.query.redirect;
    if (isSafeUrl(redirect)) {
      this.signUpLink += `?redirect=${redirect}`
    }
  },

  methods: {
    submit(ref) {
      var self = this;
      this.$refs[ref].validate(valid => {
        if (!valid) {
          return false
        }

        this.error = null
        this.loading = true

        var data = Object.assign(this.model, {
          // jwtType: 'header',
          isRememer: this.rememberUser ? 1 : 0
        })

        this.$store.dispatch('userLogin', data)
          .then((userInfo) => {
            storage.set('loginName', data.loginName)
            var redirect = this.$route.query.redirect;
            if (isSafeUrl(redirect)) {
              location.replace(redirect)
              // self.$router.replace(redirect)
            } else {
              self.$router.replace('/')
            }
            self.loading = false
          })
          .catch(err => {
            console.log(err)
            if (typeof err === 'string') {
              self.error = {title: '', message: err}
            } else {
              self.error = {title: '发生错误', message: err.response.errorMsg || '出现异常，请稍后再试！'}
              switch (err.response && err.response.status) {
                case 401:
                  self.error.message = '用户名或密码错误！'
                  break
                case 500:
                  self.error.message = '服务器内部异常，请稍后再试！'
                  break
              }
            }
            self.loading = false
          })
      })
    }
  }
}
