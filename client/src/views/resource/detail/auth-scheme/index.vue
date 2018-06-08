<template>
  <section class="auth-scheme-detail-container">
    <h3 class="nav-title">授权方案</h3>
    <div class="auth-scheme-content">
      <div class="tabs-header">
        <el-radio-group class="tab-radio-group"
                        v-model="curChoice">
          <el-radio-button class="tab-radio-item"
                           :key="choice.index"
                           :label="choice.index" v-for="choice in choices">{{choice.label}}
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="tabs-content">
        <div class="tab-panel" v-for="(scheme, index) in schemes" v-show="curChoice===index">
          <p class="scheme-name">{{scheme.authSchemeName}}</p>
          <ul class="dep-resources">
            <li v-for="dep in scheme.dependencies" class="dep-item">
              <div class="resource-name">
                <p>
                  <i class="dot" :class="{done: dep.done}"></i>
                  <a style="color: #333;word-break: break-all;" target="_blank"
                     :href="'/resource/detail/'+dep.resourceId">{{dep.resourceName||dep.resourceId}}</a>
                </p>
              </div>
            </li>
          </ul>
          <div class="policy-options" v-if="scheme.policy">
            <h3 style="margin-bottom: 15px;color: #333333;">授权策略</h3>
            <div class="policy-content">
              <el-radio-group v-model="selectedPolicy">
                <el-radio class="policy-radio" :label="policy.segmentId" :key="index"
                          @change="changePolicy(scheme, policy)"
                          v-for="(policy, index) in scheme.policy">
                  <span class="policy-name">{{policy.policyName}}</span>
                  <pre class="policy-segment-text">{{policy._fmtSegmentText}}</pre>
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import AuthSchemeDetail from './index'

  export default AuthSchemeDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>


<style lang="less">
  .auth-scheme-detail-container {

  .el-radio-button, .el-radio-button__inner {
    width: 100%;
  }

  .is-active {

  .el-radio-button__inner {
    background-color: white !important;;
  }

  }

  .el-radio-button__inner {
    background-color: #F5F5F5 !important;
    color: #333 !important;;
    border-color: #CCCCCC !important;;
    box-shadow: -1px 0 0 0 #CCCCCC !important;
  }

  .el-radio + .el-radio {
    margin-left: 0;
  }

  }

</style>
