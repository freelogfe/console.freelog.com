<template>
  <pagination class="node-presentable-row"
              :config="tableConfig"
              :formatHandler="formatHandler"
              ref="listRef"
              :showFooter="showFooter"
              :pagination="paginationConfig">
    <template slot="list">
      <el-table-column
              label=""
              width="100">
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.resourceInfo.postImgUrl | padImage"
                 :class="{'resource-default-preview':!scope.row.resourceInfo.postImgUrl}"
                 alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
              label="">
        <template slot-scope="scope"><p class="resource-name">{{ scope.row.presentableName }}</p></template>
      </el-table-column>
      <el-table-column
              width="220"
              label="签约状态">
        <template slot-scope="scope">
          <div class="contract-state-info" :class="[
                      scope.row.hasContract?'active-status-2':'active-status-0',
                      {'is-presentable-online':scope.row.isOnlineChecked}
                    ]">
            <i class="dot"></i>
            <div class="schema-state">
              <div>
                <template v-if="scope.row.hasContract">已签约</template>
                <template v-else>
                  未签约
                  <el-button type="text" @click="deletePresentableHandler(scope.row)"><i class="el-icon-delete"></i>
                  </el-button>
                </template>
              </div>
              <p class="schema-info" v-if="scope.row.scheme && scope.row.scheme.selectedPolicy">
                {{scope.row.scheme.authSchemeName}}/{{scope.row.scheme.selectedPolicy.policyName}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
              width="250"
              label="">
        <template slot-scope="scope">
          <div class="presentable-nav-links">
            <router-link :to="scope.row.detailLink + '?tab=policy'">
              <el-button type="text">策略管理</el-button>
            </router-link>
            <span>|</span>
            <router-link :to="scope.row.detailLink + '?tab=contract'">
              <el-button type="text" :disabled="!scope.row.hasContract">合约管理</el-button>
            </router-link>
            <span>|</span>
            <router-link :to="scope.row.detailLink + '?tab=schema'">
              <el-button type="text">授权方案</el-button>
            </router-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column
              width="180"
              label="资源类型">
        <template slot-scope="scope">
          <div>
            <span class="resource-type" :class="['is-'+scope.row.resourceInfo.resourceType]">{{scope.row.resourceInfo.resourceType}}</span>
          </div>
        </template>
      </el-table-column>
      <slot name="append"></slot>
    </template>
    <template slot="empty">
      <slot name="empty"></slot>
    </template>
  </pagination>
</template>

<script>
  import {PRESENTABLE_STATUS_TIPS} from '@/config/presentable'
  import {loadResources} from '@/data/resource/loader'
  import {loadAuthSchemes} from '@/data/scheme/loader'
  import Pagination from '@/components/Pagination/index.vue'

  export default {
    name: 'node-presentable-list',

    data() {
      return {
        tableConfig: {
          rowClassName: 'resource-row',
          'cell-class-name': 'res-row-cell',
          'show-header': false
        },
        paginationConfig: {
          target: `/v1/presentables`,
          params: {
            nodeId: this.$route.params.nodeId
          }
        }
      }
    },

    props: {
      params: Object,
      showFooter: Boolean
    },

    components: {Pagination},

    watch: {
      params: {
        deep: true,
        handler() {
          console.log('change params', this.params)
          this.reload()
        }
      },
      $route() {
        if (!this.$route.params.nodeId) return
        this.paginationConfig.params.nodeId = this.$route.params.nodeId
      }
    },

    mounted() {
      this.reload()
    },

    methods: {
      setParams() {
        console.log('this.params', this.params)
        var params = Object.assign({
          nodeId: this.$route.params.nodeId
        }, this.params || {})

        this.$set(this.paginationConfig, 'params', params)
      },
      refresh() {
        this.$refs.listRef.reload()
      },
      reload() {
        this.setParams()
        this.refresh()
      },
      formatHandler(list) {
        if (!list || !list.length) {
          return []
        }

        var rids = []
        var authSchemeIds = []
        var maps = {}
        var schemeIdMaps = {}
        var presentablesIdMap = {}

        list.forEach((item, index) => {
          let contract = this.getPresentableContract(item)

          if (contract) {
            authSchemeIds.push(contract.authSchemeId)
            schemeIdMaps[contract.authSchemeId] = {
              index, contract
            }
          }

          Object.assign(item, {
            // isAcquireSignAuth: 1
          })
          maps[item.resourceId] = index
          presentablesIdMap[item.presentableId] = item
          rids.push(item.resourceId)

          this.resolvePresentable(item)
        })

        if (rids.length) {
          loadResources(rids).then(resources => {
            resources.forEach(resource => {
              resource.postImgUrl = this.resolvePostImgUrl(resource)
              this.$set(list[maps[resource.resourceId]], 'resourceInfo', resource)
            })
          })
        }

        if (authSchemeIds.length) {
          this.loadPresentablesSchemes(authSchemeIds)
            .then(schemes => {
              schemes.forEach(scheme => {
                let {index, contract} = schemeIdMaps[scheme.authSchemeId]
                scheme.selectedPolicy = this.getSelectedPolicy(scheme, contract)
                this.$set(list[index], 'scheme', scheme)
              })
              schemeIdMaps = null
            })
        }

        var presentableIds = Object.keys(presentablesIdMap)
        if (presentableIds.length) {
          this.loadPresentablesAuth(presentableIds)
            .then((auths) => {
              auths.forEach(auth => {
                console.log(auth)
                let presentable = presentablesIdMap[auth.presentableId]
                presentable.isAcquireSignAuth = auth.isAcquireSignAuth
                this.setWarningTip(presentable)
              })
              presentablesIdMap = null
            })
        }

        return list
      },
      setWarningTip(presentable) {
        const tips = {
          '0': '未获得授权',
          '1': '已获得授权'
        }

        let warningTip = tips[presentable.isAcquireSignAuth.toString()] || ''
        this.$set(presentable, 'warningTip', warningTip)
      },
      loadPresentablesAuth(presentableIds) {
        return this.$axios.get('/v1/auths/presentable/getPresentableSignAuth', {
          params: {
            presentableIds: presentableIds.join(',')
          }
        }).then(res => {
          const {ret, errcode, msg, data} = res.data

          if (ret === 0 && errcode === 0) {
            return data
          } else {
            throw new Error(msg)
          }
        })
      },
      resolvePresentable(item) {
        item.isOnlineChecked = !!item.isOnline
        item._statusInfo = PRESENTABLE_STATUS_TIPS[item.status]
        item.isReady = (item.status & 7) === 7
        item.hasContract = item.contracts.length > 0
        item.detailLink = `/node/${this.$route.params.nodeId}/presentable/${item.presentableId}`
      },
      loadPresentablesSchemes(authSchemeIds) {
        return loadAuthSchemes({
          authSchemeIds: authSchemeIds
        }).then(schemes => {
          return schemes
        })
      },
      getSelectedPolicy(scheme, contract) {
        for (let i = 0; i < scheme.policy.length; i += 1) {
          const policy = scheme.policy[i]
          if (policy.segmentId === contract.policySegmentId) {
            return policy
          }
        }
      },
      getPresentableContract(presentableInfo) {
        const contracts = presentableInfo.contracts || []
        if (contracts.length) {
          let contract
          for (let i = 0; i < contracts.length; i += 1) {
            contract = contracts[i]
            if (contract.resourceId === presentableInfo.resourceId) {
              return contract
            }
          }
        }

        return null
      },
      resolvePostImgUrl(resource) {
        let src

        if (resource.previewImages.length) {
          src = resource.previewImages[0]
        } else {
          src = ''
        }

        return src
      },
      deletePresentableHandler(presentable) {
        this.$emit('delete', presentable)
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "../../../styles/mixin";

  .node-presentable-row {
    .dot {
      margin-right: 5px;
    }

    img {
      width: 80px;
      height: 60px;
      display: inline-block;
    }

    .contract-state-info {
      display: flex;
      align-items: center;
      width: 100%;
      .schema-state {
        display: inline-block;
        width: 95%;
        i {
          color: #EA7171;
          font-size: 20px;
          vertical-align: middle;
        }
      }
      .schema-info {
        .text-ellipsis;
        font-size: 12px;
      }
    }

    .resource-name {
      .text-ellipsis
    }

    .resource-type {
      background-color: #F1F1F1;
      border: 1px solid #E0E0E0;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 14px;
      color: #666666;
      &.is-page_build {
        color: #E89D1F;
        border-color: #E89D1F;
        background-color: rgba(249, 191, 93, .2);
      }
    }

    .presentable-nav-links {
      span {
        color: #D8D8D8;
        padding: 0 3px;
      }
    }
  }
</style>