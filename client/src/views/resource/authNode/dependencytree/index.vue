<template id="">
  <section>
    <div class="dep-list">
      <el-tag
        v-for="tag in deps"
        :key="tag.name"
        closable
        class="dep-item"
        @close="closeDepHandler(tag)"
        type="">
        {{tag.name}}
      </el-tag>
    </div>
    <div id="dep-tree"></div>
  </section>
</template>

<script type="text/javascript">
  import DependencyTree from './index.js'

  export default DependencyTree
</script>


<style scoped>
  .dep-list {
    margin-bottom: 15px;
  }
  .dep-item {
    margin-right: 6px;
  }
  #dep-tree {
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 10px;
    box-shadow: 0 0 1px 1px #ccc;
  }
</style>
