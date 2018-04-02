<template>
  <section>
<div style="display: inline-block;width:60%;vertical-align:top;">
      <div class="step-1 op-step">
        <div class="step-header">
          <div class="step-circle">1</div>
          <div class="step-title">授权点名称<span style="color:red;">(必填)</span></div>
        </div>
        <el-input placeholder="请输入授权点名称" v-model="authSchemeName"></el-input>
     </div>


     <div class="step-2 op-step">
       <div class="step-header">
         <div class="step-circle">2</div>
         <div class="step-title">创建授权点策略<span style="color:red;">(必填)</span></div>
       </div>
       <el-input
      type="textarea"
      v-model="policyText"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容">
      </el-input>
    </div>

</div>
<div style="display:inline-block;width:30%;">

      <div class="step-3 op-step">
        <div class="step-header">
          <div class="step-circle">3</div>
          <div class="step-title">依赖关系</div>
        </div>

        <dependency-tree @dependencies="dependencies"></dependency-tree>
     </div>

</div>

<!--
<div style="display: inline-block;  width: 38%;vertical-align: top;">
  <el-table
    class="step-body contract-select-wrap"
    :data="formData.data.policy">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <pre>{{scope.row._formatSegmentText}}</pre>
      </template>
    </el-table-column>
    <el-table-column
      label="segmentId"
      prop="segmentId">
    </el-table-column>

    <el-table-column
      label="目标用户">
      <template slot-scope="scope">
        <el-tag
          v-for="(forUser, index) in scope.row.forUsers"
          :key="index"
          :type="forUser.type==='individual'?'':'warning'">
          {{forUser.users}}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column
      width="100"
      label="操作">
      <template slot-scope="props">
        <el-radio v-model="selectedIndex"
                  :label="props.$index"
                  @change="segmentChangeHandler(formData)">
          <span title="placeholder"></span>
        </el-radio>
        <el-tooltip class="item" effect="dark" content="该策略已经创建过合同" placement="top"
                    v-show="props.row.created">
          <i class="el-icon-info"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="取消选择" placement="top"
                    v-show="selectedIndex===props.$index">
          <i class="el-icon-circle-close-outline"
             @click="segmentChangeHandler(formData, false)"></i>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

</div> -->

<el-button type="primary" @click="saveAuthNode()">保存</el-button>
  </section>
</template>

<script>
  import CreateAuthNode from './index.js'

  export default CreateAuthNode
</script>
<style lang="less" scoped>
  @import "creator.less";
</style>
