export default {
  name: 'table-view',
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    paginationOptions: {
      type: Object,
      default() {
        return {
          pageSizes: [10, 20, 30, 50]
        }
      }
    },
    loader: Function,
    pageMeta: {
      type: Object,
      default() {
        return {
          pageSize: 20,
          page: 1 //页码
        }
      }
    }
  },
  mounted() {
    this.tableData = this.data;
    this.load()
  },
  methods: {
    load(pageInfo) {
      Object.assign(this.pageMeta, pageInfo || {})
      if (this.loader) {
        this.loading = true
        this.loader(this.pageMeta).then((res) => {
          var data = res.data
          this.loading = false
          if (data.ret === 0) {
            this.tableData = data.data
          } else {
            this.$message.error(data.msg);
          }
        })
      }
    },
    handleSizeChange(val) {
      var data = {pageSize: val}
      this.load(data);
      this.$emit('sizeChange', data)
    },
    handleCurrentChange(val) {
      var data = {page: val}
      this.load(data);
      this.$emit('pageChange', data)

    }
  }
}
