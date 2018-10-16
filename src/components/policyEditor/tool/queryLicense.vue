<template>
  <div>
    <el-autocomplete
      class="search-input"
      v-model="queryInput"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容License ID"
      @select="handleSelect">
      <i class="el-icon-search el-input__icon" slot="prefix"></i>
      <clip-board
        slot="append"
        style="display: inline-block;margin-left: -8px;"
        @copyDone="copyDoneHandler"
        :value="selectedLicenseId">
        <el-button type="primary" plain :disabled="!selectedLicenseId"><i class="el-icon-fa-clipboard"></i></el-button>
      </clip-board>
    </el-autocomplete>
    <pre class="license-content">
      {{licenseContent}}
    </pre>
  </div>
</template>

<script>
  import ClipBoard from '@/components/clipboard/index.vue'

  export default {
    name: 'query-policy-license',

    data() {
      return {
        licenses: [],
        queryInput: '',
        licenseContent: '',
        selectedLicenseId: '',
        licenseMap: {}
      }
    },

    components: {
      ClipBoard
    },
    props: {
      callback: {
        type: Function
      }
    },

    mounted() {
      this.licenses = this.loadAll();
    },
    methods: {
      copyDoneHandler() {
        if (!this.selectedLicenseId) {
          return
        }
        this.$message.success('已复制')
        this.callback && this.callback({
          name: 'selectLicenseId',
          data: {
            licenseId: this.selectedLicenseId
          }
        })
      },
      loadAll() {
        this.$axios.get('/v1/resources/warehouse?resourceType=license').then((res) => {
          this.licenses = res.data.data.dataList.map((data) => {
            return {
              value: data.resourceName,
              id: data.resourceId
            }
          })
        })
      },
      querySearchAsync(queryString, cb) {
        var licenses = this.licenses;
        var results = queryString ? licenses.filter(this.createStateFilter(queryString)) : licenses;
        cb(results);
      },
      createStateFilter(queryString) {
        var qs = queryString.toLowerCase()
        var reg = new RegExp(qs, 'i')
        return (state) => {
          return reg.test(state.value) || reg.test(state.id);
        };
      },
      handleSelect(item) {
        this.selectedLicenseId = item.id
        this.showLicenseContent(item);
      },
      showLicenseContent(item) {
        var id = item.id;
        if (this.licenseMap[id]) {
          this.licenseContent = this.licenseMap[id];
        } else {
          this.$axios.get(`/v1/auths/resource/${id}.data`).then((res) => {
            var content = res.getData();
            if (content) {
              this.licenseContent = res.getData();
              this.licenseMap[id] = this.licenseContent;
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .search-input {
    width: 80%;
    margin-bottom: 10px;
  }

  .license-content {
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
    padding: 6px;
    max-height: 400px;
  }
</style>
