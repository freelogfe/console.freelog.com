import { stateNameMap, eventMap } from './util'
import collapseState from '../collapseComponent'
export default {
  name: 'node-policy-signment',
  data() {
    return {
        format: [],
        activeName:'',
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
  // this.$el.querySelector('div.el-tabs__item').click();
  this.$nextTick(function () {
    // DOM 现在更新了
    // `this` 绑定到当前实例
    this.$el.querySelector('div.el-tabs__item').click();
  })
  },
  components: {
    collapseState
  },
  created () {
    //是否pagebuild资源
    if( this.$route.query.meta.widgets ) {
      this.meta = this.$route.query.meta.widgets;
      this.meta.unshift({
        resourceName: this.$route.query.resourceName,
        policyId: this.$route.query.policyId
      })
    }else {
      this.meta = [{
        resourceName: this.$route.query.resourceName,
        policyId: this.$route.query.policyId
      }]
    }
    this.activeName = "资源: "+ this.$route.query.resourceName
    this.meta.forEach(( obj, index )=> {
      this.tabData[index] =  {
        resourceName:"资源: "+ obj.resourceName,
        policyId: obj.policyId,
        formatData : []
      }
    })
    let policyArr = this.meta.map(( obj ) => {
      return obj.policyId
    })
    this.$services.policy.get({
      params: {policyIds:policyArr.join(',')}
    }).then((res) => {
      res.data.data.forEach((policy,index)=> {
          this.genColor = this.genColorCache();
          //选中按钮的样式
          let innerArr = Array.apply(null, Array(policy.policy.length)).map(() => false)
          this.$set(this.btnStates,index,innerArr)

          policy.policy.forEach((obj) => {

            let tempTable = { users: '', stateMachine: [],segmentId: '', serialNumber: policy.serialNumber };
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
    }).catch((err)=>{
      this.$message.error(err.response.errorMsg || err)
    })



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
        console.log(this.$el.querySelector('.tabs__item '));
    },
    genColorCache () {
      let colorArr = ['red','purple','blue','green','pink'];
      return function () {
        return colorArr.pop();
      }
    },
    select (id, sn, indexOuter, indexInner, self) {
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
        // this.$el.querySelector('div.el-tabs__item').click();
    },
    submit () {
      let result = [];
      this.btnStates.forEach( (obj, index) => {
        obj.forEach((booleanObj, index2) => {
          if(booleanObj == true) {
            let policyId = this.tabData[index].policyId
            let segmentId = this.tabData[index].formatData[index2].segmentId
            result.push([policyId,segmentId])
          }
        })
      })
      if (result.length != this.btnStates.length) {
        this.$message.warning('请选择policy')
        return false
      }
      //result是policyId  SegmentId

    }
  }
}
