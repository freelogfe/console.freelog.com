/**
 * Storage
 * > - https://github.com/marcuswestin/store.js
 * > - https://github.com/marcuswestin/store.js#make-your-own-build
 // Example custom storage
 var storage = {
	name: 'myStorage',
	read: function(key) { ... },
	write: function(key, value) { ... },
	each: function(fn) { ... },
	remove: function(key) { ... },
	clearAll: function() { ... }
}
 var store = require('store').createStore(storage)
 */

import store from 'store'

var engine = require('store/src/store-engine')
var cookieStorage = [
  require('store/storages/cookieStorage')
]
var plugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
];

var sessionStorages = [
  require('store/storages/sessionStorage')
]

export const sessionStore = engine.createStore(sessionStorages, plugins)
export const cookieStore = engine.createStore(cookieStorage, plugins)
export default store
