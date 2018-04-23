import DependencyTree from '../dependencytree/index.vue'
import PolicyEditor from '@/components/policyEditor/index.vue'

export default {
  name: 'edit-auth-node',
  data() {
    return {
      authSchemeName: '',
      resourceId: this.$route.query.resourceId,
      deps: [],
      policyText: ''
    }
  },
  props: {
    data: Object
  },

  components: {
    DependencyTree,
    PolicyEditor
  },
  mounted() {
    var data = this.data;
    this.policyText = data.policyText
    this.authSchemeName = data.authSchemeName
  },
  methods: {
    getDepsParam() {
      var depMap = {}
      this.deps.forEach((dep) => {
        var data = dep.data;
        var id = `${data.deep}_${data.parent.resourceId}`
        depMap[id] = depMap[id] || [];
        depMap[id].push({
          resourceId: data.resourceId
        })
      });

      var deps = Object.keys(depMap).map((key) => {
        var [deep, resourceId] = key.split('_', 2)
        deep = parseInt(deep)
        return {
          deep,
          resourceId,
          dependencies: depMap[key]
        }
      });
      return deps
    },
    validatePolicyHandler(detail) {
      if (detail.done) {
        this.$message.success('校验通过')
      }
    },
    saveAuthNode() {
      var deps = this.getDepsParam()
      var data = this.data
      var params = {
        resourceId: this.resourceId,
        // dependStatements: deps
      }
      if (this.authSchemeName !== data.authSchemeName) {
        params.authSchemeName = this.authSchemeName
      }

      if (this.policyText !== data.policyText) {
        params.policyText = this.policyText
        params.policyText = btoa(params.policyText)
      }

      console.log(params)
      this.$services.authSchemes.put(this.data.authSchemeId, params).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('更新成功');
          this.$emit('closeTab', {data: res.data.data}) //关闭当前tab
        } else {
          throw new Error(res.data.msg)
        }
      }).catch(this.$error.showErrorMessage)
    }
  }
}
