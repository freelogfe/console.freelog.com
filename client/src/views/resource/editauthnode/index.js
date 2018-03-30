import echarts from 'echarts'
export default {
  name: 'edit-auth-node',
  data() {
    return {
      dataIndex : 0
    }
  },
  components: {

  },
  mounted() {
    this.init();
  },
  methods: {
    getArray(data, index) {
        for (var i in data) {
            this.dataIndex += 1;
            if (this.dataIndex == index) {

                console.log(this.dataIndex,data[i].name);
                data[i].itemStyle = {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'green' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'green' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            } else {
                this.getArray(data[i].children, index);
            }
        }
    },
    init() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      myChart.showLoading();

      var data1 = {
          "name": "flare",
          "children": [
              {
                  "name": "data",
                  "children": [
                      {
                           "name": "converters",
                           "children": [
                            {"name": "Converters", "value": 721},
                            {"name": "DelimitedTextConverter", "value": 4294}
                           ]
                      },
                      {
                          "name": "DataUtil",
                          "value": 3322
                      }
                  ]
              },
              {
                  "name": "display",
                      itemStyle: {
                          color: {
                              type: 'linear',
                              x: 0,
                              y: 0,
                              x2: 0,
                              y2: 1,
                              colorStops: [{
                                  offset: 0, color: 'green' // 0% 处的颜色
                              }, {
                                  offset: 1, color: 'green' // 100% 处的颜色
                              }],
                              globalCoord: false // 缺省为 false
                          }
                      },
                  "children": [
                      {"name": "DirtySprite", "value": 8833},
                      {"name": "LineSprite", "value": 1732},
                      {"name": "RectSprite", "value": 3623}
                 ]
              },
              {
                  "name": "flex",
                  "children": [
                      {"name": "FlareVis", "value": 4116}
                  ]
              }          ]
      };

      myChart.hideLoading();
      myChart.on('click',  (params) => {
        this.dataIndex=0;
          this.getArray([data1],params.dataIndex )
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
                  name: 'tree1',
                  icon: 'circle',
                  color:'red'
              } ,
              {
                  name: 'tree2',
                  icon: 'rectangle'
              }],
              borderColor: '#c23531'
          },
          series:[
              {
                  type: 'tree',

                  name: 'tree1',

                  data: [data1],

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
