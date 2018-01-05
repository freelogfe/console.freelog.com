export default {
  name: 'presentable-tags',
  data() {
    return {
      presentableTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    value: function (val) {
      this.setCurrentValue(val);
    }
  },
  mounted() {
    this.setCurrentValue(this.value)
  },
  methods: {
    setCurrentValue(value) {
      this.presentableTags = value;
    },
    handleClose(tag) {
      this.presentableTags.splice(this.presentableTags.indexOf(tag), 1);
      this.$emit('input', this.presentableTags);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.presentableTags.push(inputValue);
        this.$emit('input', this.presentableTags);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
