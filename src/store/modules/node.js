import {storage} from '@/lib'
import NodeDataLoader from '@/data/node/loader'

const types = {
  CHECK_NODE: 'checkNode',
  CHANGE_NODE: 'changeNode',
  ADD_NODE: 'addNode',
  LOAD_NODES: 'loadNodes'
};

const node = {
  state: {
    nodes: []
  },

  mutations: {
    [types.CHANGE_NODE](state, data) {
    },
    [types.ADD_NODE](state, data) {
      state.nodes.push(data)
    },
    [types.LOAD_NODES](state, data) {
      state.nodes = data
    },
  },

  actions: {
    [types.CHECK_NODE]({commit, getters}) {
      return new Promise((resolve, reject) => {
        resolve(null)
      })
    },
    [types.LOAD_NODES]({commit, getters}) {
      return new Promise((resolve) => {
        var userId = getters.session.user && getters.session.user.userId;
        if (userId) {
          NodeDataLoader.onloadNodeList({
            ownerUserId: userId,
            pageSize: 1e2
          }).then(data => {
            var nodes = data.dataList
            commit(types.LOAD_NODES, nodes)
            resolve(nodes)
          })
        } else {
          resolve(null)
        }
      })
    },
    [types.ADD_NODE]({commit, getters}, node) {
      commit(types.ADD_NODE, node)
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
