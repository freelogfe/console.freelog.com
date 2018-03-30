<template id="">
<section>
  <el-tabs  type="border-card" v-model="activeName" @tab-click="tabChange"  @tab-remove="removeTab">

    <!-- <el-tab-pane label="授权策略" name="policy">
      <policy-editor ref="policyEditor"
                     v-model="policyText"
                     @validate="validatePolicyHandler"
                     :resourceId="resourceId"></policy-editor>
                     <div style="margin-top: 15px">
                       <el-button type="primary"
                                  :loading="loading"
                                  @click="submitResourceHandler('createForm')" :disabled="!send">创建</el-button>
                     </div>
    </el-tab-pane> -->

    <el-tab-pane label="授权管理" name="resourceInfo">
      <el-button style="margin-bottom:15px;" type="primary" @click="newAuthNode()">创建授权点</el-button>
      <div style="width:50%;">
        <table-view class="resource-list" :loader="loader()">
          <el-table-column
            label="授权点名称">
            <template slot-scope="scope">
              {{scope.row.resourceName}}
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="统计信息">
            <template slot-scope="scope">
            <div class="">
             资源数：4
            </div>
            <div class="">
              已关联数：3
            </div>
            <div class="">
              已签约数：2
            </div>
            <div class="">
              激活数：1
            </div>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button style="margin-bottom:15px;"  @click="changeAuthNode(scope.row.resourceId, scope.row.resourceName)">修改授权</el-button>
            </template>
          </el-table-column>
        </table-view>
      </div>
    </el-tab-pane>


    <el-tab-pane
      v-for="(item, index) in editableTabs2"
      :key="item.name"
      :label="item.title"
      :name="item.name"
       :closable="true"
    >
      <component :is="item.content" :ref="item.ref" :tab-name="item.name" :data="item.data"></component>
    </el-tab-pane>


  </el-tabs>

</section>
</template>

<script>
  import AuthNode from './index'

  export default AuthNode
</script>
