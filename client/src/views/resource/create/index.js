/*
web component自定义标签名规则https://www.w3.org/TR/custom-elements/#valid-custom-element-name
创建资源接口：http://doc.freelog.com/resource/%E5%88%9B%E5%BB%BA%E8%B5%84%E6%BA%90.html
 */
import {mapGetters} from 'vuex'
import PageBuilder from './pagebuilder.vue'


export default {
  name: 'resource-creator',
  components: {PageBuilder},
  data() {
    const validateResourceType = (rule, value, callback) => {
      const NAME_REG = /[A-Za-z_-]{4,40}/
      if (!NAME_REG.test(value)) {
        callback(new Error('命名格式有误，只能包含大小写字母、_和-，长度4~40'));
      } else {
        callback()
      }
    }

    const validateWidgetName = (rule, value, callback) => {
      const NAME_REG = /^freelog-[a-z0-9._-]{4,15}-[a-z0-9._-]{4,64}$/
      if (this.formData.resourceType === 'Widget' && !NAME_REG.test(value)) {
        callback(new Error('命名格式有误，必须以freelog-开头，如：freelog-demo-testWidget'));
      } else {
        callback()
      }
    }

    return {
      rules: {
        resourceName: [{required: true, message: '请输入资源名称', trigger: 'blur'},],
        widgetName: [
          {validator: validateWidgetName, trigger: 'blur'}
        ],
        resourceType: [
          {required: true, message: '请选择资源类型', trigger: 'blur'},
          {validator: validateResourceType, trigger: 'blur'}
        ]
      },
      options: [
        {value: 'RevealSlide', label: 'revealSlide'},
        {value: 'MarkDown', label: 'markdown'},
        {value: 'Image', label: 'image'},
        {value: 'PageBuild', label: 'PageBuild'},
        {value: 'Widget', label: 'widget'},
        {value: 'Audio', label: 'audio'},
        {value: 'Video', label: 'video'}
      ],

      formData: {
        resourceType: 'PageBuild',
        resourceName: '',
        widgetName: '',
        metas: [],
      },
      //上传到服务器的数据
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
    this.uploader.headers.Authorization = this.session.token;
    this.addMetaHandler()
  },
  methods: {
    addMetaHandler() {
      this.formData.metas.push({
        key: '',
        value: ''
      })
    },
    deleteMetaHandler(index) {
      this.formData.metas.splice(index, 1)
    },
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
        this.$message.error(res.msg + '资源Id为: ' + res.data);
      } else {
        this.$message.success('资源创建成功');
        setTimeout(() => {
          this.$router.push({path: '/resource/policy/create', query: {resourceId: res.data.resourceId}})
        }, 5e2)
      }
    },
    packDataForPageBuild($uploader) {
      var pageBuilder = this.$refs.pageBuilder
      $uploader.handleStart(pageBuilder.getPageBuildFile());
    },
    packDataForWidget($uploader) {
      $uploader.data.meta.widgetName = this.formData.widgetName;
    },
    packUploadData() {
      var $uploader = this.$refs.upload;
      var uploadData = $uploader.data;
      var formData = this.formData;
      const resType = formData.resourceType
      const fnName = `packDataFor${resType}`


      Object.keys(formData).forEach((key) => {
        if (/^resource/i.test(key)) {
          uploadData[key] = formData[key]
        }
      });


      uploadData.meta = this.packMetaData()
      this[fnName] && this[fnName]($uploader);

      uploadData.meta = JSON.stringify(uploadData.meta)
    },
    packMetaData() {
      var metas = {}
      this.formData.metas.forEach((meta) => {
        (meta.key) && (metas[meta.key] = meta.value)
      })

      return metas;
    },
    submitUpload(formName) {
      var $uploader = this.$refs.upload;

      this.$refs[formName].validate((valid, err) => {
        if (valid) {
          this.packUploadData();
          //检查是否有上传文件
          if ($uploader.uploadFiles.length > 0) {
            $uploader.submit();
          } else {
            this.$message.error('无上传文件')
          }
          console.log($uploader.uploadFiles)
          console.log(this.uploader)
        } else {
          this.$message.error('数据验证有误')
          return false;
        }
      });
    }
  }
}
