<template>
  <div class="">
    <div class="box">
      <div class="box-left">
        <el-input class="gap"
                  spellcheck="false"
                  type="textarea"
                  :rows="15"
                  placeholder="请输入策略"
                  v-model="policyText">
        </el-input>
      </div>
      <div class="box-right">
        <el-autocomplete
        class="search-input"
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容License ID"
          @select="handleSelect"
        >  <i
    class="el-icon-edit el-input__icon"
    slot="suffix">
  </i></el-autocomplete>
        <pre class="license-content">
          {{licenseContent}}
        </pre>
      </div>
    </div>
    <el-button type="primary"
               @click="validate">格式校验
    </el-button>
  </div>
</template>

<script>
  import PolicyEditor from './index'

  export default PolicyEditor
</script>

<style lang="less" scoped>
  .gap {
    margin-bottom: 12px;
  }
  .box{
    width:100%;
    display: -webkit-flex; /* Safari */
    display: flex;
  }
  .box-left {
    flex: 2;
  }
  .box-right {
    flex: 1;
    background-color: #f3f4f5;
    padding: 5px;
  }
  .search-input {
    width: 80%;
  }
  .license-content {
    overflow: auto;
    width: 80%;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break:break-all;
  }
</style>
