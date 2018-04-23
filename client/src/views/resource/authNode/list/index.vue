<template>
  <section>
    <el-table class="resource-list" :data="list">
      <el-table-column
        label="授权点名称">
        <template slot-scope="scope">
          {{scope.row.authSchemeName}}
        </template>
      </el-table-column>
      <el-table-column
        label="authSchemeId"
        prop="authSchemeId"
        align="center">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="editAuthNode(scope.row)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import AuthNodeList from './index.js'

  export default AuthNodeList
</script>
