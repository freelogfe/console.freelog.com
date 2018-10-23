
const getters = {
  session: state => state.user.session,
  sidebar: state => state.sidebar,
  nodes: state => state.node.nodes,
  serverTime: state => +new Date() // mock
}

export default getters
