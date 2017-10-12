import * as Services from '../services'

export default Vue => {
  // alias
  var services = {};
  Object.keys(Services).forEach((name)=> {
    var sn = name.replace(/service/i, '');
    sn = sn[0].toLowerCase() + sn.substr(1);
    services[sn] = Services[name];
  });

  // mount the services to Vue
  Object.defineProperties(Vue, {
    services: {get: () => services}
  })

  // mount the services to Vue component instance
  Object.defineProperties(Vue.prototype, {
    $services: {get: () => services}
  })
}
