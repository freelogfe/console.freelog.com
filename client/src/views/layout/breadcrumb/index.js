export default {
  name: 'fl-breadcrumb',

  data() {
    return {
      breadcrumbs: []
    }
  },
  created() {
  },
  watch: {
    $route: 'breadcrumbHandler'
  },
  created() {
    this.breadcrumbHandler();
  },
  methods: {
    paddingTitle(title) {
      var params = this.$route.params;
      var keys = Object.keys(params)
      keys.forEach((k) => {
        title = title.replace(`:${k}`, params[k])
      })

      return title
    },
    breadcrumbHandler() {
      const matched = this.$route.matched;
      this.breadcrumbs = []
      if (this.$route.name === '404') {
        this.breadcrumbs = []
      } else {
        this.breadcrumbs = matched.map((m) => {
          var title = m.meta.title || ''

          return {
            path: m.path,
            title: this.paddingTitle(title)
          }
        }).filter((item) => {
          return !!item.title
        })
      }
    }
  }
}
