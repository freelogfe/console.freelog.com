/*
web component自定义标签名规则https://www.w3.org/TR/custom-elements/#valid-custom-element-name
创建资源接口：http://doc.freelog.com/resource/%E5%88%9B%E5%BB%BA%E8%B5%84%E6%BA%90.html
 */
import {mapGetters} from 'vuex'
import PageBuilder from './pagebuilder.vue'
import {RESOURCE_TYPES} from '@/config/view-config'


export default {
  name: 'resource-creator',
  components: {PageBuilder},
  data() {
    const validateResourceType = (rule, value, callback) => {
      const NAME_REG = /^[a-z][0-9a-z_]{3,19}[^_]$/

      if (!NAME_REG.test(value)) {
        callback(new Error('命名格式有误，需满足' + NAME_REG.toString()));
      } else {
        callback()
      }
    }

    const validateWidgetName = (rule, value, callback) => {
      //格式为freelog-xxx-yyyy，最少4个字符
      const NAME_REG = /^freelog-[a-z0-9._-]{4,15}-[a-z0-9._-]{4,64}$/
      if (this.formData.resourceType === RESOURCE_TYPES.widget && !NAME_REG.test(value)) {
        callback(new Error('命名格式有误，必须以freelog-开头，如：freelog-demo-testWidget'));
      } else {
        callback()
      }
    }

    return {
      ResourceTypes: RESOURCE_TYPES,
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
      options: Object.keys(RESOURCE_TYPES).map((k) => {
        return {label: k, value: RESOURCE_TYPES[k]}
      }),

      formData: {
        resourceType: RESOURCE_TYPES.image || '',
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
      } else if (res.errcode == 100) {
        this.$message.error(res.msg);
      } else {
        this.$message.success('资源创建成功');
        setTimeout(() => {
          this.$router.push({path: '/resource/policy/create', query: {resourceId: res.data.resourceId}})
        }, 5e2)
      }
    },
    generatePageBuildFile(opt) {
      var filename = opt.filename || 'page-build.html'
      var mimetype = opt.mimetype || 'text/html'
      var html = opt.code
      var file = new File([html], filename, {
        type: mimetype,
      })

      return file
    },
    packDataForpage_build($uploader) {
      var pageBuilder = this.$refs.pageBuilder

      return new Promise((resolve) => {
        //获取pb代码变更结果
        pageBuilder.$once('codeChange', (data) => {
          if (data.code) {
            $uploader.handleStart(this.generatePageBuildFile({code: data.code}));
            resolve()
          } else {
            resolve()
          }
        });
        //如果是view模式，需要从iframe中同步pb，获得最新的pb内容
        pageBuilder.syncContent()
      })
    },
    packDataForwidget($uploader) {
      $uploader.data.meta.widgetName = this.formData.widgetName;
    },
    packUploadData(callback) {
      var $uploader = this.$refs.upload;
      var formData = this.formData;
      const resType = formData.resourceType
      const fnName = `packDataFor${resType}`

      $uploader.data.meta = {}
      var fn = this[fnName] && this[fnName]($uploader); //资源类型数据处理函数
      this.packMetaData()

      if (fn instanceof Promise) {
        fn.then(callback)
      } else {
        callback()
      }
    },
    packMetaData() {
      var $uploader = this.$refs.upload;
      var uploadData = $uploader.data;
      var formData = this.formData;
      var metas = {}

      Object.keys(formData).forEach((key) => {
        if (/^resource/i.test(key)) {
          uploadData[key] = formData[key]
        }
      });

      this.formData.metas.forEach((meta) => {
        (meta.key) && (metas[meta.key] = meta.value)
      })

      Object.keys(uploadData.meta).forEach((key) => {
        metas[key] = uploadData.meta[key]
      })

      uploadData.meta = JSON.stringify(metas)
      return metas;
    },
    submitResourceHandler(formName) {
      var $uploader = this.$refs.upload;

      this.$refs[formName].validate((valid, err) => {
        if (valid) {
          this.packUploadData(() => {
            //检查是否有上传文件
            if ($uploader.uploadFiles.length > 0) {
              $uploader.submit()
            } else {
              this.$message.error('无上传文件')
            }
          });
        } else {
          this.$message.error('数据验证不通过')
          return false;
        }
      });
    }
  }
}
