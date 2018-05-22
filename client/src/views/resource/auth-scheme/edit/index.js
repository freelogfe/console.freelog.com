import {cloneDeep} from 'lodash'
import PolicyEditor from '@/components/policyEditor/index.vue'
import ResourceAuthScheme from './auth-scheme.vue'
import DataLoader from './data'

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
      schemesMap: {},
      resourceSchemes: {},
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
        depData.dependencies.forEach((dep) => {
          rids.push(dep.resourceId)
        })
        this.resourceDetail = depData;
        //查询授权点
        return DataLoader.loadAuthSchemes({resourceIds: rids})
      })
      .then(() => {
        this.resourceDetail.dependencies.forEach((dep) => {
          DataLoader.loadSchemesForResource(dep.resourceId).then((authSchemes) => {
            dep.authSchemes = authSchemes
          })
        })

        DataLoader.loadSchemesForResource(this.resourceId).then((authSchemes) => {
          if (authSchemes && authSchemes.length) {
            authSchemes.forEach((scheme) => {
              if (scheme.status === PUBLISH_STATUS.PUBLISHED) {
                this.enableEditDependency = false
              }
              this.createTab(scheme)
            })
          } else {
            this.createTab()
          }
        })
      })

  },
  watch: {},
  methods: {
    initSchemeData(oldScheme) {
      var resourceDetail = this.resourceDetail;
      var newScheme = {
        resourceId: resourceDetail.resourceId,
        dependencies: cloneDeep(resourceDetail.dependencies)
      }
      if (oldScheme) {
        newScheme = Object.assign(newScheme, oldScheme);
      }
      return DataLoader.initAuthScheme(newScheme)
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
      data.selected = false
      data.authSchemes = []
      DataLoader.loadSchemesForResource(data.resourceId).then((list) => {
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
            DataLoader.loadSchemesForResource(data.newResource.resourceId).then(() => {
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
    getDutyStateMents(schemeData) {
      var dutyStatements = [];
      console.log(schemeData)
      schemeData.dependencies.forEach((dep) => {
        if (dep.selectedAuthScheme && (dep.checked || dep.selected)) {
          dutyStatements.push({
            resourceId: dep.resourceId,
            authSchemeId: dep.selectedAuthScheme.authSchemeId,
            policySegmentId: dep.selectedPolicy.segmentId,
            serialNumber: dep.selectedAuthScheme.serialNumber
          });

          if (dep.selectedAuthScheme.dependencies && dep.selectedAuthScheme.dependencies.length) {
            dutyStatements = dutyStatements.concat(this.getDutyStateMents(dep.selectedAuthScheme))
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
      var data = this.resolveSchemeData(schemeData)
      console.log(data)
      return Promise.resolve()
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
          // this.$router.push('/')
        })
      }).catch(this.$error.showErrorMessage)
    },
    signScheme() {
      var scheme = this.tabsSchemeMap[this.curTabName]
      return this.$axios.put(`/v1/resources/authSchemes/batchSignContracts/${scheme.authSchemeId}`)
    },
    tmpSaveAndQuitHandler() {
      var scheme = this.tabsSchemeMap[this.curTabName]
      this.nextHandler(scheme).then(() => {
        this.$message.success('操作成功')
        // this.$router.push('/resource/list')
      }).catch(this.$error.showErrorMessage)
    },
    deleteAuthSchemeHandler(tab) {
      console.log(tab)
      this.$confirm('确定删除授权方案？', {}).then(() => {
        let tabId = tab.data.id;
        this.deleteTabById(tabId)
        this.deleteAuthSchemeById(tabId)
        this.setActiveTab()
      }).catch(() => {

      })
    },
    setActiveTab() {
      if (this.tabs.length) {
        this.curTabName = this.tabs[this.tabs.length - 1].name
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
          scheme.authSchemeId && this.deleteScheme(scheme.authSchemeId)
          break;
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
