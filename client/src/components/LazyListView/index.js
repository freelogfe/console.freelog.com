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
      canLoadMore: true
    }
  },
  mounted() {
    // this.handleScroll();
    this.initView()
  },
  methods: {
    initView() {
      var index = 1
      var self = this;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.intersectionRatio <= 0) {
              return
            } else if (self.canLoadMore !== false) {
              self.fetch(index++).then((data) => {
                self.canLoadMore = data.canLoadMore
                self.scrollHandler(data.dataList)
                if (self.canLoadMore === false) {
                  return Promise.reject()
                }
              }).catch(() => {
                observer.unobserve(self.$refs.loading);
                self.$refs.loading.remove()
              });
            }
          });
        },{
          rootMargin: '50px 0px'
        });

      observer.observe(this.$refs.loading)
    },
    scrollHandler(list) {
      this.previewList = this.previewList.concat(list);
    }
  },
  components: {}
}
