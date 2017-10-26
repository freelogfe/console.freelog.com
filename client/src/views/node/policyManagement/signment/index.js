import {stateNameMap, eventMap} from './util'
import collapseState from '../collapseComponent'
import policy from "../../../../services/policy";

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
      btnStates: []// 维护已选policy，是一个二维数组
    }
  },
  mounted() {
    if (!this.$route.query.policyId) {
      this.$message.error('没有资源Id, 请重新选择');
    } else {
      this.loadPolicyDetail()
        .then((data) => {
          data.forEach((policy, index) => {
            this.genColor = this.genColorCache();
            //选中按钮的样式
            let innerArr = Array.apply(null, Array(policy.policy.length)).map(() => false)
            this.$set(this.btnStates, index, innerArr)

            policy.policy.forEach((policyDetail) => {
              var tempTable = this.translatePolicy(policy, policyDetail)
              this.tabData[index].formatData.push(tempTable)
            });
          })
        })
    }
  },
  components: {
    collapseState
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
      if (this.$route.query.widgets) {
        try {
          widgets = JSON.parse(this.$route.query.widgets);
        } catch (err) {
          console.log(err)
          widgets = []
        }
      }
      widgets.unshift({
        resourceName: this.$route.query.resourceName,
        policyId: this.$route.query.policyId,
        resourceId: this.$route.query.resourceId
      });

      this.activeName = "资源: " + this.$route.query.resourceName

      widgets.forEach((obj, index) => {
        this.tabData.push({
          resourceName: "资源: " + obj.resourceName,
          policyId: obj.policyId,
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
        let data =  res.getData();
        requestArr.map((request)=> {
          let target;
          data.forEach((obj)=> {
            if (obj.resourceId == request) {
              target =  obj
            }
          })
          return target
        })
        res.getData().forEach((obj)=> {
          obj
        })
        return data


      }).catch((err) => {
        this.$message.error(err.response.errorMsg || err)
      })

    },
    handleChange(e) {
      console.log('e', e);
      console.log(this.$el.querySelector('.tabs__item '));
    },
    genColorCache() {
      let colorArr = ['red', 'purple', 'blue', 'green', 'pink'];
      return function () {
        return colorArr.pop();
      }
    },
    select(id, sn, indexOuter, indexInner, self) {
      console.log('select trigger',indexOuter,indexInner);
      //每一个资源只能选中一个policy
      this.btnStates[indexOuter].forEach((obj, index) => {
        if (index == indexInner) {
          this.$set(this.btnStates[indexOuter], index, true)
        } else {
          this.$set(this.btnStates[indexOuter], index, false)
        }
      })
      console.log('this.btnStates',this.btnStates);
    },
    handleClick(tab, event) {
      // this.$el.querySelector('div.el-tabs__item').click();
    },
    submit() {
      let result = [];
      this.btnStates.forEach((obj, index) => {
        obj.forEach((booleanObj, index2) => {
          if (booleanObj == true) {
            let policyId = this.tabData[index].policyId
            let segmentId = this.tabData[index].formatData[index2].segmentId
            let serialNumber= this.tabData[index].formatData[index2].serialNumber
            result.push([policyId, segmentId,serialNumber])
          }
        })
      })
      if (result.length != this.btnStates.length) {
        this.$message.warning('请选择policy')
        return false
      }
      let promiseArr = result.map((obj)=> {
        return this.$services.contract.post({
          contractType: '2',
          policyId: obj[0],
          segmentId: obj[1],
          serialNumber: obj[2],
          partyTwo: this.$route.params.nodeId
        })
      })
      //result是policyId  SegmentId, serialNumber
      Promise.all(promiseArr).then((values)=> {
        console.log(values);
      })

    }
  }
}
