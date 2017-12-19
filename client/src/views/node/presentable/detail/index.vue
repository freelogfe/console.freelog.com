<template>
  <section>
    <!--<el-button @click="debugHandler">debugger</el-button>-->
    <presentable-steps class="presentable-steps" :active="1" v-if="!detail.presentableId"></presentable-steps>

    <el-tabs :tab-position="tabPosition" v-model="activeTabName">
      <el-tab-pane label="资源详情" name="resource">
        <ul class="p-detail" v-if="detail._resourceDetail">
          <li><label>resource Id</label><span>{{detail._resourceDetail.resourceId}}</span></li>
          <li><label>resource name</label><span>{{detail._resourceDetail.resourceName}}</span></li>
          <li><label>resource type</label><span>{{detail._resourceDetail.resourceType}}</span></li>
          <li><label>resource status</label><span>{{detail._resourceDetail.status}}</span></li>
          <li><label>resource author</label><span>{{detail._resourceDetail.userId}}</span></li>
          <li><label>resource create date</label><span>{{detail._resourceDetail.createDate|fmtDate}}</span></li>
          <li><label>resource file size</label><span>{{detail._resourceDetail.systemMeta.fileSize}}</span></li>

        </ul>
      </el-tab-pane>
      <el-tab-pane label="presentable 详情" name="presentable">
        <ul class="p-detail" v-if="detail.presentableId">
          <li><label>presentable name</label><span>{{detail.name}}</span></li>
          <li><label>presentable Id</label><span>{{detail.presentableId}}</span></li>
          <li><label>create date</label><span>{{detail.createDate | fmtDate}}</span></li>
          <li><label>use policy</label>
            <div v-for="segment in detail.policy">
              <pre>{{segment._formatSegmentText}}</pre>
            </div>
          </li>
        </ul>
        <div class="uncreated-policy-tip" v-else>
          还未创建user policy
          <el-button @click="createUserPolicyHandler">去创建</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同详情" name="contract">
        <div v-if="detail._contractDetail">
          <ul class="p-detail">
            <li>
              <label>contract Id</label><span>{{detail._contractDetail.contractId}}</span>
            </li>
            <li>
              <label>合同状态：</label>
              <span>{{detail._contractDetail.statusTip}}</span>
            </li>
            <li>
              <label>合同甲方：</label>
              <span>{{detail._contractDetail.partyOne}}</span>
            </li>
            <li>
              <label>合同乙方：</label>
              <span>{{detail._contractDetail.partyTwo}}</span>
            </li>
            <li>
              <label>合同创建时间：</label>
              <span>{{detail._contractDetail.createDate|fmtDate}}</span>
            </li>
            <li>
              <label>合同当前状态：</label>
              <span>{{detail._contractDetail.fsmState}}</span>
            </li>
            <li>
              <label>合同详情：</label>
              <pre>{{detail._contractDetail.policySegment._formatSegmentText}}</pre>
            </li>
            <li>
              <label>合同事件：</label>
              <el-select v-model="selectedContractEvent" placeholder="请选择">
                <el-option
                  v-for="(event, index) in detail._contractDetail.events"
                  v-html="event.desc"
                  :key="Math.random()"
                  :label="event.desc"
                  :value="event"
                >
                </el-option>
              </el-select>
              <el-button :disabled="!selectedContractEvent" @click="executeContractHandler">trigger</el-button>
            </li>
          </ul>
        </div>
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
