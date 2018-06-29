//https://github.com/hejianxian/vue-list/blob/master/src/components/vue-list.vue

export default {
  name: 'fl-lazy-list-view',
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
      twoWays: true
    },
    //item height
    height: {
      type: Number,
      default: 44
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
  },
  beforeDestroy() {
    this.disconnect()
  },
  methods: {
    initView() {
      var self = this;
      self.$refs.loading.classList.remove('hide')
      self.observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.intersectionRatio <= 0) {
              return
            } else if (self.canLoadMore !== false) {
              self.load().catch(() => {
                self.observer.unobserve(self.$refs.loading);
                self.$refs.loading.classList.add('hide')
              })
            }
          });
        }, {
          rootMargin: '50px 0px'
        });

      self.observer.observe(this.$refs.loading)
    },
    load() {
      var self = this
      return self.fetch(self.index++).then((data) => {
        self.canLoadMore = data.canLoadMore
        self.scrollHandler(data.dataList || [])
        if (self.canLoadMore === false) {
          return Promise.reject()
        }
      });
    },
    disconnect() {
      if (this.observer) {
        this.observer.disconnect()
      }
    },
    refresh() {
      this.canLoadMore = true
      this.previewList = [];
      this.index = 1;
      this.disconnect()
      this.initView()
    },
    scrollHandler(list) {
      this.previewList = this.previewList.concat(list);
    }
  },
  components: {}
}
