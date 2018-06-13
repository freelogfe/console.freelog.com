export default {
  name: 'fl-switch',
  data() {
    return {
      checked: false
    }
  },
  props: {
    width: {
      type: String,
      default() {
        return '50px'
      }
    },
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    activeText: String,
    inactiveText: String,
  },

  watch: {

  },
  mounted() {
    this.checked = this.value
  },
  computed: {},
  methods: {
    switchHandler() {
      this.checked = !this.checked
      this.$emit('input', this.checked)
      this.$emit('change', this.checked)
    }
  }
}
