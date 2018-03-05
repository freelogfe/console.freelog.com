<template>
  <section>
    <el-form label-position="right" label-width="120px" class="small-el-form">
      <el-form-item label="groupName">
        {{detail.groupName}}
      </el-form-item>
      <el-form-item label="分组ID">
        {{detail.groupId }}
      </el-form-item>
      <el-form-item label="创建日期">
        <span>{{ detail.createDate | fmtDate }}</span>
      </el-form-item>
      <el-form-item label="分组类型">
        {{detail.groupType===1?'用户分组':'节点分组'}}
      </el-form-item>
      <el-form-item label="分组成员列表">
        <freelog-tags v-model="groupMembers" action-text="添加成员"></freelog-tags>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-top:15px">更新</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import GroupDetail from './index'

  export default GroupDetail
</script>

<style lang="less" scoped>

</style>
