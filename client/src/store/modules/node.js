import {storage} from '@/lib'

const types = {
  CHECK_NODE: 'checkNode',
  DELETE_NODE: 'deleteNode',
  CHANGE_NODE: 'changeNode'
};

const node = {
  state: {
    nodeSession: storage.get('nodeSession') || {
      nodeId: ':nodeId'
    }
  },

  mutations: {
    [types.DELETE_NODE](state) {
      state.nodeSession = {
        nodeId: ':nodeId'
      }
      storage.remove('nodeSession')
    },
    [types.CHANGE_NODE](state, data) {
      state.nodeSession = data
      storage.set('nodeSession', data)
    }
  },

  actions: {
    [types.CHECK_NODE]({commit, getters}) {
      return new Promise((resolve, reject) => {
        if (getters.nodeSession && getters.nodeSession.nodeDomain) {
          resolve(getters.nodeSession)
        } else {
          resolve(null)
        }
      })
    },
    [types.DELETE_NODE]({commit, getters}) {
      commit(types.DELETE_NODE)
      return new Promise((resolve) => {
        setTimeout(resolve, 10)
      })
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
