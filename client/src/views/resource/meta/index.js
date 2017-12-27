import {codemirror, codeMirrorOptions} from '@/lib/codemirror'

var throttle = require('lodash/throttle');

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

      if (!this.validator) {

        this.validator = throttle(() => {
          var et = +new Date()
          if (this.st) {
            console.log(et - this.st)
          }
          this.st = et
          this.validateJSON()
        }, 3e3)
      } else {
        this.validator()
      }
      this.$emit('input', this.data)
    },
    validateJSON() {
      try {
        JSON.parse(this.data)
        this.clearErrorMsg()
      } catch (err) {
        this.errorMsg = 'JSON格式有误！' + err
      }
    },
    clearErrorMsg() {
      this.errorMsg = ''
    }
  }
}
