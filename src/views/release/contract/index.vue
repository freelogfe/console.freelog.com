<template>
  <div class="release-editor-contract-wrapper">
    <div class="r-e-c-tags">
      <i class="el-icon-setting success"></i>
      <i class="el-icon-setting error"></i>
      <i class="el-icon-setting warning"></i>
    </div>
    <div class="r-e-c-tree">
      <div class="r-e-c-btn">{{contractDetail.contractName}}</div>
      <div class="r-e-c-tree-cont">
        <contract-tree
                class="first-level"
                v-for="data in cTreeData"
                :data="data"
                @show-contract="showDetailContract"
        ></contract-tree>
      </div>
    </div>
    <div class="release-editor-box" v-show="isShowDetailContract">
      <div class="r-e-info">
        <h4>合约详情<i class="el-icon-close" @click="hideDetailContract"></i></h4>
        <div class="r-e-info-row">
          <span class="r-e-i-label">资源名称</span>
        </div>
        <div class="r-e-info-row">
          <span class="r-e-i-label">资源类型</span>
        </div>
        <div class="r-e-info-row">
          <span class="r-e-i-label">创建日期</span>
        </div>
        <div class="r-e-info-row">
          <span class="r-e-i-label">合同ID</span>
        </div>
        <div class="r-e-info-row">
          <span class="r-e-i-label">甲方</span>
        </div>
        <div class="r-e-info-row">
          <span class="r-e-i-label">乙方</span>
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
  </div>
</template>

<script>
  import { ContractDetail } from '@freelog/freelog-ui-contract'
  import ContractTree from './contract-tree.vue'
  export default {
    name: 'release-editor-contract',
    components: {
      ContractDetail, ContractTree
    },
    props: {},
    data() {
      return {
        isShowDetailContract: false,
        cTreeData: [
          {
            label: '一级 1',
            key: 'level',
            isShowChildren: false,
            children: [
              {
                label: '二级 1-1',
                key: 'level',
                isShowChildren: false,
                children: [{
                  label: '三级 1-1-1',
                  key: 'level',
                  isShowChildren: false,
                  children: [{
                    label: '三级 1-1-1',
                    key: 'level',
                    isShowChildren: false,
                    children: [{
                      label: '三级 1-1-1',
                      key: 'level',
                    }]
                  }]
                }]
              }
            ]
          },
          {
            label: '一级 2',
            key: 'level',
            isShowChildren: false,
            children: [
              {
                label: '二级 2-1',
                key: 'level',
                isShowChildren: true,
                children: [{
                  label: '三级 2-1-1',
                  key: 'level',
                },{
                  label: '三级 2-1-2',
                  key: 'level',
                }]
              }, {
                label: '二级 2-2',
                key: 'level',
                isShowChildren: true,
                children: [{
                  label: '三级 2-2-1',
                  key: 'level'
                }]
              }
            ]
          },
        ],
        contractDetail: {
          "contractId": "5cd3f06fbe3a7d003373d0d0",
          "contractClause": {
            "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
            "currentFsmState": "initial",
            "policyText": "for public:\n  escrow account acct\n  custom event acceptor.customEvent\n\n  initial:\n    proceed to auth on acct exceed 10 feather\n  auth:\n    presentable\n    active\n    proceed to refund on acct.confiscated\n  refund:\n    proceed to finish on acct.refunded\n  finish:\n    terminate",
            "policySegmentId": "0c6c51d9f4a6b6a73c3ce92edef5b67b",
            "fsmDeclarations": {
              "acct": {
                "type": "escrowaccount",
                "declareType": "contractAccount",
                "currencyType": 1,
                "accountId": "feth816fca55bd1"
              }, "customEvent": {"type": "acceptor", "declareType": "customEvent"}
            },
            "fsmStates": {
              "initial": {
                "authorization": [],
                "transition": {
                  "auth": {
                    "code": "S210",
                    "params": {
                      "contractAccountName": "acct",
                      "amount": {"type": "literal", "literal": "10"},
                      "currencyUnit": "feather"
                    },
                    "eventId": "1cab7f78ff7547df8f5d3893d8095cac"
                  }
                }
              },
              "auth": {
                "authorization": ["presentable", "active"],
                "transition": {
                  "refund": {
                    "code": "S211",
                    "params": {"contractAccountName": "acct"},
                    "eventId": "cb15a183d18f453da6f78ba48f747610"
                  }
                }
              },
              "refund": {
                "authorization": [],
                "transition": {
                  "finish": {
                    "code": "S212",
                    "params": {"contractAccountName": "acct"},
                    "eventId": "7d34e2153da94b06a69aa556b399cce3"
                  }
                }
              },
              "finish": {"authorization": [], "transition": {"terminate": null}}
            }
          },
          "contractName": "markdown-parser",
          "remark": "",
          "isDefault": 1,
          "isConsumptive": 0,
          "status": 2,
          "targetId": "5c40385d4d144e0029f02aff",
          "segmentId": "0c6c51d9f4a6b6a73c3ce92edef5b67b",
          "partyOneUserId": 10025,
          "partyTwoUserId": 10032,
          "partyOne": "5c40385d4d144e0029f02aff",
          "partyTwo": "10028",
          "resourceId": "dde4ef349881285fb545b038e471e0c519e4c200",
          "contractType": 2,
          "createDate": "2019-05-09T09:18:39.336Z",
          "updateDate": "2019-05-09T09:18:39.345Z"
        }
      }
    },
    methods: {
      updateContractAfterEvent() {},
      showDetailContract() {
        this.isShowDetailContract = true
      },
      hideDetailContract() {
        this.isShowDetailContract = false
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
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
        margin-left: 90px; margin-top: 20px; padding-left: 30px; z-index: 10;
        &:before {
          content: '';
          position: absolute; top: -20px; left: 0; z-index: 10;
          width: 1px; height: 42px; background-color: #BABABA;
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
