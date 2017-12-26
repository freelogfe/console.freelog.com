/*
policy更新后，后续签订的policy按新的来，已签约过的按更新前的
 */
import {mapGetters} from 'vuex'


export default {
  name: 'resource-detail-edit',
  data() {
    return {
      detail: {},
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
  mounted() {
    var self = this;
    this.uploader.headers.Authorization = this.session.token;


    if (this.$route.query.resourceId) {
      this.load(this.$route.query.resourceId)
        .then((detail) => {
          Object.entries(detail.meta).forEach((entry) => {
            self.addMetaHandler(entry[0], entry[1]);
          })
        })
    } else {
      this.$message.error('缺少参数resourceId');
    }
  },
  methods: {
    addMetaHandler(key, value) {
      this.metas.push({
        key: key || '',
        value: value || ''
      })
    },
    deleteMetaHandler(index) {
      this.metas.splice(index, 1)
    },
    load(param) {
      return this.$services.resource.get(param || {})
        .then((res) => {
          return (this.detail = res.getData());
        }).catch((err) => {
          this.$message.error(err.response.errorMsg || err)
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
    }
  }
}
