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
        serialNumber: '',
        activeName: 'second',
        tabData : [],
        btnStates : []// 维护已选policy，是一个二维数组
    }
  },
  mounted() {

  },
  components: {
    collapseState
  },
  created () {
    // this.meta = this.$route.query.meta;
    this.meta = [{name: '资源1', Id: '1'}, {name: '资源2', Id: '2'}, {name: '资源3', Id: '3'}, {name: '资源4', Id: '4'}]


    this.meta.forEach(( obj, index )=> {
      let Id = obj.Id
      this.tabData[index] =  {
        resourceName:"资源"+ Id,
        formatData : []
      }
      this.$services.policy.get(this.$route.query.policyId).then((res) => {
        this.genColor = this.genColorCache();
        //选中按钮的样式
        let innerArr = Array.apply(null, Array(res.data.data.policy.length)).map(() => true)
        this.$set(this.btnStates,index,innerArr)

        res.data.data.policy.forEach((obj) => {

          let tempTable = { users: '', stateMachine: [],segmentId: '', serialNumber: res.data.data.serialNumber };
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
          this.tabData[index].formatData.push(tempTable)
        });
      })

    })
    let formatData = {
      resourceName: this.$route.query.policyId,
      formatData : []
    }
    if (!this.$route.query.policyId) {
      this.$message.error('没有资源Id, 请重新选择');
    }
  },
  watch : {
    tabData () {
      deep: true
    }
  },
  methods: {
    handleChange (e) {
      console.log('e',e);
    },
    genColorCache () {
      let colorArr = ['red','purple','blue','green','pink'];
      return function () {
        return colorArr.pop();
      }
    },
    sign (id, sn, indexOuter, indexInner, self) {
      //每一个资源只能选中一个policy
      this.btnStates[indexOuter].forEach( (obj, index)=> {
        if (index == indexInner ) {
          this.$set(this.btnStates[indexOuter], indexInner, true)
        } else {
            this.$set(this.btnStates[indexOuter], indexInner, false)
        }
      })
      // this.$services.contract.post({
      //   contractType: '1',
      //   policyId: this.$route.query.policyId,
      //   segmentId: id,
      //   serialNumber: sn,
      //   partyTwo: this.$route.params.nodeId
      // }).then((res)=> {
      //   var data = res.data;
      //   if (data.ret === 0) {
      //     this.$message.success('合同创建成功')
      //     // this.$services.contract.get('59a3c612567e5c22a41d8f5c')
      //   } else {
      //     this.$message.error(data.msg)
      //   }
      // })
    },
    handleClick(tab, event) {
      console.log('you click a tab',tab);
    },
    savePolicies () {
      let result = [];
      this.btnStates.forEach( (obj, index) => {
        obj.forEach((booleanObj, index2) => {
          if(booleanObj == true) {
            result.push([idnex,index2])
          }
        })
      })
      if (result.length > this.btnStates.length ) {
        console.error('policy数量不对')
        return false
      }
      return result
    }
  }
}
