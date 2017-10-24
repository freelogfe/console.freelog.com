import {mapGetters} from 'vuex'

export default {
  name: 'fl-footer',

  data() {
    return {
      year: ''
    }
  },

  computed: {
    ...mapGetters(['serverTime'])
  },
  created(){
    const date = new Date(this.serverTime || Date.now());
    this.year = date.getFullYear()
  },
  methods: {}
}
