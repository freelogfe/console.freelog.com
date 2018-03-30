<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-input placeholder="请输入内容" v-model="queryPolicyTpl" class="input-with-select">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="示例模板">
        <policy-tpl-list :list="defaultPolicyTpls"
                         :filter="filterHandler"
                         @select="selectPolicyTplHandler"></policy-tpl-list>
      </el-tab-pane>
      <el-tab-pane label="我的模板">
        <policy-tpl-list :list="policyTpls"
                         :filter="filterHandler"
                         @select="selectPolicyTplHandler"></policy-tpl-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import PolicyTplList from '@/components/policyTplSelector/index.vue'
  import defaultPolicyTpls from '../defaultPolicyTpls'

  export default {
    name: 'policy-template-selector',
    data() {
      return {
        policyTpls: [],
        queryPolicyTpl: '',
        defaultPolicyTpls: (this.$route.meta.type === 'node') ? defaultPolicyTpls.presentable : defaultPolicyTpls.resource
      }
    },

    props: {
      callback: {
        type: Function
      }
    },

    components: {PolicyTplList},

    mounted() {
      this.loadCustomPolicyTpl()
        .then((list) => {
          this.policyTpls = list
        })
    },

    methods: {
      loadCustomPolicyTpl() {
        return this.$services.policyTemplate.get({
          params: {
            templateType: 1,
            pageSize: 1e2
          }
        }).then((res) => {
          var data = res.getData()
          if (data) {
            return data.dataList
          } else {
            throw new Error(res.data.msg)
          }
        })
      },
      selectPolicyTplHandler(data) {
        this.callback && this.callback({
          name: 'selectPolicyTemplate',
          data: {
            template: data.template
          }
        })
      },
      filterHandler(list) {
        return list.filter((tpl) => {
          return this.queryPolicyTpl ? tpl.name.indexOf(this.queryPolicyTpl) > -1 : true
        })
      }
    }
  }
</script>
