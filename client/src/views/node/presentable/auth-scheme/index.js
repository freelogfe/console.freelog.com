import {cloneDeep, intersectionBy, unionBy, differenceBy} from 'lodash'
import DataLoader from '@/views/resource/auth-scheme/data'
import ResourceLoader from '@/data/resource/loader'
import PolicyEditor from '@/components/policyEditor/index.vue'
import resourceCompiler from '@freelog/resource-policy-compiler'
import CONFIG from '@/config/index'
import ResourceIntroInfo from '@/views/resource/intro/index.vue'
import SchemeDetail from '@/views/resource/detail/auth-scheme/index.vue'

const {RESOURCE_TYPES} = CONFIG
const DEPENDENCY_STATUS = {
  NONE: 0, //未解决
  SOME: 1, //解决部分
  ALL: 2 //全部解决
}
export default {
  name: 'presentable-scheme-detail',
  components: {
    PolicyEditor,
    SchemeDetail,
    ResourceIntroInfo
  },
  props: {
    updateCallback: {
      type: Function
    },
    detail: {
      type: Object,
      default() {
        return {
          scheme: {
            dependencies: [],
          }
        }
      }
    },
    resourceId: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      showEditDepResource: false,
      schemes: [],
      dutyStatements: [],
      bubbleResources: [],
      viewMode: 'tree', //tree or list
      editActionType: '',
      currentAuthNodeIndex: -1,
      currentEditDepResource: {},
      dutyResourceMap: {},
      resourcesMap: {},
      curEditDepResourceId: '',
      showDependencyList: false
    }
  },
  mounted() {
    this.initDependencies(this.detail.scheme);

    var resourceId = '6721d854f0b06e576525dd3a7847e01461ba7028'
    Promise.all([
      ResourceLoader.onloadResourceDetail(resourceId),
      DataLoader.loadSchemesForResource(resourceId)
    ]).then(res => {
      var resource = res[0]
      resource.activeIndex = 0
      resource.schemes = this.formatSchemes(res[1])
      this.schemes.push(resource)
      console.log(res)
    })
  },
  computed: {},
  watch: {},
  methods: {
    initDependencies(scheme) {
      if (!scheme || !scheme.dutyStatements) {
        return
      }
      let dependencies = scheme.dependencies

      this.resourcesMap[scheme.resourceId] = scheme
      scheme.dutyStatements.forEach((res) => {
        this.dutyResourceMap[res.resourceId] = res
      });

      if (!this.detail.isPublished) {
        this.dutyStatements = scheme.dutyStatements
      }
      this.bubbleResources = scheme.bubbleResources;
      dependencies.forEach((dep) => {
        if (this.dutyResourceMap[dep.resourceId]) {
          dep.checked = true
        }
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
          dep.activeStatus = DEPENDENCY_STATUS.SOME
        } else {
          dep.activeStatus = DEPENDENCY_STATUS.ALL
        }
      } else {
        return false
      }
    },
    formatPolicyText(segmentText) {
      var fmtText = segmentText
      try {
        fmtText = resourceCompiler.beautify(segmentText);
      } catch (err) {
      }
      return fmtText
    },
    changeViewMode(mode) {
      this.viewMode = mode
      if (mode === 'list') {
        this.hideLineArrow(this.$el);
        this.showUnSignedPolicyList();
      } else {
        this.showLineArrows()
      }
    },
    showUnSignedPolicyList() {
      this.dutyStatements.forEach((duty) => {
        if (!duty.selectedScheme) {
          DataLoader.loadSchemeForAuthNode(duty.authSchemeId).then(scheme => {
            for (var i = 0; i < scheme.policy.length; i++) {
              let p = scheme.policy[i];
              if (p.segmentId === duty.policySegmentId) {
                scheme.selectedPolicy = p;
                break;
              }
            }
            duty.selectedScheme = scheme
          })
        }
      });
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
      if (!dep.selectedScheme.authSchemeId) {
        this.$message.warning('必须先选择该资源的任一个授权方案')
        dep.checked = false
      }
    },
    updateData() {
      this.updateCallback({
        id: this.detail.id,
        data: this._data
      })
    },
    changePolicy(resource, scheme, policy) {
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
    handleInputConfirm(ev) {
      ev.target.blur()
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
    changeResourceScheme(dep, index, ev) {
      this.schemes = []
      this.viewMode = 'tree'
      this.currentResourceIndex = index
      this.pushSchemeDep(dep)
      var curTarget = ev.currentTarget
      var parentNode = this.getParent(curTarget, '.dep-list-inner')
      var target = parentNode.querySelector('.line-arrow')
      this.computeLineArrow(target, curTarget.querySelector('.resource-name'))
    },
    //默认取消后续的授权方案
    cancelBackSchemes(resource) {
      var dependencies = resource.selectedScheme && resource.selectedScheme.dependencies
      if (dependencies && dependencies.length) {
        dependencies.forEach((dep) => {
          if (dep.selectedScheme) {
            this.resetSelectedScheme(dep)
          }
        })
      }
    },
    prevResourcesHandler(res, fn) {
      var resources = this.schemes
      var start = false
      for (var i = resources.length - 1; i >= 0; i--) {
        let tmpRes = resources[i]
        if (start) {
          if (fn(tmpRes)) {
            break;
          }
        } else if (res.resourceId === tmpRes.resourceId) {
          start = true
        }
      }
    },
    //默认选中前置的授权方案
    selectPrevSchemes(curRes) {
      this.prevResourcesHandler(curRes, (res) => {
        this.setSelectedScheme(res)
      })
    },
    deleteFromDutyStateMents(resource) {
      var dutyStatements = this.dutyStatements

      if (this.dutyResourceMap[resource.resourceId]) {
        delete this.dutyResourceMap[resource.resourceId]
      }
      for (var i = 0; i < dutyStatements.length; i++) {
        let duty = dutyStatements[i]
        if (duty.resourceId === resource.resourceId) {
          dutyStatements.splice(i, 1)
          break;
        }
      }
    },
    resetSelectedScheme(resource) {
      this.deleteFromDutyStateMents(resource)
      this.cancelBackSchemes(resource)
      resource.selectedScheme = {}
      resource.selected = false

      this.updateResourceActiveStatus(resource)
    },
    setSelectedScheme(resource) {
      var scheme = resource.activeScheme
      var selectedScheme = resource.selectedScheme

      //如果已经选择过且与本次选择不同，则需要覆盖
      if (selectedScheme && selectedScheme.authSchemeId &&
        (selectedScheme.authSchemeId !== scheme.authSchemeId)) {
        this.resetSelectedScheme(resource)
      }

      if (!resource.selected) {
        this.dutyResourceMap[resource.resourceId] = resource
        var policies = scheme.policy
        resource.selected = true

//        //没有选择，则默认选中一个
        if ((!scheme.selectedPolicy || !scheme.selectedPolicy.segmentId) && (policies.length)) {
          scheme.selectedPolicy = {...policies[0]}
        }
        resource.selectedScheme = scheme
        if (scheme.selectedPolicy) {
          scheme.selectedPolicySegmentId = scheme.selectedPolicy.segmentId
          this.dutyStatements.push(resource)
        }
      }

      this.updateResourceActiveStatus(resource)
    },
    updateResourceActiveStatus(resource) {
      var activeStatus;

      if (!resource.selectedScheme || !resource.selectedScheme.authSchemeId) {
        activeStatus = DEPENDENCY_STATUS.NONE
      } else {
        var bubbleResources = resource.selectedScheme.bubbleResources
        if (bubbleResources.length) {
          var cnt = 0
          bubbleResources.forEach((res) => {
            if (this.dutyResourceMap[res.resourceId]) {
              cnt++
            }
          });
          if (cnt === 0) {
            activeStatus = DEPENDENCY_STATUS.SOME //至少解决了资源本身
          } else if (cnt === bubbleResources.length) {
            activeStatus = DEPENDENCY_STATUS.ALL
          } else {
            activeStatus = DEPENDENCY_STATUS.SOME
          }
        } else {
          activeStatus = DEPENDENCY_STATUS.ALL
        }

      }
//        resource.activeStatus = activeStatus
      this.$set(resource, 'activeStatus', activeStatus)
      this.$forceUpdate()
    },
    updatePrevSchemesActiveStatus(resource) {
      this.prevResourcesHandler(resource, (res) => {
        this.updateResourceActiveStatus(res)
      })
    },
    checkResourceSelectable(index) {
      var prev = index - 1;
      if (prev >= 0) {
        let prevResource = this.schemes[prev];
        return prevResource.selected
      } else {
        return true
      }
    },
    checkResourceCancelable(resource) {
      var deps = resource.selectedScheme.dependencies;
      var selectedDeps = []
      deps.forEach(dep => {
        if (dep.selected) {
          selectedDeps.push(dep)
        }
      });


      if (!selectedDeps.length) {
        return Promise.resolve()
      } else {
        let msg = selectedDeps.map(dep => {
          return dep.resourceName
        }).join('、')
        return this.$confirm(`取消当前资源的选择会导致后续资源的策略都取消，已选择后续的资源：${msg}，确定吗？`, {})
      }
    },
    selectAuthScheme(resource, scheme, panelIndex) {
      if (resource.selectedScheme &&
        resource.selectedScheme.authSchemeId === scheme.authSchemeId) {
        this.checkResourceCancelable(resource)
          .then(() => {
            if (this.schemes[0].resourceId === scheme.resourceId) {
              this.schemes[0].checked = false
            }
            this.resetSelectedScheme(resource)
            this.updatePrevSchemesActiveStatus(resource);
          })
          .catch(() => {
          })
      } else {
        if (!this.checkResourceSelectable(panelIndex)) {
          return this.$message.warning('未选择前一级资源策略不可选当前资源的策略')
        }
        this.setSelectedScheme(resource)
        this.selectPrevSchemes(resource)
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
    selectResourceHandler(dep, scheme, index, ev) {
      scheme.activeResource = dep
      this.updateSchemeList(index)
      this.pushSchemeDep(dep)
      this.drawLineArrow(scheme)
    },
    updateSchemeList(index) {
      index++
      var len = this.schemes.length;
      var diff = len - index
      this.currentAuthNodeIndex = index
      if (diff > 0) {
        for (var i = 0; i < diff; i++) {
          this.schemes.pop()
        }
      }
    },
    haveSelectedScheme(dep) {
      var duty = this.dutyResourceMap[dep.resourceId]
      if (duty) {
        for (var i = 0, len = dep.schemes.length; i < len; i++) {
          let scheme = dep.schemes[i];
          if (scheme.authSchemeId === duty.authSchemeId ||
            (duty.selectedScheme && scheme.authSchemeId === duty.selectedScheme.authSchemeId)) {
            dep.activeScheme = scheme;
            dep.activeIndex = i;
            dep.selectedScheme = scheme
            dep.selected = true
            scheme.selectedPolicySegmentId = duty.policySegmentId
            for (var j = 0; j < scheme.policy.length; j++) {
              if (scheme.policy[j].segmentId === duty.policySegmentId) {
                scheme.selectedPolicy = scheme.policy[j]
              }
            }
            break;
          }
        }
        return true
      } else {
        dep.selectedScheme = {}
        dep.selected = false
        return false
      }
    },
    pushSchemeDep(dep) {
      if (!this.resourcesMap[dep.resourceId]) {
        this.resourcesMap[dep.resourceId] = dep
      }

      if (!dep.schemes) {
        dep.schemes = []
        //获取已发布的授权点列表 {authSchemeStatus: 1}
        DataLoader.loadSchemesForResource(dep.resourceId).then((schemes) => {
          dep.schemes = this.formatSchemes(schemes)
          if (!this.haveSelectedScheme(dep)) {
            dep.activeScheme = dep.schemes[0]
          }
          if (dep.activeStatus === undefined) {
            this.checkResourceActiveStatus(dep)
          }
          this.$forceUpdate()
        })
      } else if (dep.activeStatus === undefined) {
        this.checkResourceActiveStatus(dep)
      }

      if (!dep.updateDate) {
        ResourceLoader.loadDetail(dep.resourceId).then((detail) => {
          Object.assign(dep, detail)
        })
      }

      if (dep.activeIndex === undefined) {
        dep.activeIndex = 0
      }

      this.schemes.push(dep);
      if (dep.activeScheme && dep.activeScheme.activeResource) {
        this.revertDependencyPanels(dep)
      }
    },
    revertDependencyPanels(dep) {
      var activeScheme = dep.activeScheme
      var next = activeScheme.activeResource
      var schemeList = [];
      schemeList.push(activeScheme)
      while (next) {
        this.currentAuthNodeIndex++
        this.schemes.push(next);
        activeScheme = next.activeScheme
        next = activeScheme && activeScheme.activeResource
        if (next) {
          schemeList.push(activeScheme)
        }
      }

      this.$nextTick(() => {
        schemeList.forEach(scheme => {
          this.drawLineArrow(scheme)
        })
      })
    },
    drawLineArrow(scheme) {
      var target = this.$el.querySelector('.js-line-' + scheme.authSchemeId)
      var $parent = this.getParent(target, '.scheme-detail-panel')
      this.computeLineArrow(target, $parent.querySelector('.js-res-' + scheme.activeResource.resourceId))
    },
    formatSchemes(schemes) {
      var resourcesMap = this.resourcesMap;
      schemes.forEach((scheme) => {
        scheme.dependencies = scheme.dutyStatements.map((duty) => {
          let resourceId = duty.resourceId
          if (resourcesMap[resourceId]) {
            resourcesMap[resourceId].isDone = true
            return resourcesMap[resourceId]
          } else {
            duty.isDone = true
            return duty
          }
        });
        scheme.dependencies = scheme.dependencies.concat(scheme.bubbleResources.map(res => {
          let resourceId = res.resourceId
          if (resourcesMap[resourceId]) {
            return resourcesMap[resourceId]
          } else {
            return res
          }
        }));
        scheme.selectedPolicy = {}
        scheme.selectedPolicySegmentId = ''
      });
      return schemes
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
        var $lines = this.$el.querySelectorAll(`.js-line-${scheme.authSchemeId}`);
        $lines.forEach(($line) => {
          $line.style.display = 'block'
        })
      })
    },
    switchSchemeHandler(resource, scheme, index, panelIndex) {
      resource.activeIndex = index
      resource.activeScheme = scheme

      this.updateSchemeList(panelIndex)
      if (scheme.activeResource) {
        this.pushSchemeDep(scheme.activeResource);
        this.drawLineArrow(scheme)
      }

      this.$forceUpdate()
    },
    changePolicyHandler(data) {
      this.detail.scheme.policies = data
//        console.log('change', data)
    }
  }
}
