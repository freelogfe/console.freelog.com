<template>
  <section class="second-step">
    <div class="step-title">资源meta信息</div>

    <resource-meta-info v-model="meta" @validate="checkMetaValid"></resource-meta-info>
  </section>
</template>

<script>
  /*
web component自定义标签名规则https://www.w3.org/TR/custom-elements/#valid-custom-element-name
创建资源接口：http://doc.freelog.com/resource/%E5%88%9B%E5%BB%BA%E8%B5%84%E6%BA%90.html
 */
  import ResourceMetaInfo from '../../meta/index.vue'
  import CONFIG from '@/config/index'

  const {RESOURCE_TYPES} = CONFIG

  export default {
    name: 'resource-creator-second-step',
    components: {
      ResourceMetaInfo
    },
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        valid: false,
        meta: ''
      }
    },
    mounted() {
      try {
        this.meta = JSON.stringify(this.data.meta)
      } catch (e) {
        this.meta = '{}'
      }
    },
    methods: {
      checkMetaValid(valid) {
        this.valid = valid
      },
      updateMetaInfo() {
        console.log(this.meta)
        return this.$services.resource.put(this.data.resourceId, {
          meta: JSON.parse(this.meta)
        }).then((res) => {
          if (res.data.errcode === 0) {
            return res.getData()
          } else {
            throw new Error(res.data.msg)
          }
        })
      },
      nextHandler() {
        return new Promise((resolve, reject) => {
          if (!this.valid) {
            this.updateMetaInfo().then((result) => {
              this.data.meta = JSON.parse(this.meta)
              resolve(result)
            }).catch(reject)
          } else {
            reject(this.valid)
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .second-step {
    width: 720px;
  }

  .step-title {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 20px;
  }

</style>
