import {mapGetters} from 'vuex'

import NavMenu from '../NavMenu/index.vue'
import nodeRoute from '@/router/node'
import resourceRoute from '@/router/resource'
import {nodeItemRoute} from '@/router/node'
import node from "../../../router/node";


function cloneArray(arr) {
  return arr.map((item) => {
    if (typeof item === 'object') {
      return Object.assign({}, item)
    } else {
      return item
    }
  })
}

function paddingPath(prefix, navs) {
  navs = navs.map((nav) => {
    if (nav.path[0] !== '/') {
      nav.path = [prefix, nav.path].join('/')
    }
    if (nav.children && nav.children.length) {
      nav.children = paddingPath(nav.path, cloneArray(nav.children))
    }

    return nav;
  });
  return navs;
}

export default {
  name: 'fl-sidebar',
  components: {
    'fl-nav-menu': NavMenu
  },
  data() {
    return {
      navList: [],
      routeType: ''
    }
  },
  computed: mapGetters({
    sidebar: 'sidebar'
  }),
  methods: {
    changeRouteHandler() {
      var fullPath = this.$route.fullPath;
      var paths = fullPath.split('/').filter((v) => {
        return !!v;
      });
      var navList;
      var homePath;

      if (this.$route.params.nodeId) {
        homePath = `/node/${this.$route.params.nodeId}`;
        navList = nodeItemRoute.children
      } else {
        this.routeType = paths[0] || '';
        homePath = '/' + this.routeType
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
      }

      if (navList) {
        navList = cloneArray(navList) //避免修改源数据
        navList = paddingPath(homePath, navList)
        this.checkActiveNav(navList)
        this.navList = navList
        this.$store.dispatch('openSidebar')
      } else {
        this.navList = [];
        this.$store.dispatch('closeSidebar') //hidesidebar?
      }
    },
    checkActiveNav(navList){
      navList.forEach((nav)=>{
        nav.isActive = this.$route.path === nav.path
      })
    }
  },
  watch: {
    '$route': 'changeRouteHandler'
  },
  created() {
    this.changeRouteHandler();
  },
  mounted() {
  }
}
