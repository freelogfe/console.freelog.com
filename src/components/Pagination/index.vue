<template>
  <div class="fl-pagination" v-loading="loading">
    <el-table
            ref="table"
            @row-click="rowClickHandler"
            v-bind="tableProps"
            style="width: 100%">
      <slot name="list"></slot>
    </el-table>
    <div class="fl-pg-ft clearfix">
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

      formatHandler: Function
    },

    watch: {
      pagination: {
        deep: true,
        handler() {
          Object.assign(this.tableProps, this.config)
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

        if (this.pagination.params) {
          Object.assign(params, this.pagination.params)
        }

        return this.$axios.get(this.pagination.target, {
          params
        }).then((res) => {
          if (res.data.ret === 0 && res.data.errcode === 0) {
            return res.data.data
          }
          throw new Error(res.data.msg)
        })
      },
      update(data) {

        data.dataList =[{"presentableId":"5bc7ff65cffc1f00293fddb7","resourceInfo":{"resourceName":"2015-02-01-aboutme","resourceType":"markdown","meta":{}},"presentableName":"2015-02-01-aboutme","policy":[{"segmentId":"1695c7481f58acefe31c967598000d53","policyName":"未命名策略","status":1,"authorizedObjects":[{"userType":"GROUP","users":["PUBLIC"]}],"policyText":"for public:\n  initial:\n    active\n    terminate","fsmStates":{"initial":{"authorization":["active"],"transition":{"terminate":null}}}}],"userDefinedTags":["aboutme"],"presentableIntro":"","isOnline":1,"status":3,"nodeId":10018,"resourceId":"47f3515bc56d13c9c0fb5e8a9e5dda4932aa9f67","userId":10004,"nodeName":"我的博客","contracts":[{"resourceId":"47f3515bc56d13c9c0fb5e8a9e5dda4932aa9f67","authSchemeId":"5bc7ff5ebdc3cf002ac5f13c","policySegmentId":"1695c7481f58acefe31c967598000d53","contractId":"5bc7ff70cadab100298df391"}],"createDate":"2018-10-18T03:35:01.489Z","updateDate":"2018-10-18T03:35:15.664Z","isOnlineChecked":true,"_statusInfo":{"text":"生效中","type":"success"},"isReady":false},{"presentableId":"5bc7f60ecffc1f00293fddb1","resourceInfo":{"resourceName":"2018-0-9-30-RESTful API 最佳实践","resourceType":"markdown","meta":{}},"presentableName":"2018-0-9-30-RESTful API 最佳实践","policy":[{"segmentId":"1695c7481f58acefe31c967598000d53","policyName":"未命名策略","status":1,"authorizedObjects":[{"userType":"GROUP","users":["PUBLIC"]}],"policyText":"for public:\n  initial:\n    active\n    terminate","fsmStates":{"initial":{"authorization":["active"],"transition":{"terminate":null}}}}],"userDefinedTags":["article"],"presentableIntro":"","isOnline":1,"status":3,"nodeId":10018,"resourceId":"5221f00ab8b1560669c0cd0aa9fe7c954c722b6d","userId":10004,"nodeName":"我的博客","contracts":[{"resourceId":"5221f00ab8b1560669c0cd0aa9fe7c954c722b6d","authSchemeId":"5bc7f3cdbdc3cf002ac5f133","policySegmentId":"1695c7481f58acefe31c967598000d53","contractId":"5bc7f614cadab100298df376"}],"createDate":"2018-10-18T02:55:10.092Z","updateDate":"2018-10-18T02:59:19.556Z","isOnlineChecked":true,"_statusInfo":{"text":"生效中","type":"success"},"isReady":false},{"presentableId":"5bc7f7d7cffc1f00293fddb5","resourceInfo":{"resourceName":"blog-config","resourceType":"json","meta":{"dependencies":["265c32009f1973a0972d0f8eec723f6cb2df3249","315912114d4d5aba1a65f01d0058e6e6f6c2ec56"]}},"presentableName":"blog-config","policy":[{"segmentId":"1695c7481f58acefe31c967598000d53","policyName":"未命名策略","status":1,"authorizedObjects":[{"userType":"GROUP","users":["PUBLIC"]}],"policyText":"for public:\n  initial:\n    active\n    terminate","fsmStates":{"initial":{"authorization":["active"],"transition":{"terminate":null}}}}],"userDefinedTags":["blog-config"],"presentableIntro":"","isOnline":1,"status":3,"nodeId":10018,"resourceId":"6d17de14a3fed361bafa1706e2a45f4871b37410","userId":10004,"nodeName":"我的博客","contracts":[{"resourceId":"6d17de14a3fed361bafa1706e2a45f4871b37410","authSchemeId":"5bc7f7c3bdc3cf002ac5f139","policySegmentId":"1695c7481f58acefe31c967598000d53","contractId":"5bc7f7decadab100298df382"},{"resourceId":"265c32009f1973a0972d0f8eec723f6cb2df3249","authSchemeId":"5bc589b7bdc3cf002ac5f0e9","policySegmentId":"1695c7481f58acefe31c967598000d53","contractId":"5bc7f7decadab100298df383"}],"createDate":"2018-10-18T03:02:47.401Z","updateDate":"2018-10-18T03:03:33.228Z","isOnlineChecked":true,"_statusInfo":{"text":"生效中","type":"success"},"isReady":false},{"presentableId":"5bc7f5fccffc1f00293fddb0","resourceInfo":{"resourceName":"2018-07-18-jwt","resourceType":"markdown","meta":{}},"presentableName":"2018-07-18-jwt","policy":[{"segmentId":"1695c7481f58acefe31c967598000d53","policyName":"未命名策略","status":1,"authorizedObjects":[{"userType":"GROUP","users":["PUBLIC"]}],"policyText":"for public:\n  initial:\n    active\n    terminate","fsmStates":{"initial":{"authorization":["active"],"transition":{"terminate":null}}}}],"userDefinedTags":["article"],"presentableIntro":"","isOnline":1,"status":3,"nodeId":10018,"resourceId":"6d61c2bda1e4aa2a42514192cca4b593e8072d06","userId":10004,"nodeName":"我的博客","contracts":[{"resourceId":"6d61c2bda1e4aa2a42514192cca4b593e8072d06","authSchemeId":"5bc7f3b8bdc3cf002ac5f130","policySegmentId":"1695c7481f58acefe31c967598000d53","contractId":"5bc7f618cadab100298df379"}],"createDate":"2018-10-18T02:54:52.567Z","updateDate":"2018-10-18T02:59:31.212Z","isOnlineChecked":true,"_statusInfo":{"text":"生效中","type":"success"},"isReady":false},{"presentableId":"5bc58ff2cffc1f00293fdd82","resourceInfo":{"resourceName":"pb-blog","resourceType":"page_build","meta":{"dependencies":["039a6d65d23fd8b9f93555dcebb4b5cba323260b"]}},"presentableName":"pb-blog","policy":[{"segmentId":"1695c7481f58acefe31c967598000d53","policyName":"未命名策略","status":1,"authorizedObjects":[{"userType":"GROUP","users":["PUBLIC"]}],"policyText":"for public:\ninitial:\nactive\nterminate","fsmStates":{"initial":{"authorization":["active"],"transition":{"terminate":null}}}}],"userDefinedTags":[],"presentableIntro":"","isOnline":1,"status":1,"nodeId":10018,"resourceId":"aa6751ab196450e536c59b2dab5d4b70a1a71a0f","userId":10004,"nodeName":"我的博客","contracts":[{"resourceId":"aa6751ab196450e536c59b2dab5d4b70a1a71a0f","contractId":"5bc58ffb9acc89002bf038d1","policySegmentId":"1695c7481f58acefe31c967598000d53","authSchemeId":"5bc581e2bdc3cf002ac5f0d3"},{"resourceId":"039a6d65d23fd8b9f93555dcebb4b5cba323260b","contractId":"5bc58ffb9acc89002bf038d2","policySegmentId":"1695c7481f58acefe31c967598000d53","authSchemeId":"5bc55127bdc3cf002ac5f04a"}],"createDate":"2018-10-16T07:14:58.610Z","updateDate":"2018-11-14T07:10:17.877Z","isOnlineChecked":true,"_statusInfo":{"text":"未开始执行","type":"danger"},"isReady":false},{"presentableId":"5bc7f5f4cffc1f00293fddaf","resourceInfo":{"resourceName":"2014-03-14-server-setup","resourceType":"markdown","meta":{"tags":["javascript","server"]}},"presentableName":"2014-03-14-server-setup","policy":[{"segmentId":"1695c7481f58acefe31c967598000d53","policyName":"未命名策略","status":1,"authorizedObjects":[{"userType":"GROUP","users":["PUBLIC"]}],"policyText":"for public:\n  initial:\n    active\n    terminate","fsmStates":{"initial":{"authorization":["active"],"transition":{"terminate":null}}}}],"userDefinedTags":["article","javascript","server"],"presentableIntro":"","isOnline":1,"status":3,"nodeId":10018,"resourceId":"c4af131794c2a8abb0a2f763eedea3b9989c0fdf","userId":10004,"nodeName":"我的博客","contracts":[{"resourceId":"c4af131794c2a8abb0a2f763eedea3b9989c0fdf","authSchemeId":"5bc7f3dbbdc3cf002ac5f136","policySegmentId":"1695c7481f58acefe31c967598000d53","contractId":"5bc7f61ccadab100298df37c"}],"createDate":"2018-10-18T02:54:44.061Z","updateDate":"2018-10-18T03:07:45.252Z","isOnlineChecked":true,"_statusInfo":{"text":"生效中","type":"success"},"isReady":false}
        ]

        if (!data || !data.dataList) return
        this.total = data.totalItem || data.dataList.length
        this.tableProps.data = (typeof this.formatHandler === 'function') ? this.formatHandler(data.dataList) : data.dataList
      },
      reload() {
        this.currentPage = 1
        this.load()
      },
      load() {
        if (this.loading) return

        this.loading = true
        this.loadData().then(this.update.bind(this))
          .then(() => {
            this.loading = false
            window.sessionStorage.setItem(`${this.$route.fullPath}_current_page`, this.currentPage)
          })
          .catch((err) => {
            this.$error.showErrorMessage(err)
            this.loading = true
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
