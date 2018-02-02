import compiler from 'freelog_policy_compiler'

export default {
  name: 'policy-editor',
  data() {
    return {
      submitLoading: false,
      policyText: this.value || `for nodes :
  in initial :
    proceed to <signing> on transaction of 100 to feth233dbc32069
  in <signing> :
    proceed to activate on accepting license e759419923ea25bf6dff2694391a1e65c21739ce`,
      licenses: [],
      state4: '',
      licenseContent: '',
      licenseMap: {},
      timeout:  null,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ]
    }
  },
  props: {
    value: String
  },
  watch: {
    value: function () {
      this.policyText = this.value
    }
  },
  mounted() {
    this.$on('submit', this.submit.bind(this));
    this.licenses = this.loadAll();
  },
  methods: {
    validate() {
      var myBeautify = compiler.compile(this.policyText, 'beautify')

      if (!myBeautify.errorMsg) {
        this.policyText = myBeautify.stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
        this.$emit('validate',{done: true})
      } else {
        this.$emit('validate',{done: false, error: {
          message: myBeautify.errorMsg
        }})
        this.$message.error(myBeautify.errorMsg)
      }
    },
    createHandler(data) {
      return this.$services.policy.post(data)
    },
    updateHandler(resourceId, data) {
      return this.$services.policy.put(resourceId, data)
    },
    submit(resourceId) {
      if (!this.policyText || this.value === this.policyText) {
        return Promise.resolve(true)
      }

      if (this.submitLoading) {
        return
      }
      this.submitLoading = true;

      var data = {
        policyText: btoa(this.policyText),
        languageType: 'freelog_policy_lang'
      };

      return new Promise((resolve, reject) => {
        var promise
        if (this.policyDetail) {
          promise = this.updateHandler(resourceId, data)
        } else {
          data.resourceId = resourceId
          promise = this.createHandler(data)
        }
        promise.then((res) => {
          this.submitLoading = false;
          (res.data.errcode === 0) ? resolve(true) : reject(res.data.msg)
        }).catch((err) => {
          this.submitLoading = false;
          reject(err.response.errorMsg || err)
        })
      })
    },
    loadAll() {
      this.$axios.get('/v1/resources/warehouse?resourceType=license').then((res)=> {
        this.licenses = res.data.data.dataList.map((data)=> {
          return {
            value: data.resourceName,
            id: data.resourceId
          }
        })
      })
    },
    querySearchAsync(queryString, cb) {
      var licenses = this.licenses;
      var results = queryString ? licenses.filter(this.createStateFilter(queryString)) : licenses;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.id.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.showLicenseContent(item);
    },
    showLicenseContent(item) {
      if (this.licenseMap[item.id]) {
        this.licenseContent = this.licenseMap[item.id];
      } else {
        this.$axios.get('/v1/auths/resource/'+ item.id +'.data').then((res)=> {
          this.licenseContent = res.getData();
          this.licenseMap[item.id] = res.getData();
        })
      }
    }
  }
}
