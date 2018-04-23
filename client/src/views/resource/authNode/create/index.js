import PolicyEditor from '@/components/policyEditor/index.vue'
import DependencyTree from '../dependencytree/index.vue'
import compiler from '@freelog/resource-policy-compiler'

export default {
  name: 'create-auth-node',
  data() {
    return {
      resourceId: this.$route.query.resourceId,
      authSchemeName: '',
      policyText: '',
      deps: [],
      rules: {
        authSchemeName: (value) => {
          if (!value || value.length < 2 || value.length > 100) {
            return '授权点名称长度为2-100位';
          } else {
            return null
          }
        },
        policyText: (value) => {
          value = value.trim()
          var result = compiler.compile(value);
          console.log(value, result.errorMsg)
          if (!value || result.errorMsg) {
            return '授权策略内容有误'
          }
          return null
        }
      }
    }
  },
  components: {
    DependencyTree,
    PolicyEditor
  },
  mounted() {

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
    validate(params) {
      for (var key in params) {
        var fn = this.rules[key]
        if (fn) {
          var errMsg = fn(params[key]);
          if (errMsg) {
            this.$message.error(errMsg)
            return false
          }
        }
      }

      return true
    },
    createAuthNode() {
      var deps = this.getDepsParam()

      let params = {
        authSchemeName: this.authSchemeName,
        policyText: this.policyText,
        resourceId: this.resourceId,
        languageType: 'freelog_policy_lang',
        dependStatements: deps
      }

      if (!this.validate(params)) {
        return
      }

      params.policyText = btoa(params.policyText)

      this.$services.authSchemes.post(params).then((res) => {
        if (res.data.errcode === 0) {
          this.$message.success('创建成功');
          this.$emit('closeTab', {name: 'create-auth-node', data: res.data.data}) //关闭当前tab
        } else {
          throw new Error(res.data.msg)
        }
      }).catch(this.$error.showErrorMessage)
    },
  }
}
