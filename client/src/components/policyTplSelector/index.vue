<template>
  <section>
    <el-table :data="tplList"
              stripe
              border>
      <el-table-column
        prop="name"
        label="模板名称">
      </el-table-column>
      <!--<el-table-column-->
      <!--align="center"-->
      <!--label="状态">-->
      <!--<template slot-scope="scope">-->
      <!--{{resolveStatus(scope.row.status)}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label=""
        align="center"
        width="200px">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            plain
            @click="handleSelect(scope.row)">选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import PolicyTplSelector from './index'
  export default PolicyTplSelector
</script>
