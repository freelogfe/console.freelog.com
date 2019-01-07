import FreelogSwitch from '@/components/Switch/index.vue'
import {RESOURCE_TYPES} from '@/config/resource'
import PageBuild from './page-build.vue'
import PresentableList from './list.vue'
import SearchResource from '../../resource/search/index.vue'

export default {
  name: 'presentables',
  data() {
    return {
      params: {
        isOnline: 2
      },
      showSearchResource: false,
      isEntering: false,
      searchData: {
        keywords: '',
        isSignContract: '',
        isOnline: 2,
        resourceType: ''
      },
      contractStateOptions: [
        {
          value: '0',
          label: '未签约'
        },
        {
          value: '1',
          label: '已签约'
        }
      ],
      onlineStateOptions: [
        {
          value: '0',
          label: '下线'
        },
        {
          value: '1',
          label: '上线'
        }
      ],
      resourceTypeOptions: Object.keys(RESOURCE_TYPES).map(type => {
        return {
          value: RESOURCE_TYPES[type],
          label: type
        }
      })
    }
  },
  components: {
    FreelogSwitch,
    SearchResource,
    PageBuild,
    PresentableList
  },

  watch: {},

  mounted() {
  },
  methods: {
    searchHandler(params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          this.params[key] = params[key]
        } else {
          delete this.params[key]
        }
      })

      Object.assign(this.searchData, this.params)
      this.$refs.presentableList.reload()
    },
    changePresentableOnlineHandler(presentable) {
      console.log('presentable ---', presentable)
      if (presentable.status & 3 !== 3) {
        return this.$error.showErrorMessage('合同不完备或不存在可用策略')
      }

      if (presentable.isLoading) return

      if (RESOURCE_TYPES.pageBuild === presentable.resourceInfo.resourceType) {
        this.$confirm(`确定${presentable.isOnline ? '下' : '上'}线${presentable.presentableName}?上线后将自动替换当前页面样式`)
          .then(() => {
            return this.changePresentableStatus(presentable)
              .then(() => {
                this.$refs.pagebuildRef.refresh()
              })
          })
          .catch(() => {
            presentable.isOnlineChecked = !!presentable.isOnline
          })
      } else {
        this.changePresentableStatus(presentable)
      }
    },
    changePresentableStatus(presentable) {
      presentable.isLoading = true
      const url = `/v1/auths/presentables/${presentable.presentableId}/presentableTreeAuthTest`
      return this.$axios.get(url)
        .then(res => {
          const {errcode, ret, msg, data} = res.data
          if (errcode !== 0 || ret !== 0 || data.isAuth === false) {
            presentable.isLoading = false
            return Promise.reject(data.isAuth === false ? '未获得授权' : msg)
          }

          if (presentable.isOnlineChecked) {
            presentable.isOnline = 1
          } else {
            presentable.isOnline = 0
          }
          return this.$axios.put(`/v1/presentables/${presentable.presentableId}/onlineOrOffline`, {
            isOnline: presentable.isOnline
          }).then((res) => {
            presentable.isLoading = false
            if (!(res.data.errcode === 0 && res.data.errcode === 0)) {
              return Promise.reject(res.data.msg || '更新失败')
            }
          })
        })
        .catch((err) => {
          presentable.isLoading = false
          presentable.isOnlineChecked = !presentable.isOnlineChecked
          presentable.isOnline = presentable.isOnlineChecked ? 1 : 0
          this.$error.showErrorMessage(err)
        })
    },
    showSearchResourceHandler() {
      this.showSearchResource = true
    },
    beforeCloseDialogHandler() {
      this.showSearchResource = false
    },
    addResourceHandler(resource) {
      this.createPresentable({
        nodeId: this.$route.params.nodeId,
        presentableName: resource.resourceName,
        resourceId: resource.resourceId
      }).then((presentable) => {
        this.refresh()
        this.showSearchResource = false
      }).catch(this.$error.showErrorMessage)
    },
    createPresentable(data) {
      return this.$services.presentables.post(data).then((res) => {
        if (res.data.errcode !== 0) {
          return Promise.reject(res.data.msg)
        }
        return res.getData()
      })
    },
    deletePresentableHandler(presentable) {
      this.$confirm(`确定删除${presentable.presentableName}?`)
        .then(() => {
          this.$services.presentables.delete(presentable.presentableId)
            .then(({data}) => {
              var {ret, errcode, msg} = data
              if (ret === 0 && errcode === 0 && data.data) {
                this.$message.success('成功删除')
                this.refresh()
              } else {
                this.$message.fail(msg)
              }
            })
        }).catch(() => {
      })
    },
    refresh(){
      this.$refs.presentableList.refresh()
    },
    showSeachInputHandler(flag) {
      this.isEntering = (flag === undefined) ? !this.isEntering : flag
    }
  }
}
