/**
 * Storage
 * > - https://github.com/marcuswestin/store.js
 * > - https://github.com/marcuswestin/store.js#make-your-own-build
 */

import store from 'store'

const engine = require('store/src/store-engine')
const cookieStorage = [
  require('store/storages/cookieStorage')
]
const plugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
]

const sessionStorages = [
  require('store/storages/sessionStorage')
]

export const sessionStore = engine.createStore(sessionStorages, plugins)
export const cookieStore = engine.createStore(cookieStorage, plugins)
export default store
