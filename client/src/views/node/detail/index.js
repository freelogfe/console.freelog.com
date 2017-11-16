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
          return (this.detail = res.getData());
        }).catch((err) => {
          this.$message.error(err.response.errorMsg || err)
        })
    },
    updateNodeDetail(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$services.nodes.patch(self.detail.nodeId, self.detail)
            .then((res) => {
              self.$message.success('节点修改成功')
            }).catch((err) => {
            self.$message.error(err.response.errorMsg || err)
          })
        } else {
          console.error('error submit!!');
          return false;
        }
      });
    },
    backToList () {
      this.$router.push({
        path: `/node/list`,
      })
    }
  }
}
