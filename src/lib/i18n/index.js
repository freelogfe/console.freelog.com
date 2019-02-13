import Vue from 'vue'
import I18n from 'vue-i18n'
import en from './locales/en'
import cn from './locales/cn'
Vue.use(I18n)

// https://kazupon.github.io/vue-i18n/dynamic.html
export default new I18n({
  locale: 'cn',
  messages: {
    en,
    cn
  }
})
