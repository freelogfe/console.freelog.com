<template>
  <div class="tree-node" :class="[]">
    <div class="node-content success">
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
        this.$emit('show-contract')
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
      &:first-child:after {
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
      top: 21px;
    }

    &:first-child:after {
      content: '';
      position: absolute; top: 21px; right: 100%; z-index: 0;
      width: 60px; height: 1px;
      background-color: #BABABA;
    }

    .node-content {
      overflow: hidden;
      padding: 2px 0 20px 2px;
      font-size: 20px; z-index: 5;

      &.success {
        .node-key { border-color: #50C190; box-shadow: 0 0 5px rgba(80, 193, 144, .7); }
        .el-icon-setting { color: #50C190; }
      }
      .node-key {
        position: relative; float: left; cursor: pointer;
        width: 42px; height: 42px; border: 1px solid #ccc; border-radius: 50%;
        line-height: 42px; font-size: 12px; text-align: center; background-color: #fff;
        .el-icon-tickets { position: relative; margin-top: 9px; font-size: 24px; }
        .el-icon-setting {
          position: absolute; bottom: 0; left: 0; z-index: 1;
          transform: translate(-6%, 12%);
          font-size: 16px; font-weight: bold; background-color: #fff;
        }
      }
      .node-key:before {
        content: '';
        position: absolute; left: 100%; top: 50%; z-index: 0;
        width: 42px; height: 1px;
        background-color: #BABABA;
      }
      .node-label {
        float: left;
        width: 120px; margin-left: 40px; border: 1px solid #ccc; border-radius: 6px;
        font-size: 14px; line-height: 42px; text-align: center; background-color: #fff; cursor: pointer;
      }
    }

    .children-box {
      position: relative; padding-left: 60px;
      /*padding-top: 48px; transform: translate(100%, -48px);*/
    }
  }



  /*.children-box:before {*/
  /*content: '';*/
  /*position: absolute; top: 21px; left: 0; z-index: 0;*/
  /*width: 60px; height: 1px;*/
  /*background-color: red;*/
  /*}*/

</style>
