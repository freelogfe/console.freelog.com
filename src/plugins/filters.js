import { format } from 'date-fns'
import ACCOUNT_CONFIG from '../config/account'

export default (Vue) => {
  Vue.filter('humanizeNumber', value => value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))


  Vue.filter('fmtDate', (value, frm) => {
    if (!value) return ''
    const date = new Date(value)
    frm = frm || 'YYYY/MM/DD'
    return format(date, frm)
  })

  // 单位转换+千分位格式化
  const ACCOUNT_MAP = Object.values(ACCOUNT_CONFIG).reduce((AccountMap, accountType) => {
    AccountMap[accountType.abbr] = accountType
    return AccountMap
  }, {})
  Vue.filter('humanizeCurrency', (value, abbr) => {
    if (!value) return '0'
    const account = ACCOUNT_MAP[abbr || 'feth']
    const values = (value / account.unit).toString().split('.', 2)
    // 123456789->12,3456,789
    return values[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (values[1] === undefined ? '' : `.${values[1]}`)
  })
}
