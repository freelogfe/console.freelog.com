import {storage} from '@/lib'
import {validateLoginName} from '../validator'


export default {
  name: 'signup',

  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.model.checkPassword !== '') {
          this.$refs.signupForm.validateField('checkPassword');
        }
        callback();
      }
    };

    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.model.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    const rules = {
      loginName: [
        {required: true, message: '请输入账号名', trigger: 'blur'},
        {validator: validateLoginName, trigger: 'blur'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
      ],
      nickname: [
        {required: true, message: '请输入昵称', trigger: 'blur'},
        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {validator: validatePassword, trigger: 'blur'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
      ],
      checkPassword: [
        {required: true, message: '请输入确认密码', trigger: 'blur'},
        {validator: validateCheckPassword, trigger: 'blur'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
      ]
    }

    var model = storage.get('signupForm') || {
      loginName: '',
      nickname: '',
      password: '',
      checkPassword: ''
    };
    return {
      model: model,
      rules: rules,
      error: null,
      loading: false,
      logining: false,
    }
  },

  methods: {
    login() {
      var self = this;
      var isNewPage = /^(https?)?\/\//.test(self.$route.query.redirect)
      var data = {
        loginName: this.model.loginName,
        password: this.model.password,
        jwtType: isNewPage ? 'cookie' : 'header'
      }

      self.logining = true
      this.$store.dispatch('userLogin', data)
        .then(() => {
          storage.set('loginName', data.loginName)
          if (isNewPage) {
            location.replace(self.$route.query.redirect)
          } else {
            self.$router.replace(self.$route.query.redirect || '/node/list')
          }
        })
        .catch(_ => {
          self.logining = false
        })
    },
    submit(ref) {
      storage.set('signupForm', this.model)
      if (this.loading) {
        return
      }

      this.$refs[ref].validate(valid => {
        if (!valid) {
          return false
        }

        this.error = null
        this.loading = true

        var data = {}

        Object.keys(this.model).forEach((key) => {
          (key !== 'checkPassword') && (data[key] = this.model[key])
        })

        this.$services.user.post(data)
          .then(res => {
            if (res.data.errcode === 0) {
              this.$message.success('注册成功')
              this.login()
            } else {
              this.$message.error(res.data.msg)
            }
            this.loading = false
          })
          .catch(err => {
            this.error = {title: '发生错误', message: '出现异常，请稍后再试！'}
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
