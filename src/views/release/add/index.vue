<template>
  <div class="release-add-wrapper" v-if="release !== null">
    <release-editor-layout :release.sync="release" type="add">
      <template slot="about-version">
        <div class="r-a-w-version">
          <h4>版本号</h4>
          <div class="r-a-w-v-current">
            <label>当前版本</label>
            <el-input type="" v-model="newVersion"></el-input>
            <span class="r-a-w-v-c-resourceName" v-if="resourceDetail">{{resourceDetail.resourceName}}</span>
          </div>
          <div class="r-a-w-v-list clearfix">
            <label>历史版本</label>
            <div style="margin-left: 72px;">
              <el-table
                      :show-header="false"
                      :data="release.resourceVersions"
                      size="small"
              >
                <el-table-column prop="version" label="版本" width="190"></el-table-column>
                <el-table-column prop="resourceName" label="资源名称"></el-table-column>
                <el-table-column prop="createDate" label="日期" width="180"></el-table-column>
              </el-table>
              <div class="r-a-w-v-l-more">更多...</div>
            </div>
          </div>
        </div>
        <div class="r-a-w-scheme" v-if="depReleasesList.length > 0">
          <div class="r-a-w-s-line"></div>
          <h4>方案</h4>
          <scheme-manage
                  type="add"
                  :release="release"
                  :baseUpcastReleases="release.baseUpcastReleases"
                  :depReleasesList.sync="depReleasesList"
          ></scheme-manage>
        </div>
        <div class="r-a-w-footer">
          <div class="r-a-w-cancel-btn" @click="cancelAddRelease">取消</div>
          <div class="r-a-w-save-btn" @click="saveReleaseVersion">保存版本</div>
        </div>
      </template>
    </release-editor-layout>
  </div>
</template>

<script>
  import ReleaseEditorLayout from '../edit/layout.vue'
  import SchemeManage from '../scheme/index.vue'
  import { format } from 'date-fns'
  export default {
    name: 'release-add-box',
    components: { SchemeManage, ReleaseEditorLayout },
    data() {
      return {
        releaseId: this.$route.query.releaseId,
        resourceId: this.$route.query.resourceId,
        release: null,
        resourceDetail: null,
        releaseScheme: null,
        depReleasesList: [],
        releasesTreeData: [],
      }
    },
    computed: {

    },
    methods: {
      fetchReleaseDetail() {
        this.$services.ReleaseService.get(this.releaseId)
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {
              this.release = res.data
              this.resourceDetail = res.data.resourceInfo
              this.depReleasesList =  res.data.resourceInfo.systemMeta.dependencies || []
              this.formatReleaseData()
            }
          })
      },
      // 获取 发行方案
      fetchReleaseScheme() {
        const { releaseId, latestVersion: { version } } = this.release
        this.$services.ReleaseService.get(`${releaseId}/versions/${version}`)
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {
              this.releaseScheme = res.data
            }
          })
          .catch(e => this.$error.showErrorMessage('授权方案获取失败！'))
      },
      formatReleaseData() {
        this.newVersion = this.getNewVersion()
        this.release.resourceVersions = this.release.resourceVersions.map(i => {
          i.createDate = format(i.createDate, 'YYYY-MM-DD')
          return i
        })
      },
      getNewVersion() {
        let [ fN, sN, tN ] = this.release.latestVersion.version.split('.')
        tN = +tN + 1
        return `${fN}.${sN}.${tN}`
      },
      cancelAddRelease() {
        this.$router.replace(`/resource/detail/${this.resourceId}`)
      },
      saveReleaseVersion() {
        this.$axios.post(`/v1/releases/${this.releaseId}/versions`, {
          resourceId: this.resourceId,
          version: this.newVersion,
          resolveReleases: []
        })
          .then(res => res.data)
          .then(res => {
            if(res.errocde === 0) {
              this.$router.replace('/release/edit/${this.releaseId}')
            }else {
              this.$error.showErrorMessage(res.msg)
            }
          })
      },
    },
    created() {
      this.fetchReleaseDetail()
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .r-a-w-version, .r-a-w-scheme {
    background-color: #FAFBFB;
    h4 {
      position: relative; padding: 10px 10px 10px 20px; font-weight: 400;
      &:after {
        content: '';
        position: absolute; top: 50%; left: 10px; z-index: 5;
        width: 3px; height: 12px; background-color: #333;
        transform: translateY(-50%);
      }
    }
  }

  .r-a-w-scheme{
    .r-a-w-s-line { margin: 0 10px; padding: 5px 0; border-top: 1px solid #EBEBEB; }
  }

  .r-a-w-version {
    .r-a-w-v-current, .r-a-w-v-list {
      padding: 10px;
      label {
        display: inline-block; width: 72px;
      }
    }
    .r-a-w-v-c-resourceName { font-weight: bold; }
    .el-input { width: 170px; margin-right: 30px; }
  }

  .r-a-w-v-list {
    label{ float: left; padding: 10px 0; }
    .el-table {
      width: 580px; background-color: #fff;
      &:before { height: 0; }
    }
    .r-a-w-v-l-more {
      display: inline-block; margin-bottom: 5px; padding: 8px 10px; cursor: pointer;
      color: #888;
      &:hover { background-color: #f5f7fa; color: #333; }
    }
  }

  .r-a-w-footer {
    padding: 20px 10px;
    background-color: #FAFBFB; text-align: center;
    .r-a-w-cancel-btn, .r-a-w-save-btn {
      display: inline-block; cursor: pointer;
      padding: 9px 32px; border-radius: 20px;
      font-size: 14px;
    }
    .r-a-w-cancel-btn {
      color: #999;
    }

    .r-a-w-save-btn {
      background: #409EFF; color: #fff;
    }
  }
</style>
<style lang="less" type="text/less">
  .release-add-wrapper {
    .r-a-w-version {
      .el-input__inner { height: 32px; line-height: 32px; }
    }
    .r-a-w-v-list {
      .el-table {
        .cell { white-space: nowrap; color: #888; }
        tr { background-color: #FAFBFB; }
        td { border-bottom-width: 0; }
      }
    }
  }

</style>
