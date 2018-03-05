export default {
  name: 'group-list',
  data() {

    return {
    }
  },
  mounted() {
  },
  methods: {
    loader() {
      var self = this;
      return () => {
        return this.$services.groups.get()
      }
    },
    groupDetailHandler(row){
      this.$router.push({path: `/group/detail/${row.groupId}`})
    },
    deleteGroupHandler(row){

    }
  }
}
