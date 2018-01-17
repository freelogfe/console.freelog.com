<template>
  <div class="create-form-wrap" v-if="formData.data">
    <div class="step-1 op-step" id="js-form-step-1">
      <div class="step-header">
        <div class="step-circle">1</div>
        <div class="step-title">选择合同策略<span style="color:#f56c6c;margin-left: 3px">*</span></div>
      </div>
      <el-table
        class="step-body contract-select-wrap"
        :data="formData.data.policy">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <pre>{{scope.row._formatSegmentText}}</pre>
          </template>
        </el-table-column>
        <el-table-column
          label="segmentId"
          prop="segmentId">
        </el-table-column>

        <el-table-column
          label="目标用户">
          <template slot-scope="props">
            <el-tag
              v-for="(forUser, index) in props.row.forUsers"
              :key="index"
              :type="forUser.type==='individual'?'':'warning'">
              {{forUser.users}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          width="100"
          label="操作">
          <template slot-scope="props">
            <el-radio v-model="selectedIndex"
                      :label="props.$index"
                      @change="segmentChangeHandler(formData)">
              <span title="placeholder"></span>
            </el-radio>
            <el-tooltip class="item" effect="dark" content="该策略已经创建过合同" placement="top"
                        v-show="props.row.created">
              <i class="el-icon-info"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="取消选择" placement="top"
                        v-show="selectedIndex===props.$index">
              <i class="el-icon-circle-close-outline"
                 @click="segmentChangeHandler(formData, false)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="step-2 op-step">
      <div class="step-header">
        <div class="step-circle">2</div>
        <div class="step-title">创建用户消费策略</div>
      </div>
      <el-form class="step-body policy-edit-wrap" label-position="right" label-width="100px">
        <el-form-item label="资源合同名称">
          <el-input v-model="formData.presentableName"
                    placeholder="请输入presentable name"></el-input>
        </el-form-item>
        <el-form-item label="资源标签" prop="presentableTags">
          <freelog-tags v-model="formData.presentableTags"></freelog-tags>
        </el-form-item>
        <el-form-item label="用户消费策略">
          <presentable-policy v-model="formData.userPolicy"></presentable-policy>
        </el-form-item>
      </el-form>
    </div>

    <div class="step-3 op-step" v-if="formData.widgets && formData.widgets.length > 0">
      <div class="step-header">
        <div class="step-circle">3</div>
        <div class="step-title">创建pagebuild presentable补充说明</div>
      </div>
      <div class="step-body">
        <el-alert
          title="该资源依赖以下资源，创建好page build后，需签约以下资源page build方可使用"
          type="warning"
          :closable="false"
          show-icon>
        </el-alert>
        <ul class="dep-widget-list">
          <li v-for="widget in formData.widgets" class="widget-detail-link">
            <a :href="widget.detailUrl" target="_blank">
              <el-tag type="warning">{{widget.resourceName}}</el-tag>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import FreelogTags from '@/components/Tags/index.vue'
  import PresentablePolicy from '../policy/index.vue'
  import CONFIG from '@/config/index'
  import compiler from 'freelog_policy_compiler'

  export default {
    name: 'presentable-creator',
    data() {
      return {
        selectedIndex: false
      }
    },
    props: {
      formData: Object
    },
    mounted() {
    },
    components: {
      FreelogTags,
      PresentablePolicy
    },
    methods: {
      segmentChangeHandler(formData, select) {
        if (select !== undefined) {
          this.selectedIndex = select
        }

        formData.selectedPolicy = formData.data.policy[this.selectedIndex] || false
        console.log(formData.selectedPolicy)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "creator.less";
</style>
