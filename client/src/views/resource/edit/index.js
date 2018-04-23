/*
policy更新后，后续签订的policy按新的来，已签约过的按更新前的
 */
import {mapGetters} from 'vuex'
import ResourceMetaInfo from '../meta/index.vue'
import PolicyEditor from '@/components/policyEditor/index.vue'
import AuthNodeList from '../authNode/list/index.vue'
import CreateAuthNode from '../authNode/create/index.vue'
import EditAuthNode from '../authNode/edit/index.vue'

const CreateAuthNodeTab = 'create-auth-node'

export default {
  name: 'resource-detail-edit',
  data() {
    return {
      isDev: process.env.NODE_ENV === 'development',
      detail: {},
      activeTabName: '',
      canUpdate: false,
      valid: true,
      submitLoading: false,
      showKeys: ['resourceId', 'resourceType', 'resourceUrl', 'mimeType', 'createDate'],
      rules: {},
      dynamicTabs: [],
      uploader: {
        headers: {
          method: 'POST'
        },
        data: {}
      }
    }
  },
  computed: Object.assign({
    send: function () {
      return this.valid
    }
  }, mapGetters({
    session: 'session'
  })),
  components: {
    ResourceMetaInfo,
    PolicyEditor,
    AuthNodeList,
    CreateAuthNode,
    EditAuthNode
  },
  mounted() {
    this.$watch('detail', () => {
      this.$refs.detail.validate((valid, err) => {
        this.valid = valid
      });
    }, {deep: true})

    var self = this;
    var resourceId = this.$route.query.resourceId

    if (this.session.token) {
      this.uploader.headers.Authorization = this.session.token;
    }
    if (resourceId) {
      this.loadResourceDetail(resourceId)
      var hash = this.$route.hash
      this.activeTabName = hash.slice(1) || 'resource'
    } else {
      this.$message.error('缺少参数resourceId');
    }
  },
  methods: {
    closeTabHandler(data) {
      var tabName;
      var tabData
      if (typeof data === 'string') {
        tabName = data
        tabData = {}
      } else if (typeof data === 'object') {
        tabName = data.name;
        tabData = data.data || {}
      }

      tabName = tabName || this.activeTabName;
      var dynamicTabs = this.dynamicTabs

      if (tabName === CreateAuthNodeTab) {
        this.newAuthNode = tabData
      }

      for (let tab of dynamicTabs) {
        if (tab.name === tabName) {
          dynamicTabs.splice(dynamicTabs.indexOf(tabName), 1)
          this.activeTabName = 'authnode'
          break;
        }
      }
    },
    refreshAuthList(fn) {
      fn(this.newAuthNode)
      this.newAuthNode = null
    },
    isInCurrentTab(name) {
      return this.activeTabName === name
    },
    openTabHandler(data) {
      var tabConfig
      var tabName;
      var tabData
      if (typeof data === 'string') {
        tabName = data
        tabData = {}
      } else {
        tabName = data.name;
        tabData = data.data || {}
      }
      switch (tabName) {
        case 'createAuthNode':
          tabConfig = {
            title: '新增授权点',
            name: CreateAuthNodeTab,
            content: 'create-auth-node'
          };
          break;
        case 'editAuthNode':
          tabConfig = {
            title: '编辑授权点',
            name: `edit-auth-node-${tabData.authSchemeId}`,
            content: 'edit-auth-node'
          };
          break;
      }

      if (tabConfig) {
        Object.assign(tabConfig, {
          data: tabData
        })
        this.dynamicTabs.push(tabConfig);
        this.activeTabName = tabConfig.name
      }
    },
    resolveResourceUrl(url) {
      return url ? url.replace('-internal.', '.') : ''
    },
    loadResourceDetail(resourceId) {
      return this.$services.resource.get(resourceId)
        .then((res) => {
          var detail = res.getData()
          detail.meta = JSON.stringify(detail.meta)
          return (this.detail = detail);
        }).catch(this.$error.showErrorMessage)
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
      this.canUpdate = fileList.length > 0

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
      if (data.ret === 0 && data.errcode === 0) {
        this.$message.success('更新成功')
      } else {
        this.$message.error(data.msg)
      }
    },
    saveHandler() {
      if (this.submitLoading) {
        return
      }

      const mutableKeys = ['resourceName', 'meta'];
      var data = {}
      var resId = this.detail.resourceId

      mutableKeys.forEach((k) => {
        data[k] = this.detail[k]
      })

      try {
        data.meta = JSON.parse(data.meta)
      } catch (err) {
        return this.$message.error(err)
      }
      this.submitLoading = true

      var promises = []
      promises.push(this.$services.resource.put(resId, data))

      Promise.all(promises)
        .then((resList) => {
          this.submitLoading = false
          let res = resList[0] //资源更新结果
          if (res.data.errcode === 0) {
            this.$message.success('更新成功')
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.submitLoading = false
          this.$error.showErrorMessage(err)
        })
    },
    backToList() {
      this.$router.push({
        path: '/resource/list',
      })
    },
    fixCodeMirrorRender() {
      let meta = this.detail.meta
      this.detail.meta = ''
      this.$nextTick(() => {
        this.detail.meta = meta
      })
    },
    tabChange(tab, event) {
      switch (tab.name) {
        case 'metaInfo':
          this.fixCodeMirrorRender()
          break;
      }
    }
  }
}
