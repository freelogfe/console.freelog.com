<template>
    <div
        class="resource-input-wrap"
        :class="['resource-edit-mode-'+editMode]"
    >
        <el-form
            :model="formData"
            class="input-list"
            label-width="0"
            :rules="rules"
            ref="createForm"
        >
            <div class="input-item-wrap">
                <h4>资源上传</h4>
                <div class="input-area res-info-input-wrap">
                    <div class="input-lf-side">

                        <!-- 上传类型 -->
                        <div class="require-input input-item">
                            <el-popover
                                ref="typePopTip"
                                placement="top"
                                title=""
                                width="200"
                                trigger="hover"
                                :disabled="enabledEditResourceType">
                                {{$t('resourceEditView.changeTypeTip')}}{{showCreatorInputItem?
                                $t('resourceEditView.changeTypeTip2'): ''}}
                            </el-popover>
                            <el-select
                                :disabled="!enabledEditResourceType"
                                v-model="formData.resourceType"
                                allow-create
                                filterable
                                @change="resourceTypeChange"
                                v-popover:typePopTip
                                class="resource-type"
                                placeholder="资源类型"
                            >
                                <el-option
                                    label="资源类型"
                                    value="">
                                </el-option>
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>

                        <!-- 文件上传按钮 -->
                        <div
                            class="resource-file-input require-input special input-item"
                            v-if="showCreatorInputItem"
                        >
                            <!-- 上传按钮 -->
                            <div
                                class="resource-file-uploader-wrap"
                            >
                                <!--                                <el-popover-->
                                <!--                                    ref="uploadPopTip"-->
                                <!--                                    placement="bottom-start"-->
                                <!--                                    title=""-->
                                <!--                                    width="200"-->
                                <!--                                    trigger="hover"-->
                                <!--                                    :disabled="!!formData.resourceType">{{$t('resourceEditView.uploadPopTip')}}-->
                                <!--                                </el-popover>-->
                                <el-upload
                                    v-if="showCreatorInputItem"
                                    class="resource-file-uploader"
                                    drag
                                    ref="resourceUploader"
                                    :action="uploadResourceFileAction"
                                    :with-credentials="true"
                                    :multiple="false"
                                    :data="{resourceType: formData.resourceType}"
                                    :headers="uploader.headers"
                                    :before-upload="beforeUploadHandler"
                                    :on-error="errorHandler"
                                    :on-change="fileChangeHandler"
                                    :on-success="successHandler"
                                    :show-file-list="false"
                                    :disabled="!formData.resourceType"
                                    :on-progress="uploadProgressHandler"
                                    v-popover:uploadPopTip
                                    :auto-upload="true"
                                >
                                    <!--                                    <i class="el-icon-plus"></i>-->
                                    <!--                                    <div class="resource-file-tip">-->
                                    <!--                                        <p>{{$t('resourceEditView.resourceFile')}}</p>-->
                                    <!--                                        <p class="resource-file-sub-tip">-->
                                    <!--                                            {{$t('resourceEditView.uploadResourceRule')}}</p>-->
                                    <!--                                    </div>-->
                                    <div style="display: flex; align-items: flex-end;">
                                        <el-button>上传资源</el-button>
                                        <span style="font-size: 13px; color: #afafaf; padding-left: 20px;">* 上传资源之前需要选择资源类型；资源最大不超过50M</span>
                                    </div>
                                </el-upload>
                            </div>
                            <div style="height: 10px;"></div>

                            <!-- 上传进度 -->
                            <div
                                class="resource-upload-state
                                 clearfix"
                                style="display: block;"
                                v-show="shouldShowResourceUploader === false"
                            >
                                <!-- v-show="shouldShowResourceUploader === true" -->
                                <div style="background-color: #fafbfb;">
                                    <div
                                        style="display: flex; justify-content: space-between;  font-size: 16px; color: #333; padding: 0 20px; line-height: 45px; height: 45px">
                                        <span>{{formData.filename}}</span>
                                        <span>{{humanizeSize(formData.filesize)}}</span>
                                    </div>
                                    <div
                                        style="padding: 18px 20px; border-top: 1px solid #e8e8e8; display: flex; align-items: center;">
                                        <el-progress
                                            :percentage="uploaderStates.resource.percentage"
                                            :stroke-width="14"
                                            color="#409eff"
                                            :show-text="false"
                                            style="flex-shrink: 1; width: 100%;"
                                        ></el-progress>
                                        <span
                                            v-if="!uploaderStates.resource.isExistResource"
                                            style="width: 75px; flex-shrink: 0; padding-left: 14px; color: #3f9cfd; font-size: 14px; font-weight: 600;">
                                            {{uploaderStates.resource.percentage < 100 ? uploaderStates.resource.percentage + '%': '上传成功！'}}
                                        </span>
                                        <span
                                            v-else="uploaderStates.resource.isExistResource"
                                            style="width: 75px; flex-shrink: 0; padding-left: 14px; color: red; font-size: 14px; font-weight: 600;">
                                            重复上传
                                        </span>
                                    </div>
                                </div>
                                <!--                                <div class="upload-state-wrap">-->
                                <!--                                    <i class="el-icon-document">-->
                                <!--                                        <span-->
                                <!--                                            v-if="!shouldShowResourceUploader && uploaderStates.resource.percentage < 100">{{uploaderStates.resource.percentage}}</span>-->
                                <!--                                        <i-->
                                <!--                                            v-else-->
                                <!--                                            class="el-icon-circle-check"-->
                                <!--                                        ></i>-->
                                <!--                                    </i>-->
                                <!--                                </div>-->
                                <!--                                <div>-->
                                <!--                                    <p class="upload-file-name">{{formData.filename}}-->
                                <!--                                        <el-button-->
                                <!--                                            type="text"-->
                                <!--                                            style="color: #C3C3C3;font-size: 12px;padding: 0;"-->
                                <!--                                            size="mini"-->
                                <!--                                            @click="reuploadHandler('resource')"-->
                                <!--                                        >-->
                                <!--                                            {{$t('resourceEditView.reUploadText')}}-->
                                <!--                                        </el-button>-->
                                <!--                                    <p class="resource-file-size"> {{humanizeSize(formData.filesize)}}</p>-->
                                <!--                                </div>-->
                            </div>
                        </div>

                        <!-- 资源名称输入框 -->
                        <div class="require-input input-item">
                            <el-form-item prop="resourceName">
                                <input
                                    type="text"
                                    class="input-rect"
                                    v-model="formData.resourceName"
                                    placeholder="输入资源名称"
                                >
                            </el-form-item>
                        </div>

                        <template v-if="formData.resourceType === ResourceTypes.widget">
                            <div class="require-input input-item">
                                <el-form-item prop="widgetName">
                                    <input
                                        type="text"
                                        v-model="formData.widgetName"
                                        class="input-rect"
                                        :disabled="!showCreatorInputItem"
                                        :placeholder="$t('resourceEditView.widgetName')"
                                    >
                                </el-form-item>
                            </div>
                            <div class="require-input input-item">
                                <el-form-item prop="widgetVersion">
                                    <input type="text" v-model="formData.widgetVersion"
                                           class="input-rect"
                                           :disabled="!showCreatorInputItem"
                                           :placeholder="$t('resourceEditView.widgetVersion')">
                                </el-form-item>
                            </div>
                        </template>
                    </div>

                    <!-- 封面上传 -->
                    <div
                        class="resource-thumbnail-input input-item"
                        style="display: flex; align-items: flex-end;"
                    >
                        <el-upload
                            style="background-color: #fff;"
                            v-show="!uploaderStates.thumbnail.isUploading"
                            drag
                            ref="thumbnailUploader"
                            :action="uploadPreviewImageAction"
                            :with-credentials="true"
                            :data="uploader.data"
                            :headers="uploader.headers"
                            :on-error="errorHandler"
                            :on-change="previewImageChangeHandler"
                            :on-success="imageUploadSuccessHandler"
                            :before-upload="validateImageHandler"
                            :on-progress="uploadProgressHandler"
                            :show-file-list="false"
                            :auto-upload="true"
                        >

                            <div
                                v-if="!formData.previewImage"
                                class="resource-thumbnail-input__button-cover"
                            >
                                <i class="el-icon-circle-plus" style="color: #EDEDED"></i>
                                <p class="thumbnail-tip" style="color: #666666">上传封面</p>
                            </div>

                            <template v-if="formData.previewImage">
                                <img
                                    :src="formData.previewImage"
                                    style="height: 100%;"
                                    alt=""
                                >
                                <!--                            <template v-else>-->
                                <div
                                    class="resource-thumbnail-input__button-cover_uploaded"
                                >
                                    <i class="el-icon-circle-plus" style="color: #fff"></i>
                                    <p class="thumbnail-tip" style="color: #fff">重新上传</p>
                                </div>
                            </template>
                            <!--                            </template>-->
                        </el-upload>
                        <div style="display: flex; padding-left: 20px; font-size: 13px; color: #afafaf;">
                            <span>*&nbsp;</span>
                            <div>只支持JPG/PNG/GIF，GIF文件不能动画化，大小不超过5M 建议尺寸为800X600</div>
                        </div>
                        <!--                        <div-->
                        <!--                            class="thumbnail-upload-state"-->
                        <!--                            v-show="uploaderStates.thumbnail.isUploading"-->
                        <!--                        >-->
                        <!--                            <div>-->
                        <!--                                <i class="el-icon-circle-close" @click="clearUploaderHandler('thumbnail')"></i>-->
                        <!--                                <el-progress-->
                        <!--                                    style="margin-right: 20px;"-->
                        <!--                                    :stroke-width="10"-->
                        <!--                                    :percentage="uploaderStates.thumbnail.percentage"-->
                        <!--                                    color="#333333"></el-progress>-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                    </div>
                </div>
            </div>

            <div class="input-item-wrap">
                <h4>{{$t('resourceEditView.depResources')}}</h4>
                <div class="input-area" :class="{'edit-disabled': !canEditDependencies}">
                    <div>
                        <el-popover
                            ref="depsPopTip"
                            placement="top"
                            title=""
                            width="200"
                            trigger="hover"
                            :disabled="canEditDependencies"
                            :content="$t('resourceEditView.disableModifiedTip')">
                        </el-popover>
                        <el-button
                            class="add-dep-btn"
                            @click="showSearchDialogHandler"
                            type="text"
                            v-popover:depsPopTip
                            size="mini"><i class="el-icon-plus"></i>{{$t('resourceEditView.addDepResource')}}
                        </el-button>
                    </div>
                    <ul
                        class="res-deps-wrap"
                        v-if="deps.length"
                    >
                        <li
                            class="res-dep-item"
                            :key="index"
                            v-for="(dep,index) in deps"
                        >
                            <el-button
                                class="del-dep-btn"
                                @click="removeDepResourceHandler(dep, index)"
                                size="mini"
                                type="text"
                            >
                                <i class="el-icon-remove"></i>
                            </el-button>
                            <i class="dot"></i>{{dep.resourceName}}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="input-item-wrap">
                <h4>{{$t('resourceEditView.introTitle')}}</h4>
                <div class="input-area">
                    <rich-editor class="res-desc-editor"
                                 ref="editor"
                                 width="100%"
                                 v-model="formData.description"
                                 :config="editorConfig"
                                 @load="imgUploadSuccessHandler"
                                 :placeholder="$t('resourceEditView.inputDescTip')"></rich-editor>
                </div>
            </div>

            <div class="input-item-wrap">
                <h4>{{$t('resourceEditView.metaTitle')}}</h4>
                <div class="input-area">
                    <resource-meta-info v-model="meta" @validate="checkMetaValid"
                                        :placeholder="$t('resourceEditView.inputMetaTip')"></resource-meta-info>
                </div>
            </div>
        </el-form>

        <slot></slot>

        <el-dialog
            :visible.sync="showSearchResourceDialog"
            width="640px"
            :close-on-click-modal="true"
            :before-close="beforeCloseDialogHandler"
            top="10vh"
            center>
            <p slot="title" class="dialog-title" :style="{fontSize: '20px'}">{{$t('resourceEditView.addResource')}}</p>
            <SearchResource class="add-resource-input" @add="addDepResourceHandler"></SearchResource>
        </el-dialog>
    </div>
</template>


<script>
    import ResourceInput from './index'

    export default ResourceInput
</script>

<style lang="less" scoped>
    @import "index.less";
</style>

<style lang="less">
    @import "reset-el.less";
</style>
