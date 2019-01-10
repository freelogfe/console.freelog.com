<template>
  <el-dialog
          class="s-c-dialog"
          title="提示"
          :visible="visible"
          width="800px"
          center
          :show-close="false"
          append-to-body
  >
    <div class="resolved-duty-statements" v-show="resolvedDutyStatements.length">
      <h3>使用依赖资源需要与以下资源签约，请确认</h3>
      <el-table
              :data="resolvedDutyStatements"
              stripe
              style="width: 100%"
      >
        <el-table-column prop="resourceName" label="资源名称" width="350"></el-table-column>
        <el-table-column prop="authSchemeName" label="授权方案"></el-table-column>
        <el-table-column prop="policyName" label="授权策略"></el-table-column>
      </el-table>
    </div>
    <div class="resolved-bubble-resources" v-show="false">
      <h3>上抛以下资源，请确认</h3>
      <ul>
        <li
                v-for="(item, index) in resolvedBubbleResources"
                :key="'r-b-r-' + index"
        >
          <span class="r-b-r-i-reousrce-name">{{item.resourceName}}</span>
        </li>
      </ul>
    </div>
    <div class="no-resolved-duty-statements" v-if="resolvedDutyStatements.length === 0">
      当前方案选择不处理依赖资源，是否确认签约？
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancel-btn" @click="hideDialog">取消</el-button>
      <el-button class="sign-btn" type="primary" @click="signContract">签约</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { Message } from 'element-ui'
  export default {
    name: 'scheme-sign-dialog',
    props: {
      resolvedDutyStatements: {
        type: Array,
        default: function() {
          return []
        }
      },
      resolvedBubbleResources: {
        type: Array,
        default: function() {
          return []
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
      authType: String,
      presentableId: String,
      authSchemeId: String
    },
    methods: {
      hideDialog() {
        this.$emit('update:visible', false)
      },
      getPresentableSignData() {
        const data = this.resolvedDutyStatements.map(item => {
          const { resourceId, authSchemeId, segmentId, contractId = '' } = item
          if(contractId && contractId !== '') {
            return { resourceId, authSchemeId, policySegmentId: segmentId, contractId }
          }else {
            return { resourceId, authSchemeId, policySegmentId: segmentId }
          }
        })
        return data
      },
      getResourceSignData() {
        const data = {
          dutyStatements: this.resolvedDutyStatements.map(item => {
            const { resourceId, authSchemeId, policySegmentId } = item
            return { resourceId, authSchemeId, policySegmentId }
          }),
          bubbleResources: this.resolvedBubbleResources.map(item => {
            return { resourceId: item.resourceId }
          })
        }
        return data
      },
      signContract() {
        switch (this.authType) {
          case 'presentable': {
            this.$axios.put(`/v1/presentables/${this.presentableId}`, {
              contracts: this.getPresentableSignData()
            })
              .then(res => res.data)
              .then(res => {
                if(res.errcode === 0) {
                  this.hideDialog()
                  this.$emit('done', res.data)
                }else {
                  Message.error(res.msg)
                }
              })
            break
          }
          case 'resource': {
            this.$axios.put(`/v1/resources/authSchemes/${this.authSchemeId}/batchSignContracts`, this.getResourceSignData())
              .then(res => res.data)
              .then(res => {
                if (res.errcode === 0) {
                  this.hideDialog()
                  this.$emit('done', res.data)
                } else {
                  Message.error(res.msg)
                }
              })
            break
          }
          default: {}
        }

      }
    },
  }
</script>