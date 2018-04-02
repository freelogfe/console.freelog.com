import TableView from '@/components/TableView/index.vue'
import DependencyTree from '../dependencytree/index.vue'
import compiler from '@freelog/resource-policy-compiler'
export default {
  name: 'create-auth-node',
  data() {
    return {
      resourceId: this.$route.query.resourceId,
      authSchemeName: '',
      policyText: '',
      dependStatements: [],
      rules: {
        authSchemeName: (value)=> {
          if(value.length<2|| value.length>100) {
            return '名称长度为2-100位';
          }else {
            return
          }
        },
        policyText: (value)=> {
          value=value.trim()
          var result = compiler.compile(value);
          if (value === '' || result.errorMsg) {
            return 'policy格式有误'
          }
          return
        }
      }
    }
  },
  components: {
    TableView,
    DependencyTree
  },
  mounted() {

  },
  methods: {
    dependencies(data) {
      console.log('data',data);
    },
    saveAuthNode() {
        let params = {
          authSchemeName: this.authSchemeName,
          policyText: this.policyText,
          resourceId: this.resourceId,
          dependStatements: []
        }
        for (var i in params) {
          let res = this.rules[i](params[i]);
          if (res) {
            this.$message.warning(res);
            return res
          }
        }

        this.$services.authSchemes.post(params).then(()=> {
          this.$message.success('创建成功');
          this.$parent.$parent.$parent.$emit('close','newauthnode') //关闭当前tab
        }).catch((err)=> {
          this.$message.warning(''+err);
        })
    },



  }
}
