export default {
  name: 'table-view',
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0
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
      default: true
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
          pageSize: 10,
          page: 1 //页码
        }
      }
    }
  },
  mounted() {
    this.tableData = this.data;
    this.total = this.tableData.length
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
            data = data.data
            this.tableData = data.dataList || data;
            //分页数据
            if (data.dataList) {
              this.total = data.totalItem
              this.pageMeta.page = data.page || 1
            }
          } else {
            this.$message.error(data.msg);
          }
        }).catch((res)=>{
          this.$message.warning('加载失败')
          this.loading = false
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
