<template>
  <el-form label-position="right"
           class="small-el-form"
           label-width="100px">
    <el-form-item label="ID">
      {{data.id}}
    </el-form-item>
    <el-form-item label="策略模板描述">
      {{data.name}}
    </el-form-item>
    <el-form-item label="策略模板类型">
      {{resolveType(data.templateType)}}
    </el-form-item>
    <el-form-item label="状态">
      {{resolveStatus(data.status)}}
    </el-form-item>
    <el-form-item label="创建时间">
      {{data.createDate|fmtDate}}
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
  export default {
    name: 'policy-template-detail-info',
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    mounted() {
    },

    methods: {
      resolveType(type) {
        return type === 1 ? '资源策略模板' : '用户策略模板'
      },
      resolveStatus(status) {
        return status === 0 ? '正常' : '已删除'
      }
    }
  }
</script>
