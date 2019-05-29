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
                    ></el-button>
                </div>
                <div style="height: 10px;"></div>
            </div>

            <!-- buckets 别表 -->

            <div class="mock-list__buckets__list">
                <a class="mock-list__buckets__list__item mock-list__buckets__list__item_active">
                    image
                </a>
                <a class="mock-list__buckets__list__item">
                    image
                </a>
            </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="mock-list__mocks">

            <!-- 没有 bucket 时显示-->
            <div class="mock-list__mocks_empty" style="display: none;">
                <div class="mock-list__mocks_empty__content">
                    <h3>自由创作从Freelog开始</h3>
                    <div style="height: 60px;"></div>
                    <p>在Freelog模拟资源池，您可以创建存储空间，上传模拟资源并进行测试。</p>
                    <div style="height: 60px;"></div>
                    <router-link
                            to="/mock/create"
                            class="nav-link ls-nav-link"
                    >
                        <el-button type="primary">创建Bucket</el-button>
                    </router-link>
                </div>
            </div>

            <!-- 有 bucket 时显示 -->
            <div class="mock-list__mocks_non-empty">
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
                    <div class="mock-list__mocks_non-empty__body_null" style="display: none;">
                        <p>您还没有创建任何mock资源</p>
                    </div>

                    <div class="mock-list__mocks_non-empty__body_table">
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
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage4"
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
                    <el-input
                            v-model="input"
                            placeholder="Bucket名称"
                    ></el-input>
                </div>
            </div>
            <div style="height: 99px;"></div>
            <span
                    slot="footer"
                    class="dialog-footer"
            >
                <el-button
                        style="color: #999999"
                        type="text"
                        @click="dialogVisible = false"
                >取消</el-button>
                <el-button
                        type="primary"
                        style="margin-left: 20px; width: 90px;"
                        round
                        @click="dialogVisible = false"
                >确定</el-button>
            </span>
        </el-dialog>
    </div>


</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                dialogVisible: false,
                styleObject: {
                    minHeight: (window.innerHeight - 60) + 'px',
                },
                tableData: [
                    {
                        name: '王小虎',
                        type: 'image',
                        size: '5M',
                        date: '2016-05-02',
                    },
                    {
                        name: '王小虎',
                        type: 'image',
                        size: '5M',
                        date: '2016-05-04',
                    },
                ],
                visible2: true,
            }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    .mock-list {
        display: flex;

        .mock-list__buckets {
            width: 280px;
            flex-shrink: 0;
            background-color: #fafbfb;

            .mock-list__buckets__title {
                border-bottom: 1px solid #ebebeb;

                .mock-list__buckets__title__content {
                    box-sizing: border-box;
                    display: flex;
                    width: 100%;
                    padding: 0 30px 0 65px;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #666;

                    /*a {*/
                    /*    width: 30px;*/
                    /*    height: 30px;*/
                    /*    border-radius: 50%;*/
                    /*    border: 1px solid #ececec;*/
                    /*    display: flex;*/
                    /*    justify-content: center;*/
                    /*    align-items: center;*/

                    /*    i > {*/
                    /*        font-size: 14px;*/
                    /*        font-weight: 800;*/
                    /*    }*/
                    /*}*/
                }
            }

            .mock-list__buckets__list__item {
                line-height: 54px;
                padding-left: 65px;
                font-size: 14px;
                display: block;
                border-bottom: 1px solid #ebebeb;

                &.mock-list__buckets__list__item_active {
                    color: #409eff;
                    border-right: 3px solid #409eff;
                    background-color: #fff;
                }
            }
        }

        .mock-list__mocks {
            width: 100%;
            flex-shrink: 1;
            background-color: #fff;

            .mock-list__mocks_empty {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-weight: 400;

                .mock-list__mocks_empty__content {
                    color: #666;
                    padding-bottom: 100px;

                    h3 {
                        font-size: 30px;
                        font-weight: 400;
                    }

                    p {
                        font-size: 16px;
                    }
                }
            }

            .mock-list__mocks_non-empty {

                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;

                .mock-list__mocks_non-empty__header {
                    height: 80px;
                    margin: 0 30px;
                    border-bottom: 1px solid #dedede;
                    display: flex;
                    flex-shrink: 0;
                    flex-grow: 0;
                    align-items: center;
                    /*justify-content: space-between;*/
                    font-size: 14px;
                    color: #999;

                    & > div {
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        padding-right: 20px;

                        & > span {
                            color: #000;
                            padding: 0 10px;
                        }
                    }
                }

                .mock-list__mocks_non-empty__create {
                    padding: 40px 110px;
                    flex-shrink: 0;
                    flex-grow: 0;
                    display: flex;
                    justify-content: flex-end;
                }

                .mock-list__mocks_non-empty__body {
                    width: 100%;
                    height: 100%;

                    .mock-list__mocks_non-empty__body_null {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 1;
                        flex-grow: 1;
                        height: 100%;
                        width: 100%;

                        & > p {
                            font-size: 22px;
                            color: #999;
                            padding-bottom: 160px;
                        }
                    }

                    .mock-list__mocks_non-empty__body_table {
                        padding: 8px 110px;
                    }
                }
            }
        }

        .dialog-body {
            display: flex;
            align-items: center;
            justify-content: center;
            /*flex-direction: column;*/
            line-height: 38px;
            color: #666;
            font-size: 14px;

            & > div {
                width: 400px;
            }
        }
    }
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
