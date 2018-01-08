/*
web component自定义标签名规则https://www.w3.org/TR/custom-elements/#valid-custom-element-name
创建资源接口：http://doc.freelog.com/resource/%E5%88%9B%E5%BB%BA%E8%B5%84%E6%BA%90.html
 */
import PageBuilder from './pagebuilder.vue'
import ResourceMetaInfo from '../meta/index.vue'
import PolicyEditor from '../policy/index.vue'
import {mapGetters} from 'vuex'

import CONFIG from '@/config/index'

const {RESOURCE_TYPES} = CONFIG

export default {
  name: 'resource-creator',
  components: {
    PageBuilder,
    ResourceMetaInfo,
    PolicyEditor
  },
  computed: mapGetters({
    session: 'session'
  }),
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
        callback(new Error('必须以freelog-开头，仅支持小写，如：freelog-demo-testwidget'));
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

      tabs: [],
      valid: false,
      loading: false,

      formData: {
        resourceType: RESOURCE_TYPES.widget || '',
        resourceName: '',
        widgetName: '',
        meta: '',
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
  mounted() {
    if (this.session.token) {
      this.uploader.headers.authorization = this.session.token
    }

    this.resourceTypeChange(this.formData.resourceType)
    this.$watch('formData', () => {
      this.$refs.createForm.validate((valid, err) => {
        this.valid = valid
      });
    }, {deep: true})
  },
  watch: {
    formData: function () {

    }
  },
  methods: {
    resourceTypeChange(type) {
      if (type === RESOURCE_TYPES.pageBuild) {
        this.tabs.push({
          name: RESOURCE_TYPES.pageBuild,
          content: 'page-builder',
          title: 'page builder',
          data: {},
          ref: 'pageBuilder'
        })
      } else {
        this.tabs = this.tabs.filter((tab) => tab.name !== RESOURCE_TYPES.pageBuild)
      }
    },
    errorHandler(err) {
      switch (err.status) {
        case 400:
          this.$message.error('不支持的文件类型');
          break;
        case 401:
          this.$message.error('权限未经验证');
          break;
        default:
          this.$message.error(err.message);
      }

      this.$refs.upload.fileList = [] //reset
    },
    successHandler(res) {
      var self = this;
      if (res.ret !== 0 || res.errcode !== 0) {
        self.$message.error(res.msg);
        this.loading = false
      } else {
        self.$refs.policyEditor.submit(res.data.resourceId)
          .then(() => {
            self.$message.success('资源创建成功');
            this.loading = false
            setTimeout(() => {
              self.$router.push({path: '/resource/detail', query: {resourceId: res.data.resourceId}})
            }, 5e2)
          })
          .catch((errMsg) => {
            this.loading = false
            self.$message.error(`资源策略创建失败，${errMsg}`);
          })
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
      var pageBuilder = this.$refs.pageBuilder[0]

      return new Promise((resolve, reject) => {
        //获取pb代码变更结果
        pageBuilder.$once('codeChange', (data) => {
          if (data.code) {
            $uploader.handleStart(this.generatePageBuildFile({code: data.code}));
            resolve()
          } else {
            reject('page build内容为空')
          }
        });
        //如果是view模式，需要从iframe中同步pb，获得最新的pb内容
        pageBuilder.syncContent()
      })
    },
    packDataForwidget($uploader) {
      $uploader.data.meta.widgetName = this.formData.widgetName;
    },
    parseMeta() {
      var $uploader = this.$refs.upload;
      var formData = this.formData;
      if (formData.meta) {
        try {
          $uploader.data.meta = JSON.parse(formData.meta)
        } catch (err) {
          console.error(err)
          $uploader.data.meta = {}
        }
      } else {
        $uploader.data.meta = {}
      }
    },
    packUploadData(callback) {
      var $uploader = this.$refs.upload;
      var formData = this.formData;
      const resType = formData.resourceType
      const fnName = `packDataFor${resType}`

      this.parseMeta()

      var fn = this[fnName] && this[fnName]($uploader); //资源类型数据处理函数
      this.packMetaData()

      if (fn instanceof Promise) {
        fn.then(callback).catch((errMsg) => {
          this.$message.error(errMsg)
        })
      } else {
        callback()
      }
    },
    packMetaData() {
      var $uploader = this.$refs.upload;
      var uploadData = $uploader.data;
      var formData = this.formData;

      Object.keys(formData).forEach((key) => {
        if (/^resource/i.test(key)) {
          uploadData[key] = formData[key]
        }
      });

      uploadData.meta = JSON.stringify(uploadData.meta)
    },
    fileLimitHandler(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
    },
    submitResourceHandler(formName) {
      var $uploader = this.$refs.upload;

      this.$refs[formName].validate((valid, err) => {
        if (valid) {
          this.packUploadData(() => {
            //检查是否有上传文件
            if ($uploader.uploadFiles.length > 0) {
              this.loading = true
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
    },
    fixCodeMirrorRender() {
      let meta = this.formData.meta
      this.formData.meta = '{}'
      this.$nextTick(() => {
        this.formData.meta = meta
      })
    },
    tabChange(tab) {
      switch (tab.name) {
        case 'metaInfo':
          this.fixCodeMirrorRender()
          break;
      }
    }
  }
}
