<template>
  <el-button size="small"
             @click="publishHandler(btnOpt.isOnline)"
             :type="btnOpt.type"
             :plain="btnOpt.plain"
             :disabled="btnOpt.disabled"
             v-if="btnOpt.text">{{btnOpt.text}}</el-button>
</template>

<script>
  import {RESOURCE_STATUS_MAP} from '@/config/resource'

  export default {
    name: 'fl-resource-button',

    data(){
      return {}
    },

    props:{
      resource: Object
    },

    computed: {
      btnOpt(){
        var opt = {
          plain: true,
          disabled: false,
          text: '',
          type: 'danger'
        }
        switch (this.resource.status) {
          case RESOURCE_STATUS_MAP.unknown:
            Object.assign(opt, {
              disabled: true,
              text: '资源异常',
              type: 'warning'
            })
            break
          case RESOURCE_STATUS_MAP.unpublished:
            Object.assign(opt, {
              text: '发布资源',
              type: 'primary',
              plain: false,
              isOnline: 1
            })
            break
          case RESOURCE_STATUS_MAP.published:
            Object.assign(opt, {
              text: '下架资源',
              isOnline: 0
            })
            break
          case RESOURCE_STATUS_MAP.freeze:
            Object.assign(opt, {
              text: '资源冻结',
              disabled: true
            })
            break
          default: break;
        }

        return opt
      },
    },

    methods: {
      publishHandler(isOnline) {
        if (!Number.isInteger(isOnline)) return

        this.$services.resource.put(this.resource.resourceId, {
          isOnline: isOnline
        }).then(res => {
          const {errcode, ret, msg, data} = res.data
          var tips = ['下架', '发布']
          if (errcode === 0 && ret === 0) {
            this.resource.status = (isOnline === 0) ? RESOURCE_STATUS_MAP.unpublished : RESOURCE_STATUS_MAP.published
            this.$message.success(`${tips[isOnline]}成功`)
          } else {
            this.$message.error(msg || `${tips[isOnline]}失败`)
          }
        })
      },
    }
  }
</script>