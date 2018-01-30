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
var storages = [
  require('store/storages/cookieStorage')
]
var plugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
];

export const cookieStore = engine.createStore(storages, plugins)
export default store
