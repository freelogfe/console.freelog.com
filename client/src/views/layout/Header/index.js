import {mapGetters} from 'vuex'


export default {
  name: 'fl-header',

  data(){
    return {
      navRoutes: [],
      isSideBarOpen: true
    }
  },
  computed: mapGetters({
    sidebar: 'sidebar',
    session: 'session'
  }),

  created () {
    // this.$store.dispatch('getCurrentUser')
    this.resolveRouter();
  },

  methods: {
    toggleSidebarHandler(){
      this.$store.dispatch('toggleSidebar')
    },
    resolveRouter(){
      var routes = this.$router.options.routes;

      for (var i = 0; i < routes.length; i++) {
        let route = routes[i];
        if (route.path === '/') {
          this.navRoutes = route.children;
          break;
        }
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout () {
      this.$store.dispatch('deleteToken')
      this.$router.replace({path: '/login'})
    }
  }
}
