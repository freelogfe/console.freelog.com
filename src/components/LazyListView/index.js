// https://github.com/hejianxian/vue-list/blob/master/src/components/vue-list.vue
import lozad from 'lozad'

const winHeight = (window.innerHeight || document.documentElement.clientHeight)

function isElementInViewport(el, diff) {
  var rect = el.getBoundingClientRect();
  var containerRect = {
    top: 0,
    left: 0,
    bottom: winHeight,
    right: (window.innerWidth || document.documentElement.clientWidth)
  }
  if (diff) {
    containerRect.top -= diff.top || 0
    containerRect.left -= diff.left || 0
    containerRect.bottom += diff.bottom || 0
    containerRect.right += diff.right || 0
  }

  return (
    rect.top >= containerRect.top &&
    rect.left >= containerRect.left &&
    rect.bottom <= containerRect.bottom &&
    rect.right <= containerRect.right
  );
}

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
      index: 1,
      isLoading: 0
    }
  },
  mounted() {
    this.initView()
    this.$on('reload', this.refresh.bind(this))
  },
  beforeDestroy() {
    this.disconnect()
  },
  methods: {
    initView() {
      const self = this
      const $hide = this.$refs.loading
      const diffBtm = parseInt(winHeight, 10)

      $hide.classList.remove('hide')

      const hideFn = () => {
        $hide.classList.add('hide')
      }
      $hide.dataset.loaded = false

      this.observer = lozad($hide, {
        loaded(el) {
          if (self.canLoadMore === false) {
            return hideFn()
          }
          const inView = isElementInViewport($hide, {bottom: diffBtm})
          const reobserve = () => {
            el.dataset.loaded = false
            self.observer.observe(el)
          }

          if (!inView) {
            const fn = () => {
              if (!el.dataset.loaded) return
              reobserve()
              window.removeEventListener('scroll', fn)
            }
            setTimeout(() => {
              window.addEventListener('scroll', fn)
            }, 20)
            return
          }

          self.isLoading += 1
          self.load().then(() => {
            self.isLoading -= 1
            if (self.canLoadMore === false) {
              hideFn()
            } else {
              reobserve()
            }
          }).catch((err) => {
            console.log(err)
            self.isLoading -= 1
            hideFn()
          })
        },
        rootMargin: `${diffBtm}px ${diffBtm}px`, // syntax similar to that of CSS Margin
        threshold: 0.1 // ratio of element convergence
      });
      this.observer.observe();
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
      var observer = this.observer && this.observer.observer
      if (observer && observer.disconnect) {
        observer.disconnect()
      }
    },
    refresh() {
      const $hide = this.$refs.loading

      this.canLoadMore = true
      this.previewList = []
      this.index = 1
      // this.disconnect()
      $hide.dataset.loaded = false
      this.observer.observe($hide)
      this.observer.triggerLoad($hide)
    },
    scrollHandler(list) {
      this.previewList = this.previewList.concat(list)
    }
  },
  components: {}
}
