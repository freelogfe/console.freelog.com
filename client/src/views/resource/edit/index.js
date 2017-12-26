/*
policy更新后，后续签订的policy按新的来，已签约过的按更新前的
 */
import {mapGetters} from 'vuex'
import ResourceMetaInfo from '../meta/index.vue'
import PolicyEditor from '../policy/index.vue'

export default {
  name: 'resource-detail-edit',
  data() {
    return {
      detail: {},
      activeTabName: '',
      submitLoading: false,
      showKeys: ['resourceId', 'resourceType', 'resourceUrl', 'mimeType', 'createDate'],
      policyText: '',
      rules: {},
      metas: [],
      uploader: {
        headers: {
          method: 'POST'
        },
        data: {}
      }
    }
  },
  computed: mapGetters({
    session: 'session'
  }),
  components: {
    ResourceMetaInfo,
    PolicyEditor
  },
  mounted() {
    var self = this;
    var resourceId = this.$route.query.resourceId

    this.uploader.headers.Authorization = this.session.token;
    if (resourceId) {
      this.loadResourceDetail(resourceId)
      this.loadPolicyDetail(resourceId)
        .then((policy) => {
          if (policy) {
            self.policyText = policy.policyText
          }
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
        }).catch((err) => {
          this.$message.error(err.response.errorMsg || err)
        })
    },
    loadPolicyDetail(resId) {
      return this.$services.policy.get(resId)
        .then((res) => {
          return res.getData()
        })
    },
    resolveMeta() {
      var metas = this.metas;
      this.detail.meta = {}
      metas.forEach((meta) => {
        this.detail.meta[meta.key] = meta.value
      })
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
      if (data.ret == 0 && data.errcode === 0) {
        this.$message.success('更新成功')
      } else {
        this.$message.error(data.msg)
      }
    },
    saveHandler(form) {

      const mutableKeys = ['resourceName', 'meta'];
      var data = {}

      this.resolveMeta()
      mutableKeys.forEach((k) => {
        data[k] = this.detail[k]
      })

      // data.meta = JSON.stringify(data.meta)
      this.$services.resource.put(this.detail.resourceId, data)
        .then((res) => {
          if (res.data.errcode === 0) {
            this.$message.success('更新成功')
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$message.error(err.response.errorMsg || err)
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
    }
  }
}
