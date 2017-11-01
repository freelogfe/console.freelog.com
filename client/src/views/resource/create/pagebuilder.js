import Draggabilly from 'draggabilly'
import ResourceTypes from '../resource-types'

/*
freelog-(user namespace)-widgetname
 */
function setPosition(container, el) {
  var elPos = el.getBoundingClientRect()
  var toPos = container.getBoundingClientRect()

  el.style.left = (elPos.x - toPos.x) + 'px'
  el.style.top = (elPos.y - toPos.y) + 'px'
  return el
}

export default {
  name: 'page-builder',
  data() {
    return {
      currentDate: new Date(),
      queryInput: '',
      widgets: [],
      dialogVisible: false,
      widgetStyle: '',
      currentEditWidget: null,
      widgetData: {}
    }
  },
  mounted() {
    this.queryHandler()
      .then(() => {
        this.initDraggable()
      })
  },
  methods: {
    setWidgetData(widget) {
      this.widgetData = widget
    },
    hideDialog() {
      this.currentEditWidget = null
      this.dialogVisible = false
      this.widgetStyle = ''
    },
    updateWidgetHandler() {
      this.updateWidgetStyle(this.currentEditWidget, this.widgetStyle)
      this.updateWidgets();
      this.hideDialog()
    },
    updateWidgets() {
      var $widgets = this.getWidgets()
      this.$emit('update', {widgets: $widgets})
    },
    getWidgets() {
      var $widgets = this.$refs.rightPanel.querySelectorAll('.widget-item')

      return [].slice.call($widgets);
    },
    updateWidgetStyle($widget, style) {
      var widgetStyle = {}

      if (typeof style === 'string') {
        style.split(';').forEach((item) => {
          if (item) {
            var propRow = item.split(':');
            var styleProp = propRow[0].trim()
            var stylePropVal = propRow[1].trim()
            widgetStyle[styleProp] = stylePropVal
          }
        })
      } else {
        widgetStyle = style
      }

      $widget.widgetStyle = Object.assign($widget.widgetStyle || {}, widgetStyle)
      Object.assign($widget.style, $widget.widgetStyle);
    },
    object2style(widgetStyle) {
      var style = Object.entries(widgetStyle || {}).reduce((style, entry) => {
        return style + `${entry[0]}:${entry[1]};`
      }, '')

      return style
    },
    transform2Html() {
      var $widgets = this.getWidgets()
      var html = ''

      $widgets.forEach((widget) => {
        var widgetData = widget.widgetData || {}
        var widgetName = widgetData.systemMeta && widgetData.systemMeta.widgetName
        if (!widgetName) {
          let errorMsg = '插件widgetName缺失'
          this.$message.error(errorMsg)
          throw new Error(errorMsg)
        }
        var style = this.object2style(widget.widgetStyle)
        html += `<${widgetName}
                data-widget-src="${widget.widgetData.resourceId}"
                data-widget-config="{}"          
               class="js-wc-widget" 
               style="${style}"></${widgetName}>`
      })

      return html
    },
    getPageBuildFile(filename, mimetype) {
      filename = filename || 'page-build.html'
      mimetype = mimetype || 'text/html'
      var html = this.transform2Html()
      var file = new File([html], filename, {
        type: mimetype,
      })

      console.log(html)
      return file;
    },
    getWidgetElement($el) {
      while (!$el.classList.contains('widget-item')) {
        $el = $el.parentNode;
        if ($el === document.body) {
          break;
        }
      }

      return $el
    },
    widgetActionHandler(event) {
      const target = event.target;
      const action = target.dataset.action;

      if (!action) {
        return;
      }

      const $widget = this.getWidgetElement(target)
      switch (action) {
        case 'delete':
          this.deleteWidget($widget);
          break;
        case 'edit':
          this.editWidget($widget);
          break;
      }
      console.log(action)
    },
    deleteWidget($widget) {
      $widget.remove()
    },
    editWidget($target) {
      this.dialogVisible = true
      this.currentEditWidget = $target
      this.widgetStyle = this.object2style(this.currentEditWidget.widgetStyle)
    },
    initDraggable() {
      const $left = this.$refs.leftPanel.$el;
      const $right = this.$refs.rightPanel
      const self = this;

      var $els = $left.querySelectorAll('.js-draggable-widget')
      for (let i = 0; i < $els.length; i++) {
        let el = $els[i]
        initDrag(el);
      }

      function initDrag(el, containment) {
        var _mirror = el.cloneNode(true);
        var offset = {x: 0, y: 0};

        el.draggie = new Draggabilly(el, {
          containment: containment || false
        }).on('dragEnd', (event) => {
          if (!event.toElement.contains(el) && event.toElement === $right) {
            var parentPos = $right.getBoundingClientRect()
            el.style.left = (event.x - parentPos.x - offset.x) + 'px'
            el.style.top = (event.y - parentPos.y - offset.y) + 'px'
            event.toElement.appendChild(el);
            el.draggie.disable()
            initDrag(el, $right);
          } else if ($left.contains(el)) {
            el && el.remove()
          }
        }).on('dragStart', (event) => {
          if (!containment) {
            var _copy = el
            var elPos = el.getBoundingClientRect()
            setPosition($left, el)
            el.style.position = 'absolute'
            el.replaceWith(_mirror)
            $left.appendChild(_copy)
            offset = {
              x: event.x - elPos.x,
              y: event.y - elPos.y
            }
            initDrag(_mirror)
          }
        });
      }
    },
    queryHandler() {
      return this.$services.g_Resources.get({
        params: {
          resourceType: ResourceTypes.widget
        }
      }).then((res) => {
        var data = res.getData()
        let widgets = data.dataList.filter((w) => {
          return !!(w && w.systemMeta && w.systemMeta.widgetName)
        })
        this.widgets = this.widgets.concat(widgets)
      }).catch((err) => {
        this.$message.error(err.response.errorMsg || err)
      })
    }
  }
}
