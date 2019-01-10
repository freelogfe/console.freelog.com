<template>
  <div class="res-scheme-detail-container">
    <el-tabs v-model="activeSchemeName">
      <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in tabs">
        <div class="bubble-res-wrap" v-if="tabs.length">
          <h5>上抛资源</h5>
          <ul>
            <li v-for="res in tab.scheme.bubbleResources"><i></i><a :href="`/resource/detail/${res.resourceId}`" target="_blank">{{res.resourceName||res.resourceId}}</a></li>
          </ul>
        </div>

        <div class="policy-list-wrap">
          <h5>授权方案策略</h5>
          <el-collapse accordion>
            <el-collapse-item v-for="policy in tab.scheme.policy">
              <template slot="title">
                {{policy.policyName}}
              </template>
              <div class="scheme-policy-content">
                <pre>{{policy._fmtPolicyText}}</pre>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {onloadSchemesForResource} from '@/data/scheme/loader'
  import {loadResources} from '@/data/resource/loader'
  import {beautify} from '@freelog/resource-policy-lang'
  import {SCHEME_PUBLISH_STATUS} from '@/config/scheme'

  export default {
    name: 'resource-detail-schemes',

    data() {
      return {
        curChoice: 0,
        tabs: [],
        selectedPolicy: '',
        schemes: [],
        inited: false,
        showDialog: false,
        currentScheme: {},
        activeSchemeName: ''
      }
    },

    props: {
      resource: Object
    },

    watch: {
      'resource.resourceId'() {
        this.initView()
      }
    },

    mounted() {
      this.initView()
    },

    methods: {
      initView() {
        if (!this.resource.resourceId) {
          return
        }
        onloadSchemesForResource(this.resource.resourceId, {
          authSchemeStatus: 1
        })
          .then((data) => {
            if (data.length) {
              this.schemes = this.formatSchemes(data)

              if (this.schemes.length) {
                this.activeSchemeName = this.schemes[0].authSchemeId
              }
              console.log(this.schemes)
            }
          }).catch(this.$error.showErrorMessage)
      },
      formatSchemes(schemes) {
        schemes = schemes.filter((scheme, i) => {
          if (!this.resource.isOwner && SCHEME_PUBLISH_STATUS.deleted === scheme.status) {
            return false
          }

          scheme.policy.forEach((p) => {
            try {
              p._fmtPolicyText = beautify(p.policyText)
            } catch (e) {
              p._fmtPolicyText = p.policyText
            }
          })
          return scheme
        })
        this.tabs = schemes.map(scheme => {
          return {
            label: scheme.authSchemeName,
            name: scheme.authSchemeId,
            scheme
          }
        })
        return schemes
      },
    }
  }
</script>

<style lang="less" scoped>
  .res-scheme-detail-container {
    .bubble-res-wrap {
      color: #333333;
      font-size: 14px;
      margin-bottom: 30px;
      h5 {
        margin-bottom: 10px;
      }
      ul {
        background-color: #F8F8F8;
        padding: 15px 20px 5px;
        border-radius: 4px;
        li {
          margin-bottom: 10px;
          a {
            color: #333333;
          }
        }
        i {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: #E24B4B;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }

    .policy-list-wrap {
      h5 {
        margin-bottom: 10px;
        font-size: 14px;
      }
      .scheme-policy-content {
        background-color: #F8F8F8;
        padding: 10px 20px;
        border-radius: 4px;
      }
      pre {
      }
    }
  }
</style>