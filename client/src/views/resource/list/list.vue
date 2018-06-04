<template>
  <div class="resource-items">
    <ul>
      <li class="resource-item" v-for="resource in resources">
        <resource-item :resource="resource"></resource-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import ResourceItem from '../list-item/index.vue'
  import {onloadUserInfo} from '@/data/user/loader'

  export default {
    name: 'resource-items',

    data() {
      return {
        search: '',
        resources: [],
        loader: null
      }
    },

    props: {
      type: {
        type: String,
        default() {
          return 'all'
        }
      }
    },

    watch: {
      type() {
        this.initView()
      }
    },
    components: {ResourceItem},
    mounted() {
      this.initView();
    },

    methods: {
      initView() {
        switch (this.type) {
          case 'favor':
            this.loader = this.getFavorResourcesLoader()
            break;
          case 'self':
            this.loader = this.getSelfResourcesLoader()
            break;
          case 'all':
          default:
            break;
        }

        if (this.loader) {
          this.loader().then((data) => {
            this.resources = data.dataList
          })
        }
      },
      getSelfResourcesLoader() {
        return (param) => {
          //test
          param = {
            pageSize: 1e2
          }
          if (typeof param === 'object') {
            param = {
              params: param
            }
          }
          return this.$services.resource.get(param || {}).then((res) => {
            return res.getData()
          })
        }
      },
      getFavorResourcesLoader(param) {
        return (param) => {
          //test
          param = {
            pageSize: 1e2
          }
          if (typeof param === 'object') {
            param = {
              params: param
            }
          }
          return this.$services.collections.get(param || {}).then((res) => {
            return res.getData()
          })
        }
      },
      getAllResourcesLoader(param) {
        //test
        param = {
          pageSize: 1e2
        }
        if (typeof param === 'object') {
          param = {
            params: param
          }
        }
        return this.$services.resource.get(param || {}).then((res) => {
          return res.getData()
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
