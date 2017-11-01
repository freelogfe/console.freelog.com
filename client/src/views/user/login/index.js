import {storage} from '@/lib'
import {validateLoginName} from '../validator'

export default {
  name: 'login',

  data() {
    const rules = {
      loginName: [
        {required: true, message: '请输入账号', trigger: 'blur'},
        {validator: validateLoginName, trigger: 'blur'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
      ]
    }

    return {
      model: {
        loginName: storage.get('loginName') || '13530729630',
        password: '123456',
      },
      rules: rules,
      error: null,
      loading: false,
      rememberUser: false
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

        var data = Object.assign(this.model, {
          jwtType: 'header',
          isRememer: this.rememberUser ? 1 : 0
        })

        this.$store.dispatch('userLogin', data)
          .then((userInfo) => {
            storage.set('loginName', data.loginName)
            this.$router.replace(this.$route.query.redirect || '/')
            this.loading = false
          })
          .catch(err => {
            this.error = {title: '发生错误', message: err.response.errorMsg || '出现异常，请稍后再试！'}
            switch (err.response && err.response.status) {
              case 401:
                this.error.message = '用户名或密码错误！'
                break
              case 500:
                this.error.message = '服务器内部异常，请稍后再试！'
                break
            }
            this.loading = false
          })
      })
    }
  }
}
