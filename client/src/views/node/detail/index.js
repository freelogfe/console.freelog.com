import {NodeCreationRule} from '@/views/node/create/index'

export default {
  name: 'node-detail',
  data() {
    return {
      detail: {},
      rules: {
        nodeName: NodeCreationRule.nodeName
      }
    }
  },

  mounted() {
    if (this.$route.query.nodeId) {
      this.load(this.$route.query.nodeId)
    } else {
      this.$message.error('缺少参数resourceId');
    }
  },
  methods: {
    load(param) {
      return this.$services.nodes.get(param || {})
        .then((res) => {
          var data = res.data
          if (data.ret === 0) {
            this.detail = data.data
            return data.data;
          } else {
            this.$message.error(data.msg);
          }
        })
    },
    updateNodeDetail(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$services.nodes.patch(self.detail.nodeId, self.detail)
            .then((res) => {
              var data = res.data;
              if (data.ret === 0) {
                self.$message.success('节点修改成功')
              } else {
                self.$message.error(data.msg)
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
