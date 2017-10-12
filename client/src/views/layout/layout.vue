<template>
  <div>
    <fl-header/>
    <section :class="['main', sidebar.openSidebar?'': 'collapse-sidebar']">
      <fl-sidebar class="left-sidebar"/>
      <main class="content">
        <fl-breadcrumb></fl-breadcrumb>
        <transition name="content">
          <router-view class="main-view"></router-view>
        </transition>
      </main>
    </section>
    <fl-footer class="footer-wrap"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Header from './Header/index.vue'
  import Sidebar from './Sidebar/index.vue'
  import Footer from './Footer/index.vue'
  import Breadcrumb from './breadcrumb/index.vue'

  export default {
    name: 'fl-layout',
    computed: mapGetters({
      sidebar: 'sidebar'
    }),
    components: {
      'fl-header': Header,
      'fl-sidebar': Sidebar,
      'fl-footer': Footer,
      'fl-breadcrumb': Breadcrumb
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/mixin.less";

  .main-view {
    padding: 15px;
  }

  .left-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
  }

  .content,
  .footer-wrap {
    margin-left: @sidebar-width;
    transition: all .5s;
  }

  .collapse-sidebar {
    .content {
      margin-left: 30px;
    }
  }
</style>
