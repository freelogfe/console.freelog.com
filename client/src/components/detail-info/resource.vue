<template>
  <el-form label-position="right"
           class="small-el-form"
           label-width="100px">
    <el-form-item label="资源ID">
      {{data.resourceId}}
    </el-form-item>
    <el-form-item label="资源名称">
      {{data.resourceName}}
    </el-form-item>
    <el-form-item label="资源类型">
      {{data.resourceType}}
    </el-form-item>
    <el-form-item label="资源状态">
      {{data.status}}
    </el-form-item>
    <el-form-item label="资源作者">
      {{data.userId}}
    </el-form-item>
    <el-form-item label="创建时间">
      {{data.createDate|fmtDate}}
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
  export default {
    name: 'resource-detail-info',
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

    watch:{
      data: 'format'
    },

    methods: {
      format(){
        console.log('resource format')
      }
    }
  }
</script>
