<template>
  <section class="auth-scheme-detail-container">
    <h3 class="nav-title">授权方案<i class="el-icon-edit"
                                 v-if="resource.isOwner"
                                 @click="gotoResourceSchemeDetailHandler"></i>
      <el-button type="text" class="hide-btn" @click="hideAuthSchemeHandler">
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
                  <pre class="policy-segment-text">{{policy._fmtPolicyText}}</pre>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div class="scheme-contract-status-wrap"
               v-if="resource.isOwner && scheme.showContracts">
            <div class="contract-status-btn-wrap">
              <el-button class="scheme-contract-status-btn"
                         :class="['contract-status-'+scheme._contractStatusInfo.status+'-btn']"
                         @click="showContractsHandler(scheme)">
                资源合同详情
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <el-dialog width="800px"
               :title="currentScheme.authSchemeName + '-依赖资源合同列表'"
               :append-to-body="true"
               :visible.sync="showDialog">
      <div class="scheme-dialog-bd">
        <el-table
          ref="contractsTable"
          :data="currentScheme.dutyStatements"
          @expand-change="expandChangeHandler"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props" v-if="props.row.inited">
              <contract-detail :contractId="props.row.contractId"
                               @update="updateContractHandler"></contract-detail>
            </template>
          </el-table-column>
          <el-table-column
            label="资源名称"
            prop="resourceName">
          </el-table-column>
          <el-table-column
            label="资源合同ID"
            prop="contractId">
          </el-table-column>
          <el-table-column
            label="授权方案ID"
            prop="authSchemeId">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="expandRowHandler(scope.row, scope.$index)">查看合同</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
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
