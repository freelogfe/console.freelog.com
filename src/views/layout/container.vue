<template>
  <transition name="content">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'fl-container',
  beforeRouteUpdate(to, from, next) {
    let toPath = to.fullPath
    const params = this.$route.params
    let matched = false

    // 适配多级嵌套参数解析
    Object.keys(params).forEach((key) => {
      const match = `:${key}`
      if (toPath.indexOf(match) > -1) {
        matched = true
        toPath = toPath.replace(match, params[key])
      }
    })
    matched ? next({ path: toPath }) : next()
  }
}
</script>

<style>
  body, .app-wrapper {
    height: 100%;
  }
</style>
