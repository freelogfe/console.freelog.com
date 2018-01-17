<template>
  <section class="presentable-detail">
    <presentable-steps class="presentable-steps" :active="1" v-show="showSteps"></presentable-steps>
    <el-dialog
      title="PageBuild关联widget"
      :visible.sync="showBindWidgetDialog"
      width="50%">
      <presentable-bind-widget :widget="bindWidget" @done="bindDoneHandler"></presentable-bind-widget>
    </el-dialog>
    <el-tabs tab-position="left" v-model="activeTabName">
      <el-tab-pane label="授权资源" name="resource">
        <resource-detail-info v-if="detail.resourceInfo" :data="detail.resourceInfo">
          <el-form-item label="widgets" v-if="detail.widgets.length">
            <el-collapse @change="activatedWidgetResourceHandler">
              <el-collapse-item v-for="(widget, index) in detail.widgets"
                                :name="index"
                                :key="widget.resourceId">
                <template slot="title">
                  {{widget.resourceName}}
                  <div class="create-p-btn" v-if="!widget.contractId">
                    <el-tooltip placement="top">
                      <div slot="content">
                        PageBuild资源还未绑定该widget的合同，需绑定后widget方可在pagebuild中使用
                      </div>
                      <el-button @click.stop="showBindWidgetDialogHandler(widget)"
                                 :type="widget.contractId?'success':'danger'" plain round>创建关联
                      </el-button>
                    </el-tooltip>
                  </div>
                </template>
                <div v-loading="widget.loading">
                  <div class="detail-info-wrap" v-if="widget.contractInfo">
                    <div class="lf-side">
                      合同详情
                    </div>
                    <div class="rt-side">
                      <contract-detail-info :data="widget.contractInfo">
                        <el-form-item class="btm-btns" v-if="widget.policyData && widget.policyData.policy.length > 1">
                          <el-button @click="showBindWidgetDialogHandler(widget)">修改资源的合同绑定</el-button>
                        </el-form-item>
                      </contract-detail-info>
                    </div>
                  </div>
                  <div class="detail-info-wrap">
                    <div class="lf-side">资源详情</div>
                    <div class="rt-side">
                      <resource-detail-info :data="widget.resourceInfo"
                                            v-if="widget.resourceInfo"></resource-detail-info>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
        </resource-detail-info>
      </el-tab-pane>
      <el-tab-pane label="共享策略" name="presentable">
        <div v-if="detail.presentableInfo">
          <el-form label-position="right" class="small-el-form" label-width="150px">
            <el-form-item label="presentable ID">
              {{detail.presentableInfo.presentableId}}
            </el-form-item>
            <el-form-item label="创建时间">
              {{detail.presentableInfo.createDate | fmtDate}}
            </el-form-item>
            <el-form-item label="presentable name">
              <el-input v-model="detail.presentableInfo.name" style="width: 600px"></el-input>
            </el-form-item>
            <el-form-item label="关键字">
              <freelog-tags v-model="detail.presentableInfo.tagInfo.userDefined"></freelog-tags>
            </el-form-item>
            <el-form-item label="用户授权策略">
              <presentable-policy :showValidateButton="false" v-model="detail._formatSegmentText"
                                  style="width: 600px"></presentable-policy>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="updatePresentableHandler">更新presentable</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="uncreated-policy-tip" v-else>
          还未创建user policy
          <el-button @click="createUserPolicyHandler">创建</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同详情" name="contract">
        <presentable-contract-detail :contractDetail="detail.contractInfo"></presentable-contract-detail>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
  import PresentableDetail from './index'

  export default PresentableDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
