<template>
  <div class="license-event-wrap">
    <el-form label-position="left" class="small-el-form" label-width="80px" :model="contractDetail">
      <el-form-item label="协议">
        <div class="license-window">
          <pre v-for="license in licenses">
            {{license}}
          </pre>
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="accepted">接受协议</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button @click="doneHandler">取 消</el-button>
        <el-button type="primary" :disabled="!accepted" @click="signHandler">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style media="screen">
  .license-window {
    height: 300px;
    overflow: auto;
  }
</style>
<script type="text/javascript">
  import LicenseEvent from './index.js'

  export default LicenseEvent
</script>
