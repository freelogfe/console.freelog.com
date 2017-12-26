import {codemirror, codeMirrorOptions} from '@/lib/codemirror'

export default {
  name: 'resource-meta-info',
  data() {
    var cmOpts = Object.assign({}, codeMirrorOptions)
    Object.assign(cmOpts, {
      mode: 'application/json',
      viewportMargin: Infinity
    })
    return {
      errorMsg: '',
      editorOptions: cmOpts,
      data: this.value
    }
  },
  components: {
    codemirror
  },
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    }
  },

  watch: {
    value: function () {
      this.data = this.value
    }
  },
  mounted() {
  },
  methods: {
    onCodeChange(val) {
      this.data = val
      this.$emit('input', this.data)
    },
    validateJSON() {
      try {
        JSON.parse(this.data)
        this.$message.success('格式校验通过')
      } catch (err) {
        this.errorMsg = 'JSON格式有误！' + err
      }
    },
    clearErrorMsg() {
      this.errorMsg = ''
    }
  }
}
