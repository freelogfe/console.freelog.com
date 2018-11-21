// https://github.com/hejianxian/vue-list/blob/master/src/components/vue-list.vue
import lozad from 'lozad'

export default {
  name: 'fl-lazy-list-view',
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
      twoWays: true
    },
    // item height
    height: {
      type: Number,
      default: 44
    },
    itemClass: {
      type: String,
      default: ''
    },
    /**
     * parameters {int} pageIndex
     * return Promise
     */
    fetch: {
      type: Function
    }
  },
  data() {
    return {
      lastScrollTop: null,
      distance: this.height,
      lineTopHeight: 0,
      lineBottomHeight: 0,
      previewList: [],
      displayCount: 0,
      canLoadMore: true,
      index: 1
    }
  },
  mounted() {
    // this.handleScroll();
    this.initView()
    this.$on('reload', this.refresh.bind(this))
  },
  beforeDestroy() {
    this.disconnect()
  },
  methods: {
    initView() {
      const self = this
      self.$refs.loading.classList.remove('hide')
      const observer = lozad(this.$refs.loading, {
        load(el) {
          self.load()
            .then(() => {
              if (self.canLoadMore) {
                el.dataset.loaded = false
                observer.observe(el)
              } else {
                self.$refs.loading.classList.add('hide')
              }
            })
            .catch(() => {
              self.$refs.loading.classList.add('hide')
            })
        },
        rootMargin: '400px 0px', // syntax similar to that of CSS Margin
        threshold: 0.1 // ratio of element convergence
      });
      observer.observe();
    },
    load() {
      const self = this
      const index = self.index
      self.index += 1
      return self.fetch(index).then((data) => {
        self.canLoadMore = data.canLoadMore
        self.scrollHandler(data.dataList || [])
        if (self.canLoadMore === false) {
          return Promise.reject()
        }
      })
    },
    disconnect() {
      if (this.observer) {
        this.observer.disconnect()
      }
    },
    refresh() {
      this.canLoadMore = true
      this.previewList = []
      this.index = 1
      this.disconnect()
      this.initView()
    },
    scrollHandler(list) {
      this.previewList = this.previewList.concat(list)
    }
  },
  components: {}
}
