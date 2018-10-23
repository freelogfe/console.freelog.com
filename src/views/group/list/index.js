import * as GroupApi from '../../../services/groups'
import TableView from '@/components/TableView/index.vue'
import { GROUP_TYPES, USER_GROUP_TYPE, NODE_GROUP_TYPE } from '../../../config/group'

export default {
  name: 'group-list',
  data() {
    return {}
  },
  components: {
    TableView
  },
  mounted() {
  },
  methods: {
    loader() {
      const self = this
      return () => GroupApi.list().then(res => res)
    },
    groupDetailHandler(row) {
      this.$router.push({ path: `/group/detail/${row.groupId}` })
    },
    resolveGroupType(row) {
      for (let i = 0; i < GROUP_TYPES.length; i++) {
        if (GROUP_TYPES[i].value === row.groupType) {
          return GROUP_TYPES[i].label
        }
      }

      return ''
    }
  }
}
