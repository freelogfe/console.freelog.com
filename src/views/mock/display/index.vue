<template>
    <div
        class="mock-list"
        :style="styleObject"
    >

        <!-- 左侧 bucket 列表 -->
        <div class="mock-list__buckets">
            <div style="height: 80px;"></div>

            <!-- buckets 标题 -->
            <div class="mock-list__buckets__title">
                <div class="mock-list__buckets__title__content">
                    <div>
                        <span>Bucket列表</span>
                        <span style="padding-left: 10px;">5/5</span>
                    </div>
                    <!--                    <a>-->
                    <!--                        <i class="el-icon-plus"></i>-->
                    <!--                    </a>-->
                    <el-button
                        icon="el-icon-plus"
                        circle
                        size="small"
                        @click="showNewBucketDialog"
                    ></el-button>
                </div>
                <div style="height: 10px;"></div>
            </div>

            <!-- buckets 列表 -->
            <div class="mock-list__buckets__list">
                <a
                    v-for="(bucket, index) in bucketsList"
                    :key="bucket.bucketId"
                    class="mock-list__buckets__list__item"
                    :class="{'mock-list__buckets__list__item_active': index === activeBucketIndex}"
                >
                    {{bucket.bucketName}}
                </a>
            </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="mock-list__mocks">

            <!-- 没有 bucket 时显示-->
            <div
                class="mock-list__mocks_empty"
                v-if="bucketsList.length === 0"
            >
                <div class="mock-list__mocks_empty__content">
                    <h3>自由创作从Freelog开始</h3>
                    <div style="height: 60px;"></div>
                    <p>在Freelog模拟资源池，您可以创建存储空间，上传模拟资源并进行测试。</p>
                    <div style="height: 60px;"></div>
                    <!--                    <router-link-->
                    <!--                        to="/mock/create"-->
                    <!--                        class="nav-link ls-nav-link"-->
                    <!--                    >-->
                    <el-button
                        @click="showNewBucketDialog"
                        type="primary"
                    >创建Bucket
                    </el-button>
                    <!--                    </router-link>-->
                </div>
            </div>

            <!-- 有 bucket 时显示 -->
            <div
                class="mock-list__mocks_non-empty"
                v-if="bucketsList.length > 0"
            >
                <div class="mock-list__mocks_non-empty__header">
                    <div>mock资源数量<span>3</span></div>
                    <div>创建时间<span>2019-04-14</span></div>
                    <div>已使用<span>1GB/2GB</span>
                        <el-progress
                            :percentage="70"
                            :show-text="false"
                            style="width: 120px;"
                        ></el-progress>
                    </div>
                </div>

                <div class="mock-list__mocks_non-empty__create">
                    <router-link
                        to="/mock/create"
                        class="nav-link ls-nav-link"
                    >
                        <el-button type="primary">创建mock资源</el-button>
                    </router-link>
                </div>

                <div class="mock-list__mocks_non-empty__body">
                    <div
                        class="mock-list__mocks_non-empty__body_null"
                        style="display: none;">
                        <p>您还没有创建任何mock资源</p>
                    </div>

                    <div
                        class="mock-list__mocks_non-empty__body_table"
                    >
                        <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="类型"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="size"
                                label="大小">
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="创建时间">
                            </el-table-column>
                            <el-table-column
                                prop="action"
                                label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-dropdown>

                                        <el-button
                                            icon="el-icon-more"
                                            type="small"
                                            circle
                                            style="background-color: #fafbfb;"
                                        ></el-button>

                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>下载资源文件</el-dropdown-item>
                                            <el-dropdown-item>生成正式资源</el-dropdown-item>
                                            <el-dropdown-item>
                                                <div style="color: #EE4040;">删除</div>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </template>

                            </el-table-column>
                        </el-table>
                        <div style="padding: 10px 0; display: flex; justify-content: flex-end;">
                            <!--              @size-change="handleSizeChange"-->
                            <!--              @current-change="handleCurrentChange"-->
                            <el-pagination
                                :current-page="1"
                                :page-sizes="[10, 20, 30, 40, 50]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- 添加 bucket 弹窗 -->
        <el-dialog
            title="新建Bucket"
            :visible.sync="dialogVisible"
            width="660px"
        >
            <div style="height: 17px"></div>
            <div class="dialog-body">
                <div>
                    <p>• 请注意存储空间的名称一但创建则不可修改</p>
                    <p>• Freelog为每个用户提供2GB的免费存储空间</p>
                    <div style="height: 21px;"></div>
                    <!--          v-model="input"-->
                    <el-input
                        v-model="bucketNameInputValue"
                        placeholder="Bucket名称"
                    ></el-input>
                </div>
            </div>

            <!-- 错误提示区域 -->
            <div
                style="height: 99px; line-height: 25px; padding: 5px 0; color: #f54242;"
            >
                <div
                    style="width: 400px; margin: 0 auto;"
                >
                    <template v-if="bucketNameInputValueError === true">
                        <p>只能包括小写字母、数字和短横线（-）；</p>
                        <p>必须以小写字母或者数字开头和结尾 ；</p>
                        <p>长度必须在 1–63 字符之间。</p>
                    </template>
                    <template v-if="bucketNameInputValueError !==true && !!bucketNameInputValueError">
                        <p>{{bucketNameInputValueError}}</p>
                    </template>
                </div>
            </div>

            <!-- dialog 底部按钮 -->
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    style="color: #999999"
                    type="text"
                    @click="hideNewBucketDialog"
                >取消</el-button>
                <el-button
                    type="primary"
                    style="margin-left: 20px; width: 90px;"
                    round
                    @click="createNewBucketByAPI"
                >确定</el-button>
            </span>
        </el-dialog>
    </div>


</template>

<script>
    import ResourceInput from './index';

    export default ResourceInput;
</script>

<style lang="less" type="text/less" scoped>
    @import "index.less";
</style>

<style lang="less" type="text/less">
    .mock-list {
        .el-dialog {
            border-radius: 10px;

            .el-dialog__header {
                padding-bottom: 6px;
                padding-top: 6px;
                text-align: center;
                border-bottom: 1px solid #d8d8d8;

                .el-dialog__title {
                    line-height: 38px;
                    color: #333;
                    font-size: 14px;
                }

                .el-dialog__headerbtn {
                    top: 15px
                }
            }

            .el-input__inner {
                border: 1px solid #979797;
                height: 46px;
                line-height: 45px;
            }
        }

        /*.mock-list__mocks_non-empty__body_table {*/
        /*    .el-table {*/
        /*        overflow: auto !important;*/

        /*        .el-table__body-wrapper {*/
        /*            overflow: auto;*/
        /*        }*/
        /*    }*/
        /*}*/

        .el-dialog__footer {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 45px;
            padding-top: 0;
        }
    }

</style>
