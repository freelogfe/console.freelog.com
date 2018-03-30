import TableView from '@/components/TableView/index.vue'
export default {
  name: 'create-auth-node',
  data() {
    return {
      id: 'cc05e1b5ed7652f4135bb91aedf2faa3140a7655',
      formData: {data:{policy:[]}},
      selectedIndex: false
    }
  },
  components: {
    TableView
  },
  mounted() {
      this.init()
  },
  methods: {
    loader() {
      return (param) => {
        if (typeof param === 'object') {
          param = {
            params: param
          }
        }
        return this.$services.resource.get(param || {})
      }
    },
    saveAuthNode() {
        this.$message.success('创建成功')
        this.$parent.$parent.$parent.$emit('close','newauthnode') //关闭当前tab

    },
    init() {
      this.loadPolicyDetail()
        .then(this.queryContractsStatus.bind(this))
        .then((data) => {
          this.formData = data
          console.log(JSON.stringify(this.formData.data.policy));
        }).catch(this.$error.showErrorMessage)
    },
    loadPolicyDetail() {
      var query = this.$route.query || {resourceId:this.id}
      return new Promise((resolve) => {
        resolve(this.loadResourceDetail(query.resourceId))
      }).then((resource) => {
        var formData = {
          resource: resource,
          data: {},
          presentableInput: {
            name: resource.resourceName,
            policyText: '',
            userDefinedTags: []
          },
          selectedPolicy: null //记录选择哪个策略
        };
        console.log('resource',resource);
        formData.widgets = (resource && resource.systemMeta && resource.systemMeta.widgets) || []
        formData.widgets = formData.widgets.map((w) => {
          w.detailUrl = `/resources/detail/${w.resourceId}`
          return w
        })

        return this.$services.policy.get(resource.resourceId).then((res) => {
          let policyData = res.getData();
          policyData.policy.forEach((p) => {
            p.created = false; //是否已经创建过合同
            p._formatSegmentText = p.segmentText
            p.forUsers = p.users.map((u) => {
              return {
                type: u.userType,
                users: u.users.join(',')
              }
            })
          })

          Object.assign(formData.data, policyData)
          return formData
        })
      })
    },

    //查询合同创建状态
    queryContractsStatus(formData) {
      let partyTwo = '10024'
      return this.$services.contractRecords.get({
        params: {
          contractType:2,
          resourceIds: formData.resource.resourceId,
          partyTwo: partyTwo
        }
      }).then((res) => {
        var records = res.getData()
        records.forEach((item) => {
          if (formData.resource.resourceId === item.resourceId) {
            let policies = formData.data.policy
            for (let [j, policy] of policies.entries()) {
              if (policy.segmentId === item.segmentId) {
                policy.created = true
                break;
              }
            }
          }
        })

        return formData
      })
    },
    loadResourceDetail(resId) {
      return this.$services.resource.get(resId).then((res) => {
        return res.getData()
      })
    },

    segmentChangeHandler(formData, select) {
      if (select !== undefined) {
        this.selectedIndex = select
      }
      formData.selectedPolicy = formData.data.policy[this.selectedIndex] || false
    }


  }
}
