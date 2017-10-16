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
    breadcrumbHandler() {
      const matched = this.$route.matched;
      if (this.$route.name === '404') {
        this.breadcrumbs = []
      } else {
        this.breadcrumbs = matched.map((m) => {
          return {
            path: m.path,
            title: m.meta.title || ''
          }
        })
      }
    }
  }
}
