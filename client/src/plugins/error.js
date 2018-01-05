import {Message} from 'element-ui';

export default Vue => {
  const Error = {
    showErrorMessage: (err) => {
      if (!err) {
        return
      }

      var msg = (typeof err === 'string')? err: ((err.response && err.response.errorMsg) || err.message || err)
      Message.error(msg)
    }
  }
  Object.defineProperties(Vue.prototype, {
    $error: {
      get() {
        return Error
      }
    }
  })
}

