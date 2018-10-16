import {Message} from 'element-ui';

export default Vue => {
  const Error = {
    showErrorMessage: (err) => {
      if (!err) {
        return
      }

      console.error(err)
      var msg
      if (typeof err === 'string') {
        msg = err
      } else if (err.response && err.response.errorMsg) {
        msg = err.response.errorMsg
      } else if (err.message) {
        msg = err.message
      } else if (err.msg) {
        msg = err.msg
      } else {
        msg = err.toString()
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

