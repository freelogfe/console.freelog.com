/**
 * pagebuild的可视化模式预览页面
 */
import Draggabilly from 'draggabilly'
/*
freelog-(user namespace)-widgetname
 */

export default {
  name: 'page-builder-preview',
  data() {
    return {
      dialogVisible: false,
      widgetStyle: '',
      currentEditWidget: null,
      widgetsData: {} //缓存widget数据，切换模式时恢复
    }
  },
  mounted() {
    var self = this;
    self.initMessageListener()
  },
  methods: {
    hideDialog() {
      this.currentEditWidget = null
      this.dialogVisible = false
      this.widgetStyle = ''
    },
    initMessageListener() {
      window.addEventListener('message', (event) => {
        var origin = event.origin || event.originalEvent.origin;
        if (origin !== "http://console.freelog.com")
          return;

        var data = event.data
        var detail = data.detail
        if (data.action) {
          this[data.action](detail)
        } else {
          console.error('no action handler')
        }
      })
    },
    postMessage(data) {
      window.parent.postMessage(data, '*')
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

      Object.assign($widget.style, widgetStyle);
    },
    object2style(widgetStyle) {
      var style = Object.entries(widgetStyle || {}).reduce((style, entry) => {
        return style + `${entry[0]}:${entry[1]};`
      }, '')

      return style
    },
    appendWidgetNode(data) {
      var widgetData = data.widget;
      var widgetName = widgetData.systemMeta && widgetData.systemMeta.widgetName
      if (!widgetName) {
        let errorMsg = '插件widgetName缺失'
        this.$message.error(errorMsg)
        throw new Error(errorMsg)
      }

      var style = this.object2style(data.style)
      var html = `<${widgetName}
                data-widget-src="${widgetData.resourceId}"
                data-widget-config="{}"
               class="js-wc-widget"
               style="${style}"></${widgetName}>`
      var $el = document.createElement('div')
      $el.innerHTML = html
      var $child = $el.firstElementChild
      this.$refs.page.append($child)

      this.widgetsData[widgetName] = widgetData
      return $child
    },
    getWidgetNode($node) {
      while (!$node.classList.contains('js-wc-widget') && $node !== document.body) {
        $node = $node.parentNode
      }

      if ($node === document.body) {
        $node = null
      }
      return $node
    },
    resolveWidgetStyle($el) {
      var styles = getComputedStyle($el)
      var keys = ['top', 'left', 'width', 'height'];
      var editStyle = {}

      keys.forEach((key) => {
        if (styles[key]) {
          editStyle[key] = styles[key]
        }
      })

      return editStyle;
    },
    updateWidgetHandler() {
      this.updateWidgetStyle(this.currentEditWidget, this.widgetStyle)
      this.hideDialog()
    },
    widgetActionHandler(event) {
      const target = event.target;
      const action = target.dataset.action;

      if (!action) {
        return;
      }

      const $widget = this.getWidgetNode(target)
      this.revertEditMask()

      if (!$widget) {
        return;
      }
      switch (action) {
        case 'delete':
          this.deleteWidgetHandler($widget);
          break;
        case 'edit':
          this.editWidgetHandler($widget);
          break;
        default:
          console.warn('no support actions')
      }
    },
    editWidgetHandler($widget) {
      this.currentEditWidget = $widget
      this.widgetStyle = this.object2style(this.resolveWidgetStyle($widget))
      this.dialogVisible = true
    },
    deleteWidgetHandler($widget) {
      $widget.remove()
    },
    revertEditMask() {
      var $editMask = this.$refs.editMask
      $editMask.style = this.object2style({
        display: 'none',
      })
      this.$refs.wrapper.appendChild($editMask)
    },
    bindWidgetEvents($widget) {
      var self = this;
      var $editMask = this.$refs.editMask
      var $wrapper = this.$refs.wrapper

      $widget.widgetData = this.widgetsData[$widget.nodeName.toLowerCase()]
      $widget.draggie = new Draggabilly($widget, {
        containment: $wrapper
      })

      $widget.addEventListener('mouseenter', () => {
        this.currentEditWidget = $widget
        $editMask.style = self.object2style({
          display: 'block',
        })
        $widget.appendChild($editMask)
      })

      $widget.addEventListener('mouseleave', () => {
        self.revertEditMask()
      })
    },
    addWidget(data) {
      var $widget = this.appendWidgetNode(data)
      this.bindWidgetEvents($widget)
    },
    initWidgetsEvent() {
      var $widgets = this.$refs.page.querySelectorAll('.js-wc-widget')

      for (var i = 0; i < $widgets.length; i++) {
        this.bindWidgetEvents($widgets[i])
      }
    },
    setViewModeContent(detail) {
      debugger
      this.$refs.page.innerHTML = detail.html
      this.initWidgetsEvent()
    },
    //将可视模式下的源码同步到编辑模式
    syncCodeModeContent() {
      console.log('this.$refs.page.innerHTML', this.$refs.page.innerHTML)
      this.postMessage({
        action: 'setCodeModeContent',
        detail: {
          content: this.$refs.page.innerHTML
        }
      })
    }
  }
}
