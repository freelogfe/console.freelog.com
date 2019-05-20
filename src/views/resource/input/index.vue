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
                <h4>资源信息</h4>
                <div class="input-area res-info-input-wrap">
                    <div class="input-lf-side">
                        <div class="require-input input-item">
                            <el-form-item prop="resourceName">
                                <input
                                    type="text"
                                    class="input-rect"
                                    v-model="formData.resourceName"
                                    :placeholder="$t('resourceEditView.resourceTitle')"
                                >
                            </el-form-item>
                        </div>
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
                                :placeholder="$t('resourceEditView.selectType')"
                            >
                                <el-option
                                    :label="$t('resourceEditView.selectType')"
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
                        <div
                            class="resource-file-input require-input input-item"
                            v-if="showCreatorInputItem"
                        >
                            <div
                                class="resource-file-uploader-wrap"
                                v-show="shouldShowResourceUploader === true"
                            >
                                <el-popover
                                    ref="uploadPopTip"
                                    placement="bottom-start"
                                    title=""
                                    width="200"
                                    trigger="hover"
                                    :disabled="!!formData.resourceType">{{$t('resourceEditView.uploadPopTip')}}
                                </el-popover>
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
                                    <i class="el-icon-plus"></i>
                                    <div class="resource-file-tip">
                                        <p>{{$t('resourceEditView.resourceFile')}}</p>
                                        <p class="resource-file-sub-tip">
                                            {{$t('resourceEditView.uploadResourceRule')}}</p>
                                    </div>
                                </el-upload>
                            </div>
                            <div
                                class="resource-upload-state
                                 clearfix"
                                v-show="shouldShowResourceUploader === false"
                            >
                                <div class="upload-state-wrap">
                                    <i class="el-icon-document">
                                        <span
                                            v-if="!shouldShowResourceUploader && uploaderStates.resource.percentage < 100">{{uploaderStates.resource.percentage}}</span>
                                        <i
                                            v-else
                                            class="el-icon-circle-check"
                                        ></i>
                                    </i>
                                </div>
                                <div>
                                    <p class="upload-file-name">{{formData.filename}}
                                        <el-button
                                            type="text"
                                            style="color: #C3C3C3;font-size: 12px;padding: 0;"
                                            size="mini"
                                            @click="reuploadHandler('resource')"
                                        >
                                            {{$t('resourceEditView.reUploadText')}}
                                        </el-button>
                                    <p class="resource-file-size"> {{humanizeSize(formData.filesize)}}</p>
                                </div>
                            </div>
                        </div>

                        <template v-if="formData.resourceType === ResourceTypes.widget">
                            <div class="require-input input-item">
                                <el-form-item prop="widgetName">
                                    <input type="text" v-model="formData.widgetName"
                                           class="input-rect"
                                           :disabled="!showCreatorInputItem"
                                           :placeholder="$t('resourceEditView.widgetName')">
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
                    <div class="resource-thumbnail-input input-item">
                        <el-upload
                            v-show="!uploaderStates.thumbnail.isUploading"
                            class="resource-thumbnail-uploader"
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
                            :auto-upload="true">
                            <img v-if="formData.previewImage" :src="formData.previewImage" style="height: 100%;" alt="">
                            <template v-else>
                                <div>
                                    <i class="el-icon-plus"></i>
                                    <p class="thumbnail-tip">{{$t('resourceEditView.uploadPoster')}}</p>
                                </div>
                            </template>
                        </el-upload>
                        <div class="thumbnail-upload-state" v-show="uploaderStates.thumbnail.isUploading">
                            <div>
                                <i class="el-icon-circle-close" @click="clearUploaderHandler('thumbnail')"></i>
                                <el-progress
                                    style="margin-right: 20px;"
                                    :stroke-width="10"
                                    :percentage="uploaderStates.thumbnail.percentage"
                                    color="#333333"></el-progress>
                            </div>
                        </div>
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
    import ResourceInput from './index';

    export default ResourceInput;
</script>

<style lang="less" scoped>
    @import "index.less";
</style>

<style lang="less">
    @import "reset-el.less";
</style>
