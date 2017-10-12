export default {
  name: 'fl-breadcrumb',

  data() {
    return {
      breadcrumbs: []
    }
  },
  created(){
  },
  watch: {
    $route: 'breadcrumbHandler'
  },
  created(){
    this.breadcrumbHandler();
  },
  methods: {
    breadcrumbHandler(){
      const matched = this.$route.matched;
      this.breadcrumbs = matched.map((m)=>{
        return {
          path: m.path,
          title: m.meta.title || ''
        }
      })
    }
  }
}
