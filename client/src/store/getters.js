
const getters = {
  session: state=> state.user.session,
  sidebar: state=> state.sidebar,
  nodeSession: state=> state.node.loginNode,
  serverTime: state=> +new Date() //mock
}

export default getters;
