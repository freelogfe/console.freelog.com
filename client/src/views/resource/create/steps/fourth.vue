<template>
  <section class="create-resource-wrapper">
    <el-tabs type="border-card" v-model="activeTabName" @tab-click="tabChange">
      <el-tab-pane label="资源基础属性" name="resourceInfo">
        <el-form :model="formData" label-width="100px" :rules="rules" ref="createForm">
          <el-form-item label="资源描述" prop="resourceName"
                        required class="input-item">
            <el-input v-model="formData.resourceName" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源类型" prop="resourceType" required class="input-item">
            <el-select
              v-model="formData.resourceType"
              allow-create
              filterable
              @change="resourceTypeChange"
              style="width: 100%"
              placeholder="只能包含大小写字母、_和-，长度4~40">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="widget名称"
                        prop="widgetName"
                        class="input-item"
                        :required="formData.resourceType === ResourceTypes.widget"
                        v-show="formData.resourceType === ResourceTypes.widget">
            <el-input v-model="formData.widgetName"
                      style="width: 95%"
                      clearable
                      placeholder="保持与web component中自定义标签名一致">
            </el-input>
            <el-tooltip class="item" effect="dark" content="必须以freelog-开头，仅支持[a-z0-9._-]" placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="文件"
                        class="input-item"
                        required
                        v-show="formData.resourceType !== ResourceTypes.pageBuild">
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
      </el-tab-pane>
      <el-tab-pane label="资源meta信息" name="metaInfo">
        <resource-meta-info v-model="formData.meta"></resource-meta-info>
      </el-tab-pane>
      <el-tab-pane label="资源策略" name="policy">
        <policy-editor ref="policyEditor" v-model="formData.policyText" @validate="validatePolicyHandler"></policy-editor>
      </el-tab-pane>
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in tabs"
        :label="item.title"
        :name="item.name">
        <component :is="item.content" :ref="item.ref" :tab-name="item.name" :data="item.data"></component>
      </el-tab-pane>
    </el-tabs>
    <div style="text-align: center;margin-top: 15px">
      <el-button type="primary"
                 :loading="loading"
                 @click="submitResourceHandler('createForm')" :disabled="!send">创建</el-button>
    </div>
  </section>
</template>

<script>
  /*
web component自定义标签名规则https://www.w3.org/TR/custom-elements/#valid-custom-element-name
创建资源接口：http://doc.freelog.com/resource/%E5%88%9B%E5%BB%BA%E8%B5%84%E6%BA%90.html
 */
  import PageBuilder from '../pagebuilder.vue'
  import ResourceMetaInfo from '../../meta/index.vue'
  import PolicyEditor from '@/components/policyEditor/index.vue'
  import {mapGetters} from 'vuex'
  import {storage} from '@/lib'
  import CONFIG from '@/config/index'

  const {RESOURCE_TYPES} = CONFIG

  export default {
    name: 'resource-creator-fourth-step',
    components: {
      PageBuilder,
      ResourceMetaInfo,
      PolicyEditor
    },
    computed: Object.assign({
      send: function () {
        return this.valid && this.policyValid
      }
    }, mapGetters({
      session: 'session'
    })),
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

        tabs: [],
        policyValid: true,
        valid: false,
        loading: false,
        activeTabName: 'resourceInfo',

        formData: {
          resourceType: storage.get('CREATE_RESOURCE_TYPE') || RESOURCE_TYPES.widget,
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
      var tabName = this.$route.hash.slice(1)
      if (tabName) {
        this.activeTabName = tabName
      }
      this.resourceTypeChange(this.formData.resourceType)
      this.$watch('formData', () => {
        this.$refs.createForm.validate((valid, err) => {
          this.valid = valid
        });
      }, {deep: true})
    },
    watch: {},
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

        storage.set('CREATE_RESOURCE_TYPE', type)
      },
      errorHandler(err) {
        this.loading = false
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
        if (res.ret !== 0 || res.errcode !== 0) {
          this.$message.error(res.msg);
          this.loading = false
          //reset
          this.$refs.upload.uploadFiles.forEach((file) => {
            file.status = 'ready'
          })
        } else {
          this.createPolicy({
            resourceId: res.data.resourceId,
            policyText: btoa(this.formData.policyText),
            languageType: 'freelog_policy_lang'
          })
        }
      },
      createPolicy(data) {
        return this.$services.policy.post(data)
          .then((res) => {
            this.loading = false
            if (res.data.errcode === 0) {
              this.$message.success('资源创建成功');
            } else {
              this.$message.error(res.data.msg)
            }
            setTimeout(() => {
              this.$router.push({path: '/resource/detail', query: {resourceId: data.resourceId}})
            }, 5e2)
          })
          .catch((errMsg) => {
            this.loading = false
            this.$message.error(`资源创建成功,资源策略创建失败，${errMsg}`);
            this.$router.push({path: '/resource/detail', query: {resourceId: data.resourceId}})
          })
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
        return new Promise((resolve, reject) => {
          if (!$uploader.data.meta.version) {
            return reject('meta信息必须包含符合semver规则的version')
          }
          $uploader.data.meta.widgetName = this.formData.widgetName;
          resolve()
        })
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

        if (this[fnName]) {
          //资源类型数据处理函数
          this[fnName]($uploader)
            .then(() => {
              this.packMetaData()
            })
            .then(callback)
            .catch((errMsg) => {
              this.$message.error(errMsg)
            })
        } else {
          this.packMetaData()
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
      fileChangeHandler(file, fileList) {
        if (this.fileLimitValidator(file, fileList)) {
          if (!this.formData.widgetName) {
            this.formData.widgetName = file.name.split('.', 2)[0]
          }
        }
      },
      //是否超过上传限制
      fileLimitValidator(file, fileList) {
        if (fileList.length > 1) {
          fileList.shift()
          return false
        }

        return true
      },
      //找到form，触发upload的submit，再触发policyeditor的submit
      submitResourceHandler(formName) {
        var $uploader = this.$refs.upload;
        this.$refs[formName].validate((valid, err) => {
          if (valid) {
            this.packUploadData(() => {
              //检查是否有上传文件
              console.log($uploader.uploadFiles.length)
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
      },
      validatePolicyHandler(detail) {
        if (detail.done) {
          this.policyValid = detail.done
          this.$message.success('校验通过')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .create-resource-wrapper {
    margin: auto;
  }

  .input-item {
    width: 500px;
  }

</style>
