<template>
  <section class="auth-scheme-detail-container">
    <h3 class="nav-title">授权方案<i class="el-icon-edit"
                                 v-if="resource.isOwner"
                                 @click="gotoResourceSchemeDetailHandler"></i>
      <el-button type="text" class="hide-btn" @click="hideAuthSchemeHandler" v-if="!resource.isOwner">
        <i class="el-icon-close"></i>
      </el-button>
    </h3>
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
              <el-collapse>
                <el-collapse-item :title="policy.policyName" :name="index" :key="index"
                                  v-for="(policy, index) in scheme.policy">
                  <pre class="policy-segment-text">{{policy._fmtSegmentText}}</pre>
                </el-collapse-item>
              </el-collapse>

              <!--<el-radio-group v-model="selectedPolicy">-->
                <!--<el-radio class="policy-radio" :label="policy.segmentId" :key="index"-->
                          <!--@change="changePolicy(scheme, policy)"-->
                          <!--v-for="(policy, index) in scheme.policy">-->
                  <!--<span class="policy-name">{{policy.policyName}}</span>-->
                  <!--<pre class="policy-segment-text">{{policy._fmtSegmentText}}</pre>-->
                <!--</el-radio>-->
              <!--</el-radio-group>-->
            </div>
          </div>
          <div class="scheme-contract-status-wrap"
               v-if="resource.isOwner">
            <div class="contract-status-btn-wrap">
              <el-button class="scheme-contract-status-btn"
                         :class="['contract-status-'+scheme._contractStatusInfo.status+'-btn']">
                {{scheme._contractStatusInfo.desc}}
              </el-button>
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
  @import "el-reset.less";
</style>
