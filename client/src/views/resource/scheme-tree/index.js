import {cloneDeep, intersectionBy, unionBy, differenceBy} from 'lodash'
import SchemeDataLoader from '@/data/scheme/loader'
import ResourceLoader from '@/data/resource/loader'
import PolicyEditor from '@/components/policyEditor/index.vue'
import resourceCompiler from '@freelog/resource-policy-compiler'
import ResourceIntroInfo from '../intro/index.vue'
import SchemeDetail from '../detail/auth-scheme/index.vue'

const DEPENDENCY_STATUS = {
  NONE: 0, //未解决
  SOME: 1, //解决部分
  ALL: 2 //全部解决
}
export default {
  name: 'resource-scheme-tree',
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
          dependencies: []
        }
      }
    },
    resourceId: {
      type: String,
      default() {
        return ''
      }
    },
    resource: {
      type: Object,
      default() {
        return {}
      }
    },
    contracts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      schemes: [],
      dutyStatements: [],
      bubbleResources: [],
      viewMode: 'tree', //tree or list
      currentAuthNodeIndex: -1,
      dutyResourceMap: {},
      resourcesMap: {},
      resourceSchemesCache: {}
    }
  },
  mounted() {
    this.initView()
      .then(this.fillDutyStatements.bind(this))

    var unwatch = this.$watch('contracts', () => {
      this.fillDutyStatements()
      unwatch()
    })
  },
  computed: {},
  watch: {
    resourceId(newResId, oldResId) {
      if (oldResId) {
        if (!this.resourceSchemesCache[oldResId]) {
          this.resourceSchemesCache[oldResId] = {
            schemes: this.schemes
          }
        } else {
          this.resourceSchemesCache[oldResId].schemes = this.schemes
        }
      }
      this.initView()
    },
    resource(newRes, oldRes) {
      if (oldRes) {
        if (!this.resourceSchemesCache[oldRes.resourceId]) {
          this.resourceSchemesCache[oldRes.resourceId] = {
            schemes: this.schemes
          }
        } else {
          this.resourceSchemesCache[oldRes.resourceId].schemes = this.schemes
        }
      }
      this.initView()
    }
  },
  methods: {
    fillDutyStatements() {
      this.dutyStatements = this.contracts
      this.contracts.forEach(contract => {
        var rid = contract.resourceId
        this.dutyResourceMap[rid] = contract
      });

      this.schemes.forEach(dep => {
        this.haveSelectedScheme(dep)
        this.checkResourceActiveStatus(dep)
      });


      this.$forceUpdate()
    },
    initView() {
      var resourceId = this.resourceId || this.resource.resourceId

      if (!resourceId) {
        return
      }

      var resourceSchemesCache = this.resourceSchemesCache
      var resourceCache = resourceSchemesCache[resourceId]
      if (resourceCache && resourceCache.schemes) {
        this.schemes = []
        this.pushSchemeDep(resourceCache.resource)
        return Promise.resolve()
      } else {
        var promise;
        if (this.resource && this.resource.resourceId)
          promise = Promise.all([
            SchemeDataLoader.onloadSchemesForResource(resourceId)
          ]).then(res => {
            var resource = this.resource
            resource.schemes = this.formatSchemes(res[0])
            return resource
          })
        else {
          promise = Promise.all([
            ResourceLoader.onloadResourceDetail(resourceId),
            SchemeDataLoader.onloadSchemesForResource(resourceId)
          ]).then(res => {
            var resource = res[0]
            resource.schemes = this.formatSchemes(res[1])
            return resource
          });
        }
        return promise.then((resource) => {
          resource.activeIndex = 0
          this.resourceSchemesCache[resourceId] = {
            resource: resource
          }
          this.schemes = []
          this.pushSchemeDep(resource)
        })
      }
    },
    checkResourceActiveStatus(dep) {
      const key = 'resourceId'
      var intersectDeps = intersectionBy(this.dutyStatements, [dep], key);
      var activeStatus;
      if (intersectDeps.length) {
        var allResources = unionBy(this.bubbleResources, this.dutyStatements, key)
        intersectDeps = intersectionBy(allResources, dep.dependenciesTree, key);
        intersectDeps = differenceBy(intersectDeps, this.dutyStatements, key)
        if (intersectDeps.length) {
          activeStatus = DEPENDENCY_STATUS.SOME
        } else {
          activeStatus = DEPENDENCY_STATUS.ALL
        }

        // this.$set(dep, 'activeStatus', status)
        dep.activeStatus = activeStatus
        if (dep.selectedScheme && dep.selectedScheme.authSchemeId) {
          dep.selectedScheme.dependencies.forEach(res => {
            this.checkResourceActiveStatus(res)
          })
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
          SchemeDataLoader.onloadSchemeDetail(duty.authSchemeId).then(scheme => {
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
    changePolicy(resource, scheme, policy) {
      scheme.selectedPolicy = {...policy}
      scheme.selectedPolicySegmentId = scheme.selectedPolicy.segmentId
      this.$forceUpdate()
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
    setSelectedScheme(resource, scheme) {
      // var scheme = resource.activeScheme
      var selectedScheme = resource.selectedScheme

      //如果已经选择过且与本次选择不同，则需要覆盖
      if (selectedScheme && selectedScheme.authSchemeId &&
        (selectedScheme.authSchemeId !== scheme.authSchemeId)) {
        this.resetSelectedScheme(resource)
      }

      if (!resource.selected) {
        this.dutyResourceMap[resource.resourceId] = resource
        resource.selected = true
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
        activeStatus = ''
      } else {
        debugger
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
      resource.activeStatus = activeStatus
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
            this._fireUpdateHandler()
          })
          .catch(() => {
          })
      } else {
        if (!this.checkResourceSelectable(panelIndex)) {
          return this.$message.warning('未选择前一级资源策略不可选当前资源的策略')
        } else if (!scheme.selectedPolicySegmentId) {
          return this.$message.warning('未选择当前授权方案的策略')
        }

        this.setSelectedScheme(resource, scheme)
        this.updatePrevSchemesActiveStatus(resource);
        // this.selectPrevSchemes(resource)
        this._fireUpdateHandler()
      }
    },
    _fireUpdateHandler() {
      var data = this.dutyStatements
      this.updateCallback && this.updateCallback(data)
      this.$emit('update', data)
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
            Object.assign(duty, dep)
            scheme.selectedPolicySegmentId = duty.policySegmentId
            for (var j = 0; j < scheme.policy.length; j++) {
              if (scheme.policy[j].segmentId === duty.policySegmentId) {
                scheme.selectedPolicy = scheme.policy[j]
                scheme.policy[j].selected = true
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
        this.onSetResourceDetail(dep)
      }

      if (!dep.schemes) {
        dep.schemes = []
        //获取已发布的授权点列表 {authSchemeStatus: 1}
        SchemeDataLoader.onloadSchemesForResource(dep.resourceId).then((schemes) => {
          dep.schemes = this.formatSchemes(schemes)
          if (!this.haveSelectedScheme(dep)) {
            dep.activeScheme = dep.schemes[0]
          }
          // if (dep.activeStatus === undefined) {
          //   this.checkResourceActiveStatus(dep)
          // }
          this.checkResourceActiveStatus(dep)
          this.$forceUpdate()
        })
      } else if (dep.activeStatus === undefined) {
        this.checkResourceActiveStatus(dep);
        if (!dep.activeScheme && dep.schemes.length) {
          dep.activeScheme = dep.schemes[0]
        }
      }

      if (dep.activeIndex === undefined) {
        dep.activeIndex = 0
      }

      this.schemes.push(dep);
      if (dep.activeScheme && dep.activeScheme.activeResource) {
        this.revertDependencyPanels(dep)
      }
    },
    onSetResourceDetail(dep) {
      if (!this.resourcesMap[dep.resourceId]) {
        this.resourcesMap[dep.resourceId] = dep
      }

      if (!dep.updateDate) {
        ResourceLoader.onloadResourceDetail(dep.resourceId).then((detail) => {
          Object.assign(dep, detail)
          return dep
        });
      }
    },
    revertDependencyPanels(dep) {
      var activeScheme = dep.activeScheme
      if (!activeScheme) {
        return
      }
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
        scheme.dependencies = scheme.bubbleResources.map(res => {
          let resourceId = res.resourceId
          if (resourcesMap[resourceId]) {
            return resourcesMap[resourceId]
          } else {
            this.onSetResourceDetail(res);
            return res
          }
        });
        if (scheme.selectedPolicySegmentId === undefined) {
          scheme.selectedPolicy = {}
          scheme.selectedPolicySegmentId = ''
        }
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
    getDutyStatements() {
      return this.dutyStatements
    }
  }
}
