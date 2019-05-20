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
      vTabActiveName: 'scheme',
      resourceDialogVisible: false,
      depReleasesList: [],
      searchInput: '',
      searchResources: [
        // { resourceName: '资源1234', resourceType: 'markdown', updateDate: '2019/09/21' },
        // { resourceName: '资源1234', resourceType: 'markdown', updateDate: '2019/09/21' },
        // { resourceName: '资源1234', resourceType: 'markdown', updateDate: '2019/09/21' },
      ]
    }
  },
  computed: {
    releaseId() {
      return this.$route.params.releaseId
    },
    resourceDependencies() {
      return this.targetResourceDetail ? this.targetResourceDetail.systemMeta.dependencies : []
    },
  },
  methods: {
    fetchReleaseDetail() {
      this.$services.ReleaseService.get(this.releaseId)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            this.release = res.data
            this.targetResourceDetail = res.data.resourceInfo
            this.formatReleaseData()
          }
        })
    },
    formatReleaseData() {
      this.release.resourceVersions = this.release.resourceVersions.map(i => {
        i.createDate = format(i.createDate, 'YYYY-MM-DD')
        return i
      })
    },
    exchangeVTab(tab) {
      this.vTabActiveName = tab.name
    },
    showResourceDialog() {
      this.resourceDialogVisible = true
    },
    searchDataHandler(page) {
      const pageSize = 10

      if (!this.searchInput) {
        return Promise.resolve({ canLoadMore: false })
      }

      return this.$services.allResources.get({
        params: Object.assign({
          keyWords: encodeURIComponent(this.searchInput),
          page,
          pageSize
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
  },
  created() {
    this.fetchReleaseDetail()
  }
}
