<template>
  <div>
    <div class="dep-list-wrap">
      <div class="dep-list-inner">
        <div class="step-title">
          <div>
            <i class="el-icon-question"></i>
            <el-button class="auth-name" type="text">
              <input type="text"
                     class="input-auth-name"
                     :value="schemeData.authSchemeName"
                     @change="changeSchemeName"
                     @keyup.enter="handleInputConfirm">
            </el-button>
            <el-button type="text" class="add-new-scheme-btn"><i class="el-icon-plus"></i></el-button>
          </div>
        </div>
        <ul>
          <li v-for="(dep, index) in detail.dependencies" class="dep-item">
            <el-checkbox class="select-box" v-model="dep.checked" :value="dep.value"></el-checkbox>
            <div class="resource-name">
              <p><i class="dot" :class="{selected: dep.selected}"></i>{{dep.resourceName}}</p>
              <ul class="auth-node-list">
                <li class="auth-scheme-title" :class="{active:authNode.active}"
                    @click="changeResourceScheme(authNode, index, $event)"
                    v-for="authNode in dep.authSchemes">
                  <span class="title"><i class="dot"></i>{{authNode.authSchemeName}}</span>
                </li>
              </ul>
              <div class="line-arrow">
                <i class="circle"></i>
              </div>
            </div>
          </li>
        </ul>
        <div class="policy-input-wrap">
          <h4 class="policy-input-title"><i class="el-icon-question"></i>授权方案策略</h4>
          <policy-editor v-model="schemeData.policyText" :showValidate="false"></policy-editor>
        </div>
      </div>
    </div>
    <div class="auth-scheme-wrap" v-show="schemes.length">
      <div class="auth-scheme-list-wrap" :key="index" v-for="(scheme,index) in schemes">
        <div class="step-title">{{scheme.authSchemeName}}</div>
        <ul>
          <li v-for="dep in scheme.dependencies" class="dep-item">
            <div class="resource-name">
              <p><i class="dot"></i>{{dep.resourceName}}</p>
              <ul class="auth-node-list">
                <li class="auth-scheme-title" @click="selectAuthNode(authNode, index, $event)"
                    v-for="authNode in dep.authSchemes">
                  <span class="title"><i class="dot"></i>{{authNode.authSchemeName}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="policy-wrap">
          <h3 style="margin-bottom: 15px;">授权策略:</h3>
          <div class="policy-content">
            <el-radio-group v-if="scheme.policy.length>1" v-model="scheme.selectPolicy">
              <el-radio class="policy-radio" :label="index" :key="index" v-for="(policy, index) in scheme.policy">
                <pre class="policy-segment-text">{{policy.segmentText}}</pre>
              </el-radio>
            </el-radio-group>
            <pre class="policy-segment-text" v-else>
for public :
  in initial :
    proceed to active on receiving transaction of 2888 to fethasdkj12398
            </pre>
            <div style="text-align: center">
              <el-button type="primary" round
                         class="policy-select-btn" @click="selectAuthScheme(scheme)">
                <i class="el-icon-fa-check" :class="{selected: scheme.checked}"></i>预选
              </el-button>
            </div>
          </div>
        </div>
        <div class="line-arrow" v-show="index < currentAuthNodeIndex">
          <i class="circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PolicyEditor from '@/components/policyEditor/index.vue'
  import resourceCompiler from '@freelog/resource-policy-compiler'
  import CONFIG from '@/config/index'

  const {RESOURCE_TYPES} = CONFIG

  export default {
    name: 'resource-auth-scheme',
    components: {
      PolicyEditor
    },
    props: {
      updateCallback: {
        type: Function
      },
      params: {
        type: Object
      }
    },
    data() {
      var policy = [
        {
          "segmentId": "e2678b5d3711b59eb1ad243e7a80cef0",
          "segmentText": "for public: in initial : proceed to <signing> on receiving transaction of 2999 to feth109ad2cbe98",
          "users": [
            {
              "userType": "group",
              "users": [
                "public"
              ]
            }
          ],
          "fsmDescription": [
            {
              "currentState": "initial",
              "nextState": "<signing>",
              "event": {
                "type": "transaction",
                "params": [
                  "feth109ad2cbe98",
                  2999
                ],
                "eventName": "transaction_feth109ad2cbe98_2999_event",
                "eventId": "d65ff0d0e2d5483f98d80e61d58bd430"
              }
            }
          ],
          "activatedStates": [
            "<signing>"
          ],
          "initialState": "initial",
          "terminateState": "terminate",
          "identityAuthenticationResult": true
        },
        {
          "segmentId": "e2678b5d3711b59eb1ad243e7a80cef0",
          "segmentText": "for public: in init : proceed to <signing> on receiving transaction of 199 to feth1012ks2cbe98",
          "users": [
            {
              "userType": "group",
              "users": [
                "public"
              ]
            }
          ],
          "fsmDescription": [
            {
              "currentState": "initial",
              "nextState": "<signing>",
              "event": {
                "type": "transaction",
                "params": [
                  "feth109ad2cbe98",
                  2999
                ],
                "eventName": "transaction_feth109ad2cbe98_2999_event",
                "eventId": "d65ff0d0e2d5483f98d80e61d58bd430"
              }
            }
          ],
          "activatedStates": [
            "<signing>"
          ],
          "initialState": "initial",
          "terminateState": "terminate",
          "identityAuthenticationResult": true
        },
        {
          "segmentId": "e2678b5d3711b59eb1ad243e7a80cef0",
          "segmentText": "for public: in initial : proceed to <active> on receiving transaction of 2888 to fethasdkj12398",
          "users": [
            {
              "userType": "group",
              "users": [
                "public"
              ]
            }
          ],
          "fsmDescription": [
            {
              "currentState": "initial",
              "nextState": "<signing>",
              "event": {
                "type": "transaction",
                "params": [
                  "feth109ad2cbe98",
                  2999
                ],
                "eventName": "transaction_feth109ad2cbe98_2999_event",
                "eventId": "d65ff0d0e2d5483f98d80e61d58bd430"
              }
            }
          ],
          "activatedStates": [
            "<signing>"
          ],
          "initialState": "initial",
          "terminateState": "terminate",
          "identityAuthenticationResult": true
        }
      ];
      var authList = [{
        authSchemeName: '授权方案A',
        policy: policy
      }, {
        authSchemeName: '授权方案B',
        policy: policy
      }, {
        authSchemeName: '授权方案C',
        policy: policy
      }]
      policy.forEach((p) => {
        p.segmentText = resourceCompiler.beautify(p.segmentText)
      })
      var deps = [{
        "resourceId": "0bee49c19387521a79aeff78504425dde0ee4897",
        "resourceName": "我的资源",
        "resourceType": "widget",
        "dependencies": []
      }, {
        "resourceId": "0b8edaf2061fe5280a358ecb09e0818c4c989a1b",
        "resourceName": "我的资源",
        "resourceType": "license",
        "dependencies": []
      }];

      deps.forEach((dep, i) => {
        dep.value = i
        dep.checked = false
        dep.policy = policy
        dep.authList = authList
      })
      return {
        deps: deps,
        policy: policy,
        select: '',

        tabs: [{
          title: '未命名授权方案',
          name: 'A',
          content: 'resource-auth-scheme'
        }],
        schemeData: {
          policyText: '',
          authSchemeName: '未命名授权方案',
          dutyStatements: []
        },
        curTabName: 'A',
        schemes: [],
        current: {},
        checkList: {},
        currentResourceIndex: '',
        currentAuthNodeIndex: 0,
        detail: {
          dependencies: []
        },
        originSchemeData: {}
      }
    },
    mounted() {

    },
    watch: {},
    methods: {
      changeSchemeName(ev) {
        this.schemeData.authSchemeName = ev.target.value
        this.updateData()
      },
      updateData() {
        this.updateCallback({
          id: this.params.id,
          data: this._data
        })
      },
      loadDependeciesAuthSchemes(deps) {
        if (!deps || !deps.length) {
          return Promise.resolve()
        }

        var rids = deps.map((dep) => {
          dep.checked = false
          dep.selected = false
          dep.authNodeList = []
          dep.authSchemes = []
          return dep.resourceId
        })

        return this.loadAuthSchemes(rids).then((data) => {
          var authSchemeMap = data.reduce((authSchemeMap, scheme) => {
            if (!authSchemeMap[scheme.resourceId]) {
              authSchemeMap[scheme.resourceId] = []
            }
            scheme.active = false
            scheme.selectPolicy = ''
            scheme.checked = false
            authSchemeMap[scheme.resourceId].push(scheme)
            return authSchemeMap
          }, {});
          deps.forEach((dep) => {
            dep.authSchemes = dep.authSchemes.concat(authSchemeMap[dep.resourceId] || [])
          })
        })
      },
      loadDeps() {
        var resourceId = this.data.resourceId || this.$route.query.resourceId;
        return this.$axios.get(`/v1/resources/getResourceDependencyTree/${resourceId}`)
          .then((res) => {
            return res.getData()
          })
      },
      loadAuthSchemes(resourceIds) {
        return this.$axios.get(`/v1/resources/authSchemes`, {
          params: {
            resourceIds: resourceIds.join(',')
          }
        }).then((res) => {
          return res.getData()
        })
      },
      handleInputConfirm(ev) {
        ev.target.blur()
      },
      computeLineArrow(target, _from, to) {
        this.$nextTick(() => {
          var fromRect = _from.getBoundingClientRect()
          var toRect = to.getBoundingClientRect()

          target.style.top = (_from.offsetTop + 10) + 'px'//(fromRect.top+document.documentElement.scrollTop) + 'px'
          target.style.left = (_from.offsetLeft + fromRect.width + 5) + 'px'
          target.style.right = '6px'
          target.style.display = 'block'
        })
      },
      changeResourceScheme(authNode, index, ev) {
        this.schemes = []
        this.currentResourceIndex = index

        if (authNode.bubbleResourceIds.length) {
          authNode.dependencies = authNode.bubbleResourceIds;
          this.loadDependeciesAuthSchemes(authNode.dependencies)
        }

        this.schemes.push(authNode)
        authNode.active = true
        var curTarget = ev.currentTarget
        var parentNode = this.getParent(curTarget, '.dep-list-inner')
        var target = parentNode.querySelector('.line-arrow')
        this.hideLineArrow(this.$el.querySelector('.auth-scheme-wrap'))
        this.computeLineArrow(target, curTarget.querySelector('.title'), this.$el.querySelector('.auth-scheme-wrap'))
      },
      selectAuthScheme(scheme) {
        if (scheme.selectPolicy === '' && scheme.policy.length > 1) {
          return this.$message.warning('未选择授权策略')
        }
        scheme.checked = !scheme.checked

        this.data.deps[this.currentResourceIndex].selected = this.schemes.some((scheme) => {
          return scheme.checked
        })
      },
      getParent(el, selector) {
        if (!selector) {
          return el.parentNode
        } else {
          var target = el.parentNode
          var isId = selector[0] === '#';
          selector = selector.substr(1)
          while (!((isId && target.id === selector) || (!isId && target.className.indexOf(selector) > -1)) && target !== document.body) {
            target = target.parentNode
          }

          return target
        }
      },
      selectAuthNode(authNode, index, ev) {
        index++
        var len = this.schemes.length;
        var diff = len - index
        this.currentAuthNodeIndex = index
        if (diff > 0) {
          for (var i = 0; i < diff; i++) {
            this.schemes.pop()
          }
        }
        this.schemes.push(authNode)
        var parentNode = this.getParent(ev.currentTarget, '.auth-scheme-list-wrap')
        var target = parentNode.querySelector('.line-arrow')
        this.computeLineArrow(target, ev.currentTarget.querySelector('.title'), parentNode)
      },
      hideLineArrow($el) {
        var $lines = $el.querySelectorAll('.line-arrow')
        $lines.forEach(($line) => {
          $line.style.display = 'none'
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
