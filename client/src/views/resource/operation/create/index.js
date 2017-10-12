import {mapGetters} from 'vuex'

export default {
  name: 'resource-creator',
  data() {
    return {
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'MarkDown', label: 'markdown'},
        {value: 'Image', label: 'image'},
        {value: 'PageBuild', label: 'page build'},
        {value: 'Widget', label: 'widget'},
        {value: 'Audio', label: 'audio'},
        {value: 'Video', label: 'video'}
      ],
      uploader: {
        headers: {
          method: 'POST'
        },
        data: {
          resourceType: '',
          meta: {}
        }
      }
    }
  },
  computed: mapGetters({
    session: 'session'
  }),
  mounted() {
  },
  methods: {
    errorHandler(err, file) {
      switch (err.status) {
        case 400:
          this.$message.error('不支持的文件类型');
          break;
        case 401:
          this.$message.error('权限未经验证');
          break;
      }
    },
    successHandler(res, file) {
      if (res.ret != 0) {
        this.$message.error(res.msg);
      } else {
        this.$message.success('资源创建成功');
        setTimeout(() => {
          this.$router.push({path: '/resource/policy/create', query: {resourceId: res.data.resourceId}})
        }, 5e2)
      }
    },
    submitUpload() {
      this.uploader.data.meta = JSON.stringify(this.uploader.data.meta)
      this.$refs.upload.submit();
    }
  }
}
