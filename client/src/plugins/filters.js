import ACCOUNT_CONFIG from '../config/account'
import {format} from 'date-fns'

export default (Vue, options) => {
  Vue.filter('humanizeNumber', function (value) {
    return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })


  Vue.filter('fmtDate', function (value, frm) {
    if (!value) return 'YYYY/MM/DD'
    var date = new Date(value)
    frm = frm || ''
    return format(date, frm)
  })

  //单位转换+千分位格式化
  var ACCOUNT_MAP = Object.values(ACCOUNT_CONFIG).reduce((AccountMap, accountType) => {
    AccountMap[accountType.abbr] = accountType
    return AccountMap
  }, {});
  Vue.filter('humanizeCurrency', function (value, abbr) {
    if (!value) return '0'
    var account = ACCOUNT_MAP[abbr || 'feth']
    var values = (value / account.unit).toString().split('.', 2)
    //123456789->12,3456,789
    return values[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (values[1] === undefined ? '' : `.${values[1]}`)
  })
}
