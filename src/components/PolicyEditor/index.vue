<template>
  <section>
    <div class="policy-input-item"
         :class="[{'disabled-policy': disabledPolicy, 'published-policy': !!policy.segmentId}, mode+'-mode']">
      <div class="policy-name-input-item clearfix">
        <div class="policy-name-input-placeholder">
          <pre class="policy-name-pre">{{policy.policyName}}</pre>
          <input type="text" class="policy-name-input" @blur="changePolicyNameHandler" :disabled="disabledPolicy" v-model="policy.policyName">
        </div>
        <div class="policy-actions-btn">
          <el-button round class="off-line-btn" size="mini"
                     v-if="disabledPolicy===false"
                     @click="switchPolicyStatusHandler(true)">下架
          </el-button>
          <el-button round class="on-line-btn" size="mini"
                     v-if="disabledPolicy===true"
                     @click="switchPolicyStatusHandler(false)">上架
          </el-button>
        </div>
        <div class="policy-toolbar">
          <ul class="tool-list">
            <li>
              <el-button type="text"
                         class="op-btn"
                         size="mini"
                         @click="showToolHandler('policy-template-selector')">
                <i class="el-icon-tickets"></i>模板
              </el-button>
              <!--<el-tooltip class="item" effect="light" content="使用已有策略模板" placement="bottom"></el-tooltip>-->
            </li>
            <li>
              <el-button type="text"
                         class="op-btn"
                         size="mini"
                         @click="showToolHandler('query-policy-license')">
                <i class="el-icon-search"></i>license
              </el-button>
              <!--<el-tooltip class="item" effect="light" content="查询license" placement="bottom"></el-tooltip>-->
            </li>
          </ul>
        </div>
      </div>
      <div class="policy-content-input-wrap policy-editing">
        <div class="policy-content-input-padding clearfix">
          <div v-if="policy.segmentId" class="policy-text" v-html="policy.policyText"></div>
          <template v-else>
            <div class="policy-input-area">
              <div class="input-placeholder">{{policy.policyText}}</div>
              <textarea
                      class="policy-content-input"
                      spellcheck="false"
                      placeholder="请输入策略"
                      @change="changePolicyText(policy)"
                      v-model="policy.policyText"></textarea>
            </div>
            <div class="policy-content-input-ft" style="float: right">
              <el-button round size="mini" @click="deletePolicyHandler">取消</el-button>
              <el-button round size="mini" type="primary" @click="savePolicyHandler" v-if="autoSave === false">保存</el-button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <el-dialog
            title="选择策略模板"
            :visible.sync="showCustomPolicyTplDialog"
            width="50%">
      <keep-alive>
        <component :is="currentTool" :callback="operationCallback"></component>
      </keep-alive>
    </el-dialog>
  </section>
</template>

<script>
  import PolicyEditor from './index'

  export default PolicyEditor
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
