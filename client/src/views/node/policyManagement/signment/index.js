import PresentableSteps from '@/views/node/presentable/steps/index.vue'
import {stateNameMap, eventMap} from './util'
import collapseState from '../collapseComponent'

export default {
  name: 'node-policy-signment',
  data() {
    return {
      format: [],
      activeNames: ['policy0'],
      colorMap: {},
      genColor: function () {
      },
      serialNumber: '',
      activeName: 'second',
      tabData: [],
      dataReady: false,
      btnStates: []// 维护已选policy，是一个二维数组
    }
  },
  mounted() {
    let self = this;
    if (!this.$route.query.resourceId) {
      this.$message.error('没有资源Id, 请重新选择');
    } else {
      this.loadPolicyDetail()
        .then((data) => {
          this.dataReady = true;
          data.forEach((policy, index) => {
            this.genColor = this.genColorCache();
            //选中按钮的样式
            let innerArr = Array.apply(null, Array(policy.policy.length)).map(() => false)
            this.$set(this.btnStates, index, innerArr)

            policy.policy.forEach((policyDetail) => {
              var tempTable = self.translatePolicy(policy, policyDetail)
              self.tabData[index].formatData.push(tempTable)
            });
          })
        })
    }
  },
  components: {
    collapseState,
    PresentableSteps
  },
  methods: {
    translatePolicy(policy, policyDetail) {
      let tempTable = {users: '', stateMachine: [], segmentId: '', serialNumber: policy.serialNumber};
      //用户
      policyDetail.users.forEach((policyDetail) => {
        if (policyDetail.userType == 'individuals') {
          tempTable.users += '对用户';
          policyDetail.users.forEach((name) => {
            tempTable.users += name + ' ';
          })
        }
      })
      tempTable.segmentId = policyDetail.segmentId;
      //状态机合同
      policyDetail.fsmDescription.forEach((transition) => {
        let temp = {};
        if (!this.colorMap[transition.currentState]) {
          this.colorMap[transition.currentState] = this.genColor();
        }
        temp.cColor = this.colorMap[transition.currentState];

        if (!this.colorMap[transition.nextState]) {
          this.colorMap[transition.nextState] = this.genColor();
        }
        temp.nColor = this.colorMap[transition.nextState];
        stateNameMap[transition.currentState] ? temp.currentState = stateNameMap[transition.currentState] : temp.currentState = transition.currentState;
        stateNameMap[transition.nextState] ? temp.nextState = stateNameMap[transition.nextState] : temp.nextState = transition.nextState;
        temp.event = eventMap[transition.event.type](transition.event);
        tempTable.stateMachine.push(temp)
      })

      return tempTable
    },
    loadPolicyDetail() {
      var widgets = []

      // var query = this.$route.query
      // new Promise((resolve)=>{
      //   if (query.resourceType === 'page_build') {
      //     return this.loadResourceDetail(query.resourceId)
      //   } else {
      //     resolve()
      //   }
      // }).then((data)=>{
      //
      // })


      if (this.$route.query.widgets) {
        try {
          widgets = JSON.parse(this.$route.query.widgets);
        } catch (err) {
          console.log(err)
          widgets = []
        }
      }
      //加上当前pb
      widgets.unshift({
        resourceName: this.$route.query.resourceName,
        resourceId: this.$route.query.resourceId
      });
      this.activeName = "资源: " + this.$route.query.resourceName

      widgets.forEach((obj, index) => {
        this.tabData.push({
          resourceName: "资源: " + obj.resourceName,
          resourceId: obj.resourceId,
          formatData: []
        })
      })
      let requestArr = widgets.map((obj) => {
        return obj.resourceId
      })
      return this.$services.policy.get({
        params: {resourceIds: requestArr.join(',')}
      }).then((res) => {
        let data = res.getData();
        return requestArr.map((request) => {
          let target;
          data.forEach((obj) => {
            if (obj.resourceId == request) {
              return target = obj
            }
          })
          return target
        })
      }).catch((err) => {
        this.$message.error(err.response.errorMsg || err)
      })

    },
    genColorCache() {
      let colorArr = ['red', 'purple', 'blue', 'green', 'pink'];
      return function () {
        return colorArr.pop();
      }
    },
    select(id, sn, indexOuter, indexInner, self) {
      if (!this.dataReady) {
        return
      }
      let resourceIds = this.tabData[indexOuter].resourceId
      let segmentId = this.tabData[indexOuter].formatData[indexInner].segmentId
      let partyTwo = this.$route.params.nodeId
      this.$services.contractRecords.get({
        params: {
          resourceIds: resourceIds,
          partyTwo: partyTwo
        }
      }).then((val) => {
        if (val.data.data.length == 0) {
          return
        } else if (val.data.data[0].segmentId == segmentId) {
          this.$message.warning('您已使用此策略段创建了合同，提交将使用已创建的合同')
        }
      })

      //每一个资源只能选中一个policy
      this.btnStates[indexOuter].forEach((obj, index) => {
        if (index == indexInner) {
          this.$set(this.btnStates[indexOuter], index, true)
        } else {
          this.$set(this.btnStates[indexOuter], index, false)
        }
      })
    },
    handleClick(tab, event) {
      // this.$el.querySelector('div.el-tabs__item').click();
    },
    submit() {
      let result = [];
      this.btnStates.forEach((obj, index) => {
        obj.forEach((booleanObj, index2) => {
          if (booleanObj == true) {
            let targetId = this.tabData[index].resourceId
            let segmentId = this.tabData[index].formatData[index2].segmentId
            let serialNumber = this.tabData[index].formatData[index2].serialNumber
            result.push([targetId, segmentId, serialNumber])
          }
        })
      })
      if (result.length != this.btnStates.length) {
        this.$message.warning('请选择policy')
        return false
      }
      //找到对应的数据
      var contractsArr = result.map((obj) => {
        return {
          resourceId: obj[0],
          segmentId: obj[1],
          serialNumber: obj[2]
        }
      })
      if (this.$route.query.resourceType == 'page_build') {
        this.$services.pbContract.post({
          nodeId: this.$route.params.nodeId,
          contracts: contractsArr
        }).then((value) => {
          if (value.data.errcode == 100) {
            this.$message.warning(value.data.msg)
          }
        }).catch((err) => {
          console.log('in err', err);
        })
      } else {
        let promiseArr = result.map((obj) => {
          return this.$services.contract.post({
            contractType: '2',
            targetId: obj[0],
            segmentId: obj[1],
            serialNumber: obj[2],
            partyTwo: this.$route.params.nodeId
          })
        })
        //result是 SegmentId, serialNumber
        Promise.all(promiseArr).then((values) => {
          var res = values[0]
          if (res.data.errcode == 105) {
            this.$message.warn('该策略已有合同, 合同id为： ' + values[0].data.data.contractId)
          } else {
            var data = res.getData()
            if (res.data.errcode !== 0) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success('创建成功')
              this.$router.push({
                path: `/node/${this.$route.params.nodeId}/presentable/create`,
                query: {contractId: data.contractId}
              })
            }
          }
        }).catch((err) => {
          console.log(err);
          if (err.response.data.ret != 1) {
            this.$message.error(err.response.errorMsg)
          }
        })
      }

    }
  }
}

