// https://github.com/surmon-china/vue-quill-editor/blob/master/src/editor.vue
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor, Quill} from 'vue-quill-editor'

//https://quilljs.com/docs/modules/toolbar/
export default {
  name: 'fl-rich-editor',

  data() {
    var self = this;
    return {
      editor: null,
      showImgUploader: false,
      content: '',
      editorOption: {
        // some quill options
        placeholder: this.placeholder,
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'size': ['small', false, 'large', 'huge']}],
              // [{'script': 'sub'}, {'script': 'super'}],
              // [{'indent': '-1'}, {'indent': '+1'}],
              // [{'direction': 'rtl'}],
              // [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'color': []}, {'background': []}],
              // [{'font': []}],
              // [{'align': []}],
              // ['clean'],
              ['link', 'image', 'video']
            ],
            handlers: {
              'image': function () {
                self.showImgUploader = true
                self.uploadImgState = {
                  cursorIndex: this.quill.selection.savedRange.index
                }
              }
            }
          }
        }
      }
    }
  },

  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    placeholder: String
  },

  watch: {},

  mounted() {
    this.createEditor()
    if (this.$route.params.resourceId) {
      var unwatch = this.$watch('value', () => {
        if (this.value) {
          this.content = this.value
        }
        unwatch()
      })
    }
  },
  components: {
    'quill-rich-editor': quillEditor
  },
  methods: {
    uploadImageSuccessHandler(res, file) {
      this.$emit('load', {file, data: res})
      this.resetImgUploaderState()
    },
    uploadImageErrorHandler() {
      this.resetImgUploaderState()
    },
    resetImgUploaderState() {
      this.$refs.imgUploader.clearFiles()
      this.uploadImgState.cursorIndex = ''
      this.showImgUploader = false
    },
    createEditor() {
      this.editor = this.$refs.richEditor.quill;
      this.setHtml(this.value || '')
    },
    getHtml() {
      return this.content
    },
    setHtml(html) {
      if (this.editor) {
        this.editor.setContents(html)
      } else {
        console.warn('还未创建编辑器')
      }
    },
    insertImg(url) {
      this.editor.insertEmbed(this.uploadImgState.cursorIndex, 'image', url)
    },
    getEditor() {
      return this.editor
    },
    onEditorBlur(quill) {
    },
    onEditorFocus(quill) {
    },
    onEditorReady(quill) {
    },
    onEditorChange({quill, html, text}) {
      this.$emit('input', html)
    }
  }
}
