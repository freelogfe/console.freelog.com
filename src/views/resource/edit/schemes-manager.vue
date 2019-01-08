<template>
  <div class="resource-schemes-manager-wrap">
    <el-tabs v-model="curTabName" :before-leave="switchTabHandler" class="schemes-nav-tabs">
      <el-tab-pane
              v-for="(item, index) in tabs"
              :key="index"
              :name="item.name">
        <div slot="label" class="scheme-title" :class="['scheme-title-status-'+item.data.scheme.status]">
          <el-button class="auth-name" type="text">
            {{item.data.scheme.authSchemeName}}
          </el-button>
          <el-popover
                  placement="bottom"
                  width="140"
                  popper-class="scheme-popper"
                  trigger="hover">
            <ul class="scheme-actions">
              <li class="scheme-action-item"
                  @click="showSettingDialogHandler(item.data.scheme, index)">修改方案名称
              </li>
              <li class="scheme-action-item" @click="enableSchemeHandler(item.data.scheme, index)">
                <i class="el-icon-circle-check"></i>启用授权方案
              </li>
              <li class="scheme-action-item" @click="disableSchemeHandler(item.data.scheme, index)">
                <i class="el-icon-remove"></i>停用授权方案
              </li>
            </ul>
            <span slot="reference" class="scheme-state-text off-state">未启用</span>
          </el-popover>
        </div>
        <lazy-component>
          <SchemeDetail :detail="item.data"></SchemeDetail>
        </lazy-component>
      </el-tab-pane>
      <el-tab-pane name="createTab">
        <span slot="label" class="add-new-scheme-tab-btn"><i class="el-icon-plus"></i>添加新授权方案</span>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
            :visible.sync="showSettingDialog"
            width="450px"
            :show-close="false"
            center>
      <div slot="title" class="scheme-dialog-title">{{editingScheme.creating?'添加授权方案': '修改方案名称'}}</div>
      <div class="scheme-dialog-bd">
        <el-input placeholder="请输入授权方案名称..." v-model="editingScheme.authSchemeName"></el-input>
        <span class="scheme-dialog-create-tip" v-if="editingScheme.creating">方案添加成功后无法删除</span>
      </div>
      <div slot="footer" class="scheme-dialog-footer">
        <el-button type="text" style="color: #999999;margin-right: 10px;"
                   @click="hideSettingDialogHandler"> 取消 </el-button>
        <el-button type="primary" style="padding: 8px 30px;" size="medium" round @click="saveSchemeHandler"> 确定 </el-button>
      </div>
    </el-dialog>
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
        tabs: [],
        showSettingDialog: false,
        editingScheme: {},
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
      showSettingDialogHandler(scheme, index) {
        this.showSettingDialog = true
        this.editingScheme = {
          authSchemeName: scheme.authSchemeName,
          scheme: scheme
        }
      },
      hideSettingDialogHandler() {
        this.showSettingDialog = false
        this.editingScheme = {}
      },
      enableSchemeHandler(scheme, index) {

      },
      disableSchemeHandler(scheme, index) {
        this.$confirm('当前资源中已无其他授权方案，停用此方案将会使资源下架, 是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          showClose: false,
          roundButton: true,
          cancelButtonClass: 'scheme-dialog-cancel-btn',
          customClass: 'scheme-tip-dialog'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
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
            this.showCreateSchemeDialog()
            return false
          default:
            break
        }
      },
      showCreateSchemeDialog() {
        this.showSettingDialogHandler({creating: true, authSchemeName: ''})
      },
      createTab(scheme) {
        return this.createAuthScheme({
          authSchemeName: scheme.authSchemeName,
          resourceId: this.resourceDetail.resourceId
        }).then(this.addTab)
          .then((tabData) => {
            this.curTabName = tabData.name
            this.hideSettingDialogHandler()
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
      saveSchemeHandler() {
        var editingScheme = this.editingScheme

        if (editingScheme.creating) {
          this.createTab(editingScheme)
        } else {
          this.updateAuthScheme({authSchemeName: editingScheme.authSchemeName}, editingScheme.scheme)
            .then(() => {
              editingScheme.scheme.authSchemeName = editingScheme.authSchemeName
              this.hideSettingDialogHandler()
            })
        }
      },
      addTab(scheme) {
        const newTabName = scheme.authSchemeId
        const tabData = {
          title: scheme.authSchemeName || '未命名授权方案',
          name: newTabName,
          content: 'resource-auth-scheme',
          data: {
            id: newTabName,
            scheme,
            resource: this.resourceDetail,
            isPublished: scheme.status === PUBLISH_STATUS.PUBLISHED
          }
        }
        this.tabs.push(tabData)
        scheme.tabId = newTabName

        return tabData
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
      }
    }
  }
</script>


<style lang="less" scoped>
  .resource-schemes-manager-wrap {
    width: 1190px;
    margin: auto;
    padding-top: 10px;

    .scheme-dialog-title {
      color: #333333;
      font-size: 16px;
    }

    .scheme-dialog-footer {
      margin-top: 20px;
    }

    .scheme-dialog-bd {
      margin-top: 30px;
      .scheme-dialog-create-tip {
        color: #CCCCCC;
        font-size: 12px;
        float: right;
        margin-top: 10px;
      }
    }

    .scheme-title {
      > span {
        &:after {
          content: '';
          display: block;
          height: 2px;
          width: 72px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1;
        }
      }
    }

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

    .scheme-state-text {
      color: white;
      border-radius: 8px;
      font-size: 12px;
      padding: 3px 5px;
      margin-left: 8px;
      &.on-state {
        background-color: #84CCA8;
      }

      &.off-state {
        background-color: #E27C80;
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
  .scheme-tip-dialog {
    .scheme-dialog-cancel-btn {
      border: none;
      color: #999;
    }

    .el-message-box__content {
      margin-top: 20px;
    }
    .el-message-box__btns {
      margin-top: 30px;
      .el-button {
        padding-left: 30px;
        padding-right: 30px;
      }
    }
  }


  .el-popover.scheme-popper {
    padding: 0;
    min-width: 0;
  }

  .scheme-actions {
    text-align: center;

    .scheme-action-item {
      cursor: pointer;
      color: #333333;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      &:hover {
        background-color: #E9F4FF;
      }

      i {
        font-size: 18px;
        margin-right: 6px;
        vertical-align: middle;
      }
    }

    .el-icon-circle-check {
      color: #84CCA8;
    }
    .el-icon-remove {
      color: #E27C80;
    }
  }

  .resource-schemes-manager-wrap {
    .el-dialog__header {
      border-bottom: 1px solid #DDDDDD;
    }
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