
const getters = {
  session: state=> state.user.session,
  sidebar: state=> state.sidebar,
  serverTime: state=> +new Date() //mock
}

export default getters;
