const validateNodeDomain = (rule, value, callback) => {
  if (value) {
    const DOMAIN_REG = /^[a-zA-Z\d-]+$/
    if (value.length < 4 || value.length > 20) {
      callback(new Error('节点域名前缀长度应为4-20字符'))
    } else if (!DOMAIN_REG.test(value)) {
      callback(new Error('节点域名前缀应由数字字母和"-"组成'))
    } else {
      callback()
    }
  } else {
    callback(new Error('节点域名前缀不能为空'))
  }
}

const formRules = {
  nodeName: [{ required: true, message: '节点描述不能为空', trigger: 'blur' },
    {
      min: 4, max: 20, message: '节点描述长度应为4-20字符，不区分大小写', trigger: 'blur'
    }],
  nodeDomain: [{ validator: validateNodeDomain, trigger: 'blur' }]
}

export const NodeCreationRule = formRules
export default {
  name: 'node-creator',
  data() {
    return {
      dataForm: {
        nodeName: '',
        nodeDomain: ''
      },
      formRules
    }
  },
  computed: {
    domainPostfix() {
      return /\.test/.test(window.location.host) ? '.testfreelog.com' : '.freelog.com'
    }
  },
  mounted() {
  },
  methods: {
    goBackHandler() {
      window.history.back()
    },
    createNode() {
      const self = this
      const data = Object.assign({}, self.dataForm)
      data.nodeDomain = data.nodeDomain.toLowerCase()
      self.$services.nodes.post(self.dataForm)
        .then((res) => {
          const responseData = res.data
          if (responseData.errcode !== 0) {
            this.$message.error(responseData.msg)
          } else {
            self.$message.success('节点创建成功')
            this.$store.dispatch('addNode', responseData.data)
            setTimeout(() => {
              self.$router.push({ path: `/node/${responseData.data.nodeId}` })
            }, 1e3)
          }
        })
        .catch(this.$error.showErrorMessage)
    },
    comfirm() {
      return this.$confirm('节点名称和域名一旦创建后不可更改，确定继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          this.comfirm()
            .then(() => {
              this.createNode()
            })
            .catch(() => {
            })
        }
      })
    }
  }
}
