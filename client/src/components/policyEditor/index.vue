<template>
  <section>
    <div class="box">
      <div class="toolbar">
        <ul class="tool-list">
          <li>
            <el-tooltip class="item" effect="light" content="使用已有策略模板" placement="bottom">
              <el-button type="text"
                         class="op-btn"
                         @click="showToolHandler('policy-template-selector')">
                <i class="el-icon-tickets"></i>
              </el-button>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="light" content="查询license" placement="bottom">
              <el-button type="text"
                         class="op-btn"
                         @click="showToolHandler('query-policy-license')">
                <i class="el-icon-search"></i>
              </el-button>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="light" content="更新policy后，已签约的policy不变，新签约的policy以更新后的为准" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </li>
        </ul>
      </div>
      <div class="input-area">
        <el-input
                  spellcheck="false"
                  type="textarea"
                  :rows="15"
                  placeholder="请输入策略"
                  @change="changePolicyText"
                  v-model="policyText">
        </el-input>
      </div>
    </div>
    <div>
      <el-button type="primary"
                 v-show="showValidate"
                 @click="validate">格式校验
      </el-button>
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
