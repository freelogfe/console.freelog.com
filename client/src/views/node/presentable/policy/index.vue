<template>
  <div>
    <el-input class="gap"
              spellcheck="false"
              type="textarea"
              :rows="15"
              placeholder="请输入policy"
              @change="textChange"
              v-model="policyText">
    </el-input>
    <el-button type="text"
               @click="useCustomPolicyTpl">使用已有策略模板
    </el-button>
    <el-button v-show="showValidateButton" @click="validate">格式校验</el-button>

    <el-dialog
      title="选择策略模板"
      :visible.sync="showCustomPolicyTplDialog"
      width="50%">
      <div style="margin-bottom: 15px;">
        <el-input placeholder="请输入内容" v-model="queryPolicyTpl" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <el-tabs type="border-card">
        <el-tab-pane label="示例模板">
          <policy-tpl-list :list="defaultPolicyTpls"
                           :filter="filterHandler"
                           @select="selectPolicyTplHandler"></policy-tpl-list>
        </el-tab-pane>
        <el-tab-pane label="我的模板">
          <policy-tpl-list :list="policyTpls"
                           :filter="filterHandler"
                           @select="selectPolicyTplHandler"></policy-tpl-list>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import PresentablePolicy from './index'

  export default PresentablePolicy
</script>

<style lang="less" scoped>
  .gap {
    margin-bottom: 12px;
  }
</style>
