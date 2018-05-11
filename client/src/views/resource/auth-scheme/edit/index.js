import {cloneDeep} from 'lodash'
import PolicyEditor from '@/components/policyEditor/index.vue'
import ResourceAuthScheme from './auth-scheme.vue'

function getUUID() {
  return Math.random().toString().substr(2);
}


const PUBLISH_STATUS = {
  INIT: 0,
  PUBLISHED: 1,
  OFF_LINE: 2
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
      schemesMap: {},
      resourceSchemes: {},
      tabsSchemeMap: {},
      schemeList: [],
      resourceDepChanged: false,
      showErrorTip: false
    }
  },
  mounted() {
    //查询依赖树
    this.loadDeps()
      .then((depData) => {
        var rids = [];
        depData.dependencies.forEach((dep) => {
          dep.checked = false
          dep.selected = ''
          dep.active = false
          rids.push(dep.resourceId)
        })
        rids.push(this.resourceId)
        this.resourceDetail = depData;
        //查询授权点
        return this.loadAuthSchemes(rids)
      })
      .then(() => {
        // this.resourceDetail.authSchemes = authSchemes
        var authSchemes = this.resourceSchemes[this.resourceId];
        if (authSchemes && authSchemes.length) {
          authSchemes.forEach((scheme) => {
            this.createTab(scheme)
          })
        } else {
          this.createTab()
        }
      })

  },
  watch: {},
  methods: {
    initSchemeData(data) {
      var scheme = Object.assign({
        policyText: '',
        checked: false,
        selected: false,
        selectSegment: '',
        authSchemeId: '',
        serialNumber: '',
        authSchemeName: '未命名的授权方案',
        bubbleResources: [],
        dutyStatements: []
      }, data);

      var resourceSchemes = this.resourceSchemes;
      var toRequestResources = []
      scheme.dependencies.forEach((res) => {
        var authSchemes = resourceSchemes[res.resourceId]
        Object.assign(res, {
          checked: false,
          selectSegment: '',
          authSchemeId: '',
          serialNumber: ''
        })
        if (!authSchemes) {
          toRequestResources.push(res)
        }
      });

      this.loadAuthSchemes(toRequestResources.map((r) => r.resourceId)).then(() => {
        this.initSchemeState(scheme.dependencies, scheme)
      })
      return scheme
    },
    initSchemeState(resources, scheme) {
      var dutyMap = {}
      var dutyResources = {}
      var resourceSchemes = this.resourceSchemes;

      if (scheme.dutyStatements && scheme.dutyStatements.length) {
        scheme.dutyStatements.forEach((duty) => {
          dutyMap[duty.authSchemeId] = duty
          dutyResources[duty.resourceId] = duty
        })
      }
      resources.forEach((res) => {
        var authSchemes = resourceSchemes[res.resourceId]
        if (!authSchemes) {
          return
        }
        var dutyResource = dutyResources[res.resourceId]
        if (dutyResource) {
          Object.assign(res, {
            checked: true,
            selectSegment: dutyResource.policySegmentId,
            authSchemeId: dutyResource.authSchemeId,
            serialNumber: dutyResource.serialNumber
          })
        }
        if (authSchemes) {
          this.$set(res, 'authSchemes', cloneDeep(authSchemes))
        }
      });
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
      this.resourceDetail.dependencies.push(cloneDeep(data))
      data.checked = false
      data.selected = ''
      data.authSchemes = []
      this.loadAuthSchemes([data.resourceId]).then((list) => {
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
            this.loadAuthSchemes([data.newResource.resourceId]).then(() => {
              this.initSchemeState([data.newResource], scheme)
              deps.splice(i, 1, data.newResource)
            })
            break;
          }
        }
      })
    },
    updateData(detail) {
      // if (this.resourceSchemes[detail.id]) {
      //   Object.assign(this.resourceSchemes[detail.id], detail.data)
      // }
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
          isPublished: scheme.status === PUBLISH_STATUS.PUBLISHED
        }
      });
      this.tabsSchemeMap[newTabName] = scheme
      this.curTabName = newTabName;
    },
    createTab(oldScheme) {
      var resourceDetail = this.resourceDetail;
      var newScheme = {
        resourceId: resourceDetail.resourceId,
        dependencies: cloneDeep(resourceDetail.dependencies)
      }
      if (oldScheme) {
        newScheme = Object.assign(newScheme, oldScheme);
      }
      newScheme = this.initSchemeData(newScheme)
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
    //请求授权点列表
    loadAuthSchemes(resourceIds) {
      var resourceSchemes = this.resourceSchemes
      var list = []
      var requestIds = []
      resourceIds.forEach((rid) => {
        if (resourceSchemes[rid]) {
          list = list.concat(resourceSchemes[rid].slice(0))
        } else {
          requestIds.push(rid)
        }
      })


      if (!requestIds.length) {
        return Promise.resolve(list)
      }

      return this.$axios.get(`/v1/resources/authSchemes`, {
        params: {
          resourceIds: requestIds.join(',')
        }
      }).then((res) => {
        var data = res.getData()
        data.forEach((scheme) => {
          if (this.schemesMap[scheme.authSchemeId]) {
            return
          }
          if (!resourceSchemes[scheme.resourceId]) {
            resourceSchemes[scheme.resourceId] = []
          }
          resourceSchemes[scheme.resourceId].push(scheme)
          this.schemesMap[scheme.authSchemeId] = scheme
          list.push(scheme)
        });

        return list
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
    getDutyStateMents(schemeData) {
      var dutyStatements = [];
      schemeData.dependencies.forEach((dep) => {
        if (dep.selectSegment && (dep.checked || dep.selected)) {
          dutyStatements.push({
            resourceId: dep.resourceId,
            authSchemeId: dep.authSchemeId,
            policySegmentId: dep.selectSegment,
            serialNumber: dep.serialNumber || dep.authNode.serialNumber
          });

          if (dep.dependencies && dep.dependencies.length) {
            dutyStatements = dutyStatements.concat(this.getDutyStateMents(dep))
          }
        }
      })

      return dutyStatements
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
    updateDependenciesMeta() {
      return this.$services.resource.put(this.resourceDetail.resourceId, {
        meta: {
          dependencies: this.resourceDetail.dependencies.map((dep) => {
            return dep.resourceId
          })
        }
      })
    },
    nextHandler(schemeData) {
      if (this.resourceDepChanged) {
        this.updateDependenciesMeta();
      }
      // var data = this.resolveSchemeData(schemeData)
      // return Promise.resolve()
      return new Promise((resolve, reject) => {
        this.validate()
          .then(() => {
            var data = this.resolveSchemeData(schemeData)
            if (!schemeData.authSchemeId) {
              this.createAuthScheme(data).then(resolve).catch(reject)
            } else {
              this.updateAuthScheme(data, schemeData).then(resolve).catch(reject)
            }
          }).catch(reject)
      })
    },
    resolveSchemeData(schemeData) {
      var keys = ['authSchemeName', 'policyText']
      var data = {};

      keys.forEach((key) => {
        if (schemeData[key]) {
          data[key] = schemeData[key]
        }
      });
      if (data.policyText) {
        data.policyText = btoa(data.policyText)
      }
      data.resourceId = this.resourceDetail.resourceId

      var dutyStatements = this.getDutyStateMents(schemeData)

      if (dutyStatements.length) {
        data.dutyStatements = dutyStatements
      }
      return data
    },
    backToResourceInfoHandler() {
      this.$router.push(`/resource/detail/${this.$route.params.resourceId}`)
    },
    saveSchemeHandler() {
      var scheme = this.tabsSchemeMap[this.curTabName]
      this.nextHandler(scheme).then(() => {
        this.signScheme().then(() => {
          this.$message.success('操作成功')
          this.$router.push('/')
        })
      })
    },
    signScheme() {
      var scheme = this.tabsSchemeMap[this.curTabName]
      return this.$axios.put(`/v1/resources/authSchemes/batchSignContracts/${scheme.authSchemeId}`)
    },
    tmpSaveAndQuitHandler() {
      var scheme = this.tabsSchemeMap[this.curTabName]
      this.nextHandler(scheme).then(() => {
        this.$message.success('操作成功')
        this.$router.push('/resource/list')
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
