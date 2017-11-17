/**
 * vue plugins
 */

import axios from './axios'
import title from './title'
import services from './services'
import nprogress from './nprogress'
import authorize from './authorize'
import filters from './filters'

export default {
  install (Vue) {
    axios(Vue)
    title(Vue, { property: 'title', separator: ' » ' })
    services(Vue)
    nprogress(Vue)
    authorize(Vue)
    filters(Vue)
  }
}
