<template>
  <div v-loading="isShowLoading" :style="boxStyle">
    <div class="resource-dependencies" v-if="resourceDependencies.length">
      <h3>依赖资源列表</h3>
      <ul>
        <li
                v-for="(dependency, index) in resourceDependencies"
                :key="'dependency-'+index"
                :class="{
                    'selected': index === selectedDependencyIndex,
                    'active-1': dependency.authResolveState === 0,
                    'active-2': dependency.authResolveState === 1
                }"
                @click="exchangeDependencyIndex(index)"
        >
          <span>{{dependency.resourceName}}</span>
          <span class="line" v-show="index === selectedDependencyIndex"></span>
        </li>
      </ul>
      <div class="r-d-btn-box" v-if="!isPreventExchangeSelection && !isAbandon">
        <div class="r-d-btn" @click="finishDependeciesHandler">
          创建授权点
        </div>
      </div>
    </div>
    <div class="dependencies-resolve-box">
      <authorization-scheme-manage
              v-for="(dependency, index) in resourceDependencies"
              :key="'a-s-m-'+index"
              v-show="index === selectedDependencyIndex"
              authType="resource"
              :resourceInfo.sync="dependency"
              :contracts="contracts"
              :bubbleResourcesMap="bubbleResourcesMap"
              :isPreventExchangeSelection="isPreventExchangeSelection"
              :isAbandon="isAbandon"
              :isShowFooter="false"
              :isScrollBar="false"
              @exchange-auth-resolve-state="exchangeAuthResolveState"
              @update-resolved-auth-scheme="getResolvedAuthScheme"
      ></authorization-scheme-manage>
    </div>
    <el-dialog
            class="s-c-dialog"
            title="提示"
            :visible.sync="isDialogVisible"
            width="640px"
            height="450px"
            center
    >
      <div class="resolved-duty-statements" v-show="resolvedDutyStatements.length">
        <h3>使用依赖资源需要与以下资源签约，请确认</h3>
        <el-table
                :data="resolvedDutyStatements"
                stripe
                style="width: 100%"
        >
          <el-table-column prop="resourceName" label="资源名称" width="240"></el-table-column>
          <el-table-column prop="authSchemeName" label="授权方案"></el-table-column>
          <el-table-column prop="policyName" label="授权策略"></el-table-column>
        </el-table>
      </div>
      <div class="resolved-bubble-resources" v-show="resolvedBubbleResources.length">
        <h3>上抛以下资源，请确认</h3>
        <ul>
          <li
                  v-for="(item, index) in resolvedBubbleResources"
                  :key="'r-b-r-' + index"
          >
            <span class="r-b-r-i-reousrce-name">{{item.resourceName}}</span>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="isDialogVisible = false">取消</el-button>
        <el-button class="sign-btn" type="primary" @click="signContract">签约</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import AuthorizationSchemeManage from '@/components/Authorization-scheme/index.vue'
  export default {
    name: 'scheme-content',
    props: {
      resourceInfo: Object,
      boxStyle: Object,
      isPublished: Boolean,
      scheme: Object,
    },
    data() {
      return {
        isShowLoading: true,
        isDialogVisible: false,
        selectedDependencyIndex: -1,
        resourceDependencies: [],
        resolvedAuthSchemeMap: {},
        resolvedBubbleResources: [],
        resolvedDutyStatements: [],
        contracts: []
      }
    },
    components: {
      AuthorizationSchemeManage,
    },
    computed: {
      resourceId() {
        return this.resourceInfo.resourceId
      },
      bubbleResourcesMap() {
        var bubbleResourcesMap = {}
        this.scheme.bubbleResources.forEach(b => {
          bubbleResourcesMap[b.resourceId] = 1
        })
        return bubbleResourcesMap
      },
      isPreventExchangeSelection() {
        return this.scheme.dutyStatements.length > 0 || this.scheme.bubbleResources.length > 0
      },
      isAbandon() {
        return this.scheme.status === 4
      }
    },
    methods: {
      getDependenciesDetail() {
        const resourceDependencies = this.resourceInfo.systemMeta.dependencies || []
        if(resourceDependencies.length === 0) return
        var resourceIds = resourceDependencies.map(i => i.resourceId).join(',')
        this.$axios.get(`/v1/resources/list?resourceIds=${resourceIds}`)
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {
              this.resourceDependencies = res.data
              this.selectedDependencyIndex = 0
            }else {
              Message.error(res.msg)
            }
            this.isShowLoading = false
          })
          .catch(e => {
            Message.error(e)
            this.isShowLoading = false
          })
      },
      exchangeDependencyIndex(index) {
        if(index === this.selectedDependencyIndex) return
        this.selectedDependencyIndex = index

      },
      // 切换资源"授权处理状态"
      exchangeAuthResolveState() {
        this.resourceDependencies = this.resourceDependencies.slice()
      },
      // 获取"依赖授权"的处理结果
      getResolvedAuthScheme({ resourceId, selectedAuthSchemes, unResolveAuthSchemes }) {
        if(this.isPublished) return
        this.resolvedAuthSchemeMap[resourceId] = {
          selectedAuthSchemes, unResolveAuthSchemes
        }

        this.resolvedDutyStatements = []
        this.resolvedBubbleResources = []
        for(let i = 0; i < this.resourceDependencies.length; i++) {
          const denpency = this.resourceDependencies[i]
          const map = this.resolvedAuthSchemeMap[denpency.resourceId]
          if(map) {
            const { selectedAuthSchemes, unResolveAuthSchemes } = map
            selectedAuthSchemes.forEach(item => {
              const { resourceId, resourceName, authSchemeId, authSchemeName, segmentId, policyName } = item
              this.resolvedDutyStatements.push({
                resourceId, resourceName, authSchemeId, authSchemeName, policyName,
                policySegmentId: segmentId
              })
            })
            unResolveAuthSchemes.forEach(item => this.resolvedBubbleResources.push({
              resourceId: item.resourceId,
              resourceName: item.resourceName
            }))
          }
        }
      },
      // 授权方案 之 "处理依赖与签约"
      finishDependeciesHandler() {
        var isFinish = true

        for(let i = 0; i < this.resourceDependencies.length; i++) {
          const denpency = this.resourceDependencies[i]
          if(denpency.authResolveState === -1 || typeof denpency.authResolveState === 'undefined') {
            Message.error(`仍有资源未选择授权策略`)
            isFinish = false
            break
          }
        }

        this.isDialogVisible = isFinish
      },
      signContract() {
        const data = {
          dutyStatements: this.resolvedDutyStatements,
          bubbleResources: this.resolvedBubbleResources
        }
        const { authSchemeId } = this.scheme
        this.$axios({
          method: 'PUT',
          url: `/v1/resources/authSchemes/${authSchemeId}/batchSignContracts`,
          data
        })
          .then(res => res.data)
          .then(res => {
            if(res.errcode === 0) {
              const { dutyStatements } = res.data
              this.contracts = [ this.contracts, ...dutyStatements ]
              Message.success('创建成功！')
            }else {
              Message.error(res.msg)
            }
          })
      }
    },
    mounted() {
      this.contracts = this.scheme.dutyStatements || []
      this.getDependenciesDetail()
    },
    destroyed() {},
  }
</script>

<style type="text/less" lang="less">
  .el-tabs__content{
    overflow: inherit;
  }

  .s-c-dialog {
    h3 {
      position: relative;
      padding-left: 8px;
      font-size: 14px; color: #666;

      &:before{
        position: absolute; left: 0; top: 50%; z-index: 1; transform: translateY(-50%);
        content: ''; display: block;
        width: 3px; height: 14px;
        background-color: #666;
      }
    }

    .resolved-duty-statements {
      .r-d-s-i-reousrce-name{ }
      .r-d-s-i-auth-scheme-name{ }
      .r-d-s-i-policy-name{ }
    }

    .resolved-bubble-resources {
      margin-top: 30px;

      li{ margin-top: 12px; }
      .r-b-r-i-reousrce-name{}
    }

    el-table .cell{
      white-space: nowrap;
      .r-b-r-i-reousrce-name{}
    }

    .el-dialog__body { border-top: 1px solid #DDD; }
    .el-dialog__footer {
      height: 50px; padding: 0 20px; border-top: 1px solid #DDD;
      line-height: 50px; text-align: right;

      .cancel-btn {
        padding: 6px 30px; border-width: 0;
      }
      .sign-btn {
        padding: 6px 30px; border-radius: 17px;
        background: #409EFF; color: #fff;
      }
    }
  }
</style>
<style lang="less" type="text/less" scoped>

  .resource-dependencies {
    position: absolute; top: -15px; bottom: 0; z-index: 5;
    width: 300px; padding-top: 35px; padding-left: 40px; border-right: 1px solid #D8D8D8;

    h3 {
      position: relative;
      padding-left: 8px;
      font-size: 14px;
      color: #666;

      &:before{
        position: absolute; left: 0; top: 50%; z-index: 1; transform: translateY(-50%);
        content: '';
        display: block;
        width: 3px; height: 14px;
        background-color: #666;
      }
    }

    ul { margin-top: 20px;  }

    li {
      position: relative;
      padding-left: 20px; margin-bottom: 7px;
      font-size: 14px; color: #333333; cursor: pointer;

      &:before {
         box-sizing: border-box;
         position: absolute; left: 0; top: 50%; z-index: 8; transform: translateY(-50%);
         content: ''; display: block;
         width: 12px; height: 12px; border: 2px solid #EA7171; border-radius: 50%;
       }

      &.active-1:before{
         border: 3px solid #89D1AD; background-color: #fff;
       }

      &.active-2:before {
         background-color: #89D1AD; border-color: #89D1AD;
       }

      .line {
        &:before {
           content: ''; display: block;
           position: absolute; left: 30px; right: 0; top: 50%; z-index: -1;
           height: 1px; background-color: #666;
         }

        &:after {
           content: ''; display: block; transform: translateY(-50%);
           position: absolute; top: 50%; right: -10px; z-index: 5;
           width: 16px; height: 16px; border-radius: 50%; border: 1px solid #666;
           background-color: #fff;
         }
      }
      span { padding-right: 6px; background-color: #fff; z-index: 10; }
      span.history-text { color: #999; }
    }

    .r-d-btn-box {
      position: fixed; left: 0; bottom: 40px;
      width: 340px;

      .r-d-btn {
        width: 220px; margin: auto; padding: 10px 0; border: 1px solid #A5D1FF; border-radius: 21px;
        background: #E9F4FF; color: #409EFF; font-size: 14px;
        text-align: center; cursor: pointer;
      }
    }

  }

  .dependencies-resolve-box {
    margin-left: 340px; padding: 0 30px;
  }
</style>