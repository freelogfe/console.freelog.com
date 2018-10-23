import { codemirror } from 'vue-codemirror'

require('codemirror/lib/codemirror.css')

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
require('codemirror/addon/display/placeholder')


export const codeMirrorOptions = {
  tabSize: 4,
  mode: 'text/html',
  theme: 'dracula',
  lineNumbers: true,
  line: true,

  // 高级配置（需要引入对应的插件包）,codemirror advanced options(You need to manually introduce the corresponding codemirror function script code)
  // sublime、emacs、vim三种键位模式，支持你的不同操作习惯
  keyMap: 'sublime',
  // 按键映射，比如Ctrl键映射autocomplete，autocomplete是hint代码提示事件
  extraKeys: { Ctrl: 'autocomplete' },
  lineWrapping: true,
  // 代码折叠
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  // 选中文本自动高亮，及高亮方式
  styleSelectedText: true,
  highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
}

export { codemirror }
