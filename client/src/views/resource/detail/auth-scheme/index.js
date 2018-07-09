import SchemeLoader from '@/data/scheme/loader'
import resourceCompiler from '@freelog/resource-policy-compiler'


function generateAlpha(num) {
  num = num || 26;
  var alphas = []
  for (var i = 0; i < num; i++) {
    alphas.push(String.fromCharCode(65 + i))
  }

  return alphas
}

const ContractStates = [{
  status: 0,
  desc: '未完成'
},{
  status: 1,
  desc: '已发布'
},{
  status: 2,
  desc: '合约待执行'
},{
  status: 3,
  desc: '发布'
},]

export default {
  name: 'auth-scheme-detail',
  data() {
    return {
      curChoice: 0,
      choices: [],
      selectedPolicy: '',
      schemes: [],
      inited: false
    }
  },
  components: {},
  props: {
    selectedCallback: {
      type: Function
    },
    resource: {
      type: Object
    }
  },
  watch: {
    resource() {
      if (this.resource && this.resource.resourceId && !this.inited) {
        this.init()
        this.inited = true
      }
    }
  },
  mounted() {

  },
  methods: {
    init() {
      SchemeLoader.onloadSchemesForResource(this.resource.resourceId)
        .then((data) => {
          if (data.length) {
            this.schemes = this.formatSchemes(data);
          }
        }).catch(this.$error.showErrorMessage)
    },
    changePolicy(scheme, policy) {
      this.selectedCallback && this.selectedCallback(scheme, policy)
    },
    formatSchemes(schemes) {
      this.choices = generateAlpha(schemes.length).map((alpha, index) => {
        return {
          index: index,
          label: alpha
        }
      });

      schemes.forEach((scheme,i) => {
        scheme.dependencies = scheme.bubbleResources
        // scheme._contractStatusInfo = ContractStates[i]
        scheme.policy.forEach(p => {
          try {
            p._fmtSegmentText = resourceCompiler.beautify(p.segmentText)
          } catch (e) {
            p._fmtSegmentText = p.segmentText
          }
        })
      });

      return schemes;
    },
    loadPolicies() {
      return this.$services.authSchemes.get({
        params: {
          resourceIds: this.resource.resourceId
        }
      }).then((res) => {
        if (res.data.errcode === 0) {
          return res.getData()
        } else {
          throw new Error(res)
        }
      })
    },
    gotoResourceSchemeDetailHandler() {
      this.$router.push(`/resource/detail/${this.resource.resourceId}/auth_schemes`);
    },
    hideAuthSchemeHandler(){
      this.$emit('close')
    }
  }
}
