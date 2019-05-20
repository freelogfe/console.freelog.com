<template>
  <div class="release-create-wrapper" v-loading="resourceDetail === null" v-if="resourceDetail !== null">
    <div class="r-c-w-cont">
      <div class="r-c-w-row r-c-w-name clearfix">
        <div class="preview-box">
          <img :src="resourceDetail.previewImages[0]" alt="" :class="{'resource-default-preview':!resourceDetail.previewImages[0]}" >
        </div>
        <div class="cont">
          {{session.user.username}} /
          <el-input type="text" v-model="releaseName" />
        </div>
      </div>
      <div class="r-c-w-row r-c-w-upcast" v-if="depReleasesList.length">
        <h3>基础上抛</h3>
        <div class="cont">
          <div
                  class="upcast-release-item"
                  v-for="(item, index) in baseUpcastReleases"
                  :key="'upcast-release-' + index"
          ><i class="el-icon-back"></i>{{item.releaseName}}</div>
          <div class="no-upcase-releases" v-if="baseUpcastReleases.length === 0">初始版本所选择的上报将成为基础上抛</div>
        </div>
      </div>
      <div class="r-c-w-row r-c-w-version">
        <h3>版本号</h3>
        <div class="cont">
          <i>*</i>
          <el-input v-model="version"></el-input>
          <div class="release-name">{{releaseName}}</div>
        </div>
      </div>
      <div class="r-c-w-row r-c-w-scheme" v-if="dependencies.length">
        <h3>方案</h3>
        <div class="cont">
          <scheme-manage
                  type="create"
                  :baseUpcastReleases.sync="baseUpcastReleases"
                  :depReleases="dependencies"
                  @update-resolved-releases="updateResolvedReleases"
          ></scheme-manage>
        </div>
      </div>
    </div>
    <div class="r-c-w-footer">
      <div class="cancel" @click="cancelCreateRelease">取消创建</div>
      <el-button class="create" type="primary" size="small" round @click="createRelease">创建发行</el-button>
    </div>
  </div>
</template>

<script>
  import SchemeManage from '../scheme/index.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'release-creator',
    components: { SchemeManage },
    data() {
      return {
        resourceDetail: null,
        releaseName: '',
        version: '0.1.0',
        baseUpcastReleases: [],
        depReleasesList: [],
        upcastDepReleasesIds: [],
        upcastDepReleasesMap: {},
        resolvedReleases: []
      }
    },
    computed: Object.assign({
      dependencies() {
        return this.resourceDetail ? this.resourceDetail.systemMeta.dependencies : []
      },
      projection() {
        return ["releaseId", "resourceType", "releaseName", "latestVersion", "baseUpcastReleases", "policies", "updateDate",].join(',')
      },
    }, mapGetters({
      session: 'session'
    })),
    watch: {
      dependencies() {

      },
    },
    methods: {
      updateResolvedReleases(releases) {
        this.resolvedReleases = releases.map(r => {
          return {
            releaseId: r.releaseId,
            contracts: r.policies.map(p => { return { policyId: p.policyId}})
          }
        })
      },
      cancelCreateRelease() {
        this.$router.push(`/resource/detail/${this.resourceDetail.resourceId}`)
      },
      getFormData() {
        return {
          resourceId: this.resourceDetail.resourceId,
          releaseName: this.releaseName,
          version: this.version,
          baseUpcastReleases: this.baseUpcastReleases.map(r => { return { releaseId: r.releaseId }}),
          resolveReleases: this.resolvedReleases,
        }
      },
      createRelease() {
        const formData = this.getFormData()

        this.$services.ReleaseService.post(formData)
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0 && res.data) {
              this.$message({ type: 'success', message: '发行创建成功！' })
              if(res.data.releaseId) {
                this.$router.push(`/release/edit/${res.data.releaseId}`)
              }
            }else {
              this.$message({ type: 'error', message: res.msg })
            }
          })
          .catch(e => this.$message({ type: 'error', message: e.toString() }))
      },
    },
    created() {
      if(this.$route.query.resourceId) {
        this.$services.resource.get(this.$route.query.resourceId)
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {
              this.resourceDetail = res.data
              this.releaseName = res.data.aliasName
            }else {
              this.$message({ type: 'error', message: res.msg })
            }
          })
          .catch(e => this.$message({ type: 'error', message: e.toString() }))
      }

    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../../styles/variables.less';
  .release-create-wrapper {
    padding-left: 50px;

    .r-c-w-cont {
      width: @main-content-width-990; margin: auto; padding-top: 40px;
    }

    .r-c-w-row {
      margin-bottom: 30px;
      h3 {
        position: relative; margin-bottom: 5px; padding: 10px;

        &:before {
          content: '';
          position: absolute; left: 0; top: 50%; z-index: 1;
          width: 3px; height: 12px;
          background-color: #333;
          transform: translateY(-50%);
        }
      }
    }

    .r-c-w-name {
      .preview-box {
        float: left; overflow: hidden;
        width: 80px; height: 60px; border-radius: 2px;
        box-shadow: 0 0 1px #999;

        img{ display: block; width: 100%; height: 100%; }
      }
      .cont {
        padding-top: 10px; padding-left: 100px;
        font-size: 18px; color: #333;
      }

      .el-input {
        width: 260px;
      }
    }

    .r-c-w-upcast {
      .upcast-release-item {
        position: relative;
        display: inline-block; margin-right: 15px;
        height: 26px; padding: 0 16px 0 26px;
        border: 1px solid #FFA6A8; border-radius: 14px;
        line-height: 26px; background-color: #FFF4F4; color: #333; font-weight: 500;
      }
      .el-icon-back {
        position: absolute; left: 12px; top: 50%; z-index: 1;
        transform: translateY(-50%) rotate(90deg); color: #EA7171; font-weight: bold;
      }
      .no-upcase-releases { color: #999; }
    }

    .r-c-w-version {
      i{ margin-right: 5px; color: #FA686D; }
      .el-input { width: 210px; }
      .release-name {
        display: inline-block;
        height: 32px; line-height: 32px; margin-left: 10px; padding: 0 20px; border-radius: 16px;
        background-color: #F0F0F0; color: #333;
      }
    }

    .r-c-w-scheme {

    }

    .r-c-w-footer {
      position: fixed; right: 0; bottom: 0; left: 0; z-index: 99;
      padding: 10px 50px; text-align: right;
      box-shadow: 0 0px 1px #0006; background-color: #fff;

      .cancel {
        display: inline-block; margin-right: 10px; padding: 6px 12px; cursor: pointer;
        &:hover {
          color: #999;
        }
      }
    }
  }

</style>
