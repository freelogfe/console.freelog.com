<template>
  <section>
    <presentable-steps :active="0"></presentable-steps>
    <el-alert
      title="该资源已创建过presentable"
      type="success"
      v-show="done"
      show-icon>
    </el-alert>
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(tabData, indexOuter) in tabList"
                   :key="indexOuter"
                   :name="tabData.resourceId">
        <span slot="label">
          {{tabData.resourceName}}

          <el-tooltip class="item" effect="dark" content="已选中合同" placement="top" v-show="tabData.checked">
            <i class="el-icon-circle-check icon-tip"></i>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="已创建过合同" placement="top" v-show="tabData.created">
            <i class="el-icon-circle-check-outline icon-tip"></i>
          </el-tooltip>

        </span>
        <el-table
          :data="tabData.data.policy">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <pre>{{scope.row.segmentText}}</pre>
            </template>
          </el-table-column>
          <el-table-column
            label="segmentId"
            prop="segmentId">
          </el-table-column>
          <el-table-column
            label="">
            <template slot-scope="props">
              <el-radio v-model="tabData.selected"
                        :disabled="tabData.created"
                        :label="props.$index"
                        @change="segmentChangeHandler(tabData)">
                <span title="placeholder"></span>
              </el-radio>
              <el-tooltip class="item" effect="dark" content="取消选择" placement="top"
                          v-show="tabData.selected===props.$index&&tabData.created===false">
                <i class="el-icon-circle-close-outline"
                   @click="segmentChangeHandler(tabData, false)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <div class="form-ft">
        <el-button @click="submit" :disabled="!selected">提交</el-button>
      </div>
    </el-tabs>
  </section>
</template>

<script>
  import NodePolicySignment from './index'

  export default NodePolicySignment
</script>

<style lang="less" scoped>

  .el-icon-circle-close-outline {
    padding: 5px;
    cursor: pointer;
  }

  .icon-tip {
    margin-left: 6px;
    font-size: 16px;
    color: #67C23A;
    vertical-align: middle;
  }

  .form-ft {
    border-top: 1px solid #ccc;
    padding-top: 15px;
    text-align: center;
    margin-top: 15px;
  }
</style>
