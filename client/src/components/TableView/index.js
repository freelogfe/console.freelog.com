export default {
  name: 'table-view',
  data(){
    return {
      currentPage: 0
    }
  },
  props: {
    data: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    handleSizeChange(val){

    },
    handleCurrentChange(val){

    }
  }
}
