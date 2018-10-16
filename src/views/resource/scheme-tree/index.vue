<template>
  <div class="auth-scheme-tree-wrap" :class="[isNodeDetail?'node-presentable-scheme-wrap':'resource-scheme-wrap']">
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
              {{duty.selectedScheme.authSchemeName}}/{{duty.selectedScheme.selectedPolicy.policyName}}
            </div>
          </template>
          <pre class="policy-segment-text"
               v-if="duty.selectedScheme">{{formatPolicyText(duty.selectedScheme.selectedPolicy.policyText)}}</pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="auth-scheme-wrap" v-show="viewMode==='tree'">
      <div class="auth-scheme-list-wrap" :key="panelIndex" v-for="(resource,panelIndex) in schemes">
        <el-button class="unhandle-res-btn" :class="{'is-unresolved': resource.isResolved===false}"
                   @click="toggleResolveResource(resource, panelIndex)">不处理此资源
        </el-button>
        <resource-intro-info :resource="resource.resourceInfo"></resource-intro-info>
        <div class="res-auth-schemes-wrap" :class="{'is-unresolved': resource.isResolved===false}"
             v-if="resource.schemes">
          <h4 class="res-auth-schemes-title">授权方案</h4>
          <div class="res-auth-schemes">
            <ul class="scheme-tabs-header" v-if="resource.schemes.length> 1">
              <li class="scheme-tab" @click="switchSchemeHandler(resource, scheme, index, panelIndex)"
                  :class="{'is-active': resource.activeIndex === index, selected: resource.selectedScheme && resource.selectedScheme.authSchemeId === scheme.authSchemeId}"
                  v-for="(scheme, index) in resource.schemes"><i class="dot"></i>{{String.fromCharCode(65+index)}}
              </li>
            </ul>

            <div class="scheme-detail-panels">
              <div class="scheme-detail-panel" :key="scheme.authSchemeId" v-for="(scheme, index) in resource.schemes"
                   v-show="resource.activeIndex === index">
                <p class="auth-scheme-name">{{scheme.authSchemeName}}</p>
                <ul class="scheme-list">
                  <li v-for="dep in scheme.dependencies" class="dep-item"
                      :class="['active-status-'+dep.activeStatus]"
                      @click="selectResourceHandler(dep, scheme, panelIndex, $event)">
                    <div class="resource-name" :class="'js-res-'+dep.resourceId">
                      <p><i class="dot"></i>{{dep.resourceName||dep.resourceId}}</p>
                    </div>
                  </li>
                </ul>

                <div class="policy-wrap" v-if="scheme.policy">
                  <h3 style="margin-bottom: 15px;">授权策略: </h3>
                  <div class="policy-content">
                    <el-radio-group v-if="scheme.policy.length"
                                    v-model="scheme.selectedPolicySegmentId">
                      <el-radio class="policy-radio" :label="policy.segmentId"
                                :key="index"
                                :disabled="policy.isAuth!==true"
                                @click.native="resetSchemePolicyHandler(resource, scheme, policy)"
                                @change="changePolicy(resource, scheme, policy)"
                                v-for="(policy, index) in scheme.policy">
                        <el-tooltip content="不在授权范围内" placement="top" effect="light" v-if="!policy.isAuth">
                          <span :class="{'selected-segment': policy.selected}">{{policy.policyName}}</span>
                        </el-tooltip>
                        <span :class="{'selected-segment': policy.selected}"
                              v-if="policy.isAuth">{{policy.policyName}}</span>
                        <pre class="policy-segment-text">{{formatPolicyText(policy.policyText)}}</pre>
                      </el-radio>
                    </el-radio-group>
                    <div style="text-align: center">
                      <el-button type="primary" round
                                 :class="{selected: resource.selectedScheme && resource.selectedScheme.authSchemeId === scheme.authSchemeId}"
                                 class="policy-select-btn"
                                 @click="selectAuthSchemeHandler(resource, scheme, panelIndex)">
                        <i class="el-icon-fa-check"></i>预选
                      </el-button>
                    </div>
                  </div>
                </div>
                <div class="line-arrow" :class="'js-line-'+scheme.authSchemeId"
                     v-show="panelIndex < currentAuthNodeIndex">
                  <i class="circle"></i>
                </div>
              </div>
            </div>
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

<style lang="less">
  @import "el-reset.less";
</style>
