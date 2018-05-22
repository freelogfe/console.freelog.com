<template>
  <div class="auth-scheme-section clearfix">
    <div class="dep-list-wrap">
      <div class="dep-list-inner">
        <h4 class="policy-input-title"><i class="el-icon-question"></i>资源依赖列表</h4>
        <ul>
          <li v-for="(dep, index) in detail.scheme.dependencies" class="dep-item">
            <el-checkbox class="select-box" v-model="dep.checked"
                         @change="selectDependency(dep)"
                         :disabled="detail.isPublished"></el-checkbox>
            <div class="resource-name" :class="{active:dep.active}">
              <p>
                <i class="dot" :class="{selected: dep.selectedAuthScheme && !!dep.selectedAuthScheme.authSchemeId,
                active: detail.isPublished}"></i>{{dep.resourceName}}
                <i class="el-icon-edit" @click="editDepResource(dep)"></i>
              </p>
              <ul class="auth-node-list">
                <li class="auth-scheme-title"
                    @click="changeResourceScheme(dep, authNode, index, $event)"
                    v-for="authNode in dep.authSchemes">
                  <span class="title"><i class="dot"
                                         :class="{selected: (dep.selectedAuthScheme && dep.selectedAuthScheme.authSchemeId === authNode.authSchemeId), active: detail.isPublished}"></i>{{authNode.authSchemeName}}</span>
                </li>
              </ul>
              <div :class="'line-'+dep.resourceId" class="line-arrow">
                <i class="circle"></i>
              </div>
            </div>
          </li>
          <li class="dep-item">
            <el-button class="add-dep-resource-btn"
                       @click="addDepResource"
                       type="text">
              <i class="el-icon-plus"></i>添加引用资源
            </el-button>
          </li>
        </ul>
        <div class="policy-input-wrap">
          <h4 class="policy-input-title"><i class="el-icon-question"></i>授权方案策略</h4>
          <policy-editor v-model="detail.scheme.policyText" :showValidate="false"></policy-editor>
        </div>
      </div>
    </div>
    <div class="scheme-view-wrap">
      <div class="view-mode-tabs">
        <el-radio-group v-model="viewMode" @change="changeViewMode">
          <el-radio-button label="list" class="view-mode-type">
            <el-badge :value="dutyStatements.length" class="badge-num">
              <span>待签约列表</span>
            </el-badge>
          </el-radio-button>
          <el-radio-button label="tree" class="view-mode-type">资源依赖树</el-radio-button>
        </el-radio-group>
      </div>
      <div class="auth-dep-list-wrap" v-show="viewMode==='list'">
        <h4 class="policy-input-title"><i class="el-icon-question"></i>待签约列表</h4>
        <el-collapse accordion>
          <el-collapse-item :name="duty.resourceId" v-for="duty in dutyStatements" :key="duty.authSchemeId"
                            class="duty-resource">
            <template slot="title">
              <h4>{{duty.resourceName}}</h4>
              <div class="duty-resource-sub-title">{{duty.selectedAuthScheme.authSchemeName}}/{{duty.selectSegment}}
              </div>
            </template>
            <pre class="policy-segment-text">{{duty.selectedPolicy.segmentText}}</pre>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="auth-scheme-wrap" v-show="viewMode==='tree'">
        <div class="auth-scheme-list-wrap" :key="index" v-for="(scheme,index) in schemes">
          <div class="step-title">{{scheme.activeAuthScheme.authSchemeName}}</div>
          <ul>
            <li v-for="dep in scheme.activeAuthScheme.dependencies" class="dep-item">
              <div class="resource-name">
                <p><i class="dot"
                      :class="{active: dep.done || dep.selected}"></i>{{dep.resourceName||dep.resourceId}}
                </p>
                <ul class="auth-node-list">
                  <li class="auth-scheme-title" @click="selectAuthNode(dep, authNode, index, $event)"
                      v-for="authNode in dep.authSchemes">
                  <span class="title">
                    <i class="dot"
                       :class="{active: (dep.selectedAuthScheme&&dep.selectedAuthScheme.authSchemeId === authNode.authSchemeId)}"></i>{{authNode.authSchemeName}}</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="policy-wrap" v-if="scheme.activeAuthScheme.policy">
            <h3 style="margin-bottom: 15px;">授权策略:</h3>
            <div class="policy-content">
              <el-radio-group v-if="scheme.activeAuthScheme.policy.length>1"
                              v-model="scheme.selectedPolicy.segmentId">
                <el-radio class="policy-radio" :label="policy.segmentId" :key="index"
                          @change="changePolicy(scheme, policy)"
                          v-for="(policy, index) in scheme.activeAuthScheme.policy">
                  <pre class="policy-segment-text">{{policy.segmentText}}</pre>
                </el-radio>
              </el-radio-group>
              <pre class="policy-segment-text" v-else-if="scheme.activeAuthScheme.policy.length">{{scheme.activeAuthScheme.policy[0].segmentText}}</pre>
              <div style="text-align: center">
                <el-button type="primary" round
                           class="policy-select-btn" @click="selectAuthScheme(scheme)">
                  <i class="el-icon-fa-check"
                     :class="{selected: scheme.activeAuthScheme.authSchemeId === scheme.selectedAuthScheme.authSchemeId}"></i>预选
                </el-button>
              </div>
            </div>
          </div>
          <div class="line-arrow" :class="'line-'+scheme.resourceId" v-show="index < currentAuthNodeIndex">
            <i class="circle"></i>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="showEditDepResource"
      width="30%"
      :close-on-click-modal="false"
      center>
      <div>
        <el-input v-model="curEditDepResourceId" placeholder="输入您要添加的资源ID"></el-input>
      </div>
      <div slot="footer" class="dialog-footer clearfix">
        <el-button class="del-btn" @click="deleteDepResource">删除</el-button>
        <el-button @click="changeDepResource" class="ft-btn">确 定</el-button>
        <el-button @click="resetDepResourceEditor" class="ft-btn">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {cloneDeep} from 'lodash'
  import DataLoader from './data'
  import ResourceLoader from '@/data/resource/loader'
  import PolicyEditor from '@/components/policyEditor/index.vue'
  import resourceCompiler from '@freelog/resource-policy-compiler'
  import CONFIG from '@/config/index'

  const {RESOURCE_TYPES} = CONFIG

  export default {
    name: 'resource-auth-scheme',
    components: {
      PolicyEditor
    },
    props: {
      updateCallback: {
        type: Function
      },
      detail: {
        type: Object,
        default() {
          return {
            dependencies: []
          }
        }
      }
    },
    data() {
      return {
        showEditDepResource: false,
        schemes: [],
        dutyStatements: [],
        viewMode: 'tree', //tree or list
        editActionType: '',
        currentAuthNodeIndex: -1,
        currentEditDepResource: {},
        dutyResourceMap: {},
        curEditDepResourceId: '716062e04d0f20f736411e3b53d50d39ba0bd2da'
      }
    },
    mounted() {

      this.initDependencies(this.detail.scheme);
    },
    computed: {},
    watch: {},
    methods: {
      initDependencies(scheme) {
        let dutyStatements = scheme.dutyStatements
        let dependencies = scheme.dependencies
        var promises = []
        dependencies.forEach((dep) => {
          DataLoader.initAuthScheme(dep)
          var p = DataLoader.loadSchemesForResource(dep.resourceId).then((authSchemes) => {
            dep.authSchemes = authSchemes
          });
          promises.push(p)
        });

        Promise.all(promises).then(() => {
          this.$forceUpdate()
        })

        if (dutyStatements && dutyStatements.length) {
          this.loadDutyStatements(dutyStatements).then((authSchemeMap) => {
            dependencies.forEach((dep) => {
              var duty = this.dutyResourceMap[dep.resourceId]
              if (duty) {
                dep.selectedAuthScheme = (authSchemeMap[duty.authSchemeId] || {})
                for (var i = 0; i < dep.selectedAuthScheme.policy.length; i++) {
                  let policy = dep.selectedAuthScheme.policy[i]
                  if (policy.segmentId === duty.policySegmentId) {
                    dep.selectedPolicy = {...policy};
                    dep.checked = true
                    break;
                  }
                }
                //已发布的不在待签约列表
                if (!this.detail.isPublished) {
                  this.dutyStatements.push(dep)
                }
              }
            })
          })
        }
      },
      changeViewMode(mode) {
        if (mode === 'list') {
          this.hideLineArrow(this.$el)
        } else {
          this.showLineArrows()
        }
      },
      loadDutyStatements(dutyStatements) {
        dutyStatements.forEach((res) => {
          this.dutyResourceMap[res.resourceId] = res
        });

        return DataLoader.loadAuthSchemes({
          authSchemeIds: dutyStatements.map((d) => {
            return d.authSchemeId
          })
        }).then((data) => {
          return data.reduce((authSchemeMap, scheme) => {
            authSchemeMap[scheme.authSchemeId] = scheme
            return authSchemeMap
          }, {});
        })
      },
      addDepResource() {
        if (this.canEditDep()) {
          this.showEditDepResource = true
          this.editActionType = 'add'
        } else {
          this.showEditDepDisabled()
        }
      },
      editDepResource(dep) {
        if (this.canEditDep()) {
          this.showEditDepResource = true
          this.currentEditDepResource = dep
          this.curEditDepResourceId = dep.resourceId
          this.editActionType = 'modify'
        } else {
          this.showEditDepDisabled()
        }
      },
      canEditDep(){
        return this.detail.enableEditDependency
      },
      showEditDepDisabled(){
        this.$confirm('存在已发布授权方案，不可更改依赖资源方案。需删除所有已发布授权方案才可修改依赖资源。',{
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: '知道了'
        })
      },
      resetDepResourceEditor() {
        this.curEditDepResourceId = ''
        this.editActionType = ''
        this.currentEditDepResource = {}
        this.showEditDepResource = false
      },
      changeDepResource() {
        var currentEditDepResource = this.currentEditDepResource
        if (currentEditDepResource.resourceId === this.curEditDepResourceId) {
          return
        }
        ResourceLoader.loadDetail(this.curEditDepResourceId)
          .then((data) => {
            var params = {}
            if (currentEditDepResource.resourceId) {
              params.oldResource = currentEditDepResource;
              params.newResource = this.formatResource(data);
            } else {
              params = data
            }
            this.emitEditEvent(params)
          })
          .catch((err) => {
            this.$message.error('查询不到该资源')
          })
      },
      emitEditEvent(data) {
        this.$emit('change', {
          action: this.editActionType,
          data: data
        })
        this.resetDepResourceEditor()
      },
      deleteDepResource() {
        this.editActionType = 'delete'
        this.$confirm('确定删除该依赖资源?', {
          type: 'warning',
        }).then(() => {
          this.emitEditEvent({
            resourceId: this.curEditDepResourceId
          })
        }).catch(() => {
        })

      },
      selectDependency(dep) {
        if (!dep.selectedPolicy.segmentId) {
          this.$message.warning('先选择该资源任一个授权方案')
          dep.checked = false
        }

//        this.$forceUpdate()
      },
      updateData() {
        this.updateCallback({
          id: this.detail.id,
          data: this._data
        })
      },
      changePolicy(scheme, policy) {
        scheme.selectedPolicy = {...policy}
        this.$forceUpdate()
      },
      formatResource(res) {
        Object.assign(res, {
          checked: false,
          selectSegment: '',
          authSchemeId: '',
          serialNumber: ''
        });
        return res;
      },
      loadDependeciesAuthSchemes(deps) {
        if (!deps || !deps.length) {
          return Promise.resolve()
        }

        var rids = deps.map((dep) => {
          return dep.resourceId
        })

        return DataLoader.loadAuthSchemes({
          resourceIds: rids
        }).then((data) => {
          var authSchemeMap = data.reduce((authSchemeMap, scheme) => {
            if (!authSchemeMap[scheme.resourceId]) {
              authSchemeMap[scheme.resourceId] = []
            }
            authSchemeMap[scheme.resourceId].push(scheme)
            return authSchemeMap
          }, {});
          deps.forEach((dep) => {
            dep.authSchemes = (authSchemeMap[dep.resourceId] || [])
          })
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
      changeResourceScheme(dep, authNode, index, ev) {
        if (dep.activeAuthScheme && (dep.activeAuthScheme.authSchemeId === authNode.authSchemeId)) {
          return
        }
        this.schemes = []
        this.viewMode = 'tree'
        this.currentResourceIndex = index
        this.pushSchemeDep(dep, authNode)
        var curTarget = ev.currentTarget
        var parentNode = this.getParent(curTarget, '.dep-list-inner')
        var target = parentNode.querySelector('.line-arrow')
        this.hideLineArrow(this.$el.querySelector('.auth-scheme-wrap'))
        this.computeLineArrow(target, curTarget.querySelector('.title'), this.$el.querySelector('.auth-scheme-wrap'))
      },
      //默认取消后续的授权方案
      cancelBackSchemes(scheme) {
        if (scheme.activeAuthScheme.dependencies.length) {
          scheme.activeAuthScheme.dependencies.forEach((dep) => {
            if (dep.selectedPolicy && dep.selectedPolicy.segmentId) {
              this.resetSelectedScheme(dep)
            }
          })
        }
      },
      //默认选中前置的授权方案
      selectPrevSchemes(scheme) {
        var schemes = this.schemes
        var start = false
        for (var i = schemes.length - 1; i >= 0; i--) {
          let tmp = schemes[i]
          if (start && !tmp.selected) {
            this.setSelectedScheme(tmp)
          }

          if (scheme.resourceId === tmp.resourceId) {
            start = true
          }
        }
      },
      deleteFromDutyStateMents(scheme) {
        var dutyStatements = this.dutyStatements
        for (var i = 0; i < dutyStatements.length; i++) {
          let duty = dutyStatements[i]
          if (duty.resourceId === scheme.resourceId) {
            dutyStatements.splice(i, 1)
            break;
          }
        }
      },
      resetSelectedScheme(scheme) {
        scheme.selectedAuthScheme = {}
        scheme.selected = false

        this.deleteFromDutyStateMents(scheme)
        this.cancelBackSchemes(scheme)
      },
      setSelectedScheme(scheme) {
        if (scheme.selectedPolicy.segmentId) {
          this.deleteFromDutyStateMents(scheme)
        }

        var policies = scheme.activeAuthScheme.policy
        scheme.selected = true

//        //没有选择，则默认选中一个
        if ((!scheme.selectedPolicy || !scheme.selectedPolicy.segmentId) && (policies.length)) {
          scheme.selectedPolicy = {...policies[0]}
        }
        scheme.selectedAuthScheme = scheme.activeAuthScheme
        if (scheme.selectedPolicy) {
          this.dutyStatements.push(scheme)
        }
      },
      selectAuthScheme(scheme) {
        if (scheme.selectedAuthScheme &&
          scheme.selectedAuthScheme.authSchemeId === scheme.activeAuthScheme.authSchemeId) {
          if (this.schemes[0].resourceId === scheme.resourceId) {
            this.schemes[0].checked = false
          }
          this.resetSelectedScheme(scheme)
        } else {
          this.setSelectedScheme(scheme)
          this.selectPrevSchemes(scheme)
        }
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
      selectAuthNode(dep, authNode, index, ev) {
        index++
        var len = this.schemes.length;
        var diff = len - index
        this.currentAuthNodeIndex = index
        if (diff > 0) {
          for (var i = 0; i < diff; i++) {
            this.schemes.pop()
          }
        }
        this.pushSchemeDep(dep, authNode)
        var parentNode = this.getParent(ev.currentTarget, '.auth-scheme-list-wrap')
        var target = parentNode.querySelector('.line-arrow')
        this.computeLineArrow(target, ev.currentTarget.querySelector('.title'), parentNode)
      },
      pushSchemeDep(dep, authNode) {
        if (!authNode.dependencies) {
          authNode.dependencies = authNode.bubbleResources
          authNode.dutyStatements.forEach((duty) => {
            duty.done = true
            authNode.dependencies.push(duty)
          })

          this.initDependencies(authNode)
        }
        //默认选择策略
        if (authNode.policy.length) {
          dep.selectedPolicy = {...authNode.policy[0]}
        }
        dep.activeAuthScheme = authNode
        this.schemes.push(dep)
      },
      hideLineArrow($el) {
        var $lines = $el.querySelectorAll('.line-arrow')
        $lines.forEach(($line) => {
          $line.style.display = 'none'
        })
      },
      showLineArrows() {
        var schemes = this.schemes.slice(0, -1);
        schemes.forEach((scheme) => {
          var $lines = this.$el.querySelectorAll(`.line-${scheme.resourceId}`);
          $lines.forEach(($line) => {
            $line.style.display = 'block'
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "auth-scheme.less";
</style>

<style lang="less">
  .auth-scheme-section {

  .el-collapse {
    border: none;
  }

  .el-collapse-item__header {
    height: auto;
    background-color: transparent;
    line-height: 25px;
    padding-bottom: 10px;
  }

  .el-collapse-item__arrow {
    display: none;
  }
  }
</style>
