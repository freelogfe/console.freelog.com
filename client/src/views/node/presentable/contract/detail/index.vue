<template>
  <section>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <p>请选择转出账号: </p>
      <el-select v-model="account" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.accountId"
          :label="item.accountId"
          :value="item.accountId">
        </el-option>
      </el-select>
      <p>请输入支付密码: </p>
      <el-input type="password" v-model="password" placeholder="请输入支付密码"></el-input>
      <span slot="footer" class="dialog-footer">



        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pay()">确 定</el-button>
      </span>
    </el-dialog>
    <div v-if="contractDetail">
      <ul class="p-detail">
        <li>
          <label class="item-title">contract Id</label>
          <span class="item-detail">{{contractDetail.contractId}}</span>
        </li>
        <li>
          <label class="item-title">合同状态：</label>
          <span class="item-detail">{{formatContractDetail.statusTip}}</span>
        </li>
        <li>
          <label class="item-title">合同甲方：</label>
          <span class="item-detail">{{contractDetail.partyOne}}</span>
        </li>
        <li>
          <label class="item-title">合同乙方：</label>
          <span class="item-detail">{{contractDetail.partyTwo}}</span>
        </li>
        <li>
          <label class="item-title">合同创建时间：</label>
          <span class="item-detail">{{contractDetail.createDate|fmtDate}}</span>
        </li>
        <li>
          <label class="item-title">合同当前状态：</label>
          <span class="item-detail">
            <el-tag :type="contractDetail.status===3?'success':'info'">
            {{contractDetail.fsmState}}
            </el-tag>
          </span>
        </li>
        <li>
          <label class="item-title">合同详情：</label>
          <pre class="item-detail">{{contractDetail.policySegment.segmentText}}</pre>
        </li>
        <li v-show="formatContractDetail.events.length">
          <label class="item-title">合同事件：</label>
          <el-select v-model="selectedContractEvent"
                     class="item-detail"
                     placeholder="请选择">
            <el-option
              v-for="(event, index) in formatContractDetail.events"
              v-html="event.desc"
              :key="Math.random()"
              :label="event.desc"
              :value="index"
            >
            </el-option>
          </el-select>
          <el-button :disabled="selectedContractEvent === ''" @click="executeContractHandler">trigger</el-button>
        </li>
      </ul>
    </div>
  </section>



</template>

<script>
  import PresentableContractDetail from './index'

  export default PresentableContractDetail
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
