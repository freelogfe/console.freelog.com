import echarts from 'echarts'
import G6 from '@antv/g6';

G6.track(false)

const Util = G6.Util;
const selectedCfg = {
  fill: '#67c23a',
  stroke: '#044A9A',
  fillOpacity: 1
};
const unselectedCfg = {
  fill: 'white',
  stroke: '#003380',
  fillOpacity: 1
}

var depData = {
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
    "dependencies": [{
      "resourceId": "954bdc9a51d713c341aaedcff75de19876c883c1",
      "resourceName": "freelog-alpha-reveal22",
      "resourceType": "widget",
      "dependencies": []
    }, {
      "resourceId": "b184bca491711bf9ab8d3684fa4095ef349bfc88",
      "resourceName": "freelog-alpha-markdownviewer22",
      "resourceType": "widget",
      "dependencies": []
    }]
  }]
}

export default {
  name: 'dependency-tree',
  data() {
    return {
      deps: [],
      tree: null,
      depData: {}
    }
  },

  props: {
    resourceId: String,
    value: Array
  },
  components: {},
  mounted() {
    if (!this.resourceId) {
      return
    }
    this.loadDependency()
      .then((data) => {
        this.depData = data
        this.render()
      })
  },
  methods: {
    loadDependency() {
      return this.$axios.get(`/v1/resources/getResourceDependencyTree/${this.resourceId}`)
        .then((res) => {
          return res.getData()
        })
    },
    resolveNode(node, deep) {
      deep = deep || 0
      node.name = node.resourceName;
      node.children = node.dependencies || [];
      node.deep = deep
      if (node.children.length) {
        node.children.forEach((n) => {
          this.resolveNode(n, deep + 1)
        })
      }

      return node
    },
    render() {
      const layoutCfg = {
        "direction": "LR",
        "nodeSep": 40,
        "nodeSize": 20,
        "rankSep": 200
      };
      const DEFAULT_NODE_SIZE = 5;
      var data = this.resolveNode(this.depData)
      G6.registerNode('treeNode', {
        draw(cfg, group) {
          const model = cfg.model;
          const r = layoutCfg.nodeSize ? layoutCfg.nodeSize / 2 : DEFAULT_NODE_SIZE;
          const shapeCfg = {
            attrs: Object.assign({
              x: cfg.x,
              y: cfg.y,
              r: r
            }, unselectedCfg)
          };
          // if (model.children && model.children.length) {
          //   // shapeCfg.class = model.isCollapsed ? 'spreadoutButton' : 'collapseButton';
          //   shapeCfg.attrs.fill = '#044A9A';
          //   shapeCfg.attrs.stroke = '#003380';
          //   shapeCfg.attrs.fillOpacity = 0.4;
          // }
          if (model.root) {
            shapeCfg.attrs.fill = '#044A9A';
            shapeCfg.attrs.stroke = '#003380';
            shapeCfg.attrs.fillOpacity = 0.7;
          }
          shapeCfg.attrStash = Util.mix({}, shapeCfg.attrs);
          return group.addShape('circle', shapeCfg);
        },
        afterDraw(cfg, group) {
          const model = cfg.model;
          const r = layoutCfg.nodeSize ? layoutCfg.nodeSize / 2 : DEFAULT_NODE_SIZE;
          const align = model.align;
          const labelAttrs = {
            text: model.name,
            fill: '#666',
            textBaseline: 'middle',
            fontSize: 20,
            x: cfg.x + r + DEFAULT_NODE_SIZE,
            y: cfg.y,
            textAlign: 'left',
          };
          if (align === 'R') {
            Util.mix(labelAttrs, {
              x: cfg.x - r - DEFAULT_NODE_SIZE,
              y: cfg.y,
              textAlign: 'right',
            });
          } else if (align === 'T' || align === 'CH') {
            Util.mix(labelAttrs, {
              x: cfg.x,
              y: cfg.y + r + DEFAULT_NODE_SIZE,
              textAlign: 'right',
              rotate: -Math.PI / 2,
            });
          } else if (align === 'B') {
            Util.mix(labelAttrs, {
              x: cfg.x,
              y: cfg.y - r - DEFAULT_NODE_SIZE,
              textAlign: 'left',
              rotate: -Math.PI / 2,
            });
          }
          const label = group.addShape('text', {
            attrs: labelAttrs,
          });
          return label;
        }
      });
      // 生成树图实例
      const tree = new G6.Tree({
        id: 'dep-tree',                            // 容器ID
        height: window.innerHeight*.5,                         // 画布高
        fitView: 'autoZoom',                 // 自动缩放
        layoutFn: G6.Layouts.LayeredTidyTree, // 布局类型
        layoutCfg: layoutCfg,                // 布局配置
        showButton: false,
      });

      tree.source(data);
      tree.node().shape('treeNode')
        .tooltip((obj) => {
          return [
            ['resourceName', obj.resourceName],
            ['resourceType', obj.resourceType],
            ['resourceId', obj.resourceId]
          ];
        });
      tree.tooltip({
        title: '当前资源', // @type {String} 标题
        split: ' : ',  // @type {String} 分割符号
        dx: 10,       // @type {Number} 水平偏移
        dy: 10        // @type {Number} 竖直偏移
      })
      tree.edge()
        .shape('smooth')
        .style({
          stroke: '#A9BCD3'
        })
        .tooltip((edge) => {
          var nodes = tree.getNodes()
          for (let node of nodes) {
            let model = node.getModel()
            if (model.id === edge.source) {
              edge.sourceData = model;
            } else if (model.id === edge.target) {
              edge.targetData = model;
            }
            if (edge.sourceData && edge.targetData) {
              break;
            }
          }
          return [
            ['from', edge.sourceData.resourceName],
            ['to', edge.targetData.resourceName]
          ];
        });

      tree.removeBehaviour(['wheelZoom', 'dragCanvas'])
      // 渲染树图
      tree.render();

      this.tree = tree
      tree.on('click', ev => {
        switch (ev.itemType) {
          case 'edge':
            this.edgeHandler(ev);
            break;
          case 'node':
            this.nodeHandler(ev);
            break;
        }
      });
      // // 添加事件
      // tree.on('mouseenter', ev => {
      //   const shape = ev.shape;
      //   if (shape && shape.hasClass('Button')) {
      //     shape.attr('fillOpacity', 0.2);
      //     shape.attr('strokeOpacity', 0.8);
      //     tree.refresh();
      //   }
      // });
      //
    },
    closeDepHandler(tag) {
      var depId = tag.data.id;
      this.renderUnselectedNode(tag)

      for (var i in this.deps) {
        let dep = this.deps[i]
        if (dep.data.id === depId) {
          this.deps.splice(i, 1)
          break;
        }
      }
    },
    renderUnselectedNode(node) {
      this.renderUnselectedShape(node.shape)
      this.renderUnselectedEdge(node.edge)
      this.$emit('input', this.deps)
      this.tree.refresh();
    },
    renderSelectedNode(node) {
      this.renderSelectedShape(node.shape)
      this.renderSelectedEdge(node.edge)
      this.$emit('input', this.deps)
      this.tree.refresh();
    },
    getEdge(node) {
      var item = node.item;
      var edges = item.getEdges()
      var model = item.getModel()
      var id = `${model.parent.id}-${model.id}`
      for (let edge of edges) {
        let edgeModel = edge.getModel();
        if (edgeModel.id === id) {
          return edge
        }
      }
      return null
    },
    renderUnselectedShape(shape) {
      Object.keys(unselectedCfg).forEach((key) => {
        shape.attr(key, unselectedCfg[key])
      })
    },
    renderUnselectedEdge(edge) {
      if (!edge) {
        return
      }

      edge.style({
        stroke: '#A9BCD3'
      })
    },
    renderSelectedShape(shape) {
      Object.keys(selectedCfg).forEach((key) => {
        shape.attr(key, selectedCfg[key])
      })
    },
    renderSelectedEdge(edge) {
      if (!edge) {
        return
      }

      edge.style({
        stroke: '#67c23a'
      })
    },
    isInDeps(id) {
      for (var i in this.deps) {
        let dep = this.deps[i]
        if (dep.data.id === id) {
          return true
        }
      }
      return false
    },
    nodeHandler(ev) {
      var model = ev.item.getModel()
      var parent = model.parent;

      if (!parent || this.isInDeps(model.id)) {
        return
      }

      return this.$confirm(`确定将${model.resourceName}=>${parent.resourceName}添加进授权依赖？`)
        .then(() => {
          let shape = ev.shape
          let edge = this.getEdge(ev)
          this.deps.push({
            name: `${model.resourceName} => ${parent.resourceName}`,
            data: model,
            shape,
            edge
          })
          this.renderSelectedNode({
            shape,
            edge
          })
        })
        .catch(() => {
        })
    },
    edgeHandler(ev) {
      console.log(ev)
    }
  }
}
