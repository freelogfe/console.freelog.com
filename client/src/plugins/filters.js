export default (Vue, options) => {
  Vue.filter('fmtDate', function (value, frm) {
    if (!value) return ''
    var date = new Date(value)
    return date.toLocaleDateString()
  })
}
