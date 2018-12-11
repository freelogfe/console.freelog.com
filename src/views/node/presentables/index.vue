<template>
  <section class="presentables-wrapper">

    <div class="presentables-header-wrap">
      <span class="title">节点资源列表</span>
      <ul class="list-actions">
        <li>
          <el-select v-model="searchData.contractState" popper-class="opt-cls" size="mini" placeholder="签约状态">
            <el-option
                    v-for="item in contractStateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <el-select v-model="searchData.resourceType" size="mini" placeholder="资源类型">
            <el-option
                    v-for="item in resourceTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <el-select v-model="searchData.onlineState" size="mini" placeholder="上线状态">
            <el-option
                    v-for="item in onlineStateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <i class="el-icon-search"></i>
        </li>
      </ul>
    </div>

    <div class="presentable-list-container">
      <pagination class="node-presentable-list"
                  :config="tableConfig"
                  :formatHandler="formatHandler"
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
              <div class="contract-state-info"  :class="[
                      scope.row.hasContract?'active-status-2':'active-status-0',
                      {'is-presentable-online':scope.row.isOnlineChecked}
                    ]">
                <i class="dot"></i>
                <div class="schema-state">
                  <p>{{scope.row.hasContract? '已签约':'未签约'}}</p>
                  <p class="schema-info" v-if="scope.row.scheme && scope.row.scheme.selectedPolicy">{{scope.row.scheme.authSchemeName}}/{{scope.row.scheme.selectedPolicy.policyName}}</p>
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
          <el-table-column
                  width="150"
                  label="上线状态">
            <template slot-scope="scope">
              <div>
                <freelog-switch class="node-res-status-switch"
                                v-model="scope.row.isOnlineChecked"
                                @change="changePresentableOnlineHandler(scope.row)"
                                active-text="上线"
                                inactive-text="下线"></freelog-switch>
              </div>
            </template>
          </el-table-column>
        </template>
      </pagination>

      <div class="presentable-item add-presentable-btn" @click="showSearchResourceHandler"><i class="el-icon-plus"></i>添加节点资源
      </div>
    </div>

    <el-dialog
            :visible.sync="showSearchResource"
            width="840px"
            :close-on-click-modal="false"
            :before-close="beforeCloseDialogHandler"
            top="10vh"
            center>
      <p slot="title" class="dialog-title">添加资源</p>
      <search-resource class="add-resource-input" @add="addResourceHandler"></search-resource>
    </el-dialog>
  </section>
</template>

<script>
  import Presentables from './index'

  export default Presentables
</script>

<style lang="less" scoped>
  @import "index.less";
</style>


<style lang="less">
  .presentables-wrapper {
    ::placeholder {
      color: #333333;
      font-size: 14px;
    }

    .el-table .cell {
      height: 55px;
      display: flex;
      align-items: center;
    }

    .el-select .el-input__inner {
      border: none;
      color: #333333;
      font-size: 14px;
    }
  }

</style>