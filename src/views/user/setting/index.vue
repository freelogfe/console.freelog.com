<template>
  <div class="user-setting-view">
    <el-form label-width="120px" label-position="left" class="small-el-form" :rules="rules">
      <el-form-item class="flex-grid" label="用户头像">
        <el-button @click="showImageCropUploader=true" type="text">
          <img :src="userInfo.headImage" class="user-avatar" alt="">
        </el-button>
        <CropImage v-model="showImageCropUploader"
                   :avatarUrl="avatarUrl"
                   :upload-success="uploadSuccessHandler"></CropImage>
      </el-form-item>
      <el-form-item class="flex-grid" label="用户姓名">
        <el-input v-model="userInfo.userName" disabled class="input-area" placeholder="未设置用户姓名"></el-input>
      </el-form-item>
      <el-form-item class="flex-grid" label="用户昵称">
        <el-input v-model="userInfo.nickname" disabled class="input-area" placeholder="未设置用户昵称"></el-input>
      </el-form-item>
      <el-form-item class="flex-grid" label="邮箱">
        <el-input v-model="userInfo.email" disabled class="input-area"
                  placeholder="未设置邮箱"></el-input>
      </el-form-item>
      <el-form-item class="flex-grid" label="手机号码">
        <el-input v-model="userInfo.mobile" disabled class="input-area"
                  placeholder="未设置手机号码"></el-input>
      </el-form-item>
      <el-form-item class="form-footer">
        <!--<el-button type="primary" plain @click="saveHandler">保存</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import CropImage from '@/components/CropImage/index.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'user-setting-view',

    data() {
      return {
        rules: {},
        userInfo: {},
        avatarUrl: '',
        showImageCropUploader: false
      }
    },
    components: {CropImage},

    computed: mapGetters({
      session: 'session'
    }),

    mounted() {
      this.userInfo = this.session.user
      this.avatarUrl = this.userInfo.headImage
    },

    methods: {
      saveHandler() {

      },
      uploadSuccessHandler() {
        this.showImageCropUploader = false
        this.$store.dispatch('changeAvatar')
      }
    }
  }
</script>

<style scoped lang="less">
  .user-setting-view {
    padding-top: 50px;
    width: 860px;
    margin: auto;
    .user-avatar {
      border-radius: 50%;
      width: 140px;
      height: 140px;
    }

    .input-area {
      width: 680px;
    }

    .form-footer {
      text-align: center;
    }
  }
</style>

<style lang="less">
  .user-setting-view {
    .small-el-form {
      .el-form-item {
        margin-bottom: 50px;
        .el-form-item__label {
          &:before {
            content: ' ';
            display: inline-block;
            width: 3px;
            background-color: #666666;
            height: 14px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
    }
    .el-input__inner {
      border: none;
      border-bottom: 1px solid #E0E0E0;
      border-radius: 0;
    }
  }
</style>