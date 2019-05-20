<template>
  <div class="release-editor-contract-wrapper" v-loading="isloading" v-if="contracts.length">
    <div class="r-e-c-tags">
      <i class="el-icon-setting success"></i>
      <i class="el-icon-setting error"></i>
      <i class="el-icon-setting warning"></i>
    </div>
    <div class="r-e-c-tree" v-if="cTreeData">
      <div class="r-e-c-btn">{{release.releaseName}}</div>
      <div class="r-e-c-tree-cont">
        <contract-tree
                class="first-level"
                v-for="data in cTreeData"
                :data="data"
                @show-contract="showDetailContract"
        ></contract-tree>
      </div>
    </div>
    <transition name="fade">
      <div class="release-editor-box" v-if="contractDetail" v-show="isShowDetailContract">
        <div class="r-e-info">
          <h4>合约详情<i class="el-icon-close" @click="hideDetailContract"></i></h4>
          <div class="r-e-info-row">
            <span class="r-e-i-label">合约名称</span>{{contractDetail.contractName}}
          </div>
          <div class="r-e-info-row">
            <span class="r-e-i-label">资源类型</span>
          </div>
          <div class="r-e-info-row">
            <span class="r-e-i-label">创建日期</span>{{contractDetail.createDate | fmtDate}}
          </div>
          <div class="r-e-info-row">
            <span class="r-e-i-label">合同ID</span>{{contractDetail.contractId}}
          </div>
          <div class="r-e-info-row">
            <span class="r-e-i-label">甲方</span>{{contractDetail.partyOne}}
          </div>
          <div class="r-e-info-row">
            <span class="r-e-i-label">乙方</span>{{contractDetail.partyTwo}}
          </div>
        </div>
        <div class="r-e-c-detail">
          <h4>授权策略</h4>
          <div class="r-e-c-cont">
            <contract-detail
                    class="contract-policy-content"
                    :contract.sync="contractDetail"
                    :policyText="contractDetail.contractClause.policyText"
                    @update-contract="updateContractAfterEvent"
            ></contract-detail>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { ContractDetail } from '@freelog/freelog-ui-contract'
  import ContractTree from './contract-tree.vue'
  import { RESOURCE_STATUS } from '@/config/contract'
  export default {
    name: 'release-editor-contract',
    components: {
      ContractDetail, ContractTree
    },
    props: {
      release: Object,
      releaseScheme: Object,
      releasesTreeData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        isShowDetailContract: false,
        isloading: false,
        contractsMap: {},
        contracts: [],
        cTreeData: [],
        contractDetail: null
      }
    },
    computed: {
    },
    watch: {
      releasesTreeData() {
        this.fetchContractsDetail()
        this.reResolveTreeData()
      },
      contracts() {
        this.contracts.forEach(c => {
          this.contractsMap[c.contractId] = c
          this.contractDetail = c
        })
      }
    },
    methods: {
      fetchContractsDetail() {
        this.isLoading = true
        const rtData = this.releasesTreeData
        var ids = []
        for(let i = 0; i < rtData.length; i++) {
          if(rtData[i].contracts) {
            ids = [ ...ids, ...rtData[i].contracts.map(c => c.contractId) ]
          }
        }
        if(ids.length > 0) {
          this.$services.ContractRecords.get({
            params: {
              contractIds: ids.join(',')
            }
          })
            .then(res => res.data)
            .then(res => {
              if(res.errcode === 0) {
                this.contracts = res.data
              }
              this.isLoading = false
            })
            .catch(e => this.isLoading = false)
        }
      },
      reResolveTreeData() {
        const tmpTreeData = []
        const rtData = this.releasesTreeData

        var key = 'tree-node-i-'
        let firstLevelNodeIndex = -1, secondLevelNodeIndex = 0
        for(let i = 0; i < rtData.length; i++) {
          let tmpNode = {
            key,
            label: rtData[i].releaseName,
            isShowChildren: true,
            children: []
          }
          if(rtData[i].isSecondLevel) {
            tmpNode.key = tmpNode.key + '-' + secondLevelNodeIndex
            secondLevelNodeIndex++
            tmpTreeData[firstLevelNodeIndex].children.push(tmpNode)
          }else {
            firstLevelNodeIndex++
            secondLevelNodeIndex = 0
            tmpTreeData[firstLevelNodeIndex] = tmpNode
          }
        }
        this.cTreeData = tmpTreeData
        console.log(JSON.parse(JSON.stringify(this.cTreeData)))
      },
      updateContractAfterEvent() {},
      showDetailContract() {
        this.isShowDetailContract = true

      },
      hideDetailContract() {
        this.isShowDetailContract = false
      }
    },
    created() {

    }
  }
</script>

<style lang="less" type="text/less" scoped>


  .fade-enter-active {
    transition: all .5s ease;
  }
  .fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }

  .release-editor-contract-wrapper {
    position: relative;
    min-height: 570px; padding: 12px;
    background-color: #FAFBFB; font-size: 12px;

    .r-e-c-tags {
      text-align: right;
      .el-icon-setting {
        margin-left: 10px; font-size: 16px; font-weight: bold;
        &.success{ color: #50C190; }
        &.error{ color: #E35A5F; }
        &.warning{ color: #E6A232; }
      }
    }

    .r-e-c-tree {
      overflow: auto; margin-top: 30px; padding: 0 30px;

      .r-e-c-btn {
        display: inline-block; box-sizing: border-box;
        width: 180px; padding: 8px; border-radius: 30px;
        background-color: #579CEE; color: #fff; text-align: center;
      }

      .r-e-c-tree-cont {
        position: relative;
        margin-left: 90px; margin-top: 40px; padding-left: 30px; z-index: 10;
        &:before {
          content: '';
          position: absolute; top: -40px; left: 0; z-index: 10;
          width: 1px; height: 72px; background-color: #BABABA;
        }
      }
    }

    .release-editor-box {
      overflow: hidden;
      position: absolute; top: 40px; right: 12px; z-index: 10;
      width: 350px; height: 540px; border-radius: 6px;
      background-color: #fff; box-shadow: 0 0 5px rgba(0, 0, 0, .3);

      .r-e-info {
        color: #666;
        margin-top: 12px; padding: 0 24px;
        h4 {
          position: relative; margin-bottom: 15px;
          .el-icon-close {
            position: absolute; top: -6px; right: -20px; z-index: 10;
            padding: 8px; font-size: 14px; color: #666; cursor: pointer;
            &:hover { color: #333; }
          }
          &:after {
            content: '';
            position: absolute; top: 50%; left: -8px; z-index: 5;
            width: 3px; height: 12px; background-color: #666;
            transform: translateY(-50%);
          }
        }
      }
      .r-e-info-row {
        padding: 6px 0;
        span { display: inline-block; width: 60px; font-weight: 600; }
      }
      .r-e-c-detail {
        margin-top: 40px;

        h4 {
          position: relative; padding-left: 24px; margin-bottom: 5px;
        }
        .r-e-c-cont {
          height: 232px; overflow: auto;
          padding: 10px 24px; border-top: 1px solid #bbb; background-color: #FAFBFB;
        }
        .beauty-poliycy-box .bp-state.active{ min-width: auto; }
      }
    }
  }
</style>

<style lang="less" type="text/less">
  .release-editor-contract-wrapper {
    .r-e-c-detail {
      .beauty-poliycy-box{
        .bp-state.active{ min-width: auto; }
      }
    }
  }
</style>
