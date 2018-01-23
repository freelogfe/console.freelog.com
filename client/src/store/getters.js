
const getters = {
  session: state=> state.user.session,
  sidebar: state=> state.sidebar,
  node: state=> state.node,
  serverTime: state=> +new Date() //mock
}

export default getters;
