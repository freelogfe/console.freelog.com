<template>
  <section>
    <el-form :model="detail" :rules="rules" ref="detail" label-width="100px">
      <el-form-item label="resourceId" prop="resourceId">
        <el-input v-model="detail.resourceId" disabled></el-input>
      </el-form-item>
      <el-form-item label="resourceType" prop="resourceType">
        <el-input v-model="detail.resourceId" disabled></el-input>
      </el-form-item>
      <el-form-item label="resourceUrl" prop="resourceUrl">
        <el-input v-model="detail.resourceUrl" disabled></el-input>
      </el-form-item>
      <el-form-item label="resourceType" prop="resourceType">
        <el-input v-model="detail.resourceType" disabled></el-input>
      </el-form-item>
      <el-form-item label="resourceName" prop="resourceName">
        <el-input v-model="detail.resourceName"></el-input>
      </el-form-item>
      <el-form-item label="mimeType" prop="mimeType">
        <el-input v-model="detail.mimeType"></el-input>
      </el-form-item>
      <el-form-item label="createDate" prop="createDate">
        <el-input v-model="detail.createDate" disabled></el-input>
      </el-form-item>
      <el-form-item label="meta" prop="meta">
        <template v-for="(val, key) in detail.meta">
          <p><label>{{key}}:</label> <span>{{val}}</span></p>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveHandler('detail')">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import ResourceDetail from './index'

  export default ResourceDetail
</script>

<style lang="less" scoped>

</style>
