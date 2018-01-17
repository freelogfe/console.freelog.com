import compiler from 'presentable_policy_compiler'
import PresentableSteps from '@/views/node/presentable/steps/index.vue'
import PresentableContractDetail from '../contract/detail/index.vue'
import PresentablePolicy from '../policy/index.vue'
import FreelogTags from '@/components/Tags/index.vue'
import {RESOURCE_TYPES} from '@/config/resource'
import PresentableBindWidget from './bind.vue'
import ContractDetailInfo from './contract.vue'
import ResourceDetailInfo from './resource.vue'

export default {
  name: 'presentable-detail',
  data() {
    return {
      showBindWidgetDialog: false,
      bindWidget: {},
      detail: {},
      activeTabName: 'resource',
      nodeId: this.$route.params.nodeId,
      showSteps: false
    }
  },
  components: {
    PresentableSteps,
    PresentableContractDetail,
    PresentablePolicy,
    FreelogTags,
    PresentableBindWidget,
    ContractDetailInfo,
    ResourceDetailInfo
  },

  mounted() {
    const query = this.$route.query

    if (this.$route.hash) {
      this.activeTabName = this.$route.hash.slice(1)
    }
    this.loadDetailData(query)
      .then(this.formatData.bind(this))
  },
  methods: {
    isPageBuild(data) {
      return (data.tagInfo.resourceInfo.resourceType === RESOURCE_TYPES.pageBuild)
    },
    loadDetailData(param) {
      var promise
      var isPageBuild = (param.ispb === 'true')
      var presentableId = param.presentableId
      if (presentableId) {
        if (isPageBuild) {
          promise = this.loadPagebuildPresentableDetail(presentableId)
        } else {
          promise = this.loadPresentableDetail(presentableId)
            .then((presentable) => {
              if (this.isPageBuild(presentable)) {
                return this.loadPagebuildPresentableDetail(presentableId)
              } else {
                return this.loadResourceDetail(presentable.resourceId).then((resource) => {
                  var data = {
                    presentableInfo: presentable,
                    resourceInfo: resource,
                    widgets: []
                  }
                  return data
                })
              }
            })
        }
        return promise.then((detail) => {
          return this.loadContractDetail(detail.presentableInfo.contractId)
            .then((contract) => {
              detail.contractInfo = contract
              return detail
            })
        })
      } else if (param.contractId) {
        return this.loadContractDetail(param.contractId)
          .then((contract) => {
            var data = {
              contractInfo: contract,
              widgets: [],
              presentableInfo: null
            };
            return this.loadResourceDetail(contract.resourceId).then((resource) => {
              data.resourceInfo = resource
              return data;
            })
            //目前接口无法通过contractId查询到presentable
            // if (isPageBuild) {
            //   return this.loadPagebuildPresentableDetail(presentableId).then((detail) => {
            //     Object.assign(data, detail)
            //     return data;
            //   })
            // } else {
            //   return this.loadPresentableDetail(presentableId)
            //     .then((presentable) => {
            //       if (this.isPageBuild(presentable)) {
            //         return this.loadPagebuildPresentableDetail(param.presentableId).then((detail) => {
            //           Object.assign(data, detail)
            //           return data;
            //         })
            //       } else {
            //         return this.loadResourceDetail(presentable.resourceId).then((resource) => {
            //           data.presentableInfo = presentable
            //           data.resourceInfo = resource
            //           return data;
            //         })
            //       }
            //     })
            // }
          })
      } else {
        this.$message.error('缺少参数')
      }
    },
    loadPagebuildPresentableDetail(presentableId) {
      return this.$axios.get(`/v1/presentables/pageBuildAssociateWidgetContract?presentableId=${presentableId}`)
        .then((res) => {
          return res.getData()
        })
    },
    beautifySegmentText(text) {
      if (text) {
        return compiler.compile(text, 'beautify').stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
      } else {
        return ''
      }
    },
    formatData(detail) {
      var presentableId = detail.presentableInfo && detail.presentableInfo.presentableId
      if (presentableId) {
        detail.presentableInfo.policy.forEach((segment) => {
          segment._formatSegmentText = this.beautifySegmentText(segment.segmentText)
        })
        detail._formatSegmentText = this.beautifySegmentText(detail.policyText)

        detail.widgets.forEach((widget) => {
          widget.createLink = `/node/${this.nodeId}/presentable/create?resourceId=${widget.resourceId}&pbPresentableId=${presentableId}`
          widget.loading = false
          return widget
        })

        //用于对比presentable是否有修改
        this.originPresentable = {
          name: detail.presentableInfo.name,
          policyText: detail.presentableInfo.policyText,
          userDefinedTags: detail.presentableInfo.tagInfo.userDefined.join(',')
        }
      }
      console.log(detail)
      this.detail = detail
      this.showSteps = !presentableId
    },
    loadResourceDetail(resId) {
      return this.$services.resource.get(resId).then((res) => {
        if (res.data.errcode === 0) {
          return res.getData();
        } else {
          throw new Error(res.data.msg)
        }
      })
    },
    loadPresentableDetail(param) {
      return this.$services.presentables.get(param || {})
        .then((res) => {
          if (res.data.errcode === 0) {
            return res.getData();
          } else {
            throw new Error(res.data.msg)
          }
        }).catch(this.$error.showErrorMessage)
    },
    loadContractDetail(param) {
      return this.$services.contract.get(param || {})
        .then((res) => {
          if (res.data.errcode === 0) {
            return res.getData();
          } else {
            throw new Error(res.data.msg)
          }
        }).catch(this.$error.showErrorMessage)
    },
    createUserPolicyHandler() {
      var path = `/node/${this.nodeId}/presentable/edit`
      this.$router.push({
        path: path,
        query: {
          contractId: this.detail.contractInfo.contractId
        }
      })
    },
    updatePresentableHandler() {
      var data = {
        name: this.detail.name,
        policyText: btoa(this.detail._formatSegmentText),
        userDefinedTags: this.detail.tagInfo.userDefined.join(',')
      };
      var param = {}
      Object.keys(this.originPresentable).forEach((key) => {
        if (data[key] !== this.originPresentable[key]) {
          param[key] = data[key]
        }
      });

      this.originPresentable = data
      this.$services.presentables.put(this.detail.presentableId.presentableId, param)
        .then((res) => {
          if (res.data.errcode === 0) {
            var data = res.getData()
            Object.assign(this.detail, data)
            this.$message.success('更新成功')
          } else {
            this.$message.error(res.data.msg || '更新失败')
          }
        }).catch(this.$error.showErrorMessage)
    },
    updateContractDetail() {
      this.loadContractDetail(this.detail.contractInfo.contractId).then((contract) => {
        Object.assign(this.detail.contractInfo, contract)
      })
    },
    activatedWidgetResourceHandler(activeArr) {
      var widgets = this.detail.widgets;
      activeArr.forEach((index) => {
        let widget = widgets[index]
        let promises = []
        if (!widget.resourceInfo) {
          let p1 = this.loadResourceDetail(widget.resourceId).then((resourceDetail) => {
            widget.resourceInfo = resourceDetail
          })
          let p2 = this.$services.policy.get(widget.resourceId).then((res) => {
            let policyData = res.getData();
            policyData.policy.forEach((p) => {
              p.created = false; //是否已经创建过合同
              p._formatSegmentText = this.beautifySegmentText(p.segmentText)
              p.forUsers = p.users.map((u) => {
                return {
                  type: u.userType,
                  users: u.users.join(',')
                }
              })
            })
            widget.policyData = policyData
          })
          promises.push(p1)
          promises.push(p2)
        }

        if (widget.contractId && (!widget.contractInfo || widget.contractInfo.contractId !== widget.contractId)) {
          let p = this.loadContractDetail(widget.contractId).then((detail) => {
            widget.contractInfo = detail
          })
          promises.push(p)
        }

        if (promises.length) {
          widget.loading = true
          Promise.all(promises)
            .then(() => {
              this.$set(widgets, index, widget)
              console.log(widget)
              widgets[index].loading = false
            }).catch(this.$error.showErrorMessage)
        }
      })
    },
    showBindWidgetDialogHandler(widget) {
      this.bindWidget = widget
      this.showBindWidgetDialog = true
    },
    bindDoneHandler(data) {
      console.log(data)
      this.showBindWidgetDialog = false
      if (data.selected) {
        this.bindPageBuildWidgetContract(data.detail)
      }
    },
    bindPageBuildWidgetContract(params) {
      this.$axios.post('/v1/presentables/pageBuildAssociateWidget', {
        pbPresentableId: this.detail.presentableInfo.presentableId,
        increaseContractIds: [params.contractId],
        removeContractIds: [params.removeContractId] //需要删除老的合同绑定
      }).then((res) => {
        if (res.data.errcode === 0) {
          this.bindWidget.contractId = params.contractId
          //refresh contract info
          this.$message.success('执行成功')
        } else {
          throw new Error(res.data.msg)
        }
      }).catch(this.$error.showErrorMessage)
    }
  }
}
