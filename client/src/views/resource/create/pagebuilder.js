import dragula from 'dragula'
import Draggabilly from 'draggabilly'
/*
freelog-(user namespace)-widgetname
 */
export default {
  name: 'page-builder',
  data() {
    return {
      currentDate: new Date(),
      queryInput: '',
      widgets: [],
      dialogVisible: false,
      widgetStyle: '',
      currentEditWidget: null
    }
  },
  mounted() {
    this.queryHandler()
      .then(() => {
        this.initDraggable()
      })
  },
  methods: {
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
      var uid = 0;
      const self = this;

      dragula([$left, $right], {
        copy: function (el, source) {
          return source === $left
        },
        moves: function (el, source, handle, sibling) {
          return source === $left
        },
        accepts: function (el, target) {
          return target !== $left
        }
      }).on('drop', function (el, target) {
        if (target === $right) {
          el.className += ` js-draggable-widget widget-${uid++}`;
          el.widgetData = self.widgets[parseInt(el.dataset.index)]
          el.draggie = new Draggabilly(el, {
            containment: true
          }).on('dragEnd', (event) => {
            var pos = el.draggie.position;
            // debugger
            self.updateWidgetStyle(el, {
              left: `${pos.x}px`,
              top: `${pos.y}px`
            })
          });
          self.updateWidgets();
        }
      });
    },
    queryHandler() {
      return this.$services.g_Resources.get({
        params: {
          resourceType: 'Widget'
        }
      }).then((res) => {
        var data = res.data
        if (data.ret === 0) {
          this.widgets = this.widgets.concat(data.data.dataList)
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
