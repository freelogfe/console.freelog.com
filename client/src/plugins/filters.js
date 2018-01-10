import ACCOUNT_CONFIG from '../config/account'

export default (Vue, options) => {
  //单位转换+千分位格式化
  var ACCOUNT_MAP = Object.values(ACCOUNT_CONFIG).reduce((AccountMap, accountType) => {
    AccountMap[accountType.abbr] = accountType
    return AccountMap
  }, {});


  Vue.filter('fmtDate', function (value, frm) {
    if (!value) return ''
    var date = new Date(value)
    return date.toLocaleDateString()
  })

  Vue.filter('humanizeCurrency', function (value, abbr) {
    if (!value) return '0'
    var account = ACCOUNT_MAP[abbr || 'feth']
    var values = (value / account.unit).toString().split('.', 2)
    //123456789->12,3456,789
    return values[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +(values[1] === undefined ? '' : `.${values[1]}`)
  })
}
