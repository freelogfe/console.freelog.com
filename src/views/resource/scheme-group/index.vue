<template>
  <div class="scheme-group-wrapper" :class="[isNodeDetail?'node-presentable-scheme-wrap':'resource-scheme-wrap']">
    <div class="view-mode-tabs" :class="['active-mode-'+viewMode]">
      <el-button type="text" class="mode-btn" @click="changeViewMode('list')">
        <el-badge :value="unsignPolicyList.length" class="badge-num">
          <span>待签约列表</span>
        </el-badge>
      </el-button>
      <el-button type="text" class="mode-btn" @click="changeViewMode('tree')">资源授权树</el-button>
      <span class="active-mask"></span>
    </div>
    <div class="auth-dep-list-wrap" v-show="viewMode==='list'">
      <h4 class="policy-input-title"><i class="el-icon-question"></i>待签约列表</h4>
      <el-collapse accordion>
        <el-collapse-item :name="duty.resourceId" v-for="duty in unsignPolicyList" :key="duty.authSchemeId"
                          class="duty-resource">
          <template slot="title">
            <h4>{{duty.resourceName}}</h4>
            <div class="duty-resource-sub-title" v-if="duty.selectedScheme">
              {{duty.selectedScheme.authSchemeName}}/{{duty.selectedPolicy.policyName}}
            </div>
          </template>
          <pre class="policy-segment-text"
               v-if="duty.selectedScheme">{{formatPolicyText(duty.selectedPolicy.policyText)}}</pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="auth-scheme-wrap" v-show="viewMode==='tree'">
      <scheme-opts :node="node"
                   class="auth-scheme-list-wrap" :key="node.resource.resourceId" v-for="(node,panelIndex) in nodes"
                   @changeScheme="changeSchemeHandler"
                   @resolve="resolveResourceHandler"
                   @next="showNextResourceHandler"
                   @select="selectResourceHandler"></scheme-opts>
    </div>
  </div>
</template>

<script>
import SchemeTree from './index'

export default SchemeTree
</script>

<style lang="less" scoped>
  @import "index.less";
</style>

<style lang="less">
  @import "el-reset.less";
</style>
