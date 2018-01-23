const validateNodeDomain = (rule, value, callback) => {
  if (value) {
    const DOMAIN_REG = /^[a-zA-Z\d\-]+$/
    if (value.length < 4 || value.length > 20) {
      callback(new Error('节点域名前缀长度应为4-20字符'));
    } else if (!DOMAIN_REG.test(value)) {
      callback(new Error('节点域名前缀应由数字字母和"-"组成'));
    } else {
      callback()
    }
  } else {
    callback(new Error('节点域名前缀不能为空'));
  }
};

const formRules = {
  nodeName: [{required: true, message: '节点描述不能为空', trigger: 'blur'},
    {min: 4, max: 20, message: '节点描述长度应为4-20字符，不区分大小写', trigger: 'blur'}],
  nodeDomain: [{validator: validateNodeDomain, trigger: 'blur'}]
}

export const NodeCreationRule = formRules;
export default {
  name: 'node-creator',
  data() {

    return {
      dataForm: {
        nodeName: '',
        nodeDomain: ''
      },
      formRules: formRules
    }
  },
  mounted() {
  },
  methods: {
    goBackHandler(){
      history.back()
    },
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          var data = Object.assign({}, self.dataForm)
          data.nodeDomain = data.nodeDomain.toLowerCase()
          self.$services.nodes.post(self.dataForm)
            .then((res) => {
              var data = res.getData();
              if (!data) {
                this.$message.error(res.data.msg)
              } else {
                self.$message.success('节点创建成功')
                setTimeout(() => {
                  self.$router.push({path: '/node/list'})
                }, 1e3)
              }
            })
            .catch(this.$error.showErrorMessage)
        } else {
          return false;
        }
      });
    }
  }
}
