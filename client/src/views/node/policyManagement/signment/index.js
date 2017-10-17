import { stateNameMap, eventMap } from './util'
import collapseState from '../collapseComponent'
export default {
  name: 'node-policy-signment',
  data() {
    return {
        format: [],
        activeNames: ['policy0'],
        colorMap: {},
        genColor: function () {},
        policy: {},
        serialNumber: ''
    }
  },
  mounted() {
  },
  components: {
    collapseState
  },
  created () {
    if (!this.$route.query.policyId) {
      this.$message.error('没有资源Id, 请重新选择');
    } else {
      this.$services.policy.get(this.$route.query.policyId).then((res) => {
        this.serialNumber = res.data.data.serialNumber

        this.genColor = this.genColorCache()
        res.data.data.policy.forEach((obj) => {
          let tempTable = { users: '', stateMachine: [],segmentId: '' };
          //用户
          obj.users.forEach((obj) => {
            if( obj.userType == 'individuals') {
              tempTable.users += '对用户';
              obj.users.forEach ((name) => {
                tempTable.users += name + ' ';
              })
            }
          })
          tempTable.segmentId = obj.segmentId;
          //状态机合同
          obj.fsmDescription.forEach((transition) => {
            let temp= {};
            if( !  this.colorMap[transition.currentState]  ) {
              this.colorMap[transition.currentState] = this.genColor();
            }
            temp.cColor = this.colorMap[transition.currentState];

            if( !  this.colorMap[transition.nextState]  ) {
              this.colorMap[transition.nextState] = this.genColor();
            }
            temp.nColor = this.colorMap[transition.nextState];
            stateNameMap[transition.currentState]?temp.currentState=stateNameMap[transition.currentState]: temp.currentState=transition.currentState;
            stateNameMap[transition.nextState]?temp.nextState=stateNameMap[transition.nextState]: temp.nextState=transition.nextState;
            temp.event = eventMap[transition.event.type](transition.event);
            tempTable.stateMachine.push(temp)
          })
          this.format.push(tempTable);
        });
      })
    }
  },
  methods: {
    handleChange (e) {
      console.log('e',e);
    },
    genColorCache () {
      let arr = ['red','purple','blue','green','pink'];
      return function () {
        return arr.pop();
      }
    },
    sign (id, sn) {
      this.$services.contract.post({
        contractType: '1',
        policyId: this.$route.query.policyId,
        segmentId: id,
        serialNumber: sn,
        partyTwo: this.$route.params.nodeId
      }).then((res)=> {
        console.log(res)
        var data = res.data;
        if (data.ret === 0) {
          this.$message.success('合同创建成功')
          this.$services.contract.get('59a3c612567e5c22a41d8f5c')
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
