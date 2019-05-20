<template>
  <div class="tree-node" :class="[]">
    <div class="node-content warning">
      <div class="node-key" @click="tapNodeKey">
        <i class="el-icon-tickets">
          <i class="el-icon-setting"></i>
        </i>
      </div>
      <div class="node-label" @click="tapNodeContent(data)">{{data.label}}</div>
    </div>
    <transition name="fade">
      <div class="children-box" v-if="data.children && data.isShowChildren">
        <contract-tree v-for="child in data.children" :data="child" @show-contract="tapNodeKey"></contract-tree>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'contract-tree',
    props: {
      data: Object,
    },
    data() {
      return {

      }
    },
    methods: {
      tapNodeContent(data) {
        data.isShowChildren = !data.isShowChildren
      },
      tapNodeKey() {
        this.$emit('show-contract', )
      }
    },
  }
</script>

<style lang="less" type="text/less" scoped>

  .fade-enter-active {
    transition: all .5s ease;
  }
  .fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }

  .tree-node {
    display: -webkit-box;
    box-sizing: border-box; position: relative;
    text-align: left;

    &.first-level {
      padding-bottom: 0;
      &:first-child:before {
        width: 30px;
      }
    }

    &:not(:last-child):before {
      content: '';
      position: absolute; left: -30px; top: 17px; bottom: -21px; z-index: 0;
      width: 30px; border: 1px solid #BABABA; border-top-width: 0; border-right-width: 0;
      border-bottom-left-radius: 6px;
    }
    &:first-child:before {
      content: '';
      position: absolute; top: 31px; right: 100%; z-index: 0;
      width: 45px; height: 1px;
      background-color: #BABABA;
    }

    .node-content {
      overflow: hidden;
      padding: 2px 0 20px 2px;
      font-size: 20px; z-index: 5;

      &.success {
        .node-key { border-color: #50C190; box-shadow: 0 0 5px #50C190B3; }
        .el-icon-setting { color: #50C190; }
      }
      &.error {
        .node-key { border-color: #E35A5F; box-shadow: 0 0 5px #E35A5FB3; }
        .el-icon-setting { color: #E35A5F; }
      }
      &.warning {
        .node-key { border-color: #E6A232; box-shadow: 0 0 5px #E6A232B3; }
        .el-icon-setting { color: #E6A232; }
      }

      .node-key {
        position: relative; float: left; cursor: pointer;
        width: 60px; height: 60px; border: 1px solid #ccc; border-radius: 50%;
        line-height: 60px; font-size: 12px; text-align: center; background-color: #fff;
        .el-icon-tickets { position: relative; margin-top: 12px; font-size: 36px; }
        .el-icon-setting {
          position: absolute; bottom: 0; left: 0; z-index: 1;
          transform: translate(-6%, 12%);
          font-size: 22px; font-weight: bold; background-color: #fff;
        }
      }
      .node-key:after {
        content: '';
        position: absolute; left: 100%; top: 29px; z-index: 0;
        width: 41px; height: 1px;
        background-color: #BABABA;
      }
      .node-label {
        float: left; box-sizing: border-box;
        display: flex; justify-content: center; align-items: center;
        width: 160px; height: 60px; padding: 2px 6px; margin-left: 40px; border: 1px solid #ccc; border-radius: 6px;
        font-size: 14px; text-align: center; background-color: #fff; cursor: pointer;
      }
    }

    .children-box {
      position: relative; padding-left: 45px;
      /*padding-top: 48px; transform: translate(100%, -48px);*/
    }
  }

</style>
