import {Message} from 'element-ui';

export default Vue => {
  const Error = {
    showErrorMessage: (err) => {
      var msg
      if (typeof err === 'string') {
        msg = err
      } else {
        msg = (err.response && err.response.errorMsg) || err.message || err
      }
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

