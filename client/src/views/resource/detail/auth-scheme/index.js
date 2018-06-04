function generateAlpha(num) {
  num = num || 26;
  var alphas = []
  for (var i = 0; i < num; i++) {
    alphas.push(String.fromCharCode(65 + i))
  }

  return alphas
}

export default {
  name: 'auth-scheme-detail',
  data() {
    return {
      schemeDetail: {
        "authSchemeId": "5af54b5011e88909c8b58d6a",
        "authSchemeName": "方案1",
        "resourceId": "2b0e51145bd40943e75511efdce36cfceb2eeada",
        "dependCount": 0,
        "statementState": 1,
        "policy": [
          {
            "segmentId": "397c06bd49dcb3712437890c9cdf8b222",
            "policyName": "新的方案A",
            "segmentText": "for public: in <initial> : terminate",
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
                "currentState": "<initial>"
              }
            ],
            "activatedStates": [
              "<initial>"
            ],
            "initialState": "<initial>",
            "terminateState": "terminate"
          },
          {
            "segmentId": "397c06bd49cb3712437890c9cadf8b222",
            "policyName": "新的方案B",
            "segmentText": "for public: in <initial> : terminate",
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
                "currentState": "<initial>"
              }
            ],
            "activatedStates": [
              "<initial>"
            ],
            "initialState": "<initial>",
            "terminateState": "terminate"
          },
          {
            "segmentId": "397c06bdd49cb3712437890c9cdf8b222",
            "policyName": "新的方案C",
            "segmentText": "for public: in <initial> : terminate",
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
                "currentState": "<initial>"
              }
            ],
            "activatedStates": [
              "<initial>"
            ],
            "initialState": "<initial>",
            "terminateState": "terminate"
          }
        ],
        "policyText": "",
        "languageType": "freelog_policy_lang",
        "bubbleResources": [
          {
            "resourceId": "0b8edaf2061fe5280a358ecb09e0818c4c989a1b",
            "resourceName": "我的资源0b8edaf2061fe5280a358ecb09e0818c4c989a1b"
          }
        ],
        "dutyStatements": [
          {
            "resourceId": "0bee49c19387521a79aeff78504425dde0ee4897",
            "authSchemeId": "5ae95be038d3b4258c1a607a",
            "policySegmentId": "054632645eb66c4d5ac93892a9cfd51b",
            "serialNumber": "5ae95be038d3b4258c1a6079",
            "resourceName": "我的资源5ae95be038d3b4258c1a6079"
          }
        ],
        "statementCoverageRate": 0,
        "associatedContracts": [],
        "contractCoverageRate": 0,
        "userId": 10026,
        "serialNumber": "5af54b5011e88909c8b58d69",
        "status": 0,
        dependencies: []
      },
      curChoice: 0,
      choices: [],
      selectedPolicy: '',
      schemes: [],
      inited: false
    }
  },
  components: {},
  props: {
    selectedCallback: {
      type: Function
    },
    resource: {
      type: Object
    }
  },
  watch: {
    resource() {
      if (this.resource && this.resource.resourceId && !this.inited) {
        this.init()
        this.inited = true
      }
    }
  },
  mounted() {

  },
  methods: {
    init() {
      this.loadPolicies().then((data) => {
        this.schemes = this.formatSchemes(data);
      }).catch(this.$error.showErrorMessage)
    },
    changePolicy(scheme, policy) {
      this.selectedCallback && this.selectedCallback(scheme, policy)
    },
    formatSchemes(schemes) {
      this.choices = generateAlpha(schemes.length).map((alpha, index) => {
        return {
          index: index,
          label: alpha
        }
      });

      schemes.forEach((scheme) => {
        scheme.dutyStatements.forEach((res) => {
          res.done = true
        });
        scheme.dependencies = scheme.bubbleResources.concat(scheme.dutyStatements)
      });

      return schemes;
    },
    loadPolicies() {
      return this.$services.authSchemes.get({
        params: {
          resourceIds: this.resource.resourceId
        }
      }).then((res) => {
        if (res.data.errcode === 0) {
          return res.getData()
        } else {
          throw new Error(res)
        }
      })
    }
  }
}
