import { onloadNodeList } from '@/data/node/loader'

const types = {
  CHECK_NODE: 'checkNode',
  CHANGE_NODE: 'changeNode',
  ADD_NODE: 'addNode',
  LOAD_NODES: 'loadNodes'
}

const nodeMod = {
  state: {
    nodes: []
  },

  mutations: {
    [types.CHANGE_NODE]() {
    },
    [types.ADD_NODE](state, data) {
      state.nodes.push(data)
    },
    [types.LOAD_NODES](state, data) {
      state.nodes = data
    },
  },

  actions: {
    [types.CHECK_NODE]() {
      return new Promise((resolve) => {
        resolve(null)
      })
    },
    [types.LOAD_NODES]({ commit, getters }) {
      return new Promise((resolve) => {
        const userId = getters.session.user && getters.session.user.userId
        if (userId) {
          onloadNodeList({
            ownerUserId: userId,
            pageSize: 1e2
          }).then((data) => {
            const nodes = data.dataList
            commit(types.LOAD_NODES, nodes)
            resolve(nodes)
          })
        } else {
          resolve(null)
        }
      })
    },
    [types.ADD_NODE]({ commit }, node) {
      commit(types.ADD_NODE, node)
    },
    [types.CHANGE_NODE]({ commit }, data) {
      commit(types.CHANGE_NODE, data)
      return new Promise((resolve) => {
        setTimeout(resolve, 50)
      })
    }
  }
}

export default nodeMod
