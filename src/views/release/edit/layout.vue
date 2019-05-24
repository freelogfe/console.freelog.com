<template>
  <div class="release-editor-layout" v-if="release !== null">
    <div class="r-e-l-header clearfix">
      <div class="r-e-l-main-content">
        <div class="preview-box">
          <img :src="release.previewImages[0]" alt="" :class="{'resource-default-preview':!release.previewImages[0]}" >
        </div>
        <div class="cont">
          <div class="r-e-l-name">
            {{release.username}}/{{release.releaseName}}
            <span class="r-e-l-version">{{selectedVersion || release.latestVersion.version}}</span>
          </div>
          <div class="r-e-l-info">
            <span class="r-i-type">{{release.resourceType}}</span>
            <span class="r-i-date">{{release.updateDate | fmtDate}}</span>
            <span class="r-i-version">发行ID {{release.releaseId}}</span>
          </div>
          <div class="r-e-l-upcast" v-if="release.baseUpcastReleases.length > 0">
            <strong>基础上抛</strong>
            <span
                    class="upcast-release-item"
                    v-for="(item, index) in release.baseUpcastReleases"
                    :key="'upcast-release-' + index"
            ><i class="el-icon-back"></i>{{item.releaseName}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="r-e-l-main-content">
      <div class="r-e-l-row r-e-l-release" :class="{ 'tuck-up': isTuckUpRelease }">
        <h3>发行相关 <i class="el-icon-arrow-up" @click="isTuckUpRelease = !isTuckUpRelease"></i></h3>
        <div class="cont">
          <div class="r-e-w-release-intro">
            <h4>发行简介</h4>
            <div class="r-e-w-edit-box" v-if="isEditingIntro">
              <el-input type="textarea" :rows="4" v-model="tempEditingIntro"></el-input>
              <div class="r-e-w-btn-group">
                <el-button class="cnacel" size="small" round @click="cancelEditHandler">取消</el-button>
                <el-button type="primary" class="save" size="small" round @click="saveIntroHandler">保存</el-button>
              </div>
            </div>
            <template v-else>
              <div class="r-e-w-add-btn" v-if="release.intro === ''" @click="editIntroHandler"><i class="el-icon-plus"></i>添加简介</div>
              <template v-else>
                <p>{{release.intro}}</p>
                <div class="r-e-w-btn-group">
                  <el-button type="primary" class="edit" size="small" round v-if="!isEditingIntro" @click="editIntroHandler">编辑</el-button>
                  <el-button type="primary" class="save" size="small" round v-else  @click="saveIntroHandler">保存</el-button>
                </div>
              </template>
            </template>
          </div>
          <div class="r-e-w-release-policy">
            <h4>策略</h4>
            <div style="position: relative;">
              <template v-if="!isShowEditPolicy">
                <div class="r-e-w-r-no-policy" v-if="release.policies.length === 0">
                  无策略的发行不会在市场中出现
                  <span @click="addPolicyHandler"><i class="el-icon-circle-plus"></i>添加策略</span>
                </div>
                <div class="r-e-w-r-p-list" v-else>
                  <policy-list
                          :policyList="release.policies"
                          @add-policy="addPolicyHandler"
                          @update-policies="updatePolicies"
                  ></policy-list>
                </div>
              </template>
              <policy-editor
                      :policy="editTmpPolicy"
                      class="r-e-w-r-p-editor"
                      v-if="isShowEditPolicy"
                      @save="savePolicyHandler"
                      @cancel="cancelPolicyHandler"
              ></policy-editor>
            </div>
          </div>
        </div>
      </div>
      <div class="r-e-l-row r-e-l-r-version" :class="{ 'tuck-up': isTuckUpVersion }">
        <h3>版本相关 <i class="el-icon-arrow-up" @click="isTuckUpVersion = !isTuckUpVersion"></i></h3>
        <div class="cont">
          <slot name="about-version"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PolicyEditor from '@/components/PolicyEditor/index.vue'
  import PolicyList from '@/components/PolicyList/list.vue'
  import policy from "../../../services/policy";
  export default {
    name: 'release-editor-layout',
    components: {
      PolicyEditor, PolicyList,
    },
    props: {
      release: Object,
      type: String,
      selectedVersion: String
    },

    data() {
      return {
        editTmpPolicy: { policyName: '未命名策略', policyText: '' },
        isShowEditPolicy: false,
        isEditingIntro: false,
        isTuckUpRelease: true,
        isTuckUpVersion: false,
        tempEditingIntro: this.release.intro,
      }
    },
    methods: {
      updateRelease(params, message) {
        return this.$services.ReleaseService.put(this.release.releaseId, params)
          .then(res => {
            const {errcode, ret, msg, data} = res.data
            if (errcode === 0 && ret === 0) {
              this.$emit('update:release', data)
              message && this.$message({ type: 'success', message })
            } else {
              this.$error.showErrorMessage(msg)
            }
            return data
          }).catch(this.$error.showErrorMessage)
      },
      savePolicyHandler({ policyName, policyText }) {
        this.updateRelease({
          policyInfo: {
            addPolicies: [{
              policyName, policyText: window.btoa(policyText)
            }]
          }
        }, '策略添加成功！')
          .then(() => {
            this.editTmpPolicy = { policyName: '未命名策略', policyText: '' }
            this.isShowEditPolicy = false
          })
      },
      cancelPolicyHandler() {
        this.isShowEditPolicy = false
      },
      addPolicyHandler(policy) {
        this.isShowEditPolicy = true
      },
      updatePolicies(policy) {
        this.updateRelease({
          policyInfo: {
            updatePolicies: [ policy ]
          }
        })
          .then(() => {
            if(policy.status === 1) {
              this.$message({type: 'success', message: `策略"${policy.policyName}"已启用！`})
            }else if(policy.status === 0){
              this.$message({type: 'warning', message: `策略"${policy.policyName}"已停用！`})
            }
          })
      },
      editIntroHandler() {
        this.isEditingIntro = true
        this.tempEditingIntro = this.release.intro
      },
      cancelEditHandler() {
        this.isEditingIntro = false
        this.tempEditingIntro = ''
      },
      saveIntroHandler() {
        var successMsg = this.release.intro === '' ? '发行简介添加成功！' : '发行简介更新成功！'
        this.updateRelease({ intro: this.tempEditingIntro }, successMsg)
          .then(() => {
            this.isEditingIntro = false
          })
      },
    },
    created() {
      this.isTuckUpRelease = this.type === 'add'
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import './layout.less';
</style>
