import compiler from '@freelog/presentable-policy-compiler'
import PresentableContractDetail from '../contract/detail/index.vue'
import PresentablePolicy from '@/components/policyEditor/index.vue'
import FreelogTags from '@/components/Tags/index.vue'
import {RESOURCE_TYPES} from '@/config/resource'
import PresentableBindWidget from './bind.vue'
import ContractDetailInfo from '@/components/detail-info/contract.vue'
import ResourceDetailInfo from '@/components/detail-info/resource.vue'
import PresentableEditor from '../editor/index.vue'

export default {
  name: 'presentable-detail',
  data() {
    return {
      showBindWidgetDialog: false,
      loading: false,
      bindWidget: {},
      detail: {},
      activeTabName: 'resource',
      nodeId: this.$route.params.nodeId,
      editPresentable: {
        name: '',
        policyText: '',
        userDefinedTags: []
      }
    }
  },
  components: {
    PresentableContractDetail,
    PresentablePolicy,
    FreelogTags,
    PresentableBindWidget,
    ContractDetailInfo,
    ResourceDetailInfo,
    PresentableEditor
  },

  computed: {
    shouldShowResourceWarning: function () {
      var widgets = this.detail.widgets
      if (widgets && widgets.length) {
        return widgets.some((w) => {
          return !w.contractId
        })
      } else {
        return false
      }
    },
    shouldShowPresentableWarning() {
      return this.detail.presentableInfo === null
    },
    shouldShowContractWarning() {
      return this.detail.contractInfo && ([1, 2].includes(this.detail.contractInfo.status))
    }
  },

  mounted() {
    const query = this.$route.query

    if (this.$route.hash) {
      this.activeTabName = this.$route.hash.slice(1)
    }

    this.loading = true
    this.loadDetailData(query)
      .then(this.formatData.bind(this))
      .then((detail) => {
        this.detail = detail
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        this.$error.showErrorMessage(err)
      })
  },
  methods: {
    isWidgetValid(widget){
      return widget.contractInfo && widget.contractInfo.status < 3
    },
    gotoExecContractHandler(widget) {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/presentable/detail#contract`,
        query: {contractId: widget.contractInfo.contractId}
      })
      location.reload()
    },
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
        return compiler.beautify(text);
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

        Object.assign(this.editPresentable, {
          name: detail.presentableInfo.name,
          policyText: detail.presentableInfo.policyText,
          userDefinedTags: detail.presentableInfo.tagInfo.userDefined
        })
      } else {
        this.editPresentable.name = detail.resourceInfo.resourceName
      }

      return detail
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
      var contractId = this.$route.query.contractId
      if (!contractId) {
        this.$message.error('没有资源Id, 请重新选择');
      }

      if (this.submitLoading) {
        return
      }
      var nodeId = parseInt(this.$route.params.nodeId)
      var param = {
        name: this.editPresentable.name,
        nodeId: nodeId,
        contractId: contractId,
        policyText: btoa(this.editPresentable.policyText),
        languageType: 'freelog_policy_lang',
        userDefinedTags: this.editPresentable.userDefinedTags.join(',')
      };
      this.submitLoading = true;
      this.$services.presentables.post(param).then((res) => {
        var data = res.getData()
        this.submitLoading = false;
        if (res.data.errcode !== 0) {
          this.$message.error(res.data.msg)
        } else {
          this.$message.success('创建成功');
          this.$set(this.detail, 'presentableInfo', data)
        }
      }).catch((err) => {
        this.submitLoading = false;
        this.$message.error(err.response.errorMsg);
      })
    },
    updatePresentableHandler() {
      let result = compiler.beautify(this.editPresentable.policyText)
      if (result.errorMsg) {
        this.$message.error(result.errorMsg)
        return;
      }
      var param = {
        name: this.editPresentable.name,
        policyText: btoa(this.editPresentable.policyText),
        userDefinedTags: this.editPresentable.userDefinedTags.join(',')
      };

      this.$services.presentables.put(this.detail.presentableInfo.presentableId, param)
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
        this.loadWidgetDetail(widget, index)
      })
    },
    loadWidgetDetail(widget, index) {
      var widgets = this.detail.widgets;
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

      if (index === undefined) {
        for (let [i, w] of widgets.entries()) {
          if (widget.contractId === w.contractId) {
            index = i
            break;
          }
        }
      }
      if (promises.length) {
        widget.loading = true
        Promise.all(promises)
          .then(() => {
            this.$set(widgets, index, widget)
            widgets[index].loading = false
          }).catch(this.$error.showErrorMessage)
      }
    },
    showBindWidgetDialogHandler(widget) {
      this.bindWidget = widget
      this.showBindWidgetDialog = true
    },
    bindDoneHandler(data) {
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
          this.loadWidgetDetail(this.bindWidget)
          this.$message.success('执行成功')
        } else {
          throw new Error(res.data.msg)
        }
      }).catch(this.$error.showErrorMessage)
    }
  }
}
