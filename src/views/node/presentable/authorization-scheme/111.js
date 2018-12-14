export default {
  '710c3eea3fb61260bdc0e1f5b4678e19ecd010d1': {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": [{
      "authSchemeId": "5c10dc50c962a90029adcf8d",
      "dependResources": [],
      "statementState": 1,
      "policy": [{
        "segmentId": "0c31ceccd9db6ad189c45a7e238793ee",
        "policyName": "策略q q q",
        "status": 1,
        "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
        "policyText": "for public:\n  initial:\n    active\n    recontractable\n    terminate",
        "fsmStates": {"initial": {"authorization": ["active", "recontractable"], "transition": {"terminate": null}}}
      }],
      "languageType": "freelog_policy_lang",
      "statementCoverageRate": 0,
      "contractCoverageRate": 0,
      "status": 1,
      "userId": 10032,
      "resourceId": "710c3eea3fb61260bdc0e1f5b4678e19ecd010d1",
      "authSchemeName": "授权方案",
      "dutyStatements": [],
      "bubbleResources": [{
        "resourceId": "4b32048791c518345e44229740146a1e30488480",
        "resourceName": "散文-建构人格，从荏苒心灵之始"
      }, {"resourceId": "5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8", "resourceName": "freelog-alpha-markdownviewer"}],
      "dependCount": 2,
      "associatedContracts": [],
      "createDate": "2018-12-12T10:00:48.816Z",
      "updateDate": "2018-12-12T10:00:48.898Z"
    }, {
      "authSchemeId": "5c10dc7dc962a90029adcf8f",
      "dependResources": [],
      "statementState": 1,
      "policy": [{
        "segmentId": "0c31ceccd9db6ad189c45a7e238793ee",
        "policyName": "策略222",
        "status": 1,
        "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
        "policyText": "for public:\n  initial:\n    active\n    recontractable\n    terminate",
        "fsmStates": {"initial": {"authorization": ["active", "recontractable"], "transition": {"terminate": null}}}
      }, {
        "segmentId": "0c6c51d9f4a6b6a73c3ce92edef5b67b",
        "policyName": "收费策略",
        "status": 1,
        "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
        "policyText": "for public:\n  escrow account acct\n  custom event acceptor.customEvent\n\n  initial:\n    proceed to auth on acct exceed 10 feather\n  auth:\n    presentable\n    active\n    proceed to refund on acct.confiscated\n  refund:\n    proceed to finish on acct.refunded\n  finish:\n    terminate",
        "fsmDeclarations": {
          "acct": {"type": "escrowaccount", "declareType": "contractAccount"},
          "customEvent": {"type": "acceptor", "declareType": "customEvent"}
        },
        "fsmStates": {
          "initial": {
            "authorization": [],
            "transition": {
              "auth": {
                "code": "S210",
                "params": {
                  "contractAccountName": "acct",
                  "amount": {"type": "literal", "literal": "10"},
                  "currencyUnit": "feather"
                }
              }
            }
          },
          "auth": {
            "authorization": ["presentable", "active"],
            "transition": {"refund": {"code": "S211", "params": {"contractAccountName": "acct"}}}
          },
          "refund": {
            "authorization": [],
            "transition": {"finish": {"code": "S212", "params": {"contractAccountName": "acct"}}}
          },
          "finish": {"authorization": [], "transition": {"terminate": null}}
        }
      }],
      "languageType": "freelog_policy_lang",
      "statementCoverageRate": 0,
      "contractCoverageRate": 0,
      "status": 1,
      "userId": 10032,
      "resourceId": "710c3eea3fb61260bdc0e1f5b4678e19ecd010d1",
      "authSchemeName": "未命名的授权方案",
      "dutyStatements": [],
      "bubbleResources": [{
        "resourceId": "4b32048791c518345e44229740146a1e30488480",
        "resourceName": "散文-建构人格，从荏苒心灵之始"
      }, {"resourceId": "5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8", "resourceName": "freelog-alpha-markdownviewer"}],
      "dependCount": 2,
      "associatedContracts": [],
      "createDate": "2018-12-12T10:01:33.770Z",
      "updateDate": "2018-12-12T10:01:33.840Z"
    }]
  },
  '4b32048791c518345e44229740146a1e30488480': {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": [
      {
        "authSchemeId": "5bf3db460293d3002952db76",
        "dependResources": [],
        "statementState": 1,
        "policy": [
          {
            "segmentId": "0c31ceccd9db6ad189c45a7e238793ee",
            "policyName": "未命名策略",
            "status": 1,
            "authorizedObjects": [
              {
                "userType": "GROUP",
                "users": [
                  "PUBLIC"
                ]
              }
            ],
            "policyText": "for public:\n  initial:\n    active\n    recontractable\n    terminate",
            "fsmStates": {
              "initial": {
                "authorization": [
                  "active",
                  "recontractable"
                ],
                "transition": {
                  "terminate": null
                }
              }
            }
          }
        ],
        "languageType": "freelog_policy_lang",
        "statementCoverageRate": 0,
        "contractCoverageRate": 0,
        "status": 1,
        "userId": 10022,
        "resourceId": "4b32048791c518345e44229740146a1e30488480",
        "authSchemeName": "未命名的授权方案",
        "dutyStatements": [],
        "bubbleResources": [],
        "dependCount": 0,
        "associatedContracts": [],
        "createDate": "2018-11-20T10:00:38.530Z",
        "updateDate": "2018-11-20T10:00:38.585Z"
      }
    ]
  },
  '5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8': {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": [
      {
        "authSchemeId": "5bf3d3c40293d3002952db61",
        "dependResources": [],
        "statementState": 1,
        "policy": [
          {
            "segmentId": "0c31ceccd9db6ad189c45a7e238793ee",
            "policyName": "free策略",
            "status": 1,
            "authorizedObjects": [
              {
                "userType": "GROUP",
                "users": [
                  "PUBLIC"
                ]
              }
            ],
            "policyText": "for public:\n  initial:\n    active\n    recontractable\n    terminate",
            "fsmStates": {
              "initial": {
                "authorization": [
                  "active",
                  "recontractable"
                ],
                "transition": {
                  "terminate": null
                }
              }
            }
          }
        ],
        "languageType": "freelog_policy_lang",
        "statementCoverageRate": 0,
        "contractCoverageRate": 0,
        "status": 1,
        "userId": 10025,
        "resourceId": "5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8",
        "authSchemeName": "授权方案2",
        "dutyStatements": [],
        "bubbleResources": [
          {
            "resourceId": "a3d845c34bec35b95fac5b098de9ca3d3bac03d5",
            "resourceName": "markdown-parser"
          }
        ],
        "dependCount": 2,
        "associatedContracts": [],
        "createDate": "2018-11-20T09:28:36.086Z",
        "updateDate": "2018-11-20T09:28:36.154Z"
      },
      {
        "authSchemeId": "5bf3c3c7cd9f5400358a8d0c",
        "dependResources": [],
        "statementState": 1,
        "policy": [
          {
            "segmentId": "0c31ceccd9db6ad189c45a7e238793ee",
            "policyName": "free策略",
            "status": 1,
            "authorizedObjects": [
              {
                "userType": "GROUP",
                "users": [
                  "PUBLIC"
                ]
              }
            ],
            "policyText": "for public:\n  initial:\n    active\n    recontractable\n    terminate",
            "fsmStates": {
              "initial": {
                "authorization": [
                  "active",
                  "recontractable"
                ],
                "transition": {
                  "terminate": null
                }
              }
            }
          }
        ],
        "languageType": "freelog_policy_lang",
        "statementCoverageRate": 0,
        "contractCoverageRate": 0,
        "status": 4,
        "userId": 10025,
        "resourceId": "5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8",
        "authSchemeName": "授权方案",
        "dutyStatements": [],
        "bubbleResources": [],
        "dependCount": 0,
        "associatedContracts": [],
        "createDate": "2018-11-20T08:20:23.720Z",
        "updateDate": "2018-11-20T09:20:42.449Z"
      },
      {
        "authSchemeId": "5bf3d2290293d3002952db5f",
        "dependResources": [],
        "statementState": 1,
        "policy": [
          {
            "segmentId": "0c31ceccd9db6ad189c45a7e238793ee",
            "policyName": "free策略",
            "status": 1,
            "authorizedObjects": [
              {
                "userType": "GROUP",
                "users": [
                  "PUBLIC"
                ]
              }
            ],
            "policyText": "for public:\n  initial:\n    active\n    recontractable\n    terminate",
            "fsmStates": {
              "initial": {
                "authorization": [
                  "active",
                  "recontractable"
                ],
                "transition": {
                  "terminate": null
                }
              }
            }
          }
        ],
        "languageType": "freelog_policy_lang",
        "statementCoverageRate": 0,
        "contractCoverageRate": 0,
        "status": 4,
        "userId": 10025,
        "resourceId": "5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8",
        "authSchemeName": "授权方案1",
        "dutyStatements": [],
        "bubbleResources": [
          {
            "resourceId": "a3d845c34bec35b95fac5b098de9ca3d3bac03d5",
            "resourceName": "markdown-parser"
          }
        ],
        "dependCount": 2,
        "associatedContracts": [],
        "createDate": "2018-11-20T09:21:45.991Z",
        "updateDate": "2018-11-20T09:28:10.261Z"
      }
    ]
  },
  'a3d845c34bec35b95fac5b098de9ca3d3bac03d5': {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": [{
      "authSchemeId": "5bf3d1df0293d3002952db5c",
      "dependResources": [],
      "statementState": 1,
      "policy": [{
        "segmentId": "0c31ceccd9db6ad189c45a7e238793ee",
        "policyName": "free策略",
        "status": 1,
        "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
        "policyText": "for public:\n  initial:\n    active\n    recontractable\n    terminate",
        "fsmStates": {"initial": {"authorization": ["active", "recontractable"], "transition": {"terminate": null}}}
      }],
      "languageType": "freelog_policy_lang",
      "statementCoverageRate": 0,
      "contractCoverageRate": 0,
      "status": 1,
      "userId": 10025,
      "resourceId": "a3d845c34bec35b95fac5b098de9ca3d3bac03d5",
      "authSchemeName": "授权方案1",
      "dutyStatements": [],
      "bubbleResources": [{
        "resourceId": "b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3",
        "resourceName": "freelog-meme-resource-render"
      }],
      "dependCount": 1,
      "associatedContracts": [],
      "createDate": "2018-11-20T09:20:31.423Z",
      "updateDate": "2018-11-20T09:20:31.487Z"
    }]
  },
  'b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3': {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": [{
      "authSchemeId": "5bf3d04377f5cd002956dc03",
      "dependResources": [],
      "statementState": 1,
      "policy": [{
        "segmentId": "0c31ceccd9db6ad189c45a7e238793ee",
        "policyName": "免费策略",
        "status": 1,
        "authorizedObjects": [{"userType": "GROUP", "users": ["PUBLIC"]}],
        "policyText": "for public:\n  initial:\n    active\n    recontractable\n    terminate",
        "fsmStates": {"initial": {"authorization": ["active", "recontractable"], "transition": {"terminate": null}}}
      }],
      "languageType": "freelog_policy_lang",
      "statementCoverageRate": 0,
      "contractCoverageRate": 0,
      "status": 1,
      "userId": 10032,
      "resourceId": "b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3",
      "authSchemeName": "授权方案",
      "dutyStatements": [],
      "bubbleResources": [],
      "dependCount": 0,
      "associatedContracts": [],
      "createDate": "2018-11-20T09:13:39.485Z",
      "updateDate": "2018-11-20T09:13:39.551Z"
    }]
  },
}

export const resourceDetail = {
  '4b32048791c518345e44229740146a1e30488480': {
  "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": {
    "resourceId": "4b32048791c518345e44229740146a1e30488480",
      "resourceName": "散文-建构人格，从荏苒心灵之始",
      "resourceType": "markdown",
      "mimeType": "text/plain",
      "meta": {},
    "previewImages": ["https://image.freelog.com/preview/4f0c8685-0d22-4394-a57d-e32764e881a3.jpg"],
      "systemMeta": {
      "sha1": "4b32048791c518345e44229740146a1e30488480",
        "fileSize": 10878,
        "mimeType": "text/plain",
        "dependCount": 0,
        "dependencies": []
    },
    "resourceUrl": "http://freelog-shenzhen.oss-cn-shenzhen-internal.aliyuncs.com/resources/markdown/4b32048791c518345e44229740146a1e30488480",
      "description": "<p>建构人格，从荏苒心灵之始 <strong>A</strong> &gt;&gt; B  </p>",
      "intro": "建构人格，从荏苒心灵之始 A >> B  ",
      "userId": 10022,
      "userName": "余亮",
      "status": 2,
      "createDate": "2018-11-20T09:20:37.000Z",
      "updateDate": "2018-12-05T19:16:11.000Z"
  }
},
  '5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8' : {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": {
      "resourceId": "5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8",
      "resourceName": "freelog-alpha-markdownviewer",
      "resourceType": "widget",
      "mimeType": "application/javascript",
      "meta": {},
      "previewImages": [],
      "systemMeta": {
        "sha1": "66af5eb6623feb11b5891181d4c5c74e90edc62f",
        "fileSize": 15194,
        "mimeType": "application/javascript",
        "dependencies": []
      },
      "resourceUrl": "http://freelog-shenzhen.oss-cn-shenzhen-internal.aliyuncs.com/resources/widget/f504403db9e64ca88f8d01feeb3169d0",
      "description": "<h2>usage</h2><p><br></p><p>使用freelog多媒体资源（图片，视频，meme）</p><ul><li>资源类型: markdown</li></ul><h3>直接使用节点资源</h3><pre class=\"ql-syntax\" spellcheck=\"false\">![freelog-resource](presentableId)\n</pre><h3>直接使用子资源</h3><pre class=\"ql-syntax\" spellcheck=\"false\">![freelog-resource](resourceId)\n</pre>",
      "intro": "usage使用freelog多媒体资源（图片，视频，meme）资源类型: markdown直接使用节点资源![freelog-resource](presentableId)直接使用子资源![free",
      "userId": 10025,
      "userName": "资源创作者",
      "status": 2,
      "createDate": "2018-11-20T08:20:13.000Z",
      "updateDate": "2018-11-21T00:08:22.000Z"
    }
  },
  '710c3eea3fb61260bdc0e1f5b4678e19ecd010d1': {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": {
      "resourceId": "710c3eea3fb61260bdc0e1f5b4678e19ecd010d1",
      "resourceName": "fe-deploy-image-01-test",
      "resourceType": "image",
      "mimeType": "image/jpeg",
      "meta": {
        "widgetName": "",
        "dependencies": ["4b32048791c518345e44229740146a1e30488480", "5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8"]
      },
      "previewImages": [],
      "systemMeta": {
        "sha1": "710c3eea3fb61260bdc0e1f5b4678e19ecd010d1",
        "width": 2860,
        "height": 1098,
        "fileSize": 224429,
        "mimeType": "image/jpeg",
        "dependCount": 2,
        "dependencies": [{
          "resourceId": "4b32048791c518345e44229740146a1e30488480",
          "resourceName": "散文-建构人格，从荏苒心灵之始"
        }, {"resourceId": "5ee491a8bb1856c11a68d3a172cfe5d3948d4fe8", "resourceName": "freelog-alpha-markdownviewer"}]
      },
      "resourceUrl": "http://freelog-shenzhen.oss-cn-shenzhen-internal.aliyuncs.com/resources/image/710c3eea3fb61260bdc0e1f5b4678e19ecd010d1",
      "description": "",
      "intro": "",
      "userId": 10032,
      "userName": "wwzh",
      "status": 2,
      "createDate": "2018-12-12T09:52:48.000Z",
      "updateDate": "2018-12-12T02:02:27.000Z"
    }
  },
  'b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3': {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": {
      "resourceId": "b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3",
      "resourceName": "freelog-meme-resource-render",
      "resourceType": "widget",
      "mimeType": "application/javascript",
      "meta": {},
      "previewImages": [],
      "systemMeta": {
        "sha1": "b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3",
        "version": "0.0.1",
        "fileSize": 5582,
        "mimeType": "application/javascript",
        "widgetName": "freelog-meme-resource-render",
        "dependCount": 0,
        "dependencies": []
      },
      "resourceUrl": "http://freelog-shenzhen.oss-cn-shenzhen-internal.aliyuncs.com/resources/widget/b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3",
      "description": "",
      "intro": "",
      "userId": 10032,
      "userName": "wwzh",
      "status": 2,
      "createDate": "2018-11-20T09:13:26.000Z",
      "updateDate": "2018-11-20T01:13:39.000Z"
    }
  },
  'a3d845c34bec35b95fac5b098de9ca3d3bac03d5': {
    "ret": 0,
    "errcode": 0,
    "msg": "success",
    "data": {
      "resourceId": "a3d845c34bec35b95fac5b098de9ca3d3bac03d5",
      "resourceName": "markdown-parser",
      "resourceType": "javascript",
      "mimeType": "application/javascript",
      "meta": {
        "dependencies": [
          "b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3"
        ]
      },
      "previewImages": [],
      "systemMeta": {
        "sha1": "a3d845c34bec35b95fac5b098de9ca3d3bac03d5",
        "fileSize": 554488,
        "mimeType": "application/javascript",
        "dependCount": 1,
        "dependencies": [
          {
            "resourceId": "b4e57d5c0920fe4f8dd7a5ef4f0545f75d4c15a3",
            "resourceName": "freelog-meme-resource-render"
          }
        ]
      },
      "resourceUrl": "http://freelog-shenzhen.oss-cn-shenzhen-internal.aliyuncs.com/resources/javascript/a3d845c34bec35b95fac5b098de9ca3d3bac03d5",
      "description": "",
      "intro": "",
      "userId": 10025,
      "userName": "资源创作者",
      "status": 2,
      "createDate": "2018-11-20T09:20:07.000Z",
      "updateDate": "2018-11-20T01:20:31.000Z"
    }
  },
}

