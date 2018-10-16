
export default {
  name: 'presentable-steps',
  data() {
    return {
    }
  },
  props: {
    active: {
      type: Number,
      default(){
        return 0
      }
    },
    processStatus: {
      type: String,
      default(){
        return 'finish'
      }
    },
    finishStatus: {
      type: String,
      default(){
        return 'success'
      }
    }
  },

  mounted() {

  }
}
