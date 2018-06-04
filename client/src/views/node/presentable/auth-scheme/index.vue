<template>
  <div class="auth-scheme-section clearfix" :class="{'is-publish':detail.isPublished}">
    <div class="auth-scheme-section clearfix" :class="{'is-publish':detail.isPublished}">
      <div class="dep-list-wrap" v-if="showDependencyList">
        <div class="dep-list-inner">
          <h4 class="policy-input-title"><i class="el-icon-question"></i>资源依赖列表</h4>
          <ul>
            <li v-for="(dep, index) in detail.scheme.dependencies"
                @click="changeResourceScheme(dep, index, $event)"
                class="dep-item"
                :class="['active-status-'+dep.activeStatus]">
              <el-checkbox class="select-box" v-model="dep.checked"
                           @change="selectDependency(dep)"
                           :disabled="detail.isPublished"></el-checkbox>
              <div class="resource-name" :class="{active:dep.active}">
                <p>
                  <i class="dot"></i>{{dep.resourceName}}
                  <i class="el-icon-edit" @click="editDepResource(dep)"></i>
                </p>
              </div>
            </li>
            <li class="dep-item">
              <el-button class="add-dep-resource-btn"
                         @click="addDepResource"
                         type="text">
                <i class="el-icon-plus"></i>添加引用资源
              </el-button>
            </li>
          </ul>
          <div class="policy-input-wrap">
            <h4 class="policy-input-title"><i class="el-icon-question"></i>授权方案策略</h4>
            <policy-editor v-model="detail.scheme" :showValidate="false" @change="changePolicyHandler"></policy-editor>
          </div>
          <div class="line-arrow">
            <i class="circle"></i>
          </div>
        </div>
      </div>
      <div class="scheme-view-wrap">
        <div class="view-mode-tabs" :class="['active-mode-'+viewMode]">
          <el-button type="text" class="mode-btn" @click="changeViewMode('list')">
            <el-badge :value="dutyStatements.length" class="badge-num">
              <span>待签约列表</span>
            </el-badge>
          </el-button>
          <el-button type="text" class="mode-btn" @click="changeViewMode('tree')">资源依赖树</el-button>
          <span class="active-mask"></span>
        </div>
        <div class="auth-dep-list-wrap" v-show="viewMode==='list'">
          <h4 class="policy-input-title"><i class="el-icon-question"></i>待签约列表</h4>
          <el-collapse accordion>
            <el-collapse-item :name="duty.resourceId" v-for="duty in dutyStatements" :key="duty.authSchemeId"
                              class="duty-resource">
              <template slot="title">
                <h4>{{duty.resourceName}}</h4>
                <div class="duty-resource-sub-title" v-if="duty.selectedScheme">
                  {{duty.selectedScheme.authSchemeName}}/{{duty.selectedScheme.selectedPolicy.policyName}}
                </div>
              </template>
              <pre class="policy-segment-text" v-if="duty.selectedScheme">{{duty.selectedScheme.selectedPolicy.segmentText}}</pre>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="auth-scheme-wrap" v-show="viewMode==='tree'">
          <div class="auth-scheme-list-wrap" :key="panelIndex" v-for="(resource,panelIndex) in schemes">
            <resource-intro-info :resource="resource"></resource-intro-info>
            <div class="res-auth-schemes-wrap" v-if="resource.schemes">
              <h4 class="res-auth-schemes-title">授权方案</h4>
              <div class="res-auth-schemes">
                <ul class="scheme-tabs-header" v-if="resource.schemes.length> 1">
                  <li class="scheme-tab" @click="switchSchemeHandler(resource, scheme, index, panelIndex)"
                      :class="{'is-active': resource.activeIndex === index}"
                      v-for="(scheme, index) in resource.schemes">{{String.fromCharCode(65+index)}}
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
                          <p><i class="dot"></i>{{dep.resourceName||dep.resourceId}}
                          </p>
                        </div>
                      </li>
                    </ul>

                    <div class="policy-wrap" v-if="scheme.policy">
                      <h3 style="margin-bottom: 15px;">授权策略:</h3>
                      <div class="policy-content">
                        <el-radio-group v-if="scheme.policy.length"
                                        v-model="scheme.selectedPolicySegmentId">
                          <el-radio class="policy-radio" :label="policy.segmentId" :key="index"
                                    @change="changePolicy(resource, scheme, policy)"
                                    v-for="(policy, index) in scheme.policy">
                            <span>{{policy.policyName}}</span>
                            <pre class="policy-segment-text">{{formatPolicyText(policy.segmentText)}}</pre>
                          </el-radio>
                        </el-radio-group>
                        <div style="text-align: center">
                          <el-button type="primary" round
                                     :class="{selected: resource.selectedScheme && resource.selectedScheme.authSchemeId === scheme.authSchemeId}"
                                     class="policy-select-btn"
                                     @click="selectAuthScheme(resource, scheme, panelIndex)">
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

      <el-dialog
        :visible.sync="showEditDepResource"
        width="30%"
        :close-on-click-modal="false"
        center>
        <div>
          <el-input v-model="curEditDepResourceId" placeholder="输入您要添加的资源ID"></el-input>
        </div>
        <div slot="footer" class="dialog-footer clearfix">
          <el-button class="del-btn" @click="deleteDepResource">删除</el-button>
          <el-button @click="changeDepResource" class="ft-btn">确 定</el-button>
          <el-button @click="resetDepResourceEditor" class="ft-btn">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import PresentableSchemeDetail from './index'
  export default PresentableSchemeDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
