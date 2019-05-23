<template>
    <section class="create-resource-wrapper">
        <div class="bd">
            <resource-input
                :data="resourceDetail"
                ref="inputArea"
            >
                <div class="btm-wrap clearfix">
                    <div class="rt-side">
                        <el-button
                            class="ft-btn"
                            style="color: #999999;"
                            @click="cancelHandler"
                            type="text"
                        >{{
                            $t('common.cancelCreateText') }}
                        </el-button>
                        <el-button
                            class="ft-btn"
                            type="primary"
                            round
                            @click="create2AddHandler"
                        >
                            {{$t('resource.createDoneText')}}
                        </el-button>
                    </div>
                </div>
            </resource-input>
        </div>
    </section>
</template>

<script>
    import Creator from './index';
    export default Creator;
</script>

<style lang="less" scoped>
    @import "index.less";
    @import "../../../styles/footer.less";
</style>
