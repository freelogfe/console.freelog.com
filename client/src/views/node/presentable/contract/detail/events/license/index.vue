<template>
  <div class="license-event-wrap">
    <el-form label-position="left" label-width="80px" :model="contractDetail">
      <el-form-item label="contractId">
        {{contractDetail.contractId}}
      </el-form-item>
      <el-form-item label="甲方">
        {{contractDetail.partyOne}}
      </el-form-item>
      <el-form-item label="乙方">
        {{contractDetail.partyTwo}}
      </el-form-item>
      <el-form-item>
        <el-button @click="doneHandler">取 消</el-button>
        <el-button type="primary" @click="signHandler">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
  import LicenseEvent from './index.js'

  export default LicenseEvent
</script>
