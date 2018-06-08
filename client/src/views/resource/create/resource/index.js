import ResourceMetaInfo from '../../meta/index.vue'
import {storage} from '@/lib'
import CONFIG from '@/config/index'
import RichEditor from '@/components/RichEditor/index.vue'

const {RESOURCE_TYPES} = CONFIG
const EDIT_MODES = {
  creator: 'creator',
  editor: 'editor'
}

export default {
  name: 'base-resource-creator',
  components: {
    ResourceMetaInfo,
    RichEditor
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
        widgetName: '',
        description: '',
        previewImage: ''
      },
      //上传到服务器的数据
      uploader: {
        headers: {
          method: 'POST'
        },
        data: {}
      },
      valid: false,
      meta: '{}',
      editMode: EDIT_MODES.creator,
      editorConfig: {}
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

  computed: {
    showCreatorInputItem() {
      return this.editMode === EDIT_MODES.creator
    }
  },

  watch: {
    data() {
      if (this.data.resourceId) {
        console.log(this.data)

        this.editMode = EDIT_MODES.editor
        Object.assign(this.formData, this.data)
        this.formData.widgetName = this.data.systemMeta.widgetName || ''
        if (this.data.previewImages.length) {
          this.formData.previewImage = this.data.previewImages[0]
        }
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
    imageUploadSuccessHandler(res) {
      if (res.errcode === 0) {
        this.formData.previewImage = res.data
      } else {
        this.$error.showErrorMessage(res.msg)
      }
    },
    previewImageChangeHandler(file, fileList) {
      this.fileLimitValidator(file, fileList)
    },
    validateImageHandler(file) {
      if (!/\.(jpg|png|gif|tiff|webp)$/.test(file.name)) {
        this.$message.error('不支持的图片类型')
        return false
      }

      return true
    },
    imgUploadSuccessHandler(fid, res) {
      var editor = this.$refs.editor;
      console.log(arguments)
      try {
        res = JSON.parse(res)
      } catch (err) {
        res = {}
        console.error(err)
      }
      if (res.data) {
        editor.insertImg(res.data)
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
      var uploadData = $uploader.data || {};
      var formData = this.formData;
      var metaData;
      const INPUT_KEYS = ['resourceType']
      const UPDATE_KEYS = ['resourceName']
      var keys = UPDATE_KEYS


      //包装meta数据
      try {
        metaData = JSON.parse(this.meta)
      } catch (err) {
        console.error(err)
        metaData = {}
      }
      if (this.formData.widgetName) {
        metaData.widgetName = this.formData.widgetName;
      }

      if (this.editMode === EDIT_MODES.creator) {
        keys = keys.concat(INPUT_KEYS)
        uploadData.meta = JSON.stringify(metaData)
        uploadData.previewImage = formData.previewImage
      } else {
        uploadData.previewImages = [formData.previewImage]
        uploadData.meta = metaData
      }

      var desc = this.$refs.editor.getHtml()
      if (desc) {
        uploadData.description = desc
      }

      keys.forEach(key => {
        if (formData[key]) {
          uploadData[key] = formData[key]
        }
      });
      console.log(uploadData)
      return uploadData
    },
    isChanged() {
      //todo 待优化
      return true
    },
    nextHandler() {
      return new Promise((resolve, reject) => {
        this.validate()
          .then(() => {
            var data = this.packUploadData();

            if (!this.data.resourceId) {
              this.createResource(data).then(resolve).catch(reject)
            } else if (this.isChanged()) {
              this.updateResource(data).then(resolve).catch(reject)
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
    updateResource(data) {
      console.log(data)
      return this.$services.resource.put(this.data.resourceId, data).then((res) => {
        if (res.data.ret !== 0 || res.data.errcode !== 0) {
          return Promise.reject(res)
        }
        return res.getData()
      })
    }
  }
}
