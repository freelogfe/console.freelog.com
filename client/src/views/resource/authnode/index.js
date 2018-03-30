import PolicyEditor from '../policy/index.vue'
import TableView from '@/components/TableView/index.vue'
import CreateAuthNode from '../createauthnode/index.vue'
import EditAuthNode from '../editauthnode/index.vue'
export default {
  name: 'auth-node',
  data() {
    return {
      policyText: '123',
      resourceId: '',
      activeName : 'resourceInfo',
      send: true,
      loading: false,
      editableTabs2: []
      // hasUnhandledTab: []
    }
  },
  components: {
    PolicyEditor,
    TableView,
    CreateAuthNode,
    EditAuthNode
  },
  mounted() {
    this.$on('close', (id)=> {
      this.removeTab(id)
    })
    this.resourceId = this.$route.query.resourceId
    this.$services.resource.get(this.resourceId).then((res)=> {
      let data = res.getData();
      let meta = data.meta;
    })
  },
  methods: {
    tabChange() {

    },
    removeTab(targetName) {
      let tabs = this.editableTabs2;
      let activeName = this.activeName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1] || {name: 'resourceInfo'};
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.activeName = activeName;
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      // this.hasUnhandledTab.pop();

    },
    submitResourceHandler() {

    },
    validatePolicyHandler() {

    },
    newAuthNode() {
      var hasnewauthnode = this.editableTabs2.some((item)=> {
        return item.name == 'newauthnode'
      })
      if (hasnewauthnode ) {
        this.activeName = 'newauthnode'
        return
      }
      let newTabName = 'newauthnode';
      this.editableTabs2.push({
        title: '新增授权点',
        name: newTabName,
        content: 'create-auth-node'
      });
      this.activeName = newTabName;
      // this.hasUnhandledTab.push(true)
    },
    changeAuthNode(id, name) {
      var hasnewauthnode = this.editableTabs2.some((item)=> {
        return item.name == id
      })
      if (hasnewauthnode ) {
        this.activeName = id;
        return
      }
      this.editableTabs2.push({
        title: '修改'+ name,
        name: id,
        content: 'edit-auth-node'
      });
      this.activeName = id;
      // this.hasUnhandledTab.push(true)
    },
    loader() {
      return (param) => {
        if (typeof param === 'object') {
          param = {
            params: param
          }
        }
        return this.$services.resource.get(param || {})
      }
    }
  }
}
