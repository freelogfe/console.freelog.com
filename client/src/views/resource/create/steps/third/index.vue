<template>
  <section class="third-step">
    <div class="top-tab-wrap">
      <el-tabs v-model="curTabName" type="card" @tab-remove="removeTab" @tab-click="clickTab">
        <el-tab-pane
          closable
          v-for="(item, index) in tabs"
          :key="index"
          :name="item.name">
          <span slot="label">
            <el-button class="auth-name" type="text">
            <input type="text"
                   class="input-auth-name"
                   v-model="item.title"
                   @keyup.enter="handleInputConfirm">
          </el-button>
          </span>
          <component :is="item.content" :params="item.data" :updateCallback="updateData"></component>
        </el-tab-pane>
        <el-tab-pane name="addTab">
          <span slot="label" class="add-new-scheme-tab-btn"><i class="el-icon-plus"></i>添加新授权方案</span>
        </el-tab-pane>
      </el-tabs>

      <el-button @click="logHandler">logger</el-button>
    </div>
  </section>
</template>

<script>
  import resourceCompiler from '@freelog/resource-policy-compiler'
  import PolicyEditor from '@/components/policyEditor/index.vue'
  import ResourceAuthScheme from './auth-scheme.vue'
  import CONFIG from '@/config/index'

  const {RESOURCE_TYPES} = CONFIG

  export default {
    name: 'resource-creator-third-step',
    components: {
      PolicyEditor,
      ResourceAuthScheme
    },

    props: {
      data: {
        type: Object
      }
    },

    data() {
      return {
        tabs: [{
          title: '未命名授权方案',
          name: 'A',
          content: 'resource-auth-scheme'
        }],
        schemeData: {
          policyText: '',
          authSchemeName: '未命名授权方案',
          dutyStatements: []
        },
        curTabName: 'A',
        schemes: [],
        current: {},
        checkList: {},
        currentResourceIndex: '',
        currentAuthNodeIndex: 0,
        detail: {
          dependencies: []
        },
        originSchemeData: {},
        schemesMap: {}
      }
    },
    mounted() {

      if (this.data.resourceId) {
        this.loadAuthSchemes([this.data.resourceId]).then((data) => {
          if (data.length) {
            this.originSchemeData = data[0]
            Object.assign(this.schemeData, Object.assign({}, this.originSchemeData))
          }
        })
      }

      this.loadDeps().then((detail) => {
        this.loadDependeciesAuthSchemes(detail.dependencies)
          .then(() => {
            this.detail = detail
          })
      })
    },
    watch: {},
    methods: {
      logHandler() {
        console.log(this.tabs)
      },
      updateData(detail) {
        console.log(data)
        if (this.schemesMap[detail.id]) {
          Object.assign(this.schemesMap[detail.id], detail.data)
        }
      },
      addTab() {
        let newTabName = Math.random().toString().substr(2);
        this.tabs.push({
          title: '未命名授权方案',
          name: newTabName,
          content: 'resource-auth-scheme',
          data: {
            id: newTabName
          }
        });
        this.schemesMap[newTabName] = {}
        console.log(this.tabs)
        this.curTabName = newTabName;
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
          case 'addTab':
            this.addTab();
            break;
        }
      },
      changeSchemeName(ev) {
        this.schemeData.authSchemeName = ev.target.value
      },
      loadDependeciesAuthSchemes(deps) {
        if (!deps || !deps.length) {
          return Promise.resolve()
        }

        var rids = deps.map((dep) => {
          dep.checked = false
          dep.selected = false
          dep.authNodeList = []
          dep.authSchemes = []
          return dep.resourceId
        })

        return this.loadAuthSchemes(rids).then((data) => {
          var authSchemeMap = data.reduce((authSchemeMap, scheme) => {
            if (!authSchemeMap[scheme.resourceId]) {
              authSchemeMap[scheme.resourceId] = []
            }
            scheme.active = false
            scheme.selectPolicy = ''
            scheme.checked = false
            authSchemeMap[scheme.resourceId].push(scheme)
            return authSchemeMap
          }, {});
          deps.forEach((dep) => {
            dep.authSchemes = dep.authSchemes.concat(authSchemeMap[dep.resourceId] || [])
          })
        })
      },
      loadDeps() {
        var resourceId = this.data.resourceId || this.$route.query.resourceId;
        return this.$axios.get(`/v1/resources/getResourceDependencyTree/${resourceId}`)
          .then((res) => {
            return res.getData()
          })
      },
      loadAuthSchemes(resourceIds) {
        return this.$axios.get(`/v1/resources/authSchemes`, {
          params: {
            resourceIds: resourceIds.join(',')
          }
        }).then((res) => {
          return res.getData()
        })
      },
      handleInputConfirm(ev) {
        ev.target.blur()
      },
      computeLineArrow(target, _from, to) {
        this.$nextTick(() => {
          var fromRect = _from.getBoundingClientRect()
          var toRect = to.getBoundingClientRect()

          target.style.top = (_from.offsetTop + 10) + 'px'//(fromRect.top+document.documentElement.scrollTop) + 'px'
          target.style.left = (_from.offsetLeft + fromRect.width + 5) + 'px'
          target.style.right = '6px'
          target.style.display = 'block'
        })
      },
      changeResourceScheme(authNode, index, ev) {
        this.schemes = []
        this.currentResourceIndex = index

        if (authNode.bubbleResourceIds.length) {
          authNode.dependencies = authNode.bubbleResourceIds;
          this.loadDependeciesAuthSchemes(authNode.dependencies)
        }

        this.schemes.push(authNode)
        authNode.active = true
        var curTarget = ev.currentTarget
        var parentNode = this.getParent(curTarget, '.dep-list-inner')
        var target = parentNode.querySelector('.line-arrow')
        this.hideLineArrow(this.$el.querySelector('.auth-scheme-wrap'))
        this.computeLineArrow(target, curTarget.querySelector('.title'), this.$el.querySelector('.auth-scheme-wrap'))
      },
      selectAuthScheme(scheme) {
        if (scheme.selectPolicy === '' && scheme.policy.length > 1) {
          return this.$message.warning('未选择授权策略')
        }
        scheme.checked = !scheme.checked

        this.data.deps[this.currentResourceIndex].selected = this.schemes.some((scheme) => {
          return scheme.checked
        })
      },
      getParent(el, selector) {
        if (!selector) {
          return el.parentNode
        } else {
          var target = el.parentNode
          var isId = selector[0] === '#';
          selector = selector.substr(1)
          while (!((isId && target.id === selector) || (!isId && target.className.indexOf(selector) > -1)) && target !== document.body) {
            target = target.parentNode
          }

          return target
        }
      },
      selectAuthNode(authNode, index, ev) {
        index++
        var len = this.schemes.length;
        var diff = len - index
        this.currentAuthNodeIndex = index
        if (diff > 0) {
          for (var i = 0; i < diff; i++) {
            this.schemes.pop()
          }
        }
        this.schemes.push(authNode)
        var parentNode = this.getParent(ev.currentTarget, '.auth-scheme-list-wrap')
        var target = parentNode.querySelector('.line-arrow')
        this.computeLineArrow(target, ev.currentTarget.querySelector('.title'), parentNode)
      },
      hideLineArrow($el) {
        var $lines = $el.querySelectorAll('.line-arrow')
        $lines.forEach(($line) => {
          $line.style.display = 'none'
        })
      },
      validate() {
        return Promise.resolve()
      },
      createAuthScheme() {
        var schemeData = this.schemeData;
        var keys = ['authSchemeName', 'policyText']
        var data = {};

        keys.forEach((key) => {
          data[key] = schemeData[key]
        });
        if (data.policyText) {
          data.policyText = btoa(data.policyText)
        }
        data.resourceId = this.data.resourceId
        return this.$services.authSchemes.post(data)
          .then((res) => {
            if (res.data.errcode === 0) {
              return res.getData()
            } else {
              throw new Error(res.data.msg)
            }
          })
      },
      updateAuthScheme() {
        var originData = this.originSchemeData
        var schemeData = this.schemeData;
        var keys = ['authSchemeName', 'policyText']
        var data = {};

        console.log(originData, schemeData)
        keys.forEach((key) => {
          if (originData[key] !== schemeData[key]) {
            data[key] = schemeData[key]
          }
        });
        if (data.policyText) {
          data.policyText = btoa(data.policyText)
        }

        if (Object.keys(data).length === 0) {
          return Promise.resolve()
        }

        data.resourceId = this.data.resourceId

        return this.$services.authSchemes.put(this.schemeData.authSchemeId, data)
          .then((res) => {
            if (res.data.errcode === 0) {
              return res.getData()
            } else {
              throw new Error(res.data.msg)
            }
          })
      },
      nextHandler() {
        return new Promise((resolve, reject) => {
          this.validate()
            .then(() => {
              if (this.data.currentStep === 4) {
                alert('已签约')
              } else {
                if (!this.schemeData.authSchemeId) {
                  this.createAuthScheme().then(resolve).catch(reject)
                } else {
                  this.updateAuthScheme().then(resolve).catch(reject)
                }
              }
            }).catch(reject)
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
