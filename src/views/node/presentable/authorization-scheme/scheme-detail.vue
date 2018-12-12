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
  export default {
    name: 'scheme-detail',
    components: {},
    data() {
      return {
        selectedAuthSchemeTabIndex: -1,
        activeAuthSchemeTabIndex: 0,
        selectedUpcastResourceIndex: -1,
        selectedPolicyIndex: -1,

      }
    },
    props: {
      authSchemeList: {
        type: Array
      },
      upcastResourceLevelIndex: {
        type: Number
      },
    },
    methods: {
      exchangeTab(index) {
        if(this.activeAuthSchemeTabIndex !== index) {
          this.selectedUpcastResourceIndex = -1
          this.activeAuthSchemeTabIndex = index
          this.$emit('refresh-upcast-resourceIDs', this.upcastResourceLevelIndex)
        }
        if(this.selectedAuthSchemeTabIndex === index) {
          this.selectedPolicyIndex = typeof this.selectedScheme.selectedPolicyIndex === 'undefined' ? -1 : this.selectedScheme.selectedPolicyIndex
        }else {
          this.selectedPolicyIndex = -1
        }

      },
      selectPolicyItem(index) {
        if(this.selectedPolicyIndex === index) {
          this.selectedPolicyIndex = -1
        }else {
          this.selectedPolicyIndex = index
        }
        this.selectedScheme.selectedPolicyIndex = this.selectedPolicyIndex
        this.checkPre()
      },
      selectUpcastResource(index) {
        this.$emit('show-upcast-resource-scheme', this.upcastResourcesArr[index], this.upcastResourceLevelIndex)
        this.selectedUpcastResourceIndex = index
      },
      checkPre() {
        if(this.selectedPolicyIndex !== -1) {
          this.selectedAuthSchemeTabIndex = this.activeAuthSchemeTabIndex
        }else {
          this.selectedAuthSchemeTabIndex = -1
        }
      }
    },
    computed: {
      selectedScheme() {
        return this.authSchemeList[this.activeAuthSchemeTabIndex]
      },
      upcastResourcesArr() {
        return this.selectedScheme.dutyStatements
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
 4b32048791c518345e44229740146a1e30488480
 5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8
</style>