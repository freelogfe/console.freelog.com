/*
policy更新后，后续签订的policy按新的来，已签约过的按更新前的
 */
import {mapGetters} from 'vuex'
import ResourceMetaInfo from '../meta/index.vue'
import PolicyEditor from '@/components/policyEditor/index.vue'

export default {
  name: 'resource-detail-edit',
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      detail: {},
      activeTabName: '',
      canUpdate: false,
      valid: true,
      policyValid: true,
      submitLoading: false,
      showKeys: ['resourceId', 'resourceType', 'resourceUrl', 'mimeType', 'createDate'],
      policyText: '',
      rules: {},
      uploader: {
        headers: {
          method: 'POST'
        },
        data: {}
      }
    }
  },
  computed: Object.assign({
    send: function () {
      return this.valid && this.policyValid
    }
  }, mapGetters({
    session: 'session'
  })),
  components: {
    ResourceMetaInfo,
    PolicyEditor
  },
  mounted() {
    this.$watch('detail', () => {
      this.$refs.detail.validate((valid, err) => {
        this.valid = valid
      });
    }, {deep: true})

    var self = this;
    var resourceId = this.$route.query.resourceId

    if (this.session.token) {
      this.uploader.headers.Authorization = this.session.token;
    }
    if (resourceId) {
      this.loadResourceDetail(resourceId)
      this.loadPolicyDetail(resourceId)
        .then((policy) => {
          if (policy) {
            self.policyText = policy.policyText
          }
          this.detail.policyText = self.policyText

          console.log('detail', this.detail)
        })
      this.activeTabName = this.$route.hash.slice(1)
    } else {
      this.$message.error('缺少参数resourceId');
    }
  },
  methods: {
    loadResourceDetail(resourceId) {
      return this.$services.resource.get(resourceId)
        .then((res) => {
          var detail = res.getData()
          detail.meta = JSON.stringify(detail.meta)
          return (this.detail = detail);
        }).catch(this.$error.showErrorMessage)
    },
    loadPolicyDetail(resId) {
      return this.$services.policy.get(resId)
        .then((res) => {
          return res.getData()
        }).catch(this.$error.showErrorMessage)
    },
    //todo 测试阶段使用
    updatePageBuildHandler() {
      this.validate()
        .then((valid) => {
          if (valid) {
            var $uploader = this.$refs.upload;
            $uploader.data.meta = '{}'
            $uploader.submit()
          } else {
            this.$message.error('数据验证不通过')
          }
        })
    },
    fileLimitHandler(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      this.canUpdate = fileList.length > 0

    },
    validate() {
      return new Promise((resolve) => {
        this.$refs['detail'].validate((valid, err) => {
          console.log(err)
          resolve(valid)
        });
      })
    },
    successHandler(data) {
      if (data.ret === 0 && data.errcode === 0) {
        this.$message.success('更新成功')
      } else {
        this.$message.error(data.msg)
      }
    },
    updatePolicy(resourceId) {
      var data = {
        policyText: btoa(this.policyText),
        languageType: 'freelog_policy_lang'
      };
      if (this.detail.policyText) {
        return this.$services.policy.put(resourceId, data)
      } else {
        data.resourceId = resourceId
        return this.$services.policy.post(data)
      }
    },
    saveHandler() {
      if (this.submitLoading) {
        return
      }

      const mutableKeys = ['resourceName', 'meta'];
      var data = {}
      var resId = this.detail.resourceId

      mutableKeys.forEach((k) => {
        data[k] = this.detail[k]
      })

      try {
        data.meta = JSON.parse(data.meta)
      } catch (err) {
        return this.$message.error(err)
      }
      this.submitLoading = true

      var promises = []
      promises.push(this.$services.resource.put(resId, data))


      if (this.detail.policyText !== this.policyText) {
        promises.push(this.updatePolicy(resId))
      }

      Promise.all(promises)
        .then((resList) => {
          this.submitLoading = false
          let res = resList[0] //资源更新结果
          if (res.data.errcode === 0) {
            this.$message.success('更新成功')
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.submitLoading = false
          this.$error.showErrorMessage(err)
        })
    },
    backToList() {
      this.$router.push({
        path: '/resource/list',
      })
    },
    fixCodeMirrorRender() {
      let meta = this.detail.meta
      this.detail.meta = ''
      this.$nextTick(() => {
        this.detail.meta = meta
      })
    },
    tabChange(tab, event) {
      switch (tab.name) {
        case 'metaInfo':
          this.fixCodeMirrorRender()
          break;
      }
    },
    validatePolicyHandler(detail) {
      this.policyValid = detail.done
      if (detail.done) {
        this.$message.success('校验通过')
      }
    }
  }
}
