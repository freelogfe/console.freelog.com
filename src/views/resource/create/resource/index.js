import ResourceMetaInfo from '../../meta/index.vue'
import {storage} from '@/lib'
import {RESOURCE_TYPES} from '@/config/resource'
import RichEditor from '@/components/RichEditor/index.vue'

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
      const NAME_REG = /^[a-z]{1}[0-9a-z_]{2,19}[0-9a-z]{1}$/

      if (!NAME_REG.test(value)) {
        callback(new Error('命名格式有误，需满足' + NAME_REG.toString()));
      } else {
        callback()
      }
    }

//      保持与web component中自定义标签名一致
    const validateWidgetName = (rule, value, callback) => {
      //格式为freelog-xxx-yyyy，最少4个字符
      const NAME_REG = /^freelog-[a-z0-9._-]{3,15}-[a-z0-9._-]{2,14}[a-z0-9]$/

      if (this.formData.resourceType === RESOURCE_TYPES.widget && !NAME_REG.test(value)) {
        callback(new Error('例如freelog-namespace-widgetname，namespace和widgetname至少3个字符'));
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
        }
      },
      valid: false,
      meta: '{}',
      editMode: EDIT_MODES.creator,
      editorConfig: {},
      percentage: 0,
      currentUploader: '',
      uploaderStates: {
        resource: {
          percentage: 0,
          isUploaded: false,
          isUploading: false,
          name: ''
        },
        thumbnail: {
          percentage: 0,
          isUploaded: false,
          isUploading: false,
          name: ''
        }
      }
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
    },
    shouldShowResourceUploader() {
      return !(this.uploaderStates.resource.isUploading || this.uploaderStates.resource.isUploaded)
    },
    shouldShowThumbnailInput() {
      return this.formData.resourceType === RESOURCE_TYPES.pageBuild
    }
  },

  watch: {
    data() {
      if (this.data.resourceId) {
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
      var error

      if (err.errcode !== undefined) {
        error = {error: err.msg}
      } else {
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
        error = {error: errMsg}
      }

      this.$emit('uploadEnd', error)
      this.$refs.resourceUploader.fileList = [] //reset clearFiles
    },
    successHandler(res, file) {
      this.loading = false
      if (res.ret !== 0 || res.errcode !== 0) {
        //reset
        this.$refs.resourceUploader.clearFiles()
        this.uploaderStates.resource.isUploading = false;
        this.uploaderStates.resource.percentage = 0;
        this.$message.error(res.msg)
        this.$emit('uploadEnd', {error: res.msg})
      } else {
        this.uploaderStates.resource.sha1 = res.data.sha1
        this.uploaderStates.resource.isUploaded = true
        this.uploaderStates.resource.percentage = 100
        this.autoSetFormData(file)
        this.$emit('uploadEnd', res.data)
      }
    },
    autoSetFormData(file) {
      var fileName = file.name.split('.');

      if (fileName.length > 1) {
        fileName.pop()
      }
      fileName = fileName.join('.')
      if (!this.formData.widgetName && this.formData.resourceType === RESOURCE_TYPES.widget) {
        this.formData.widgetName = fileName
      }

      if (!this.formData.resourceName) {
        this.formData.resourceName = fileName
      }
    },
    fileChangeHandler(file, fileList) {
      if (this.fileLimitValidator(file, fileList)) {

      }
    },
    imageUploadSuccessHandler(res) {
      this.uploaderStates.thumbnail.isUploading = false
      if (res.errcode === 0) {
        this.formData.previewImage = res.data
        this.uploaderStates.thumbnail.isUploaded = true
        this.uploaderStates.thumbnail.percentage = 100
      } else {
        this.uploaderStates.thumbnail.percentage = 0
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

      this.resetUploaderState(this.uploaderStates.thumbnail)
      return true
    },
    clearUploaderHandler(uploader) {
      var $uploader
      var uploaderState = this.uploaderStates[uploader]
      if (uploader === 'resource') {
        $uploader = this.$refs.resourceUploader
      } else {
        $uploader = this.$refs.thumbnailUploader
      }

      $uploader.clearFiles()
      $uploader.abort(uploaderState.file)
      Object.assign(uploaderState, {
        sha1: '',
        name: '',
        isUploading: false,
        isUploaded: false,
        percentage: 0
      });
    },
    beforeUploadHandler(file) {
      this.resetUploaderState(this.uploaderStates.resource, file);
    },
    resetUploaderState(uploader, file) {
      Object.assign(uploader, {
        file: file,
        name: (file && file.name) || '',
        isUploading: true,
        isUploaded: false,
        percentage: 0
      });
    },
    imgUploadSuccessHandler(detail) {
      var data = detail.data;
      var editor = this.$refs.editor;
      if (data.errcode === 0) {
        editor.insertImg(data.data)
      } else {
        this.$message.error(data.msg)
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        var reourceUploader = this.uploaderStates.resource
        this.$refs.createForm.validate((valid, err) => {
          if (valid) {
            if (this.editMode === EDIT_MODES.creator) {
              var errMsg;
              if (!reourceUploader.sha1) {
                errMsg = '未上传资源文件'
              } else if (!reourceUploader.isUploaded) {
                errMsg = '资源文件正在上传中，等上传完再点击创建';
              }

              if (errMsg) {
                return reject(errMsg);
              }
            }

            try {
              JSON.parse(this.meta)
            } catch (err) {
              console.error(err)
              return reject(`meta格式有误: ${err}`)
            }

            resolve()
          } else {
            var msg = Object.keys(err).map(key => {
              var item = err[key]
              return item.message
            })
            reject(msg.join('，'))
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
      var reourceUploader = this.uploaderStates.resource
      var uploadData = {};
      var formData = this.formData;
      var metaData;
      const INPUT_KEYS = ['resourceType']
      const UPDATE_KEYS = ['resourceName']
      var keys = UPDATE_KEYS

      //包装meta数据
      try {
        metaData = JSON.parse(this.meta)
      } catch (err) {
        metaData = {}
      }
      if (this.formData.widgetName) {
        metaData.widgetName = this.formData.widgetName;
      }

      if (this.editMode === EDIT_MODES.creator) {
        keys = keys.concat(INPUT_KEYS)
        uploadData.sha1 = reourceUploader.sha1
        formData.previewImage && (uploadData.previewImage = formData.previewImage)
      } else {
        formData.previewImage && (uploadData.previewImages = [formData.previewImage]);
      }

      uploadData.meta = metaData
      var desc = this.$refs.editor.getHtml()
      if (desc) {
        uploadData.description = desc
      }

      keys.forEach(key => {
        if (formData[key]) {
          uploadData[key] = formData[key]
        }
      });
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
    createResource(data) {
      return new Promise((resolve, reject) => {
        var $uploader = this.$refs.resourceUploader;
        if ($uploader.uploadFiles.length > 0) {
          this.$services.resource.post(data).then(res => {
            if (res.data.ret !== 0 || res.data.errcode !== 0) {
              reject(res.data.msg)
            } else {
              resolve(res.data.data)
            }
          })
        } else {
          reject('无上传文件')
        }
      })
    },
    updateResource(data) {
      return this.$services.resource.put(this.data.resourceId, data).then((res) => {
        if (res.data.ret !== 0 || res.data.errcode !== 0) {
          return Promise.reject(res)
        }
        return res.getData()
      })
    },
    uploadProgressHandler(event, file, fileList) {
      var uploaderStates = this.uploaderStates;
      var uploader
      if (uploaderStates.resource.name === file.name) {
        uploader = uploaderStates.resource
      } else if (uploaderStates.thumbnail.name === file.name) {
        uploader = uploaderStates.thumbnail
      }

      if (uploader) {
        uploader.percentage = parseInt(file.percentage.toFixed())
      }
    }
  }
}
