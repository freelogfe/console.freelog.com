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
      editorOptions: cmOpts,
    }
  },
  components: {
    codemirror
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  mounted() {
  },
  methods: {
    onCodeChange() {

    }
  }
}
