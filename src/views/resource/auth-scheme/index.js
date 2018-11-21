import {cloneDeep, uniqBy, intersectionBy} from 'lodash'
import PolicyEditor from '@/components/policyEditor/index.vue'
import {onloadSchemesForResource} from '@/data/scheme/loader'
import {SCHEME_STATUS} from '@/config/scheme'
import {onloadResourceDetail} from '@/data/resource/loader'
import ResourceAuthScheme from './auth-scheme.vue'

// intersectionWith
function getUUID() {
  return Math.random().toString().substr(2)
}


const PUBLISH_STATUS = {
  INIT: 0,
  PUBLISHED: 1,
  OFF_LINE: 2,
  DELETE: 4
}

export default {
  name: 'resource-auth-scheme-creator',
  components: {
    PolicyEditor,
    ResourceAuthScheme
  },
  data() {
    return {
      resourceId: this.$route.params.resourceId,
      tabs: [],
      resourceDetail: {
        dependencies: [],
        resourceId: '',
        authSchemes: [{}]
      },
      curTabName: '',
      tabsSchemeMap: {},
      schemeList: [],
      enableEditDependency: true,
      resourceDepChanged: false,
      showErrorTip: false
    }
  },
  mounted() {
    // 查询依赖树
    this.loadDeps()
      .then((depData) => {
        const rids = [this.resourceId]
        this.computeDependencyTree(depData)
        depData.dependencies.forEach((dep) => {
          rids.push(dep.resourceId)
        })

        return onloadResourceDetail(this.resourceId).then((detail) => {
          this.resourceDetail = Object.assign(detail, depData)
        })
      })
      .then(() => {
        onloadSchemesForResource(this.resourceId, {policyStatus: 2}).then((authSchemes) => {
          if (authSchemes && authSchemes.length) {
            authSchemes.forEach((scheme) => {
              if (scheme.status === PUBLISH_STATUS.PUBLISHED) {
                this.enableEditDependency = false
              }
              this.createTab(scheme)
            })
            this.setActiveTab(0)
          } else {
            this.createTab()
          }
        })
      })
  },
  computed: {
    isInitStatus() {
      const curScheme = this.tabsSchemeMap[this.curTabName]
      return (curScheme && !curScheme.authSchemeId) || (curScheme && curScheme.authSchemeId && curScheme.status === PUBLISH_STATUS.INIT)
    }
  },
  methods: {
    // 计算每个资源的后续依赖子树
    computeDependencyTree(dep) {
      if (dep.dependencies) {
        let depsTree = []
        dep.dependencies.forEach((d) => {
          const deps = this.computeDependencyTree(d)
          depsTree = depsTree.concat(deps)
        })
        dep.dependenciesTree = uniqBy(dep.dependencies.concat(depsTree), 'resourceId')
        return dep.dependenciesTree
      }
      return []
    },
    initSchemeData(oldScheme) {
      const resourceDetail = this.resourceDetail
      let newScheme = {
        resourceId: resourceDetail.resourceId,
        dependencies: cloneDeep(resourceDetail.dependencies)
      }
      if (oldScheme) {
        newScheme = Object.assign(newScheme, oldScheme)
      }
      return this.initAuthScheme(newScheme)
    },
    initAuthScheme(scheme) {
      scheme = scheme || {}
      const DefaultScheme = {
        policyText: '',
        selectedPolicy: {},
        selectedScheme: {},
        selected: false,
        authSchemeName: '未命名的授权方案',
        bubbleResources: [],
        dutyStatements: [],
        authSchemes: [], // 当前资源的授权点列表
        dependencies: [] // 授权点管理的资源集合
      }

      Object.keys(DefaultScheme).forEach((key) => {
        if (!scheme[key]) {
          scheme[key] = DefaultScheme[key]
        }
      })

      return scheme
    },
    changeDepsHandler(detail) {
      switch (detail.action) {
        case 'add':
          this.addDependencies(detail.data)
          break
        case 'delete':
          this.deleteDependencies(detail.data)
          break
        case 'modify':
          this.modifyDependencies(detail.data)
          break
        default:
          break
      }

      this.resourceDepChanged = true
    },
    addDependencies(data) {
      const insec = intersectionBy(this.resourceDetail.dependencies, [data], 'resourceId')

      if (insec.length) {
        this.$message.warning('重复添加资源')
        return
      }

      this.resourceDetail.dependencies.push(cloneDeep(data))
      data.selected = false
      data.authSchemes = []
      onloadSchemesForResource(data.resourceId).then((list) => {
        if (list.length) {
          data.authSchemes = list
        }

        this.schemeList.forEach((scheme) => {
          scheme.dependencies.push(cloneDeep(data))
        })
      })
    },
    deleteDependencies(data) {
      this.schemeList.forEach((scheme) => {
        scheme.dependencies = scheme.dependencies.filter(dep => dep.resourceId !== data.resourceId)
      })
    },
    modifyDependencies(data) {
      this.schemeList.forEach((scheme) => {
        const deps = scheme.dependencies
        for (let i = 0, len = deps.length; i < len; i += 1) {
          const dep = deps[i]
          if (dep.resourceId === data.oldResource.resourceId) {
            onloadSchemesForResource(data.newResource.resourceId)
              .then(() => {
                deps.splice(i, 1, data.newResource)
              })
            break
          }
        }
      })
    },
    updateData(detail) {
      console.log(detail)
    },
    addTab(scheme) {
      const newTabName = scheme.authSchemeId || getUUID()
      this.tabs.push({
        title: scheme.authSchemeName || '未命名授权方案',
        name: newTabName,
        content: 'resource-auth-scheme',
        data: {
          id: newTabName,
          scheme,
          enableEditDependency: this.enableEditDependency,
          isPublished: scheme.status === PUBLISH_STATUS.PUBLISHED
        }
      })
      scheme.tabId = newTabName
      this.tabsSchemeMap[newTabName] = scheme
      this.curTabName = newTabName
    },
    createTab(oldScheme) {
      const newScheme = this.initSchemeData(oldScheme)
      this.schemeList.push(newScheme)
      this.addTab(newScheme)
    },
    removeTab(targetName) {
      const tabs = this.tabs
      let activeName = this.curTabName
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.curTabName = activeName
      this.tabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickTab(tab) {
      switch (tab.name) {
        case 'createTab':
          this.createTab()
          break
        default:
          break
      }
    },
    loadDeps() {
      const resourceId = this.resourceId || this.$route.query.resourceId
      return this.$axios.get(`/v1/resources/getResourceDependencyTree/${resourceId}`)
        .then(res => res.getData())
    },
    handleInputConfirm(ev) {
      ev.target.blur()
    },
    validate() {
      return Promise.resolve()
    },
    createAuthScheme(data) {
      return this.$services.authSchemes.post(data)
        .then((res) => {
          if (res.data.errcode === 0) {
            return res.getData()
          }
          throw new Error(res.data.msg)
        })
    },
    getDutyStateMents(deps) {
      const data = {
        dutyStatements: [],
        bubbleResources: [],
        unhandles: []
      }

      for (let i = 0; i < deps.length; i += 1) {
        const dep = deps[i]
        switch (dep.activeStatus) {
          case SCHEME_STATUS.NONE:
            data.bubbleResources.push({resourceId: dep.resourceId})
            break
          case SCHEME_STATUS.SOME:
          case SCHEME_STATUS.ALL:
            if (dep.selectedScheme) {
              data.dutyStatements.push({
                resourceId: dep.resourceId,
                authSchemeId: dep.selectedScheme.authSchemeId,
                policySegmentId: dep.selectedScheme.selectedPolicy.segmentId
              })
            }
            break
          case SCHEME_STATUS.UNHANDLE:
            data.unhandles.push(dep)
            break
          default:
            data.unhandles.push(dep)
        }

        const nextDeps = (dep.selectedScheme && dep.selectedScheme.dependencies)
        if (nextDeps && nextDeps.length) {
          const result = this.getDutyStateMents(nextDeps)
          Object.keys(result).forEach((key) => {
            data[key] = data[key].concat(result[key])
          })
        }

        if (data.unhandles.length) {
          break
        }
      }

      return data
    },
    updateAuthScheme(data, schemeData) {
      return this.$services.authSchemes.put(schemeData.authSchemeId, data)
        .then((res) => {
          if (res.data.errcode === 0) {
            return res.getData()
          }
          throw new Error(res.data.msg)
        })
    },
    updateDependenciesMeta(schemeData) {
      if (!this.resourceDepChanged) {
        return Promise.resolve()
      }

      const meta = Object.assign(this.resourceDetail.meta, {
        dependencies: schemeData.dependencies.map(dep => dep.resourceId)
      })
      return this.$services.resource.put(this.resourceDetail.resourceId, {
        meta
      }).then((res) => {
        if (res.data.errcode === 0) {
          return res
        }
        throw new Error(res.data.msg)
      })
    },
    nextHandler(schemeData) {
      return new Promise((resolve, reject) => {
        this.updateDependenciesMeta(schemeData).then(() => {
          this.validate()
            .then(() => {
              const data = this.resolveSchemeData(schemeData)
              if (!schemeData.authSchemeId) {
                this.createAuthScheme(data).then((res) => {
                  schemeData.authSchemeId = res.authSchemeId
                  // schemeData.policy = res.policy bug
                  Object.assign(schemeData, res)
                  resolve(res)
                }).catch(reject)
              } else {
                this.updateAuthScheme(data, schemeData).then((res) => {
                  // schemeData.policy = res.policy bug
                  // Object.assign(schemeData, res)
                  resolve(res)
                }).catch(reject)
              }
            }).catch(reject)
        }).catch(reject)
      })
    },
    resolveSchemeData(schemeData) {
      const data = {
        authSchemeName: schemeData.authSchemeName
      }

      if (schemeData.authSchemeId) {
        if (schemeData.policies) {
          const existed = {}
          data.policies = {}
          schemeData.policies.forEach((p) => {
            if (p.policySegmentId) {
              data.policies.updatePolicySegments = data.policies.updatePolicySegments || []
              data.policies.updatePolicySegments.push({
                policySegmentId: p.policySegmentId,
                policyName: p.policyName,
                status: p.disabled ? 0 : 1
              })
              existed[p.policySegmentId] = 1
            } else if (p.policyText) {
              data.policies.addPolicySegments = data.policies.addPolicySegments || []
              data.policies.addPolicySegments.push({
                policyName: p.policyName,
                policyText: btoa(p.policyText)
              })
            }
          })

          // 统计删除的
          schemeData.policy.forEach((p) => {
            if (!existed[p.segmentId]) {
              data.policies.removePolicySegments = data.policies.removePolicySegments || []
              data.policies.removePolicySegments.push(p.segmentId)
            }
          })
        }
      } else {
        data.resourceId = this.resourceDetail.resourceId
        if (schemeData.policies) {
          const policies = []
          schemeData.policies.forEach((p) => {
            if (p.policyText && p.policyName && !p.disabled) {
              policies.push({
                policyName: p.policyName,
                policyText: btoa(p.policyText)
              })
            }
          })
          if (policies.length) data.policies = policies
        }
      }

      if (schemeData.status !== PUBLISH_STATUS.PUBLISHED) {
        const schemeSelections = this.getDutyStateMents(schemeData.dependencies)
        if (schemeSelections.unhandles.length) {
          throw new Error('有资源未选择授权策略')
        } else {
          data.dutyStatements = uniqBy(schemeSelections.dutyStatements, 'resourceId')
          data.bubbleResources = uniqBy(schemeSelections.bubbleResources, 'resourceId')
        }
      }
      return data
    },
    backToResourceInfoHandler() {
      this.$router.push(`/resource/detail/${this.$route.params.resourceId}`)
    },
    saveSchemeHandler() {
      const curTabName = this.curTabName
      const scheme = this.tabsSchemeMap[curTabName]
      this.nextHandler(scheme).then((schemeDetail) => {
        scheme.policy = schemeDetail.policy
        if (scheme.status === 0) {
          return this.createSchemeContracts(scheme).then(() => {
            scheme.status = SCHEME_STATUS.PUBLISHED
            this.$message.success('创建成功')
            this.$router.push(`/resource/detail/${scheme.resourceId}`)
          })
        }
        return this.$message.success('操作成功')
      }).catch(this.$error.showErrorMessage)
    },
    validateSchemeOptions(dependencies) {
      let flag = true

      for (let i = 0; i < dependencies.length; i += 1) {
        const dep = dependencies[i]
        if (flag === false || dep.activeStatus === undefined || dep.activeStatus === SCHEME_STATUS.UNHANDLE) {
          flag = false
          break
        }
      }

      if (flag) {
        for (let i = 0; i < dependencies.length; i += 1) {
          const dep = dependencies[i]
          if (dep.selectedScheme.dependencies) {
            flag = this.validateSchemeOptions(dep.selectedScheme.dependencies)
            if (flag === false) {
              break
            }
          }
        }
      }

      return flag
    },
    createSchemeContracts(scheme) {
      return this.$axios.put(`/v1/resources/authSchemes/batchSignContracts/${scheme.authSchemeId}`).then((res) => {
        if (res.data.errcode === 0) {
          return res.getData()
        }
        return Promise.reject(res.data.msg)
      })
    },
    tmpSaveAndQuitHandler() {
      const scheme = this.tabsSchemeMap[this.curTabName]

      this.nextHandler(scheme).then(() => {
        this.$message.success('操作成功')
        this.$router.push(`/resource/detail/${scheme.resourceId}`)
      }).catch(this.$error.showErrorMessage)
    },
    deleteAuthSchemeHandler(tab) {
      this.$confirm('确定删除授权方案？', {}).then(() => {
        const tabId = tab.data.id
        const scheme = this.deleteAuthSchemeById(tabId)
        if (!scheme || !scheme.authSchemeId) {
          this.deleteTabById(tabId)
        }
        this.setActiveTab()
      }).catch(() => {

      })
    },
    setActiveTab(index) {
      if (this.tabs.length) {
        index = index === undefined ? (this.tabs.length - 1) : index
        this.curTabName = this.tabs[index].name
      }
    },
    deleteTabById(tabId) {
      for (let i = 0, len = this.tabs.length; i < len; i += 1) {
        const tabData = this.tabs[i]
        if (tabData.data.id === tabId) {
          this.tabs.splice(i, 1)
          break
        }
      }
    },
    deleteAuthSchemeById(id) {
      for (let i = 0, len = this.schemeList.length; i < len; i += 1) {
        const scheme = this.schemeList[i]
        if (scheme.tabId === id) {
          this.schemeList.splice(i, 1)
          if (scheme.authSchemeId) {
            this.deleteScheme(scheme.authSchemeId)
              .then(this.updateSchemesData.bind(this))
          }
          return scheme
        }
      }

      return null
    },
    updateSchemesData() {
      this.tabs.forEach((tab) => {
        tab.data.enableEditDependency = this.enableEditDependency
      })
    },
    deleteScheme(authSchemeId) {
      return this.$services.authSchemes.delete(authSchemeId).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('成功删除授权方案')

          var flag = true
          this.tabs.forEach((tab) => {
            if (tab.data.scheme.authSchemeId === authSchemeId) {
              tab.data.isPublished = false
            }

            if (tab.data.isPublished === true) {
              flag = false
            }
          })

          this.enableEditDependency = flag
        } else {
          this.$error.showErrorMessage(res)
        }
      })
    },
    inputDownHandler(ev) {
      const keyCode = ev.keyCode
      // 屏蔽elementUI左右快捷键的操作
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        ev.stopPropagation()
      }
    }
  }
}
