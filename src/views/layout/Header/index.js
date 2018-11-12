import { mapGetters } from 'vuex'
import SearchInput from '@/components/SearchInput/index.vue'

export default {
  name: 'fl-header',

  data() {
    return {
      isSideBarOpen: true,
      domainPostfix: /\.test/.test(location.host) ? '.testfreelog.com' : '.freelog.com',
      avatarUrl: ''
    }
  },
  computed: {
    ...mapGetters({
      sidebar: 'sidebar',
      session: 'session',
      nodes: 'nodes'
    }),
    pageTitle() {
      return (this.$route.meta && this.$route.meta.title) || ''
    }
  },

  components: {
    SearchInput
  },

  created() {
    this.listenWindowVisibility()
  },
  mounted() {
    if (!this.session.user.userId) {
      this.$store.dispatch('getCurrentUser').then((userInfo) => {
        this.initData(userInfo.userId)
      })
    } else {
      this.initData(this.session.user.userId)
    }
  },

  methods: {
    initData(userId){
      this.$store.dispatch('loadNodes')
      this.avatarUrl = `https://image.freelog.com/headImage/${userId}?x-oss-process=style/head-image`
    },
    listenWindowVisibility() {
      const self = this
      let hidden = 'hidden'
      const doc = document

      if (hidden in doc) { doc.addEventListener('visibilitychange', onchange) } else if ((hidden = 'mozHidden') in doc) { doc.addEventListener('mozvisibilitychange', onchange) } else if ((hidden = 'webkitHidden') in doc) { doc.addEventListener('webkitvisibilitychange', onchange) } else if ((hidden = 'msHidden') in doc) { doc.addEventListener('msvisibilitychange', onchange) } else {
        window.onpageshow = window.onpagehide
          = window.onfocus = window.onblur = onchange
      }

      function onchange(evt) {
        const v = 'visible'
        const h = 'hidden'
        const evtMap = {
          focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
        }
        let type

        evt = evt || window.event
        if (evt.type in evtMap) {
          type = evtMap[evt.type]
        } else {
          type = this[hidden] ? 'hidden' : 'visible'
        }

        if (type === 'visible') {
          self.syncUserSession()
        }
      }
    },
    syncUserSession() {
      this.$store.dispatch('checkUserSession')
        .then((valid) => {
          if (!valid) {
            this.$store.dispatch('deleteNode')
            this.$store.dispatch('getCurrentUser').then(() => {
              location.reload()
            })
          }
        })
    },
    logout() {
      this.$store.dispatch('userLogout')
        .then(() => {
          const redirect = this.$route.fullPath || '/'
          setTimeout(() => {
            this.$router.replace({ path: '/user/login', query: { redirect } })
          }, 20)
        })
        .catch(this.$error.showErrorMessage)
    },
    searchHandler(qs) {
      this.$router.push({ path: '/', query: { q: qs } })
    }
  }
}
