import {mapGetters} from 'vuex'


export default {
  name: 'fl-header',

  data() {
    return {
      navRoutes: [],
      isSideBarOpen: true
    }
  },
  computed: mapGetters({
    sidebar: 'sidebar',
    session: 'session',
    nodeSession: 'nodeSession'
  }),

  created() {
    this.resolveRouter();
  },

  methods: {
    handleCommand(cmd) {
      this[cmd] && this[cmd]()
    },
    logoutNodeHandler() {
      this.$store.dispatch('deleteNode')
      // location.reload()
    },
    switchNodeHandler() {
      this.$store.dispatch('deleteNode')
      this.$router.push({path: '/node/login'})
    },
    toggleSidebarHandler() {
      this.$store.dispatch('toggleSidebar')
    },
    resolveRouter() {
      var routes = this.$router.options.routes;

      for (var i = 0; i < routes.length; i++) {
        let route = routes[i];
        if (route.path === '/') {
          this.navRoutes = route.children.filter(r => !r.hidden);
          break;
        }
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$store.dispatch('userLogout', this.$route.fullPath)
        .catch(this.$error.showErrorMessage)
    }
  }
}
