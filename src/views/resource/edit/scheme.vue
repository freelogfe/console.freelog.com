<template>
  <div class="resource-scheme-manager-wrap">
    <el-tabs tab-position="top" v-model="activeTabName" @tab-click="handleClick">
      <el-tab-pane :name="TAB_NAMES.scheme">
        <span slot="label" class="panel-tab-name">授权签约管理</span>
        <div class="panel-content">
          <lazy-component>
            <!--<authorization-scheme-manage-->
            <!--v-if="resourceInfo.resourceId"-->
            <!--:contracts.sync="presentableInfo.contracts"-->
            <!--:resourceInfo="resourceInfo"-->
            <!--:presentableInfo="presentableInfo"-->
            <!--&gt;</authorization-scheme-manage>-->
          </lazy-component>
        </div>
      </el-tab-pane>
      <el-tab-pane :name="TAB_NAMES.contract" :lazy="true">
        <span slot="label" class="panel-tab-name">合约管理</span>
        <div class="panel-content contract-manager-wrap">
          <lazy-component>
            <ContractManager :contracts="resourceInfo.dutyStatements"
                             v-if="resourceInfo.dutyStatements&&resourceInfo.dutyStatements.length"></ContractManager>
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
          <PolicyManager :list="resourceInfo.policy" v-if="resourceInfo.policy"></PolicyManager>
          <div class="empty-contract-tip" v-else>
            未创建依赖关系
            <router-link :to="$route.path + '?tab=scheme'">
              <el-button type="text">去创建</el-button>
            </router-link>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ContractManager from '@/components/ContractManager/index.vue'
  import PolicyManager from '@/components/PolicyList/index.vue'

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
    components: {
      ContractManager,
      PolicyManager,
    },

    methods: {
      handleClick() {

      }
    }
  }
</script>


<style lang="less" scoped>
  .resource-scheme-manager-wrap {
    .panel-content {
      padding-top: 15px;
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
