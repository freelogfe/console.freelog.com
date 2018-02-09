<template>
  <section class="presentable-detail">
    <el-dialog
      title="PageBuild关联widget"
      :visible.sync="showBindWidgetDialog"
      width="50%">
      <presentable-bind-widget :widget="bindWidget" @done="bindDoneHandler"></presentable-bind-widget>
    </el-dialog>
    <el-tabs tab-position="left" v-model="activeTabName">
      <el-tab-pane name="resource">
        <div slot="label">
          <el-tooltip class="item" effect="dark"
                      content="存在未创建关联合同的widget"
                      placement="top"
                      v-if="shouldShowResourceWarning">
            <i class="el-icon-warning" style="color: #F56C6C"></i>
          </el-tooltip>
          授权资源
        </div>
        <div v-loading="loading">
          <resource-detail-info v-if="detail.resourceInfo" :data="detail.resourceInfo">
            <el-form-item label="widgets" v-if="detail.widgets.length">
              <el-collapse @change="activatedWidgetResourceHandler">
                <el-collapse-item v-for="(widget, index) in detail.widgets"
                                  :name="index"
                                  :key="widget.resourceId">
                  <template slot="title">
                    {{widget.resourceId}}
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
                    <i class="el-icon-warning" v-if="isWidgetValid(widget)"></i>
                  </template>
                  <div v-loading="widget.loading">
                    <div class="detail-info-wrap" v-if="widget.contractInfo">
                      <div class="lf-side">
                        合同详情
                      </div>
                      <div class="rt-side">
                        <contract-detail-info :data="widget.contractInfo">
                          <el-form-item class="btm-btns"
                                        v-if="widget.policyData && widget.policyData.policy.length > 1">
                            <el-button @click="showBindWidgetDialogHandler(widget)" type="primary" round>修改合同绑定
                            </el-button>
                          </el-form-item>
                        </contract-detail-info>
                        <div style="margin-bottom: 15px; text-align: center"><el-button v-if="widget.contractInfo.status < 3" type="primary" @click="gotoExecContractHandler(widget)">去执行</el-button></div>
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
        </div>
      </el-tab-pane>
      <el-tab-pane name="presentable">
        <div slot="label">
          <el-tooltip class="item" effect="dark"
                      content="未创建共享策略"
                      placement="top"
                      v-if="shouldShowPresentableWarning">
            <i class="el-icon-warning" style="color: #F56C6C"></i>
          </el-tooltip>
          共享策略
        </div>
        <div v-loading="loading">
          <div class="create-tip">
            <el-alert
              v-if="!detail.presentableInfo"
              title="还未创建user policy"
              type="warning">
            </el-alert>
          </div>
          <presentable-editor :data="editPresentable">
            <template slot="prepend">
              <el-form-item label="资源名称" v-if="detail.resourceInfo">
                {{detail.resourceInfo.resourceName}}
              </el-form-item>
              <el-form-item label="presentable ID" v-if="detail.presentableInfo">
                {{detail.presentableInfo.presentableId}}
              </el-form-item>
              <el-form-item label="创建时间" v-if="detail.presentableInfo">
                {{detail.presentableInfo.createDate | fmtDate}}
              </el-form-item>
            </template>
            <template slot="append">
              <el-form-item label="">
                <el-button @click="createUserPolicyHandler" type="primary" v-if="!detail.presentableInfo">创建</el-button>
                <el-button type="primary" @click="updatePresentableHandler" v-else>更新presentable</el-button>
              </el-form-item>
            </template>
          </presentable-editor>
        </div>
      </el-tab-pane>
      <el-tab-pane name="contract">
        <div slot="label">
          <el-tooltip class="item" effect="dark"
                      content="合同未执行完"
                      placement="top"
                      v-if="shouldShowContractWarning">
            <i class="el-icon-warning" style="color: #F56C6C"></i>
          </el-tooltip>
          合同详情
        </div>

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
