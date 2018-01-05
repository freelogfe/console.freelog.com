<template>
  <section>
    <el-table
      :data="tabData.data.policy">
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
        label="">
        <template slot-scope="props">
          <el-radio v-model="tabData.selected"
                    :label="props.$index"
                    @change="segmentChangeHandler(tabData)">
            <span title="placeholder"></span>
          </el-radio>
          <el-tooltip class="item" effect="dark" content="该策略已经创建过合同" placement="top"
                      v-show="props.row.created">
            <i class="el-icon-info"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="取消选择" placement="top"
                      v-show="tabData.selected===props.$index">
            <i class="el-icon-circle-close-outline"
               @click="segmentChangeHandler(tabData, false)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import PresentableContract from './index'

  export default PresentableContract
</script>

<style lang="less" scoped>

  .step-row {
    color: #409EFF;
  }
  .step-title {
    display: inline-block;
    font-size: 14px;
    margin-left: 6px;
  }
  .step-circle {
    border: 2px solid;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

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
