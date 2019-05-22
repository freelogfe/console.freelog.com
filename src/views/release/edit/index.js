import ReleaseEditorLayout from './layout.vue'
import ReleaseEditorContract from '@/views/release/contract/index.vue'
import LazyListView from '@/components/LazyListView/index.vue'

import SchemeManage from '../scheme/index.vue'
import { format } from 'date-fns'

export default {
  name: 'release-detail',
  components: {
    ReleaseEditorLayout, SchemeManage, ReleaseEditorContract, LazyListView
  },
  data() {
    return {
      release: null,
      targetResourceDetail: null,
      vTabActiveName: 'contract',
      selectedVersion: '',
      resourceDialogVisible: false,
      contracts: [],
      depReleasesList: [],
      releasesTreeData: [],
      searchInput: '',
      searchResources: []
    }
  },
  computed: {
    releaseId() {
      return this.$route.params.releaseId
    },
  },
  watch: {

  },
  methods: {
    fetchReleaseDetail() {
      this.$services.ReleaseService.get(this.releaseId)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            this.release = res.data
            this.selectedVersion = this.release.latestVersion.version
            this.targetResourceDetail = res.data.resourceInfo
            this.formatReleaseData()
          }
        })
    },
    formatReleaseData() {
      this.depReleasesList = this.targetResourceDetail ? this.targetResourceDetail.systemMeta.dependencies : []
      this.release.resourceVersions = this.release.resourceVersions.map(i => {
        i.createDate = format(i.createDate, 'YYYY-MM-DD')
        return i
      })
    },
    exchangeVTab(tab) {
      this.vTabActiveName = tab.name
    },
    showResourceDialog() {
      if(this.release.policies.length > 0) {
        this.resourceDialogVisible = true
      }else {
        this.$message({ type: 'warning', message: '发行没策略，不能新增版本' })
      }
    },
    clearSearchInputHandler() {

    },
    searchDataHandler(page) {
      const pageSize = 10

      if (!this.searchInput) {
        return Promise.resolve({ canLoadMore: false })
      }

      return this.$services.allResources.get({
        params: Object.assign({
          keywords: encodeURIComponent(this.searchInput),
          page,
          pageSize,
          isSelf: 1
        }, this.searchScope)
      }).then((res) => {
        const data = res.getData() || {}
        if (res.data.errcode === 0) {
          this.searchResources = this.searchResources.concat(data.dataList)
          if (data.dataList.length < pageSize) {
            data.canLoadMore = false
          }
        } else {
          data.canLoadMore = false
        }
        return data
      })
    },
    searchHandler() {
      this.activeName = 'search'
      this.searchResources = []
      this.$refs.searchView.refresh()
    }
  },
  created() {
    this.fetchReleaseDetail()
  }
}
