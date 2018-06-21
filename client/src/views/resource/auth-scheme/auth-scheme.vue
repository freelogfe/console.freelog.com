<template>
  <div class="auth-scheme-section clearfix" :class="{'is-publish':detail.isPublished}">
    <div class="dep-list-wrap">
      <div class="dep-list-inner">
        <h4 class="policy-input-title"><i class="el-icon-question"></i>资源依赖列表</h4>
        <ul>
          <li v-for="(dep, index) in detail.scheme.dependencies"
              @click="changeResourceScheme(dep, index, $event)"
              class="dep-item"
              :class="['active-status-'+dep.activeStatus]">
            <div class="resource-name" :class="{active:dep.active}">
              <p>
                <i class="dot"></i>{{dep.resourceName}}
                <i class="del-res-icon el-icon-error" @click="deleteDepResource(dep)"></i>
              </p>
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
          <policy-editor v-model="detail.scheme" :showValidate="false" @change="changePolicyHandler"></policy-editor>
        </div>
        <div class="line-arrow">
          <i class="circle"></i>
        </div>
      </div>
    </div>
    <resource-scheme-tree :resource="curDepResource"
                          :contracts="dutyStatements"
                          @update="updateDepResourceSchemesHandler"
                          @updateResource="updateResourceHandler"
                          style="margin-left: 480px;"></resource-scheme-tree>
    <el-dialog
      :visible.sync="showEditDepResource"
      width="840px"
      :close-on-click-modal="false"
      center>
      <p slot="title" class="dialog-title">添加资源</p>
      <search-resource class="add-resource-input" @add="changeDepResource"></search-resource>
      <!--<div>-->
      <!--<el-input v-model="curEditDepResourceId" placeholder="输入您要添加的资源ID"></el-input>-->
      <!--</div>-->
      <!--<div slot="footer" class="dialog-footer clearfix">-->
      <!--<el-button class="del-btn" @click="deleteDepResource">删除</el-button>-->
      <!--<el-button @click="changeDepResource" class="ft-btn">确 定</el-button>-->
      <!--<el-button @click="resetDepResourceEditor" class="ft-btn">取 消</el-button>-->
      <!--</div>-->
    </el-dialog>
  </div>
</template>

<script>

  import ResourceSchemeTree from '../scheme-tree/index.vue'
  import {intersectionBy, unionBy, differenceBy} from 'lodash'
  import ResourceLoader from '@/data/resource/loader'
  import PolicyEditor from '@/components/policyEditor/index.vue'
  import {SCHEME_STATUS} from '@/config/scheme'
  import SearchResource from '../search/index.vue'
  import resourceCompiler from '@freelog/resource-policy-compiler'
  import CONFIG from '@/config/index'

  export default {
    name: 'resource-auth-scheme',
    components: {
      PolicyEditor,
      ResourceSchemeTree,
      SearchResource
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
        dutyStatements: [],
        bubbleResources: [],
        editActionType: '',
        currentEditDepResource: {},
        curEditDepResourceId: '',
        curDepResource: {}
      }
    },
    mounted() {
      console.log('mounted', this.detail)
      this.initDependencies(this.detail.scheme);
    },
    computed: {},
    watch: {},
    methods: {
      initDependencies(scheme) {
        let dependencies = scheme.dependencies
        let dutyResourceMap = {}
        scheme.dutyStatements.forEach((res) => {
          dutyResourceMap[res.resourceId] = res
        });

        if (!this.detail.isPublished) {
          this.dutyStatements = scheme.dutyStatements
        }
        this.bubbleResources = scheme.bubbleResources;
        dependencies.forEach((dep) => {
          dep.activeStatus = SCHEME_STATUS.UNHANDLE
          this.checkResourceActiveStatus(dep)
        });

        this.$forceUpdate()
      },
      checkResourceActiveStatus(dep) {
        const key = 'resourceId'
        var intersectDeps = intersectionBy(this.dutyStatements, [dep], key);
        if (intersectDeps.length) {
          var allResources = unionBy(this.bubbleResources, this.dutyStatements, key)
          intersectDeps = intersectionBy(allResources, dep.dependenciesTree, key);
          intersectDeps = differenceBy(intersectDeps, this.dutyStatements, key)
          if (intersectDeps.length) {
            dep.activeStatus = SCHEME_STATUS.SOME
          } else {
            dep.activeStatus = SCHEME_STATUS.ALL
          }
        } else {
          dep.activeStatus = SCHEME_STATUS.UNHANDLE
          return false
        }
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
      canEditDep() {
        return this.detail.enableEditDependency
      },
      showEditDepDisabled() {
        this.$confirm('存在已发布授权方案，不可更改依赖资源方案。需删除所有已发布授权方案才可修改依赖资源。', {
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
      changeDepResource(resource) {
        if (!resource || !resource.resourceId) {
          return
        }

        this.curEditDepResourceId = resource.resourceId
        var currentEditDepResource = this.currentEditDepResource
        if (currentEditDepResource.resourceId === resource.resourceId) {
          return
        }
        var params = {}
        if (currentEditDepResource.resourceId) {
          params.oldResource = currentEditDepResource;
          params.newResource = this.formatResource(resource);
        } else {
          params = resource
        }
        this.emitEditEvent(params)
      },
      emitEditEvent(data) {
        this.$emit('change', {
          action: this.editActionType,
          data: data
        })
        this.resetDepResourceEditor()
      },
      deleteDepResource(resource) {
        this.editActionType = 'delete'
        this.$confirm('确定删除该依赖资源?', {
          type: 'warning',
        }).then(() => {
          this.emitEditEvent({
            resourceId: resource.resourceId
          })
        }).catch(() => {
        })

      },
      updateData() {
        this.updateCallback({
          id: this.detail.id,
          data: this._data
        })
      },
      formatResource(res) {
        Object.assign(res, {
          selectSegment: '',
          authSchemeId: ''
        });
        return res;
      },
      changeResourceScheme(dep, index, ev) {
        this.curDepResource = dep
        var curTarget = ev.currentTarget
        var parentNode = this.getParent(curTarget, '.dep-list-inner')
        var target = parentNode.querySelector('.line-arrow')
        this.computeLineArrow(target, curTarget.querySelector('.resource-name'))
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
      computeLineArrow(target, _from) {
        this.$nextTick(() => {
          var fromRect = _from.getBoundingClientRect()

          target.style.top = (_from.offsetTop + 10) + 'px'
          target.style.left = (_from.offsetLeft + fromRect.width + 5) + 'px'
          target.style.right = '6px'
          target.style.display = 'block'
        })
      },
      changePolicyHandler(data) {
        this.detail.scheme.policies = data
      },
      updateDepResourceSchemesHandler(data) {
        this.detail.scheme.willDutyStatements = data
      },
      updateResourceHandler(resource) {
        this.curDepResource.activeStatus = resource.activeStatus
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "auth-scheme.less";
</style>

