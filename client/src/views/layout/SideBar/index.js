import {mapGetters} from 'vuex'

import NavMenu from '../NavMenu/index.vue'
import nodeRoute from '@/router/node'
import resourceRoute from '@/router/resource'

export default {
  name: 'fl-sidebar',
  components: {
    'fl-nav-menu': NavMenu
  },
  data () {
    return {
      navList: [],
      routeType: ''
    }
  },
  computed: mapGetters({
    sidebar: 'sidebar'
  }),
  methods: {
    changeRouteHandler(){
      var fullPath = this.$route.fullPath;
      var paths = fullPath.split('/').filter((v)=> {
        return !!v;
      });
      var navList;
      this.routeType = paths[0] || '';

      switch (this.routeType) {
        case 'node':
          navList = nodeRoute.children;
          break;
        case 'resource':
          navList = resourceRoute.children;
          break;
        default:
          break;
      }

      if (navList) {
        this.navList = navList;
        this.$store.dispatch('openSidebar')
      } else {
        this.navList = [];
        this.$store.dispatch('closeSidebar') //hidesidebar?
      }
    }
  },
  watch: {
    '$route': 'changeRouteHandler'
  },
  created() {
    this.changeRouteHandler();
  },
  mounted(){

  }
}
