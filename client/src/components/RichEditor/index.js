import Wangeditor from 'wangeditor'


//配置参考：https://www.kancloud.cn/wangfupeng/wangeditor2/113961
export default {
  name: 'fl-rich-editor',

  data() {
    return {
      editor: null
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
    }
  },

  watch: {
    value(newVal, oldVal) {
      this.setHtml(newVal)
    }
  },

  mounted() {
    this.createEditor()
  },

  methods: {
    createEditor() {
      var self = this;
      var editor = new Wangeditor(this.$refs.$editor)
      editor.config.onchange = (html) => {
        this.value = html
        this.$emit('input', this.value)
        this.$emit('change', html)
      };

      Object.assign(editor.config.uploadImgFns, {
        onload(resultText, xhr) {
          let originalName = self.editor.uploadImgOriginalName || ''
          self.$emit('load', originalName, resultText)
        },
        ontimeout(xhr) {
          self.$emit('timeout', xhr)
        },
        onerror(xhr) {
          self.$emit('error', xhr)
        }
      });

      Object.assign(editor.config, {
        uploadImgUrl: '/api/v1/resources/upoladPreviewImage',
      }, this.config);
      editor.create();
      this.editor = editor
    },
    getHtml() {
      return this.editor.$txt.html()
    },
    setHtml(html) {
      if (this.editor) {
        this.editor.$txt.html(html)
      } else {
        console.warn('还未创建编辑器')
      }
    },
    insertImg(url) {
      this.editor.command(null, 'insertHtml', `<img src="${url}" style="max-width:100%;"/>`)
    },
    getEditor() {
      return this.editor
    }
  }
}
