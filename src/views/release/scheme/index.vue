<template>
  <div class="scheme-manage-wrapper">
    <div class="s-m-w-tags">
      <span v-show="type !== 'edit'"><i class="no-resolve"></i>未解决</span>
      <span><i class="resolved"></i>已解决</span>
      <span><i class="el-icon-top"></i>上报解决</span>
    </div>
    <div class="cont clearfix">
      <div class="s-m-w-c-left">
        <div
                class="r-dependencies-item"
                :class="{ 'second-level': rItem.isSecondLevel, 'active': selectedRelease.releaseId === rItem.releaseId }"
                v-for="(rItem, index) in targetReleases"
                :key="'dep-item-'+index"
                @click="exchangeSelectedRelease(index)"
        >
          <div class="r-item-cont">
            <p class="r-name" :class="[rItem.resolveStatus]"><i class="el-icon-top"></i>{{rItem.releaseName}}</p>
            <div class="r-info">
              <span>{{rItem.resourceType}}</span>
              <span>{{rItem.latestVersion.version}}</span>
              <span>{{rItem.updateDate | fmtDate }}</span>
            </div>
            <div class="r-policies">
              <template v-if="!rItem.isUpcasted">
                <div class="r-p-item" v-for="(p, index) in rItem.selectedPolicies" :key="'s-policy-'+index">{{p.policyName}}</div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="s-m-w-c-right">
        <div
                :class="['s-m-w-c-upcast-btn', { 'selected': isSelectedReleaesUpcast }]"
                v-if="type === 'create'"
                @click="upcastHandler">
          <span class="u-check-box" v-if="!isSelectedReleaesUpcast"></span>
          <i class="el-icon-circle-check" v-else></i>上抛
        </div>
        <div :class="['s-m-w-c-p-wrapper', { 'disabled': isSelectedReleaesUpcast }]">
          <div
                  class="s-m-w-c-policy"
                  v-for="(policy, index) in tmpSelectedPolicies"
                  :key="'policy-' + index"
          >
            <div class="p-name" @click="selectPolicy(policy, index)">
              <span class="p-n-check-box" v-if="!policy.isSelected"></span>
              <i class="el-icon-check" v-else></i>{{policy.policyName}}
            </div>
            <div class="p-detail">
              <pre class="p-segment-text">{{fmtPolicyTextList(policy)}}</pre>
            </div>
          </div>
        </div>

      </div>
      <scheme-float-ball
            class="s-m-w-c-floatball"
            :selectedAuthSchemes="selectedAuthSchemes"
            :upcastReleases="baseUpcastReleases"
            v-if="type === 'create'"
    ></scheme-float-ball>
    </div>
  </div>
</template>

<script>
  import SchemeManage from './scheme.js'
  export default SchemeManage
</script>

<style lang="less" type="text/less" scoped>
  @import './index.less';
</style>
