import {NodeCreationRule} from '@/views/node/create/index'
import {NODE_STATUS} from '@/config/node'

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
    var nodeId = this.$route.params.nodeId
    if (nodeId) {
      this.load(nodeId)
        .then((detail) => {
          detail.statusInfo = NODE_STATUS[detail.status]
          this.detail = detail
        })
    } else {
      this.$message.error('缺少参数nodeId');
    }
  },
  methods: {
    load(param) {
      return this.$services.nodes.get(param || {})
        .then((res) => {
          return res.getData();
        }).catch(this.$error.showErrorMessage)
    },
    updateNodeDetail(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$services.nodes.patch(self.detail.nodeId, self.detail)
            .then((res) => {
            if (res.data.errcode === 0) {
              self.$message.success('节点修改成功')
            } else {
              self.$message.error(res.data.msg)
            }
            }).catch((err) => {
            self.$message.error(err.response.errorMsg || err)
          })
        } else {
          console.error('error submit!!');
          return false;
        }
      });
    },
    backToList() {
      this.$router.push({
        path: `/node/list`,
      })
    }
  }
}
