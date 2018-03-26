import {compile, beautify} from '@freelog/resource-policy-compiler'
import PolicyTplList from '@/components/policyTplSelector/index.vue'
import defaultPolicyTpls from './defaultPolicyTpls'

export default {
  name: 'policy-editor',
  data() {
    return {
      submitLoading: false,
      policyText: this.value,
      licenses: [],
      state4: '',
      licenseContent: '',
      licenseMap: {},
      timeout: null,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ],
      policyTpls: [],
      showCustomPolicyTplDialog: false,
      queryPolicyTpl: '',
      defaultPolicyTpls: defaultPolicyTpls
    }
  },
  props: {
    value: String
  },
  components: {PolicyTplList},
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
      var myBeautify = compile(this.policyText)
      if (!myBeautify.errorMsg) {
        this.policyText = beautify(this.policyText);
        this.$emit('validate', {done: true})
      } else {
        this.$emit('validate', {
          done: false, error: {
            message: myBeautify.errorMsg
          }
        })
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
      this.$axios.get('/v1/resources/warehouse?resourceType=license').then((res) => {
        this.licenses = res.data.data.dataList.map((data) => {
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
        this.$axios.get('/v1/auths/resource/' + item.id + '.data').then((res) => {
          this.licenseContent = res.getData();
          this.licenseMap[item.id] = res.getData();
        })
      }
    },
    loadCustomPolicyTpl() {
      return this.$services.policyTemplate.get({
        params: {
          templateType: 1,
          pageSize: 1e2
        }
      }).then((res) => {
        var data = res.getData()
        if (data) {
          return data.dataList
        } else {
          throw new Error(res.data.msg)
        }
      })
    },
    useCustomPolicyTpl() {
      this.loadCustomPolicyTpl()
        .then((list) => {
          this.policyTpls = list
          this.showCustomPolicyTplDialog = true
        })
    },
    selectPolicyTplHandler(data) {
      this.showCustomPolicyTplDialog = false
      this.policyText = data.template
    },
    filterHandler(list) {
      return list.filter((tpl) => {
        return this.queryPolicyTpl ? tpl.name.indexOf(this.queryPolicyTpl) > -1 : true
      })
    }
  }
}
