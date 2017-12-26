import Draggabilly from 'draggabilly'
import CONFIG from '@/config/index'
import {codemirror, codeMirrorOptions} from '@/lib/codemirror'

const {RESOURCE_TYPES} = CONFIG

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
    var cmOpts = Object.assign({}, codeMirrorOptions)
    Object.assign(cmOpts, {
      mode: 'text/html'
    })
    return {
      queryInput: '',
      widgets: [],
      //page build
      editMode: VIEW_MODE,
      modes: modes,
      code: '',
      editorOptions: cmOpts,
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
        this.bindEvent()
      })
  },
  methods: {
    bindEvent() {
      var types = [
        {
          name: 'webkitfullscreenchange',
          support: 'webkitFullscreenEnabled'
        },
        {
          name: 'mozfullscreenchange',
          support: 'mozFullscreenEnabled'
        },
        {
          name: 'fullscreenchange',
          support: 'fullscreenEnabled'
        },
        {
          name: 'MSFullscreenChange',
          support: 'MSFullscreenEnabled'
        }]
      for (var i = 0; i < types.length; i++) {
        if (document[types[i].support] === true) {
          document.addEventListener(types[i].name, this.screenChangeHandler.bind(this), false);
          break;
        }
      }
    },
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
        var errorMsg = (typeof err === 'string') ? err : err.response.errorMsg
        this.$message.error(errorMsg)
      })
    },
    queryHandler() {
      this.$message.warning('待开发')
    },
    enterFullscreen() {
      var element = document.documentElement;

      // Check which implementation is available
      var requestMethod = element.requestFullscreen ||
        element.webkitRequestFullscreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullscreen;

      if (requestMethod) {
        requestMethod.apply(this.$el);
      }
    },
    screenChangeHandler() {
      if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== undefined) {
        this.$el.classList.add('fullscreen')
      } else {
        this.$el.classList.remove('fullscreen')
      }
    },
    setCodeModeContent(detail) {
      this.code = '' //触发codemirror内容更新展示
      this.$nextTick(() => {
        this.code = detail.content
        this.$emit('codeChange', {code: this.code})
      })
      this.codeEditor.hidden = this.editMode !== CODE_MODE
    },
    switchEditMode(mode) {
      this.editMode = mode;
      switch (mode) {
        case CODE_MODE:
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
    //将编辑模式下的源码同步到可视模式
    syncViewModeContent() {
      this.postMessage({
        action: 'setViewModeContent',
        detail: {
          html: this.code
        }
      })
    },
    //用于生成pb文件
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
    }
  }
}
