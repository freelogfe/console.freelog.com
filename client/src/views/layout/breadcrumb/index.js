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
        var breadcrumbTitle = this.$route.meta.breadcrumbTitle
        if (this.$route.meta.breadcrumbTitle) {
          this.breadcrumbs.push({
            title: breadcrumbTitle,
            path: this.$route.fullPath
          })
        } else {
          this.breadcrumbs = matched.map((m) => {
            var title = m.meta.title || ''

            return {
              path: m.path,
              title: this.paddingTitle(title)
            }
          })
        }
      }
    }
  }
}
