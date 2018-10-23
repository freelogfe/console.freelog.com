import { cloneDeep, intersectionBy, unionBy, differenceBy } from 'lodash'
import ResourceLoader from '@/data/resource/loader'
import PolicyEditor from '@/components/policyEditor/index.vue'
import { beautify } from '@freelog/resource-policy-lang'
import ResourceIntroInfo from '../intro/index.vue'
import SchemeDetail from '../detail/auth-scheme/index.vue'
import { SCHEME_STATUS } from '@/config/scheme'
import SchemeOpts from './scheme-opts/index.vue'

export default {
  name: 'resource-scheme-group',
  components: {
    PolicyEditor,
    SchemeDetail,
    ResourceIntroInfo,
    SchemeOpts
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
    resource: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const isNodeDetail = !!this.$route.params.nodeId
    return {
      isNodeDetail,
      resources: [],
      dutyStatements: [],
      bubbleResources: [],
      viewMode: isNodeDetail ? 'tree' : 'list', // tree or list
      currentAuthNodeIndex: -1,
      dutyResourceMap: {},
      resourcesMap: {},
      resourceSchemesCache: {},
      parentResource: null,
      nodes: [],
      resourcesNodeMap: {},
      targetNode: null
    }
  },
  mounted() {
    this.targetNode = this.initResourceNode(this.resource)
  },
  computed: {
    unsignPolicyList() {
      return this.dutyStatements.filter(duty => !duty.contractId)
    }
  },
  watch: {},
  methods: {
    initResourceNode(resource, index) {
      const resourceId = resource.resourceId
      let nodeResource = this.resourcesMap[resourceId]
      if (!nodeResource) {
        nodeResource = Object.assign(resource, {
          isResolved: null,
          selectedScheme: null,
          selectedPolicy: null,
          activeStatus: 0,
          next: null,
          activeIndex: 0
        })

        ResourceLoader.onloadResourceDetail(resourceId)
          .then((detail) => {
            Object.assign(nodeResource, detail)
          })
        this.resourcesMap[resourceId] = nodeResource
      }

      const node = {
        resource: nodeResource,
        index: index || 0 // 第几层叶子
      }

      return node
    },
    selectResourceHandler(resource) {
<<<<<<< HEAD
      var dutyResourceMap = this.dutyResourceMap
      var rid = resource.resourceId
=======
      console.log(resource)
      const dutyResourceMap = this.dutyResourceMap
      const rid = resource.resourceId
>>>>>>> 9c03cf9cfc5ae81925ae22c5a6597242392ced2b
      if (resource.selectedScheme) {
        dutyResourceMap[rid] = resource
      } else if (dutyResourceMap[rid]) {
        delete dutyResourceMap[rid]
      }

      this.dutyStatements = Object.values(dutyResourceMap)
    },
    showNextResourceHandler({ resource, node }) {
      const index = node.index + 1
      const nextNode = this.initResourceNode(resource, index)
      this.insertNode(nextNode)
    },
    showDepResourceHandler({ resource, node }) {
      const nextNode = this.initResourceNode(resource, 0)
      this.insertNode(nextNode)
    },
    insertNextNode(resource, node) {
      const nextNode = this.initResourceNode(resource, node.index + 1)
      this.insertNode(nextNode)
    },
    insertNode(node) {
      this.popNodes(node.index)
      this.nodes.push(node)
    },
    popNodes(index) {
      const diff = this.nodes.length - index
      for (let i = 0; i < diff; i++) {
        this.nodes.pop()
      }
    },
    changeViewMode(mode) {
      this.viewMode = mode
      if (mode === 'list') {
        // this.$emit('hideArrowLine')
        this.showUnSignedPolicyList()
      } else {
        // this.showLineArrows()
      }
    },
    showUnSignedPolicyList() {

    },
    changeSchemeHandler(node) {
      this.popNodes(node.index + 1)
    },
    changeTargetSchemeHandler(node) {
      this.nodes = []
    },
    resolveResourceHandler({ resource, isResolved, index }) {
      const res = this.resourcesMap[resource.resourceId]
      res.isResolved = isResolved
      if (isResolved === false) {
        res.activeStatus = SCHEME_STATUS.NONE
        this.popNodes(index)
      } else {
        // this.updateResourceActiveStatus()
      }
    },
    checkResourceSelectable(index) {
      const prev = index - 1
      if (prev >= 0) {
        const prevResource = this.schemes[prev]
        return prevResource.selected
      }
      return true
    },
    formatPolicyText(policyText) {
      let fmtText
      try {
        fmtText = beautify(policyText)
      } catch (err) {
        fmtText = policyText
      }
      return fmtText
    }
  }
}
