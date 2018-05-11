import ResourceMetaInfo from '../../meta/index.vue'
import {storage} from '@/lib'
import CONFIG from '@/config/index'

const {RESOURCE_TYPES} = CONFIG

export default {
  name: 'base-resource-creator',
  components: {
    ResourceMetaInfo
  },
  data() {
    const validateResourceType = (rule, value, callback) => {
      const NAME_REG = /^[a-z][0-9a-z_]{3,19}[^_]$/

      if (!NAME_REG.test(value)) {
        callback(new Error('命名格式有误，需满足' + NAME_REG.toString()));
      } else {
        callback()
      }
    }

//      保持与web component中自定义标签名一致
    const validateWidgetName = (rule, value, callback) => {
      //格式为freelog-xxx-yyyy，最少4个字符
      const NAME_REG = /^freelog-[a-z0-9._-]{4,15}-[a-z0-9._-]{4,64}$/
      if (this.formData.resourceType === RESOURCE_TYPES.widget && !NAME_REG.test(value)) {
        callback(new Error('/^freelog-[a-z0-9._-]{4,15}-[a-z0-9._-]{4,64}$/'));
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

      loading: false,
      formData: {
        resourceType: storage.get('CREATE_RESOURCE_TYPE') || RESOURCE_TYPES.widget,
        resourceName: '',
        widgetName: ''
      },
      //上传到服务器的数据
      uploader: {
        headers: {
          method: 'POST'
        },
        data: {}
      },
      valid: false,
      meta: '{}'
    }
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {},

  watch: {
    data() {
      if (this.data.resourceId) {
        this.formData.resourceType = this.data.resourceType
        this.formData.resourceName = this.data.resourceName
        this.formData.widgetName = this.data.systemMeta.widgetName || ''

        if (this.data.meta) {
          try {
            this.meta = JSON.stringify(this.data.meta)
          } catch (e) {
            this.meta = '{}'
          }
        }
      }
    }
  },
  mounted() {
    this.resourceTypeChange(this.formData.resourceType)
  },
  methods: {
    resourceTypeChange(type) {
      storage.set('CREATE_RESOURCE_TYPE', type)
    },
    checkMetaValid(valid) {
      this.valid = valid
    },
    errorHandler(err) {
      this.loading = false
      var errMsg
      switch (err.status) {
        case 400:
          errMsg = '不支持的文件类型'
          break;
        case 401:
          errMsg = '权限未经验证'
          break;
        default:
          errMsg = err.message
      }

      this.$emit('uploadEnd', {error: errMsg})
      this.$refs.upload.fileList = [] //reset
    },
    successHandler(res) {
      this.loading = false
      if (res.ret !== 0 || res.errcode !== 0) {
        //reset
        this.$refs.upload.uploadFiles.forEach((file) => {
          file.status = 'ready'
        });

        this.$emit('uploadEnd', {error: res.msg})
      } else {
        this.$emit('uploadEnd', res.data)
      }
    },
    fileChangeHandler(file, fileList) {
      if (this.fileLimitValidator(file, fileList)) {
        var fileName = file.name.split('.', 2)[0]
        if (!this.formData.widgetName && this.formData.resourceType === RESOURCE_TYPES.widget) {
          this.formData.widgetName = fileName
        }

        if (!this.formData.resourceName) {
          this.formData.resourceName = fileName
        }
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.createForm.validate((valid, err) => {
          if (valid) {
            resolve()
          } else {
            reject(err)
          }
        })
      })
    },
    //是否超过上传限制
    fileLimitValidator(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
        return false
      }

      return true
    },
    packUploadData() {
      var $uploader = this.$refs.upload;
      var uploadData = $uploader.data;
      var formData = this.formData;
      var metaData
      try {
        metaData = JSON.parse(this.meta)
      } catch (err) {
        console.error(err)
        metaData = {}
      }
      Object.keys(formData).forEach((key) => {
        if (/^resource/i.test(key)) {
          uploadData[key] = formData[key]
        }
      });

      if (this.formData.widgetName) {
        metaData.widgetName = this.formData.widgetName;
      }
      uploadData.meta = JSON.stringify(metaData)
    },
    isChanged() {
      return (this.data.resourceName !== this.formData.resourceName) ||
        (JSON.stringify(this.data.meta) !== this.meta)
    },
    nextHandler() {
      return new Promise((resolve, reject) => {
        this.validate()
          .then(() => {
            this.packUploadData();
            if (!this.data.resourceId) {
              this.createResource().then(resolve).catch(reject)
            } else if (this.isChanged()) {
              this.updateResource().then(resolve).catch(reject)
            } else {
              resolve()
            }
          }).catch(reject)
      })
    },
    createResource() {
      return new Promise((resolve, reject) => {
        var $uploader = this.$refs.upload;
        if ($uploader.uploadFiles.length > 0) {
          this.loading = true
          this.$once('uploadEnd', (detail) => {
            if (detail.error) {
              reject(detail.error)
            } else {
              resolve(detail)
            }
          });
          $uploader.submit()
        } else {
          reject('无上传文件')
        }
      })
    },
    updateResource() {
      return this.$services.resource.put(this.data.resourceId, {
        resourceName: this.formData.resourceName,
        meta: JSON.parse(this.meta)
      }).then((res) => {
        if (res.ret !== 0 || res.errcode !== 0) {
          return Promise.reject(res)
        }
        return res.getData()
      })
    }
  }
}
