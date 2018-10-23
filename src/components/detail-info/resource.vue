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
    <el-form-item label="版本" v-if="data.systemMeta && data.systemMeta.version">
      {{data.systemMeta.version}}
    </el-form-item>
    <el-form-item label="资源状态" v-if="data.statusInfo">
      <el-tag :type="data.statusInfo.type">{{data.statusInfo.desc}}</el-tag>
    </el-form-item>
    <el-form-item label="资源作者" v-if="data.authorInfo">
      {{data.authorInfo.nickname}}
    </el-form-item>
    <el-form-item label="创建时间">
      {{data.createDate|fmtDate}}
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
import { RESOURCE_TYPES, RESOURCE_STATUS } from '@/config/resource'

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
    this.format()
  },

  watch: {
    data: 'format'
  },

  methods: {
    loadAuthorInfo(userId) {
      return this.$services.user.get(userId).then(res => res.getData())
    },
    format() {
      const detail = this.data
      detail.statusInfo = RESOURCE_STATUS[detail.status]
      if (detail.userId) {
        this.loadAuthorInfo(detail.userId).then((authorInfo) => {
          this.$set(detail, 'authorInfo', authorInfo)
        })
      }
    }
  }
}
</script>
