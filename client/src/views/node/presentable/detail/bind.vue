<template>
  <div v-loading="loading">
    <div v-if="contracts.length">
      <el-table
        :data="contracts"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <contract-detail-info :data.sync="props.row" v-if="props.row.contractId"></contract-detail-info>
          </template>
        </el-table-column>
        <el-table-column
          label="contract ID"
          prop="contractId">
        </el-table-column>
        <el-table-column
          label="segmentId"
          prop="segmentId">
        </el-table-column>
        <el-table-column
          label="for users">
          <template slot-scope="props">
            <div v-if="props.row.forUsers">
              <el-tag :type="tag.type==='individual'?'':'warning'" v-for="(tag,index) in props.row.forUsers"
                      :key="index">
                {{tag.users}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同状态">
          <template slot-scope="props">
            <div v-if="props.row.statusInfo">
              <el-tag :type="props.row.statusInfo.type">
                {{props.row.statusInfo.desc}}
                <el-tooltip placement="top" v-if="props.row.contractId && props.row.statusInfo.type !=='success'">
                  <div slot="content">
                    还不是有效合同状态，
                    <a :href="props.row.execUrl" target="_blank" class="warning-color">
                      去执行合同
                    </a>
                  </div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
                <el-tooltip placement="top" v-else-if="!props.row.contractId">
                  <div slot="content" style="line-height: 16px">
                    该策略还未创建合同，需创建合同后方可选择绑定<br/>
                    <a :href="widget.createLink" target="_blank" class="warning-color">
                      现在就去创建
                    </a>
                  </div>
                  <i class="el-icon-info" style="color: #F56C6C"></i>
                </el-tooltip>
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="80px">
          <template slot-scope="props">
            <el-radio v-model="selectedContractId" :disabled="!props.row.contractId" :label="props.row.contractId"><span
              title="placeholder"></span></el-radio>

            <el-tooltip placement="top" v-if="isCurrentSelected(props.row)">
              <div slot="content">
                当前已选择的合同
              </div>
              <i class="el-icon-info"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-button @click="cancelHandler">取消</el-button>
        <el-button type="primary" @click="confirmHandler">确定</el-button>
      </div>
    </div>
    <div class="no-create-tip" v-else>
      还未创建合同，快去创建一个吧。
      <a :href="widget.createLink" target="_blank">
        <el-button type="warning" plain round>现在就去创建 ></el-button>
      </a>
    </div>
  </div>
</template>

<script>
  import ContractDetailInfo from '@/components/detail-info/contract.vue'
  import {CONTRACT_STATUS_COLORS} from '@/config/contract'
  import ContractUtils from '@/data/contract/utils'

  export default {
    name: 'presentable-bind-widget',
    data() {
      return {
        contracts: [],
        selectedContractId: '',
        loading: false
      }
    },
    props: {
      widget: Object
    },
    components: {ContractDetailInfo},
    mounted() {
      this.render()
      this.listenWindowVisibility()
    },
    watch: {
      widget() {
        this.render()
      }
    },
    beforeDestroy() {
      this.offEvent && this.offEvent()
    },
    methods: {
      listenWindowVisibility() {
        var self = this
        var hidden = 'hidden';
        var doc = document

        if (hidden in doc) {
          doc.addEventListener('visibilitychange', onchange);
          this.offEvent = function () {
            doc.removeEventListener('visibilitychange', onchange);
          }
        } else if ((hidden = 'mozHidden') in doc) {
          doc.addEventListener('mozvisibilitychange', onchange);
          this.offEvent = function () {
            doc.removeEventListener('mozvisibilitychange', onchange);
          }
        } else if ((hidden = 'webkitHidden') in doc) {
          doc.addEventListener('webkitvisibilitychange', onchange);
          this.offEvent = function () {
            doc.removeEventListener('webkitvisibilitychange', onchange);
          }
        } else if ((hidden = 'msHidden') in doc) {
          doc.addEventListener('msvisibilitychange', onchange);
          this.offEvent = function () {
            doc.removeEventListener('msvisibilitychange', onchange);
          }
        } else {
          window.onpageshow = window.onpagehide
            = window.onfocus = window.onblur = onchange;
          this.offEvent = function () {
            window.onpageshow = window.onpagehide = window.onfocus = window.onblur = function () {
            }
          }
        }

        function onchange(evt) {
          var v = 'visible';
          var h = 'hidden';
          var evtMap = {
            focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
          };
          var type

          evt = evt || window.event;
          if (evt.type in evtMap) {
            type = evtMap[evt.type];
          } else {
            type = this[hidden] ? 'hidden' : 'visible';
          }

          if (type === 'visible') {
            self.render()
          }
        }
      },
      cancelHandler() {
        this.$emit('done', {
          selected: false
        })
      },
      confirmHandler() {
        this.$emit('done', {
          selected: true,
          detail: {
            contractId: this.selectedContractId,
            removeContractId: this.widget.contractId
          }
        })
      },
      isCurrentSelected(row) {
        return this.widget.contractId === row.contractId
      },
      render() {
        this.contracts = []
        this.selectedContractId = this.widget.contractId
        if (this.widget.resourceId) {
          this.loading = true
          this.loadResourceContracts()
            .then(() => {
              this.loading = false
            })
            .catch((err) => {
              this.$error.showErrorMessage(err)
              this.loading = false
            })
        }
      },
      loadPolicies(resourceId) {
        return this.$services.policy.get(resourceId).then((res) => {
          let policyData = res.getData();
          policyData.policy.forEach((p) => {
            p.created = false; //是否已经创建过合同
            p._formatSegmentText = p.segmentText
            p.forUsers = p.users.map((u) => {
              return {
                type: u.userType,
                users: u.users.join(',')
              }
            })
          })
          return policyData
        })
      },

      loadResourceContracts() {

        return this.$services.contractRecords.get({
          params: {
            contractType:2,
            resourceIds: this.widget.resourceId,
            partyTwo: this.$route.params.nodeId
          }
        }).then((res) => {
          return res.getData()
        }).then((contracts) => {
          var contractsDetail = []
          var promises = contracts.map((c) => {
            return this.$services.contract.get(c.contractId).then((res) => {
              contractsDetail.push(res.getData())
            })
          })

          if (!this.widget.policyData) {
            let p = this.loadPolicies(this.widget.resourceId).then((policyData) => {
              this.widget.policyData = policyData
            })
            promises.push(p)
          }
          return Promise.all(promises).then(() => {
            return contractsDetail
          })
        }).then(this.formatContracts.bind(this))
          .then((contracts) => {
            this.contracts = contracts
          })
      },
      formatContracts(contracts) {
        var policyData = this.widget.policyData
        var segmengIdCreatedMap = {}

        contracts.forEach((contract) => {
          ContractUtils.format(contract)
          contract.execUrl = `/node/${this.$route.params.nodeId}/presentable/detail?contractId=${contract.contractId}#contract`
          segmengIdCreatedMap[contract.segmentId] = true
        })

        if (policyData) {
          policyData.policy.forEach((p) => {
            if (!segmengIdCreatedMap[p.segmentId]) {
              p.status = -1
              p.statusInfo = CONTRACT_STATUS_COLORS[p.status]
              contracts.push(p)
            }
          })
        }

        return contracts
      }
    }
  }
</script>

<style scoped>
  .warning-color {
    color: #E6A23C
  }

  .footer {
    text-align: center;
    margin-top: 20px;
  }

  .no-create-tip {
    text-align: center;
    font-size: 16px;
  }
</style>
