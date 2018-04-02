import echarts from 'echarts'
export default {
  name: 'dependency-tree',
  data() {
    return {
      dataIndex : 0,
      parent: '',
      resourceId: '',
      dependencies: [],
      itemStyleGreen: {
          color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#7be47b' // 0% 处的颜色
              }, {
                  offset: 1, color: '#7be47b' // 100% 处的颜色
              }]
          }
      },
      itemStyleRed: {
          color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#7be47b' // 0% 处的颜色
              }, {
                  offset: 1, color: 'red' // 100% 处的颜色
              }]
          }
      }
    }
  },
  components: {

  },
  mounted() {
    this.init();
  },
  methods: {
    getArray(data, index,deep,parent) {
        data.forEach((item,i)=> {
          this.dataIndex += 1;
          //找到元素
          if (this.dataIndex == index && this.dataIndex != 1) {
            //改变颜色
            if(!!data[i].selected) {
              data[i].itemStyle = this.itemStyleRed;
            }else {
              data[i].itemStyle = this.itemStyleGreen;
            }
            //改变selected
            data[i].selected = !!!data[i].selected;
            //log结果
            this.result = [deep,parent]
            this.resourceId = data[i].resourceId
            return
          } else {
            if(data[i].children) {
               this.getArray(data[i].children, index,deep+1,data[i].name);
            }else {
              return
            }
          }
        })
    },
    addRelation(data) {
      this.dependencies.push(data)
    },
    removeRelation(data) {
      let index = this.dependencies.indexOf(data);
      this.dependencies.splice(index, 1);
    },
    init() {
      // 基于准备好的dom，初始化echarts实例


      //这里不能用document.querySelector,否则就找不到element了
      var myChart = echarts.init(this.$el.querySelector('#main'));
      myChart.showLoading();
      this.data2 = {
      		"resourceId": "7a1ed87660dd899b6f26072c2fb378459778e432",
      		"resourceName": "test-pb",
      		"resourceType": "page_build",
      		"dependencies": [{
      			"resourceId": "954bdc9a51d713c341aaedcff75de19876c883c1",
      			"resourceName": "freelog-alpha-reveal",
      			"resourceType": "widget",
      			"dependencies": []
      		}, {
      			"resourceId": "b184bca491711bf9ab8d3684fa4095ef349bfc88",
      			"resourceName": "freelog-alpha-markdownviewer",
      			"resourceType": "widget",
      			"dependencies": []
      		}]
      	};
  var trans = JSON.stringify(this.data2).replace(/resourceName/,'name').replace(/dependencies/,'children')
  this.data1 = JSON.parse(trans)

      myChart.hideLoading();
      myChart.on('click',  (params) => {
          this.dataIndex=0;
          this.parent = '';
          if(!!params.data.selected) {
            this.$confirm('解除依赖关系', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var result = this.getArray([this.data1],params.dataIndex,0 )
              console.log('层级，父名称', this.result)
              this.removeRelation(this.resourceId);
              //向父组件传递最新依赖关系
              this.$emit('dependencies',this.dependencies)
              //重新渲染
              var option = myChart.getOption();
              option.series[0].data = [this.data1];
              myChart.setOption(option);
            }).catch(() => {

            });
          }else {
            this.$confirm('确定依赖关系', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var result = this.getArray([this.data1],params.dataIndex,0 )
              console.log('层级，父名称', this.result)
              this.addRelation(this.resourceId);
              //向父组件传递最新依赖关系
              this.$emit('dependencies',this.dependencies)
              //重新渲染
              var option = myChart.getOption();
              option.series[0].data = [this.data1];
              myChart.setOption(option);
            }).catch(() => {

            });
          }
      });
      myChart.setOption( {
          // tooltip: {
          //     trigger: 'item',
          //     triggerOn: 'click'
          // },
          legend: {
              top: '2%',
              left: '3%',
              orient: 'vertical',
              data: [{
                  name: '资源依赖树',
                  icon: 'rectangle'
              } ],
              borderColor: '#c23531'
          },
          series:[
              {
                  type: 'tree',

                  name: '资源依赖树',

                  data: [this.data1],

                  top: '5%',
                  left: '7%',
                  bottom: '2%',
                  right: '60%',
                  symbol:"diamond",
                  symbolSize: 17,

                  label: {
                      normal: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right'
                      }
                  },

                  leaves: {

                      label: {
                          normal: {
                              position: 'right',
                              verticalAlign: 'middle',
                              align: 'left'
                          },

                      }
                  },

                  expandAndCollapse: false,
                  animationDuration: 550,
                  animationDurationUpdate: 750

              }
          ]
      });


    }
  }
}
