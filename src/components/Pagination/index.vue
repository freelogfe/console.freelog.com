<template>
  <div class="fl-pagination" v-loading="loading">
    <el-table
            ref="table"
            @row-click="rowClickHandler"
            v-bind="tableProps"
            style="width: 100%" v-show="tableProps.data.length">
      <slot name="list"></slot>
    </el-table>
    <slot name="empty" v-if="tableProps.data.length === 0"></slot>
    <div class="fl-pg-ft clearfix" v-if="showFooter">
      <slot name="footer"></slot>
      <div class="fl-pg-info">
        <el-button style="margin-right: 10px" type="text" v-if="hasPrev" @click="gotoFirstPageHandler">&lt;&lt; 首页
        </el-button>
        <el-button type="text" v-if="hasPrev" @click="loadPrevHandler">&lt; 上一页</el-button>
        <span class="fl-pg-num">
          <span v-if="to>0 && to > from">{{from}}-{{to}}条，</span>共{{total}}条</span>
        <el-button style="margin-right: 10px" type="text" v-if="hasNext" @click="loadNextHandler">下一页 &gt;</el-button>
        <el-button type="text" v-if="hasNext" @click="gotoLastPageHandler">尾页 &gt;&gt;</el-button>
      </div>
    </div>
  </div>
</template>


<script>
  import {CancelToken} from 'axios'

  export default {
    name: 'fl-pagination',
    data() {
      return {
        total: 8,
        tableProps: {
          data: []
        },
        currentPage: parseInt(window.sessionStorage.getItem(`${this.$route.fullPath}_current_page`)) || 1,
        pageSize: 10,
        loading: false
      }
    },

    props: {
      pagination: {
        type: Object,
        default() {
          return {
            pageSize: 10
          }
        }
      },
      config: Object,
      rowClickHandler: {
        type: Function,
        default: () => {
        }
      },

      formatHandler: Function,
      showFooter: {
        type: Boolean,
        'default': true
      }
    },

    watch: {
      pagination: {
        deep: true,
        handler() {
          this.reload()
        }
      }
    },

    mounted() {
      Object.assign(this.tableProps, this.config)
      this.pageSize = this.pagination.pageSize || 10
      this.load()
    },
    methods: {
      loadData() {
        if (!this.pagination.target) {
          throw new Error('need pagination target param')
        }

        const params = {
          page: this.currentPage,
          pageSize: this.pageSize
        }

        this.source = CancelToken.source()

        if (this.pagination.params) {
          Object.assign(params, this.pagination.params)
        }

        return this.$axios.get(this.pagination.target, {
          params,
          cancelToken: this.source.token
        }).then((res) => {
          if (res.data.ret === 0 && res.data.errcode === 0) {
            return res.data.data
          }
          throw new Error(res.data.msg)
        })
      },
      update(data) {
        if (!data || !data.dataList) return
        this.total = data.totalItem || data.dataList.length
        this.tableProps.data = (typeof this.formatHandler === 'function') ? this.formatHandler(data.dataList) : data.dataList
      },
      reload() {
        this.currentPage = 1
        if (this.loading && this.source) {
          this.loading = false
          this.source.cancel('')
        }
        this.load()
      },
      load() {
        if (this.loading) return

        this.loading = true
        this.loadData()
          .then(this.update.bind(this))
          .then(() => {
            this.loading = false
            window.sessionStorage.setItem(`${this.$route.fullPath}_current_page`, this.currentPage)
          })
          .catch((err) => {
            if (err.toString() !== 'Cancel') {
              this.$error.showErrorMessage(err)
            }
            this.loading = false
          })
      },
      loadNextHandler() {
        this.currentPage += 1
        this.load()
      },
      loadPrevHandler() {
        this.currentPage -= 1
        this.load()
      },
      gotoLastPageHandler() {
        this.currentPage = Math.ceil(this.total / this.pageSize)
        this.load()
      },
      gotoFirstPageHandler() {
        this.currentPage = 1
        this.load()
      }
    },

    computed: {
      hasNext() {
        return (this.currentPage * this.pageSize < this.total)
      },
      hasPrev() {
        return this.currentPage > 1
      },
      from() {
        return ((this.currentPage - 1) * this.pageSize) + 1
      },
      to() {
        return (this.from + this.tableProps.data.length) - 1
      }
    }
  }
</script>

<style lang="less">
  @import "index.less";
</style>
