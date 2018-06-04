<template>
  <section>
    <div class="policy-list">
      <div class="policy-input-item"
           :class="{'disabled-policy': policy.disabled}"
           v-for="(policy, index) in policyList">
        <div class="policy-name-input-wrap">
          <el-button type="text" class="del-policy-btn" @click="switchPolicyStatusHandler(policy, index)">
            <!--<i class="el-icon-close"></i>-->
            <i class="fl-icon fl-icon-close-hover"></i>
            <i class="fl-icon fl-icon-revert-hover"></i>
          </el-button>
          <div class="policy-name-input-item">
            <input type="text" class="policy-name-input" :disabled="policy.disabled" v-model="policy.policyName">
          </div>
        </div>
        <div class="policy-content-input-wrap" :class="{'policy-editing':editingIndex===index}">
          <div class="policy-toolbar">
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
            </ul>
          </div>
          <textarea
            :disabled="!!policy.policySegmentId"
            class="policy-content-input"
            spellcheck="false"
            placeholder="请输入策略"
            @change="changePolicyText(policy)"
            @focus="focusInputHandler($event, index)"
            v-model="policy.policyText"></textarea>
        </div>
      </div>
    </div>
    </div>

    <div class="add-policy-wrap">
      <el-button type="text" class="add-policy-btn" @click="addNewPolicy"><i class="el-icon-plus"></i>添加授权策略</el-button>
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
