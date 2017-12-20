import Draggabilly from 'draggabilly'
import {RESOURCE_TYPES} from '@/config/view-config'
import {codemirror} from 'vue-codemirror'

require('codemirror/theme/dracula.css')
require('codemirror/addon/fold/foldgutter.css')
require('codemirror/addon/fold/foldgutter')
require('codemirror/addon/fold/foldcode')
require('codemirror/addon/fold/xml-fold')
require('codemirror/addon/fold/brace-fold')
require('codemirror/addon/fold/indent-fold')
require('codemirror/addon/edit/matchbrackets')
require('codemirror/addon/selection/selection-pointer')

require('codemirror/keymap/sublime')
require('codemirror/addon/search/match-highlighter')
require('codemirror/addon/search/searchcursor')

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

const CODE_MODE = 'code_mode'
const VIEW_MODE = 'view_mode'
const modes = {
  view: VIEW_MODE,
  code: CODE_MODE
}

export default {
  name: 'page-builder',
  data() {
    return {
      queryInput: '',
      widgets: [],
      //page build
      editMode: VIEW_MODE,
      modes: modes,
      code: '',
      editorOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/html',
        theme: 'dracula',
        lineNumbers: true,
        line: true,

        // 高级配置（需要引入对应的插件包）,codemirror advanced options(You need to manually introduce the corresponding codemirror function script code)
        // sublime、emacs、vim三种键位模式，支持你的不同操作习惯
        keyMap: "sublime",
        // 按键映射，比如Ctrl键映射autocomplete，autocomplete是hint代码提示事件
        extraKeys: {"Ctrl": "autocomplete"},
        lineWrapping: true,
        // 代码折叠
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
      },
      codeEditor: null
    }
  },
  components: {
    codemirror
  },
  mounted() {
    this.initCodeMirror()
    this.loadWidgets()
      .then(() => {
        this.initDraggable()
        this.initMessageListener()
      })
  },
  methods: {
    initCodeMirror() {
      this.codeEditor = this.$el.querySelector('.CodeMirror')
      this.codeEditor.hidden = (this.editMode !== CODE_MODE)
      this.codeEditor.style = 'height: 100%;line-height: 1.3;'
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
    initDraggable() {
      const $left = this.$refs.leftPanel.$el;
      const $mask = this.$refs.mask;
      const $editorWrapper = this.$refs.editorWrapper.$el

      const self = this;
      var $els = $left.querySelectorAll('.js-draggable-widget')
      for (let i = 0; i < $els.length; i++) {
        let el = $els[i]
        initDrag(el);
      }


      function initDrag(el, containment) {
        var _mirror = el.cloneNode(true);
        var offset = {x: 0, y: 0};

        var revertStyles = () => {
          var styles = window.getComputedStyle(_mirror);
          ['top', 'left', 'position'].forEach((prop) => {
            el.style[prop] = styles[prop]
          })
          _mirror.replaceWith(el)
          _mirror.remove()
          $editorWrapper.classList.remove('dragging')
        }

        el.draggie = new Draggabilly(el, {
          containment: containment || false
        }).on('dragEnd', (event) => {
          if (!event.toElement.contains(el) && event.toElement === $mask) {
            var parentPos = $mask.getBoundingClientRect()
            var elStyle = window.getComputedStyle(el)
            var detail = {
              style: {
                position: 'absolute',
                width: elStyle.width,
                height: elStyle.height,
                left: parseInt(event.x - parentPos.x - offset.x) + 'px',
                top: parseInt(event.y - parentPos.y - offset.y) + 'px'
              },
              widget: self.widgets[parseInt(el.dataset.index)]
            }

            revertStyles();
            self.postMessage({
              action: 'addWidget',
              detail: detail
            }, '*')
          } else if ($left.contains(el)) {
            revertStyles();
          }
        }).on('dragStart', (event) => {
          if (!containment) {
            var elPos = el.getBoundingClientRect()
            //复制节点
            setPosition($left, el)
            el.style.position = 'absolute'
            el.replaceWith(_mirror)
            $left.appendChild(el)
            $editorWrapper.classList.add('dragging')
            //用于计算在iframe容器的位置
            offset = {
              x: event.x - elPos.x,
              y: event.y - elPos.y
            }
          }
        });
      }
    },
    postMessage(data) {
      this.$refs.rightPanel.contentWindow.postMessage(data, '*')
    },
    showInfoHandler(index) {
      this.widgets[index].showInfo = true
    },
    hideInfoHandler(index) {
      this.widgets[index].showInfo = false
    },
    loadWidgets() {
      var self = this;
      return this.$services.g_Resources.get({
        params: {
          resourceType: RESOURCE_TYPES.widget
        }
      }).then((res) => {
        var data = res.getData()
        let widgets = data.dataList.filter((w) => {
          return !!(w && w.systemMeta && w.systemMeta.widgetName)
        })
        self.widgets = self.widgets.concat(widgets)
      }).catch((err) => {
        this.$message.error(err.response.errorMsg || err)
      })
    },
    queryHandler() {
      this.$message.warning('待开发')
    },
    setCodeModeContent(detail) {
      this.code = detail.content
      this.codeEditor.hidden = this.editMode !== CODE_MODE
    },
    switchEditMode(mode) {
      this.editMode = mode;
      switch (mode) {
        case CODE_MODE:
          this.code = '' //触发codemirror内容更新展示
          this.postMessage({
            action: 'syncCodeModeContent'
          });
          break;
        case VIEW_MODE:
          this.codeEditor.hidden = true
          this.syncViewModeContent()
          break;
      }
    },
    syncViewModeContent() {
      this.postMessage({
        action: 'setViewModeContent',
        detail: {
          html: this.code
        }
      })
    },
    syncContent() {
      if (this.editMode === CODE_MODE) {
        this.$emit('codeChange', {code: this.code})
      } else {
        this.postMessage({
          action: 'syncCodeModeContent'
        })
      }
    },
    onEditorCodeChange(newCode) {
      this.code = newCode
      this.$emit('codeChange', {code: this.code})
    }
  }
}
