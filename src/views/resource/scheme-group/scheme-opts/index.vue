<template>
  <div class="auth-scheme-opts-wrap" v-if="resource">
    <el-button class="unhandle-res-btn" :class="{'is-unresolved': isResolved===false}"
               @click="toggleResolveResource()">不处理此资源
    </el-button>
    <resource-intro-info :resource="resource"></resource-intro-info>
    <div class="res-auth-schemes-wrap" :class="{'is-unresolved': isResolved===false}"
         v-if="schemes.length">
      <h4 class="res-auth-schemes-title">授权方案</h4>
      <div class="res-auth-schemes">
        <ul class="scheme-tabs-header" v-if="schemes.length> 1">
          <li class="scheme-tab" @click="switchSchemeHandler(scheme, index)"
              :class="{'is-active': resource.activeIndex === index, selected: scheme.authSchemeId===selectedAuthSchemeId}"
              :key="index"
              v-for="(scheme, index) in schemes"><i class="dot"></i>{{String.fromCharCode(65+index)}}
          </li>
        </ul>

        <div class="scheme-detail-panels" ref="panels">
          <div class="scheme-detail-panel" :key="scheme.authSchemeId" v-for="(scheme, index) in schemes"
               v-if="resource.activeIndex === index">
            <p class="auth-scheme-name">{{scheme.authSchemeName}}</p>
            <ul class="scheme-list">
              <li v-for="dep in scheme.bubbleResources"
                  :key="dep.resourceId"
                  class="dep-item"
                  :class="['active-status-'+dep.activeStatus]">
                <div class="resource-name" :class="'js-res-'+dep._id"
                     @click="changeResourceHandler(dep, scheme, $event)">
                  <p><i class="dot"></i>{{dep.resourceName||dep.resourceId}}</p>
                </div>
              </li>
            </ul>

            <div class="policy-wrap" v-if="scheme.policy">
              <h3 style="margin-bottom: 15px;">授权策略:</h3>
              <div class="policy-content">
                <el-radio-group v-if="scheme.policy.length"
                                v-model="scheme.selectedPolicySegmentId">
                  <el-radio class="policy-radio" :label="policy.segmentId"
                            :key="index"
                            @click.native="changeSchemePolicyHandler(scheme, policy)"
                            @change="changePolicyHandler(scheme, policy)"
                            v-for="(policy, index) in scheme.policy">
                    <span :class="{'selected-segment': policy.selected}">{{policy.policyName}}</span>
                    <pre class="policy-segment-text">{{formatPolicyText(policy.policyText)}}</pre>
                  </el-radio>
                </el-radio-group>
                <div style="text-align: center">
                  <el-button type="primary" round
                             :class="{selected: selectedAuthSchemeId === scheme.authSchemeId}"
                             class="policy-select-btn"
                             @click="selectAuthSchemeHandler(scheme)">
                    <i class="el-icon-fa-check"></i>预选
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="line-arrow" ref="lineArrow">
            <i class="circle"></i>
          </div>
        </div>
      </div>
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
