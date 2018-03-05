import FreelogTags from '@/components/Tags/index.vue'

const validateMembers = (rule, value, callback) => {
  if (value && value.length) {
    callback()
  } else {
    callback(new Error('分组成员至少含有一个成员'));
  }
};

const formRules = {
  groupName: [{required: true, message: '分组描述不能为空', trigger: 'blur'},
    {min: 4, max: 20, message: '分组描述长度应为4-20字符', trigger: 'blur'}],
  members: [{validator: validateMembers, trigger: 'manual'}],
  groupType: [{required: true, message: '分组类型不能为空', trigger: 'blur'}]
}

export default {
  name: 'group-creator',
  data() {
    return {
      formRules: formRules,
      options: [{
        value: '1',
        label: '用户分组'
      }, {
        value: '2',
        label: '节点分组'
      }],
      detail: {
        groupName: '',
        members: [],
        groupType: ''
      }
    }
  },
  components: {FreelogTags},
  mounted() {
  },
  methods: {
    goBackHandler() {
      history.back()
    },
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$services.groups.post(self.detail)
            .then((res) => {
              var data = res.getData();
              if (!data) {
                this.$message.error(res.data.msg)
              } else {
                self.$message.success('分组创建成功')
                setTimeout(() => {
                  self.$router.push({path: '/group/list'})
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
