<template>
  <div class="fl-policy-list-wrap">
    <policy-editor v-for="policy in policyList"
                   :policy="policy"
                   @save="savePolicyHandler"
                   @delete="deletePolicyHandler"></policy-editor>
    <div>
      <el-button type="text" class="add-new-policy-btn" @click="addNewPolicyHandler">
        <span><i class="el-icon-plus"></i>添加新策略</span>
      </el-button>
    </div>
  </div>
</template>


<script>
  import PolicyEditor from '@/components/PolicyEditor/index.vue'

  export default {
    name: 'resource-policy-list',

    data() {
      return {
        policyList: []
      }
    },

    components: {PolicyEditor},

    props: {
      list: Array
    },

    mounted() {
      this.resolveList(this.list)
    },

    watch: {
      list(newVal) {
        this.resolveList(newVal)
      }
    },

    methods: {
      resolveList(list) {
        this.policyList = list.slice(0)

        // if (!this.policyList.length) {
        //   this.addNewPolicyHandler()
        // }
      },
      addNewPolicyHandler() {
        this.policyList.push({
          policyName: '未命名策略',
          policyText: '',
          // disabled: false
        })
      },
      deletePolicyHandler(policy) {
        var list = this.policyList
        for (let i = 0; i < list.length; ++i) {
          let p = list[i]
          if (p === policy) {
            list.splice(i, 1)
            break
          }
        }
      },
      getChangeData(policy) {
        var policies = {
          updatePolicySegments: [],
          addPolicySegments: []
        }
        if (policy.policySegmentId) {
          policies.updatePolicySegments = policies.updatePolicySegments || []
          policies.updatePolicySegments.push({
            policySegmentId: policy.policySegmentId,
            policyName: policy.policyName,
            status: policy.disabled ? 0 : 1
          })
        } else if (policy.policyText) {
          policies.addPolicySegments = policies.addPolicySegments || []
          policies.addPolicySegments.push({
            policyName: policy.policyName,
            policyText: btoa(policy.policyText)
          })
        }
        return {policies}
      },
      savePolicyHandler(policy) {
        this.$emit('save', this.policyList)
        // var payload = this.getChangeData(policy)
        // this.$services.presentables.put(this.$route.params.presentableId, payload)
        //   .then(res => {
        //     const {errcode, ret, msg, data} = res.data
        //     if (errcode === 0 && ret === 0) {
        //       this.resolveList(data.policy)
        //     } else {
        //       this.$error.showErrorMessage(msg)
        //     }
        //   })
      }
    }
  }
</script>

<style lang="less" scoped>
  .fl-policy-list-wrap {
    .add-new-policy-btn {
      color: #333333;
      font-weight: bold;
      font-size: 14px;
      span {
        height: 40px;
        display: flex;
        align-items: center;
        i {
          display: inline-block;
          background-color: #EEEEEE;
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 50%;
          font-size: 25px;
          margin-right: 10px;
        }
      }
    }
  }
</style>