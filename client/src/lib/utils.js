function createLoader(loader) {
  var loading = false;
  var handles = [];
  var value;

  return function (callback) {
    if (value) {
      callback(value)
    } else if (loading) {
      handles.push(callback)
    } else {
      loading = true;
      handles.push(callback)
      loader(function (v) {
        value = v;
        let h;
        while ((h = handles.shift())) {
          h(v)
        }
      })
    }
  }
}


export {
  createLoader
}


export default {
  createLoader
}
