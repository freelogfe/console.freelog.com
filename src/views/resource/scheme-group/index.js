import {cloneDeep, intersectionBy, unionBy, differenceBy} from 'lodash'
import ResourceLoader from '@/data/resource/loader'
import PolicyEditor from '@/components/policyEditor/index.vue'
import { beautify } from '@freelog/resource-policy-lang'
import ResourceIntroInfo from '../intro/index.vue'
import SchemeDetail from '../detail/auth-scheme/index.vue'
import {SCHEME_STATUS} from '@/config/scheme'
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
    var isNodeDetail = !!this.$route.params.nodeId
    return {
      isNodeDetail: isNodeDetail,
      resources: [],
      dutyStatements: [],
      bubbleResources: [],
      viewMode: isNodeDetail ? 'tree' : 'list', //tree or list
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
    console.log(this.resource)
    this.targetNode = this.initResourceNode(this.resource)
  },
  computed: {
    unsignPolicyList() {
      return this.dutyStatements.filter(duty => {
        return !duty.contractId
      })
    }
  },
  watch: {},
  methods: {
    initResourceNode(resource, index) {
      var resourceId = resource.resourceId;
      var nodeResource = this.resourcesMap[resourceId]
      if (!nodeResource) {
        nodeResource = Object.assign(resource, {
          isResolved: null,
          selectedScheme: null,
          selectedPolicy: null,
          activeStatus: 0,
          next: null,
          activeIndex: 0
        });

        ResourceLoader.onloadResourceDetail(resourceId)
          .then(detail => {
            Object.assign(nodeResource, detail)
          });
        this.resourcesMap[resourceId] = nodeResource
      }

      var node = {
        resource: nodeResource,
        index: index || 0 //第几层叶子
      };

      return node
    },
    selectResourceHandler(resource) {
      console.log(resource)
      var dutyResourceMap = this.dutyResourceMap
      var rid = resource.resourceId
      if (resource.selectedScheme) {
        dutyResourceMap[rid] = resource
      } else if (dutyResourceMap[rid]) {
        delete dutyResourceMap[rid]
      }

      this.dutyStatements = Object.values(dutyResourceMap)
    },
    showNextResourceHandler({resource, node}) {
      var index = node.index + 1
      var nextNode = this.initResourceNode(resource, index);
      this.insertNode(nextNode);
    },
    showDepResourceHandler({resource, node}) {
      var nextNode = this.initResourceNode(resource, 0);
      this.insertNode(nextNode);
    },
    insertNextNode(resource, node) {
      var nextNode = this.initResourceNode(resource, node.index + 1);
      this.insertNode(nextNode);
    },
    insertNode(node) {
      this.popNodes(node.index)
      this.nodes.push(node)
    },
    popNodes(index) {
      var diff = this.nodes.length - index;
      for (let i = 0; i < diff; i++) {
        this.nodes.pop()
      }
    },
    changeViewMode(mode) {
      this.viewMode = mode
      if (mode === 'list') {
        // this.$emit('hideArrowLine')
        this.showUnSignedPolicyList();
      } else {
        // this.showLineArrows()
      }
    },
    showUnSignedPolicyList() {

    },
    changeSchemeHandler(node) {
      this.popNodes(node.index + 1);
    },
    changeTargetSchemeHandler(node) {
      this.nodes = [];
    },
    resolveResourceHandler({resource, isResolved, index}) {
      var res = this.resourcesMap[resource.resourceId];
      res.isResolved = isResolved
      if (isResolved === false) {
        res.activeStatus = SCHEME_STATUS.NONE;
        this.popNodes(index)
      } else {
        // this.updateResourceActiveStatus()
      }
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
    formatPolicyText(policyText) {
      var fmtText
      try {
        fmtText = beautify(policyText);
      } catch (err) {
        fmtText = policyText
      }
      return fmtText
    }
  }
}
