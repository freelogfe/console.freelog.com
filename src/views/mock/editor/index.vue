<template>
    <div style="margin: 0 auto; width: 1200px;">

        <div>
            <div style="height: 35px;"></div>
            <el-alert
                style="height: 60px;"
                title="mock资源只可在模拟资源池内使用，若要将mock资源发行，需在创建成功后，先将mock资源转为正式资源"
                type="info"
                center
                :closable="false"
                show-icon>
            </el-alert>
            <div style="height: 35px;"></div>
        </div>

        <div>
            <div style="color: #666; font-size: 14px; font-weight: 600;">资源上传</div>
            <div style="height: 6px;"></div>
            <div style="background-color: #fff;">

                <SmallTitle>资源类型</SmallTitle>

                <div style="padding-left: 40px;">
                    <el-select
                        style="width: 160px; line-height: 38px;"
                        v-model="resourceType"
                        placeholder="资源类型"
                        allow-create
                        filterable
                    >
                        <el-option
                            v-for="item in resourceTypes"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>

                    </el-select>

                    <div
                        style="font-size: 13px; padding-left: 20px; display: inline-block; vertical-align: bottom;"
                        :style="{color: resourceTypeTip? 'red': '#afafaf'}"
                        class="animated"
                        :class="{shake: resourceTypeTip}"
                    >
                        <small>•</small>
                        上传资源之前需要选择资源类型
                    </div>
                </div>

                <SmallTitle>资源文件</SmallTitle>

                <div style="padding-left: 40px;">
                    <UploadFile
                        :fileType="resourceType"
                        :fileInfo="uploadFileInfo"
                        :onFileInfoChange="onFileInfoChange"
                        @error="onUploadNoType"
                    />
                </div>

                <SmallTitle>资源名称</SmallTitle>

                <div style="padding-left: 40px;">
                    <el-input
                        :minlength="1"
                        :maxlength="100"
                        v-model="resourceName"
                        placeholder="输入资源名称"
                        style="width: 590px;"
                    ></el-input>

                    <span style="color: #c3c3c3; font-size: 14px; font-weight: 500; padding-left: 10px;">{{resourceName.length}}/100</span>
                </div>

                <SmallTitle :dot="false">资源封面</SmallTitle>

                <div style="padding-left: 40px;">
                    <UploadCover
                        :imageUrl="coverURL"
                        :onUploaded="coverUploaded"
                    />

                    <div
                        style="font-size: 13px; padding-left: 20px; display: inline-block; vertical-align: bottom; color: #afafaf;"
                    >
                        <small style="vertical-align: top;">• </small>
                        <div style="display: inline-block;">
                            只支持JPG/PNG/GIF，GIF文件不能动画化，<br/>大小不超过5M
                            建议尺寸为800X600
                        </div>
                    </div>
                </div>

                <div style="height: 20px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export {default} from './index';
</script>

<style lang="less" scoped>
    @import 'index.less';
</style>
