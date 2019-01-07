<template>
  <div class="resource-schemes-manager-wrap">
    <el-tabs v-model="curTabName" :before-leave="switchTabHandler" class="schemes-nav-tabs">
      <el-tab-pane
              v-for="(item, index) in tabs"
              :key="index"
              :name="item.name">
          <span slot="label" :class="['scheme-title-status-'+item.data.scheme.status]">
            <el-button class="auth-name" type="text">
              <!--{{item.data.scheme.authSchemeName}}-->
              <input type="text"
                     class="input-auth-name"
                     v-model="item.data.scheme.authSchemeName"
                     @keydown="inputDownHandler"
                     @keyup.enter="handleInputConfirm(item.data.scheme, $event)">
          </el-button>
            <!--<i class="el-icon-delete" @click="deleteAuthSchemeHandler(item)" v-show="item.data.scheme.authSchemeId"></i>-->
          </span>
        <lazy-component>
          <SchemeDetail :detail="item.data"
                        :updateCallback="updateData"></SchemeDetail>
        </lazy-component>
      </el-tab-pane>
      <el-tab-pane name="createTab">
        <span slot="label" class="add-new-scheme-tab-btn"><i class="el-icon-plus"></i>添加新授权方案</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {onloadSchemesForResource} from '@/data/scheme/loader'
  import SchemeDetail from './scheme.vue'


  const PUBLISH_STATUS = {
    INIT: 0,
    PUBLISHED: 1,
    OFF_LINE: 2,
    DELETE: 4
  }

  export default {
    name: 'resource-schemes-manager',

    data() {
      return {
        curTabName: '',
        tabs: []
      }
    },

    props: {
      resourceDetail: Object
    },

    components: {
      SchemeDetail
    },

    watch: {
      'resourceDetail.resourceId'() {
        this.querySchemes()
      }
    },

    mounted() {
      this.querySchemes()
    },

    methods: {
      querySchemes() {
        if (!this.resourceDetail.resourceId) return
        onloadSchemesForResource(this.resourceDetail.resourceId, {policyStatus: 2}).then((authSchemes) => {
          if (authSchemes && authSchemes.length) {
            authSchemes.forEach(this.addTab)
            this.setActiveTab(0)
          }
        })
      },
      setActiveTab(index) {
        if (this.tabs.length) {
          index = index === undefined ? (this.tabs.length - 1) : index
          this.curTabName = this.tabs[index].name
        }
      },
      switchTabHandler(activeName, oldActiveName) {
        switch (activeName) {
          case 'createTab':
            return this.createTab().catch((err) => {
              if (err !== 'cancel') {
                console.error(err)
              }
              return Promise.reject()
            })
          default:
            break
        }
      },
      createTab() {
        return this.$prompt('请输入授权方案名称', '创建授权方案', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: function (value) {
            if (value.length < 2) {
              return '名称字数不能小于2'
            } else if (value.length > 100) {
              return '名称字数不能超过100'
            }
            return true
          }
        }).then(({value}) => {
          return this.createAuthScheme({
            authSchemeName: value,
            resourceId: this.resourceDetail.resourceId
          }).then(this.addTab)
        })
      },
      createAuthScheme(data) {
        return this.$services.authSchemes.post(data)
          .then((res) => {
            if (res.data.errcode === 0) {
              return res.getData()
            }
            throw new Error(res.data.msg)
          })
      },
      updateAuthScheme(data, schemeData) {
        return this.$services.authSchemes.put(schemeData.authSchemeId, data)
          .then((res) => {
            if (res.data.errcode === 0) {
              return res.getData()
            }
            throw new Error(res.data.msg)
          })
      },
      addTab(scheme) {
        const newTabName = scheme.authSchemeId
        this.tabs.push({
          title: scheme.authSchemeName || '未命名授权方案',
          name: newTabName,
          content: 'resource-auth-scheme',
          data: {
            id: newTabName,
            scheme,
            resource: this.resourceDetail,
            isPublished: scheme.status === PUBLISH_STATUS.PUBLISHED
          }
        })

        scheme.tabId = newTabName
        this.curTabName = newTabName
      },
      deleteAuthSchemeHandler() {

      },
      inputDownHandler(ev) {
        const keyCode = ev.keyCode
        // 屏蔽elementUI左右快捷键的操作
        if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
          ev.stopPropagation()
        }
      },
      handleInputConfirm(scheme, ev) {
        this.updateAuthScheme({authSchemeName: scheme.authSchemeName}, scheme)
        ev.target.blur()
      },
      updateData() {

      },
    }
  }
</script>


<style lang="less" scoped>
  .resource-schemes-manager-wrap {
    width: 1190px;
    margin: auto;
    padding-top: 10px;
    .schemes-nav-tabs {
      .input-auth-name {
        width: 180px;
        border: none;
        outline: none;
        background: transparent;
        font-size: 14px;
        font-weight: 600;
        &:focus {
        }
      }

      .auth-name {
        color: #363636;
        padding: 0 0 4px 0;
        font-size: 16px;
        margin-left: 3px;
        border-radius: 0;
      }

      .scheme-title-status-4 {

      }
    }

    .add-new-scheme-tab-btn {
      color: #999999;
    }

    .el-icon-plus {
      padding-right: 6px;
      font-weight: 800;
    }
  }
</style>

<style lang="less">
  .resource-schemes-manager-wrap {
    .el-tabs__nav-wrap {
      &:after,
      .el-tabs__active-bar {
        display: none;
      }

      .el-tabs__item.is-active:after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: #409EFF;
        position: relative;
        top: -2px;
      }
    }
  }
</style>