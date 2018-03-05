import FreelogTags from '@/components/Tags/index.vue'
import {manageMembers} from '@/services/groups'

export default {
  name: 'group-detail',
  data() {
    return {
      detail: {},
      groupMembers: []
    }
  },
  components: {FreelogTags},
  mounted() {
    var groupId = this.$route.params.groupId
    if (groupId) {
      this.load(groupId)
        .then((detail) => {
          this.groupMembers = detail.members.map((member)=>{
            return member.memberName || member.memberId
          })
          this.detail = detail
        })
    } else {
      this.$message.error('缺少参数groupId');
    }
  },
  methods: {
    load(param) {
      return this.$services.groups.get(param || {})
        .then((res) => {
          return res.getData();
        }).catch(this.$error.showErrorMessage)
    },
    updateDetail(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          manageMembers(this.$route.params.groupId, {
            members: this.groupMembers
          }) .then((res) => {
            self.$message.success('分组修改成功')
          }).catch((err) => {
            self.$message.error(err.response.errorMsg || err)
          })
        } else {
          console.error('error submit!!');
          return false;
        }
      });
    }
  }
}
