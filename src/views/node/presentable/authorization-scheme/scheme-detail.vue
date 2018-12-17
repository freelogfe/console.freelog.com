<template>
  <div class="scheme-detail-box">
    <h3 class="scheme-title">授权方案</h3>
    <ul class="tab-box">
      <li
              v-for="(authScheme, index) in authSchemeList"
              :key="'auth-scheme-tab'+ index"
              :class="{
                'active': index === activeAuthSchemeTabIndex,
              }"
              @click="exchnageActiveTab(index)"
      >
        <i
                class="el-icon-circle-check"
                :class="{ 'selected': index === selectedAuthSchemeTabIndex }"
        ></i>
        {{authScheme.authSchemeName}}
      </li>
    </ul>
    <div class="tab-pane">
      <div class="tab-row row-resource" v-if="upcastResourcesArr.length">
        <h3>上抛资源</h3>
        <ul>
          <li
                  v-for="(upcastResource, index) in upcastResourcesArr"
                  :key="'upcastResource'+index"
                  :class="{
                    'selected': index === selectedUpcastResourceIndex,
                    'active-1': upcastResource.selectedAuthSchemeTabIndex !== -1,
                    'active-2': !!upcastResource.isFinishSelectedAuthScheme
                  }"
                  @click="selectUpcastResource(index)"
          >
              <span>{{upcastResource.resourceName}}</span>
              <span class="history-text" v-if="upcastResource.isHasSignHistory"> (存在历史签约)</span>
              <span class="upcast-resource-line" v-if="index === selectedUpcastResourceIndex"></span>
          </li>
        </ul>
      </div>
      <div class="tab-row row-policy">
        <h3>授权策略</h3>
        <div class="policyList">
          <div
                  v-for="(policy, index) in policyList"
                  :key="'policy'+index"
                  class="policy-item"
                  :class="{ 'active': index === curSchemeSelectedPolicyIndex, 'hasHistory': policy.isHasHistory, 'offline': policy.isOffline }"
          >
            <div class="p-item-name" @click="selectPolicyItem(index)">
              <i class="el-icon-circle-check" v-if="index === curSchemeSelectedPolicyIndex"></i>
              <span class="p-item-check" v-if="index !== curSchemeSelectedPolicyIndex"></span>
              {{policy.policyName}}
              <span class="history-text" v-if="policy.isHasHistory">(存在历史签约)</span>
              <span class="offline-text" v-if="policy.isOffline">(存在历史签约/已下架)</span>
            </div>
            <div class="policy-detail">
              <pre class="policy-segment-text">{{fmtPolicyTextList[index]}}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { beautify } from '@freelog/resource-policy-lang'
  import { Message, MessageBox } from 'element-ui'

  export default {
    name: 'scheme-detail',
    components: {},
    data() {
      return {
        selectedUpcastResourceIndex: -1,
        curSchemeSelectedPolicyIndex: -1,
      }
    },
    props: {
      isCanUpdateContract: Boolean,
      currentOpenedResources: Array,
      resourceAuthScheme: Object,
      resourceLevelIndex: Number,
      resourceMap: Object,
      activeAuthSchemeTabIndex: Number,
      selectedAuthSchemeTabIndex: Number,
    },
    methods: {
      // 切换"授权方案"Tab
      exchnageActiveTab(index) {
        if(this.activeAuthSchemeTabIndex !== index) {
          this.$emit('update:activeAuthSchemeTabIndex', index)
        }
        this.$emit('refresh-opened-resource', this.resourceLevelIndex)
      },
      // 选择"上抛资源"
      selectUpcastResource(index) {
        if(this.selectedUpcastResourceIndex !== index) {
          this.selectedUpcastResourceIndex = this.activeScheme.selectedUpcastResourceIndex = index
          this.$emit('show-upcast-resource-scheme', this.upcastResourcesArr[index], this.resourceLevelIndex)
        }
      },
      // 选择"授权策略"
      selectPolicyItem(index) {
        var self = this

        // 存在parentResourceId即为upcastResource，须确认父级资源是否已选中授权方案
        if((this.resourceLevelIndex - 1) >= 0) {
          let { selectedAuthSchemeTabIndex, activeAuthSchemeTabIndex, resourceName, authSchemeList } = this.currentOpenedResources[this.resourceLevelIndex - 1]
          if(selectedAuthSchemeTabIndex === -1) {
            Message.error(`父级资源"${resourceName}"未选中授权方案`)
            return
          }else if(selectedAuthSchemeTabIndex !== activeAuthSchemeTabIndex) {
            var parentResourceActiveScheme = authSchemeList[activeAuthSchemeTabIndex]
            Message.error(`父级资源"${resourceName}"的授权方案"${parentResourceActiveScheme.authSchemeName}"未选中`)
            return
          }
        }

        const { isEffect, msg } = this.isEffectSelectedScheme(index)
        if(isEffect) {
          MessageBox.confirm(msg, {
            callback (action) {
              if(action === 'confirm') {
                self.cancelSomeURSchemeSelection(self.upcastResourcesArr)
                self.exchangePolicyItem(index)
                self.checkIsFinishAllAuth()
              }
            }
          })
        }else {
          self.exchangePolicyItem(index)
          self.checkIsFinishAllAuth()
        }

      },
      // 是否影响原本的"授权方案及策略"的选择
      isEffectSelectedScheme(index) {
        let str = ''
        let isEffect = false

        if(this.activeAuthSchemeTabIndex !== this.selectedAuthSchemeTabIndex && this.selectedAuthSchemeTabIndex !== -1) {
          str = '切换策略'
          isEffect = true
        }else {
          if(this.curSchemeSelectedPolicyIndex === index) {
            if(this.selectedUpcastResourceIndex !== -1 && this.upcastResourcesArr[this.selectedUpcastResourceIndex].selectedAuthSchemeTabIndex !== -1) {
              str = '取消当前选择'
              isEffect = true
            }
          }
        }

        return {
          isEffect, msg: `${str}，将会导致后续资源选择的策略都取消，确定吗？`
        }
      },
      // 取消当前资源 所有下级资源的授权方案选择
      cancelSomeURSchemeSelection(bubbleResources) {
        for(let i = 0; i < bubbleResources.length; i++) {
          const { resourceId } = bubbleResources[i]
          let targResource = this.resourceMap[resourceId]
          if(targResource) {
            const { selectedAuthSchemeTabIndex, authSchemeList } = targResource
            if(selectedAuthSchemeTabIndex !== -1) {
              const { bubbleResources = [] } = authSchemeList[selectedAuthSchemeTabIndex]
              targResource.selectedAuthSchemeTabIndex = -1
              targResource.selectedPolicyIndex = -1
              targResource.isFinishSelectedAuthScheme = false
              this.cancelSomeURSchemeSelection(bubbleResources)
            }
          }
        }
      },
      exchangePolicyItem(index) {
        if(this.curSchemeSelectedPolicyIndex === index) {
          this.curSchemeSelectedPolicyIndex = -1
          this.$emit('update:selectedAuthSchemeTabIndex', -1)
        }else {
          this.curSchemeSelectedPolicyIndex = index
          this.$emit('update:selectedAuthSchemeTabIndex', this.activeAuthSchemeTabIndex)
        }
        this.resourceAuthScheme.selectedPolicyIndex = this.curSchemeSelectedPolicyIndex
      },
      // 是否所有资源（包括上抛资源）都已选择策略，是否可以"更新合同"
      checkIsFinishAllAuth() {
        var leng = this.currentOpenedResources.length
        const tempAuthSchemeData = this.currentOpenedResources[leng - 1]
        const { activeAuthSchemeTabIndex, authSchemeList, selectedAuthSchemeTabIndex } = tempAuthSchemeData
        const { bubbleResources } = authSchemeList[activeAuthSchemeTabIndex]
        var isFinishSelectedAuthScheme = bubbleResources.length === 0 && selectedAuthSchemeTabIndex !== -1
        for(let i = leng - 2; i >= 0; i--) {
          if(this.currentOpenedResources[i].selectedAuthSchemeTabIndex === -1) {
            isFinishSelectedAuthScheme = false
            break
          }
        }
        for(let i = leng - 1; i >= 0; i--) {
          this.currentOpenedResources[i].isFinishSelectedAuthScheme = isFinishSelectedAuthScheme
        }

        this.checkCanUpdateContract()

      },
      // 检测是否能点击"更新合同"
      checkCanUpdateContract() {
        var isCanUpdateContract = true
        const { authSchemeList, selectedAuthSchemeTabIndex } = this.currentOpenedResources[0]
        if(selectedAuthSchemeTabIndex !== -1) {
          const { bubbleResources } = authSchemeList[selectedAuthSchemeTabIndex]
          for(let i = 0; i < bubbleResources.length; i++) {
            const { resourceId } = bubbleResources[i]
            const tempAuthSchemeData = this.resourceMap[resourceId]
            if(tempAuthSchemeData) {
              const { isFinishSelectedAuthScheme } = tempAuthSchemeData
              if(!isFinishSelectedAuthScheme) {
                isCanUpdateContract = false
                break
              }
            }else {
              isCanUpdateContract = false
              break
            }
          }
        }else {
          isCanUpdateContract = false
        }

        this.$emit('update:isCanUpdateContract', isCanUpdateContract)
      }
    },
    computed: {
      authSchemeList() {
        return this.resourceAuthScheme.authSchemeList
      },
      activeScheme() {
        return this.authSchemeList[this.activeAuthSchemeTabIndex]
      },
      upcastResourcesArr() {
        return this.activeScheme.bubbleResources.map(item => {
          const { resourceId } = item
          if(!this.resourceMap[resourceId]) {
            item.selectedAuthSchemeTabIndex = -1
            return item
          }else {
            return this.resourceMap[resourceId]
          }
        })
      },
      policyList() {
        return this.activeScheme.policy
      },
      fmtPolicyTextList() {
        return this.policyList.map(policy => {
          return beautify(policy.policyText)
        })
      },
    },
    watch: {
      currentOpenedResources() {
        this.activeScheme.bubbleResources = this.activeScheme.bubbleResources.slice(0)
      },
      selectedAuthSchemeTabIndex() {
        if(this.activeAuthSchemeTabIndex !== this.selectedAuthSchemeTabIndex) {
          this.curSchemeSelectedPolicyIndex = -1
        }else {
          this.curSchemeSelectedPolicyIndex = this.resourceAuthScheme.selectedPolicyIndex
        }
        this.$emit('refresh-selected-auth-schemes')
      },
      activeScheme() {
        if(this.activeAuthSchemeTabIndex !== this.selectedAuthSchemeTabIndex) {
          this.curSchemeSelectedPolicyIndex = -1
        }else {
          this.curSchemeSelectedPolicyIndex = this.resourceAuthScheme.selectedPolicyIndex
        }
        this.selectedUpcastResourceIndex = typeof this.activeScheme.selectedUpcastResourceIndex === 'undefined' ? -1: this.activeScheme.selectedUpcastResourceIndex
      }
    },
    mounted() {
      this.curSchemeSelectedPolicyIndex = this.resourceAuthScheme.selectedPolicyIndex
      this.selectedUpcastResourceIndex = typeof this.activeScheme.selectedUpcastResourceIndex === 'undefined' ? -1: this.activeScheme.selectedUpcastResourceIndex
    },
  }

</script>

<style lang="less" scoped>
 @import './scheme-detail.less';
</style>

