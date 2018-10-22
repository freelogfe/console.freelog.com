import {cloneDeep, uniqBy, intersectionBy} from 'lodash'
import PolicyEditor from '@/components/policyEditor/index.vue'
import ResourceAuthScheme from './auth-scheme.vue'
import SchemeDataLoader from '@/data/scheme/loader'
import {loopForBreak} from '@/lib/utils'
import {SCHEME_STATUS} from '@/config/scheme'
import ResourceLoader from '@/data/resource/loader'

//intersectionWith
function getUUID() {
  return Math.random().toString().substr(2);
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
    //查询依赖树
    this.loadDeps()
      .then((depData) => {
        var rids = [this.resourceId];
        this.computeDependencyTree(depData)
        depData.dependencies.forEach((dep) => {
          rids.push(dep.resourceId)
        })

        return ResourceLoader.loadDetail(this.resourceId).then(detail => {
          this.resourceDetail = Object.assign(detail, depData);
        })
      })
      .then(() => {
        SchemeDataLoader.onloadSchemesForResource(this.resourceId, {policyStatus: 2}).then((authSchemes) => {
          if (authSchemes && authSchemes.length) {
            authSchemes.forEach((scheme) => {
              if (scheme.status === PUBLISH_STATUS.PUBLISHED) {
                this.enableEditDependency = false
              }
              this.createTab(scheme)
            });
            this.setActiveTab(0)
          } else {
            this.createTab()
          }
        })
      })

  },
  watch: {},
  computed: {
    isInitStatus() {
      var curScheme = this.tabsSchemeMap[this.curTabName];
      return (curScheme && !curScheme.authSchemeId) || (curScheme && curScheme.authSchemeId && curScheme.status === PUBLISH_STATUS.INIT)
    }
  },
  methods: {
    //计算每个资源的后续依赖子树
    computeDependencyTree(dep) {
      if (dep.dependencies) {
        var depsTree = []
        dep.dependencies.forEach(d => {
          var deps = this.computeDependencyTree(d)
          depsTree = depsTree.concat(deps)
        });
        dep.dependenciesTree = uniqBy(dep.dependencies.concat(depsTree), 'resourceId')
        return dep.dependenciesTree
      } else {
        return []
      }
    },
    initSchemeData(oldScheme) {
      var resourceDetail = this.resourceDetail;
      var newScheme = {
        resourceId: resourceDetail.resourceId,
        dependencies: cloneDeep(resourceDetail.dependencies)
      }
      if (oldScheme) {
        newScheme = Object.assign(newScheme, oldScheme);
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
        authSchemes: [],  //当前资源的授权点列表
        dependencies: [] //授权点管理的资源集合
      };

      Object.keys(DefaultScheme).forEach((key) => {
        if (!scheme[key]) {
          scheme[key] = DefaultScheme[key]
        }
      });

      return scheme
    },
    changeDepsHandler(detail) {
      switch (detail.action) {
        case 'add':
          this.addDependencies(detail.data)
          break;
        case 'delete':
          this.deleteDependencies(detail.data);
          break;
        case 'modify':
          this.modifyDependencies(detail.data);
          break;
      }

      this.resourceDepChanged = true
    },
    addDependencies(data) {
      var insec = intersectionBy(this.resourceDetail.dependencies, [data], 'resourceId');

      if (insec.length) {
        this.$message.warning('重复添加资源')
        return;
      }

      this.resourceDetail.dependencies.push(cloneDeep(data))
      data.selected = false
      data.authSchemes = []
      SchemeDataLoader.onloadSchemesForResource(data.resourceId).then((list) => {
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
        scheme.dependencies = scheme.dependencies.filter((dep) => {
          return dep.resourceId !== data.resourceId
        })
      })
    },
    modifyDependencies(data) {
      this.schemeList.forEach((scheme) => {
        var deps = scheme.dependencies;
        for (var i = 0, len = deps.length; i < len; i++) {
          let dep = deps[i];
          if (dep.resourceId === data.oldResource.resourceId) {
            SchemeDataLoader.onloadSchemesForResource(data.newResource.resourceId).then(() => {
              deps.splice(i, 1, data.newResource)
            })
            break;
          }
        }
      })
    },
    updateData(detail) {
    },
    addTab(scheme) {
      let newTabName = scheme.authSchemeId || getUUID();
      this.tabs.push({
        title: scheme.authSchemeName || '未命名授权方案',
        name: newTabName,
        content: 'resource-auth-scheme',
        data: {
          id: newTabName,
          scheme: scheme,
          enableEditDependency: this.enableEditDependency,
          isPublished: scheme.status === PUBLISH_STATUS.PUBLISHED
        }
      });
      scheme.tabId = newTabName
      this.tabsSchemeMap[newTabName] = scheme
      this.curTabName = newTabName;
    },
    createTab(oldScheme) {
      var newScheme = this.initSchemeData(oldScheme)
      this.schemeList.push(newScheme)
      this.addTab(newScheme)
    },
    removeTab(targetName) {
      let tabs = this.tabs;
      let activeName = this.curTabName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.curTabName = activeName;
      this.tabs = tabs.filter(tab => tab.name !== targetName);
    },
    clickTab(tab) {
      switch (tab.name) {
        case 'createTab':
          this.createTab();
          break;
      }
    },
    loadDeps() {
      var resourceId = this.resourceId || this.$route.query.resourceId;
      return this.$axios.get(`/v1/resources/getResourceDependencyTree/${resourceId}`)
        .then((res) => {
          return res.getData()
        })
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
          } else {
            throw new Error(res.data.msg)
          }
        })
    },
    getDutyStateMents(deps) {
      var data = {
        dutyStatements: [],
        bubbleResources: [],
        unhandles: []
      };
      loopForBreak(deps, (dep) => {
        switch (dep.activeStatus) {
          case SCHEME_STATUS.NONE:
            data.bubbleResources.push({resourceId: dep.resourceId})
            break;
          case SCHEME_STATUS.SOME:
          case SCHEME_STATUS.ALL:
            if (dep.selectedScheme) {
              data.dutyStatements.push({
                resourceId: dep.resourceId,
                authSchemeId: dep.selectedScheme.authSchemeId,
                policySegmentId: dep.selectedScheme.selectedPolicy.segmentId
              });
            }
            break;
          case SCHEME_STATUS.UNHANDLE:
            data.unhandles.push(dep)
            break;
          default:
            data.unhandles.push(dep)
        }

        let nextDeps = (dep.selectedScheme && dep.selectedScheme.dependencies)
        if (nextDeps && nextDeps.length) {
          let result = this.getDutyStateMents(nextDeps)
          Object.keys(result).forEach(key => {
            data[key] = data[key].concat(result[key]);
          })
        }

        if (data.unhandles.length) {
          return true;
        }
      });

      return data
    },
    updateAuthScheme(data, schemeData) {
      return this.$services.authSchemes.put(schemeData.authSchemeId, data)
        .then((res) => {
          if (res.data.errcode === 0) {
            return res.getData()
          } else {
            throw new Error(res.data.msg)
          }
        })
    },
    updateDependenciesMeta(schemeData) {
      if (!this.resourceDepChanged) {
        return Promise.resolve()
      }

      var meta = Object.assign(this.resourceDetail.meta, {
        dependencies: schemeData.dependencies.map((dep) => {
          return dep.resourceId
        })
      });
      return this.$services.resource.put(this.resourceDetail.resourceId, {
        meta: meta
      }).then((res) => {
        if (res.data.errcode === 0) {
          return res;
        } else {
          throw new Error(res.data.msg)
        }
      })
    },
    nextHandler(schemeData) {
      return new Promise((resolve, reject) => {
        this.updateDependenciesMeta(schemeData).then(() => {
          this.validate()
            .then(() => {
              var data = this.resolveSchemeData(schemeData)
              if (!schemeData.authSchemeId) {
                this.createAuthScheme(data).then(res => {
                  schemeData.authSchemeId = res.authSchemeId;
                  // schemeData.policy = res.policy bug
                  Object.assign(schemeData, res)
                  resolve(res)
                }).catch(reject)
              } else {
                this.updateAuthScheme(data, schemeData).then(res => {
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
      var data = {
        authSchemeName: schemeData.authSchemeName
      };

      if (schemeData.authSchemeId) {
        if (schemeData.policies) {
          let existed = {}
          data.policies = {};
          schemeData.policies.forEach(p => {
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
          });

          //统计删除的
          schemeData.policy.forEach(p => {
            if (!existed[p.segmentId]) {
              data.policies.removePolicySegments = data.policies.removePolicySegments || []
              data.policies.removePolicySegments.push(p.segmentId)
            }
          })
        }
      } else {
        data.resourceId = this.resourceDetail.resourceId
        if (schemeData.policies) {
          let policies = []
          schemeData.policies.forEach(p => {
            if (p.policyText && p.policyName && !p.disabled) {
              policies.push({
                policyName: p.policyName,
                policyText: btoa(p.policyText)
              })
            }
          });
          policies.length && (data.policies = policies)
        }
      }

      if (schemeData.status !== PUBLISH_STATUS.PUBLISHED) {
        var schemeSelections = this.getDutyStateMents(schemeData.dependencies)
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
      var curTabName = this.curTabName;
      var scheme = this.tabsSchemeMap[curTabName]
      this.nextHandler(scheme).then(schemeDetail => {
        scheme.policy = schemeDetail.policy
        if (scheme.status === 0) {
          return this.createSchemeContracts(scheme).then((res) => {
            scheme.status = SCHEME_STATUS.PUBLISHED
            this.curTabName = '';
            this.$nextTick(() => {
              this.curTabName = curTabName
            })
            this.$message.success('创建成功')
            this.$router.push(`/resource/detail/${scheme.resourceId}`)
          })
        } else {
          this.$message.success('操作成功')
        }
      }).catch(this.$error.showErrorMessage)
    },
    validateSchemeOptions(dependencies) {
      var flag = true;
      loopForBreak(dependencies, (dep) => {
        if (flag === false || dep.activeStatus === undefined || dep.activeStatus === SCHEME_STATUS.UNHANDLE) {
          flag = false
          return true
        }
      });

      if (flag) {
        loopForBreak(dependencies, (dep) => {
          if (dep.selectedScheme.dependencies) {
            flag = this.validateSchemeOptions(dep.selectedScheme.dependencies)

            if (flag === false) {
              return true
            }
          }
        });
      }

      return flag;
    },
    createSchemeContracts(scheme) {
      return this.$axios.put(`/v1/resources/authSchemes/batchSignContracts/${scheme.authSchemeId}`).then(res => {
        if (res.data.errcode === 0) {
          return res.getData()
        } else {
          return Promise.reject(res.data.msg)
        }
      })
    },
    tmpSaveAndQuitHandler() {
      var scheme = this.tabsSchemeMap[this.curTabName]

      this.nextHandler(scheme).then(() => {
        this.$message.success('操作成功')
        this.$router.push(`/resource/detail/${scheme.resourceId}`)
      }).catch(this.$error.showErrorMessage)
    },
    deleteAuthSchemeHandler(tab) {
      this.$confirm('确定删除授权方案？', {}).then(() => {
        let tabId = tab.data.id;
        let scheme = this.deleteAuthSchemeById(tabId)
        if (!scheme.authSchemeId) {
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
      for (var i = 0, len = this.tabs.length; i < len; i++) {
        let tabData = this.tabs[i]
        if (tabData.data.id === tabId) {
          this.tabs.splice(i, 1)
          break;
        }
      }
    },
    deleteAuthSchemeById(id) {
      for (var i = 0, len = this.schemeList.length; i < len; i++) {
        let scheme = this.schemeList[i]
        if (scheme.tabId === id) {
          this.schemeList.splice(i, 1);
          if (scheme.authSchemeId) {
            this.deleteScheme(scheme.authSchemeId)
          }
          return scheme;
        }
      }
    },
    deleteScheme(authSchemeId) {
      return this.$services.authSchemes.delete(authSchemeId).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('成功删除授权方案');
        } else {
          this.$error.showErrorMessage(res)
        }
      })
    },
    inputDownHandler(ev) {
      const keyCode = ev.keyCode;
      //屏蔽elementUI左右快捷键的操作
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        ev.stopPropagation()
      }
    }
  }
}
