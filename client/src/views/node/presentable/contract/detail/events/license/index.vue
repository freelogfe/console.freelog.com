<template>
  <div class="license-event-wrap">
    <el-form label-position="left" class="small-el-form" label-width="80px" :model="contractDetail">
      <el-form-item label="协议">
        <div class="license-window">
          <pre class="license-format" v-for="license in licenses">
            {{license}}

          </pre>
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="accept-license" v-model="accepted">接受协议</el-checkbox>
      </el-form-item>

        <div class="center">
          <el-button @click="doneHandler">取 消</el-button>
          <el-button type="primary" :disabled="!accepted" @click="signHandler">确 定</el-button>
        </div>
    </el-form>
  </div>
</template>
<style media="screen">
  .license-window {
    height: 300px;
    overflow: auto;
  }
  .license-format {
    font-family: Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    border-bottom: thin solid #d2cbcc;
  }
  .accept-license {
    margin-top: 20px;
  }
  .center {
    text-align: center;
  }
</style>
<script type="text/javascript">
  import LicenseEvent from './index.js'

  export default LicenseEvent
</script>
