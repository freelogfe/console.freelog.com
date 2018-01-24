import {OtherService} from '@/services'

const types = {
  CHECK_NODE: 'checkNode',
  DELETE_NODE: 'deleteNode',
  CHANGE_NODE: 'changeNode'
};

const node = {
  state: {
    loginNode: {
      nodeId: ':nodeId'
    }
  },

  mutations: {
    [types.DELETE_NODE](state) {
      state.loginNode = null
    },
    [types.CHANGE_NODE](state, data) {
      state.loginNode = data
    }
  },

  actions: {
    [types.CHECK_NODE]({commit, getters}) {
      return new Promise((resolve, reject) => {
        if (getters.node.loginNode && getters.node.loginNode.nodeDomain) {
          resolve(getters.node.loginNode)
        } else {
          resolve(null)
        }
      })
    },
    [types.DELETE_NODE]({commit, getters}) {
      commit(types.DELETE_NODE)
    },
    [types.CHANGE_NODE]({commit}, data) {
      commit(types.CHANGE_NODE, data)
      return new Promise((resolve) => {
        setTimeout(resolve, 50)
      })
    }
  }
}

export default node
