<template>
  <div class="first-step">
    <div class="step-title">资源基础信息</div>

    <el-form :model="formData" label-width="0" :rules="rules" ref="createForm">
      <el-form-item prop="resourceName">
        <el-input v-model="formData.resourceName" class="resource-name"></el-input>
        <el-select
          v-model="formData.resourceType"
          allow-create
          filterable
          @change="resourceTypeChange"
          :disabled="!isCreating"
          class="resource-type"
          placeholder="资源类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="widgetName" v-show="formData.resourceType === ResourceTypes.widget">
        <el-input v-model="formData.widgetName"
                  style="width: 95%"
                  clearable
                  placeholder="widget名称">
        </el-input>
      </el-form-item>
      <el-form-item v-show="formData.resourceType !== ResourceTypes.pageBuild && isCreating">
        <el-upload
          class="upload-container"
          drag
          ref="upload"
          action="/api/v1/resources"
          :data="uploader.data"
          :headers="uploader.headers"
          :on-error="errorHandler"
          :on-change="fileChangeHandler"
          :on-success="successHandler"
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传文件不超过50MB，只能上传一个文件</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  /*
web component自定义标签名规则https://www.w3.org/TR/custom-elements/#valid-custom-element-name
创建资源接口：http://doc.freelog.com/resource/%E5%88%9B%E5%BB%BA%E8%B5%84%E6%BA%90.html
 */
  import {storage} from '@/lib'
  import CONFIG from '@/config/index'

  const {RESOURCE_TYPES} = CONFIG

  export default {
    name: 'resource-creator-first-step',

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
        }
      }
    },
    props: {
      data: {
        type: Object
      }
    },

    computed: {
      isCreating() {
        return !this.data.resourceId
      }
    },

    watch: {
      data() {
        if (this.data.resourceId) {
          this.formData.resourceType = this.data.resourceType
          this.formData.resourceName = this.data.resourceName
          this.formData.widgetName = this.data.systemMeta.widgetName || ''
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
        var metaData = {}

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
        return this.data.resourceName !== this.formData.resourceName
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
          resourceName: this.formData.resourceName
        }).then((res) => {
          return res.getData()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .first-step {
    width: 720px;
  }

  .resource-name {
    width: 64.5%;
  }

  .resource-type {
    width: 30%;
  }

  .step-title {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 20px;
  }
</style>
