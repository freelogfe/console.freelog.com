import {storage} from '@/lib'

export default {
  name: 'login',

  data() {
    const model = storage.get('accountInfo') || {
      userName: 'yuliang',
      passWord: '123456'
    };

    // form validate rules
    const rules = {
      userName: [
        {required: true, message: '请输入用户名'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符'}
      ],
      passWord: [
        {required: true, message: '请输入密码'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符'}
      ]
    }

    return {
      model: model,
      rules: rules,
      error: null,
      loading: false,
      checked: true
    }
  },

  methods: {
    rememberPasswordHandler(checked) {
      if (checked) {
        storage.set('accountInfo', this.model);
      } else {
        storage.remove('accountInfo');
      }
    },
    submit(ref) {
      this.$refs[ref].validate(valid => {
        if (!valid) {
          return false
        }

        this.error = null
        this.loading = true

        this.$store.dispatch('userLogin', this.model)
          .then(token => {
            this.$router.replace({path: this.$route.query.redirect || '/'})
            this.loading = false
            this.rememberPasswordHandler(this.checked)
          })
          .catch(err => {
            console.error(err)
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
