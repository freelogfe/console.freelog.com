<template>
  <section>
    <!--<el-button @click="debugHandler">debugger</el-button>-->
    <presentable-steps class="presentable-steps" :active="1" v-if="!detail.presentableId"></presentable-steps>

    <el-tabs :tab-position="tabPosition" v-model="activeTabName">
      <el-tab-pane label="资源详情" name="resource">
        <ul class="p-detail" v-if="detail._resourceDetail">
          <li>
            <label class="item-title">resource Id</label>
            <span class="item-detail">{{detail._resourceDetail.resourceId}}</span>
          </li>
          <li>
            <label class="item-title">resource name</label>
            <span class="item-detail">{{detail._resourceDetail.resourceName}}</span>
          </li>
          <li>
            <label class="item-title">resource type</label>
            <span class="item-detail">{{detail._resourceDetail.resourceType}}</span>
          </li>
          <li>
            <label class="item-title">status</label>
            <span class="item-detail">{{detail._resourceDetail.status}}</span>
          </li>
          <li>
            <label class="item-title">author</label>
            <span class="item-detail">{{detail._resourceDetail.userId}}</span>
          </li>
          <li>
            <label class="item-title">create date</label>
            <span class="item-detail">{{detail._resourceDetail.createDate|fmtDate}}</span>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="presentable 详情" name="presentable">
        <div v-if="detail.presentableId">
          <ul class="p-detail">
            <li>
              <label class="item-title">presentable Id</label>
              <span class="item-detail">{{detail.presentableId}}</span>
            </li>
            <li>
              <label class="item-title">create date</label>
              <span class="item-detail">{{detail.createDate | fmtDate}}</span>
            </li>
            <li>
              <label class="item-title">presentable name</label>
              <span class="item-detail">
              <el-input v-model="detail.name"></el-input>
            </span>
            </li>
            <li>
              <label class="item-title">tags</label>
              <div class="item-detail">
                <presentable-tags v-model="detail.tagInfo.userDefined"></presentable-tags>
              </div>
            </li>
            <li>
              <label class="item-title">user policy</label>
              <div class="item-detail" style="width: 500px;">
                <presentable-policy v-model="detail._formatSegmentText"></presentable-policy>
              </div>
            </li>
            <el-button type="primary" @click="updatePresentableHandler">更新presentable</el-button>
          </ul>
        </div>
        <div class="uncreated-policy-tip" v-else>
          还未创建user policy
          <el-button @click="updatePresentableHandler">创建</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同详情" name="contract">
        <presentable-contract-detail :contractDetail="detail._contractDetail"></presentable-contract-detail>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
  import PresentableDetail from './index'

  export default PresentableDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
