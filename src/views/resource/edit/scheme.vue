<template>
  <div class="resource-scheme-manager-wrap">
    <el-tabs tab-position="top" v-model="activeTabName" @tab-click="handleClick">
      <el-tab-pane :name="TAB_NAMES.scheme">
        <span slot="label" class="panel-tab-name">授权签约管理</span>
        <div class="panel-content">
          <lazy-component>
            <scheme-content
                    :resourceInfo="detail.resource"
                    :isPublished="detail.isPublished"
                    :scheme.sync="detail.scheme"
                    :boxStyle="schemeContentBoxStyle"
            ></scheme-content>
          </lazy-component>
        </div>
      </el-tab-pane>
      <el-tab-pane :name="TAB_NAMES.contract" :lazy="true">
        <span slot="label" class="panel-tab-name">合约管理</span>
        <div class="panel-content contract-manager-wrap">
          <lazy-component>
            <ContractManager :contracts="detail.scheme.dutyStatements"
                             v-if="detail.scheme.dutyStatements&&detail.scheme.dutyStatements.length"></ContractManager>
            <div class="empty-contract-tip" v-else>
              未创建依赖关系
              <router-link :to="$route.path + '?tab=scheme'">
                <el-button type="text">去创建</el-button>
              </router-link>
            </div>
          </lazy-component>
        </div>
      </el-tab-pane>
      <el-tab-pane :name="TAB_NAMES.policy" :lazy="true">
        <span slot="label" class="panel-tab-name">策略管理</span>
        <div class="panel-content policy-manager-wrap">
          <PolicyManager :list="detail.scheme.policy" @save="savePoliciesHandler"></PolicyManager>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ContractManager from '@/components/ContractManager/index.vue'
  import PolicyManager from '@/components/PolicyList/index.vue'
  import SchemeContent from './scheme-content.vue'

  const TAB_NAMES = {
    policy: 'policy-manager',
    contract: 'contract-manager',
    scheme: 'scheme-manager'
  }
  export default {
    name: 'resource-scheme-manager',
    data() {
      return {
        TAB_NAMES,
        activeTabName: TAB_NAMES.scheme,
        resourceInfo: {}
      }
    },
    props: {
      detail: Object
    },
    components: {
      ContractManager,
      PolicyManager,
      SchemeContent,
    },
    computed:{
      wrapperWidth() {
        return document.querySelector('.resource-schemes-manager-wrap').offsetWidth
      },
      schemeContentBoxStyle() {
        return {
          position: 'relative',
          left: (this.wrapperWidth - window.innerWidth) / 2 + 'px',
          width: window.innerWidth + 'px',
          margin: 0
        }
      },
    },
    methods: {
      handleClick() {

      },
      savePoliciesHandler({data}) {
        this.$services.authSchemes.put(this.detail.scheme.authSchemeId, data)
          .then(res => {
            const {errcode, ret, msg, data} = res.data
            if (errcode === 0 && ret === 0) {
              this.detail.scheme.policy = data.policy
            } else {
              this.$error.showErrorMessage(msg)
            }
          })
      }
    },
    mounted(){

    },
  }
</script>


<style lang="less" scoped>
  .resource-scheme-manager-wrap {
    .panel-content {
      min-height: 500px;
    }
    .empty-contract-tip {
      text-align: center;
      font-size: 20px;
      color: #666;
    }
  }
</style>

<style lang="less">
  .resource-scheme-manager-wrap {
    .el-tabs__nav {
      width: 700px;
      min-width: auto;
    }

    .el-tabs__nav-scroll {
      padding: 0 168px;
      display: flex;
      justify-content: center;
    }

    .el-tabs__content {
      overflow: inherit;
    }

    .el-tabs__active-bar {
      display: none;
    }

    .el-tabs__nav-wrap {
      &:after {
        display: block !important;
      }
    }

    .el-tabs__item {
      margin-right: 180px;
    }
  }
</style>
