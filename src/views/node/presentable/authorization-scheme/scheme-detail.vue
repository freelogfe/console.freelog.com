<template>
  <div class="scheme-detail-box">
    <h3 class="scheme-title">授权方案</h3>
    <ul class="tab-box">
      <li
              v-for="(authScheme, index) in authSchemeList"
              :key="'auth-scheme-tab'+ index"
              :class="{ 'active': index === activeAuthSchemeTabIndex }"
              @click="exchangeTab(index)"
      >
        <i
                class="el-icon-circle-check"
                :class="{ 'selected': index === resourceAuthScheme.selectedAuthSchemeTabIndex }"
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
                  :class="{ 'selected': index === selectedUpcastResourceIndex }"
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
                  :class="{ 'active': index === selectedPolicyIndex, 'hasHistory': policy.isHasHistory, 'offline': policy.isOffline }"
          >
            <div class="p-item-name" @click="selectPolicyItem(index)">
              <i class="el-icon-circle-check" v-if="index === selectedPolicyIndex"></i>
              <span class="p-item-check" v-if="index !== selectedPolicyIndex"></span>
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
        activeAuthSchemeTabIndex: 0,
        selectedUpcastResourceIndex: -1,
        selectedPolicyIndex: -1,
      }
    },
    props: {
      resourceAuthScheme: Object,
      resourceLevelIndex: Number,
      upcastResourceAuthSchemeMap: Object,
      upcastResourceIDs: Array,
    },
    methods: {
      // 切换"授权方案"
      exchangeTab(index) {
        if(this.activeAuthSchemeTabIndex !== index) {
          this.selectedUpcastResourceIndex = -1
          this.activeAuthSchemeTabIndex = index
          this.$emit('refresh-upcast-resourceIDs', this.resourceLevelIndex)
        }
        if(this.resourceAuthScheme.selectedAuthSchemeTabIndex === index) {
          this.selectedPolicyIndex = typeof this.selectedScheme.selectedPolicyIndex === 'undefined' ? -1 : this.selectedScheme.selectedPolicyIndex
        }else {
          this.selectedPolicyIndex = -1
        }
      },
      // 选择"上抛资源"
      selectUpcastResource(index) {
        this.$emit('show-upcast-resource-scheme', this.upcastResourcesArr[index], this.resourceLevelIndex)
        this.selectedUpcastResourceIndex = index
      },
      // 选择"授权策略"
      selectPolicyItem(index) {
        var self = this
        // 存在parentResourceId即为upcastResource，须确认父级资源是否已选中授权方案
        if(this.parentResourceScheme && this.parentResourceScheme.selectedAuthSchemeTabIndex === -1) {
          Message.error(`父级资源"${this.parentResourceScheme.resourceName}"未选中授权方案`)
          return
        }

        //
        if(this.checkURIsSelectedScheme()) {
          let str = this.selectedPolicyIndex === index ? '取消当前选择' : '切换策略'
          MessageBox.confirm(`${str}，将会导致后续资源选择的策略都取消，确定吗？`, {
            callback (action) {
              if(action === 'confirm') {
                self.cancelSomeURSchemeSelection()
                self.exchangePolicy(index)
              }
            }
          })
        }else {
          this.exchangePolicy(index)
        }
      },
      checkURIsSelectedScheme() {
        var nextUpastResourceId = this.upcastResourceIDs[this.resourceLevelIndex]
        if(nextUpastResourceId) {
          return this.upcastResourceAuthSchemeMap[nextUpastResourceId].selectedAuthSchemeTabIndex !== -1
        }else {
          return false
        }
      },
      // 取消当前资源 所有下级资源的授权方案选择
      cancelSomeURSchemeSelection() {
        this.upcastResourceIDs.slice(this.resourceLevelIndex)
          .forEach(resourceId => {
            this.upcastResourceAuthSchemeMap[resourceId].selectedAuthSchemeTabIndex = -1
          })
        this.$emit('rerender')
      },
      // 切换选中的"授权方案"
      exchangeSelectedScheme() {
        var selectedAuthSchemeTabIndex = -1
        if(this.selectedPolicyIndex !== -1) {
          selectedAuthSchemeTabIndex = this.activeAuthSchemeTabIndex
        }

        this.resourceAuthScheme.selectedAuthSchemeTabIndex = selectedAuthSchemeTabIndex
      },
      exchangePolicy(index) {
        if(this.selectedPolicyIndex === index) {
          this.selectedPolicyIndex = -1
        }else {
          this.selectedPolicyIndex = index
        }
        this.selectedScheme.selectedPolicyIndex = this.selectedPolicyIndex
        this.exchangeSelectedScheme()
      },
    },
    computed: {
      authSchemeList() {
        return this.resourceAuthScheme.authSchemeList
      },
      parentResourceScheme() {
        return this.resourceAuthScheme.parentResourceScheme
      },
      selectedScheme() {
        return this.authSchemeList[this.activeAuthSchemeTabIndex]
      },
      upcastResourcesArr() {
        return this.selectedScheme.bubbleResources
      },
      policyList() {
        return this.selectedScheme.policy
      },
      fmtPolicyTextList() {
        return this.policyList.map(policy => {
          return beautify(policy.policyText)
        })
      },
    },
  }
</script>

<style lang="less" scoped>
 @import './scheme-detail.less';
</style>