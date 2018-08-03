import {codemirror, codeMirrorOptions} from '@/lib/codemirror'
var throttle = require('lodash/throttle');
import 'codemirror/mode/javascript/javascript';
require('codemirror/theme/idea.css')

export default {
  name: 'resource-meta-info',
  data() {
    var cmOpts = Object.assign({}, codeMirrorOptions)
    Object.assign(cmOpts, {
      mode:  {
        name: 'javascript',
        json: true
      },
      viewportMargin: Infinity,
      theme: 'idea',
      lineNumbers: false,
      gutters: []
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

      if (!this.validator) {
        this.validator = throttle(() => {
          this.validateJSON()
        }, 2e3)
      } else {
        this.validator()
      }
      this.$emit('input', this.data)
    },
    validateJSON() {

      try {
        if (this.data) {
          JSON.parse(this.data)
        }
        this.clearErrorMsg()
      } catch (err) {
        this.errorMsg = 'JSON格式有误！' + err
      }

      this.$emit('validate', this.errorMsg)
    },
    clearErrorMsg() {
      this.errorMsg = ''
    }
  }
}
