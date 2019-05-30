import {axios} from "@/lib";
import querystring from 'querystring';

export default {
    // name: "index",
    data() {
        return {
            // 根 div 样式对象
            styleObject: {
                minHeight: (window.innerHeight - 60) + 'px',
            },

            // 『mock 表格』数据
            mockTableData: null,

            // 『bucket 列表』
            bucketsList: null,
            // bucket 列表』中被激活的 bucket，在 bucket 列表中的索引
            activeBucketIndex: 0,

            // 『新建 bucket 弹窗』 是否显示
            dialogVisible: false,
            // 『新建 bucket 弹窗』中的 『输入框』value
            bucketNameInputValue: '',
            // 『新建 bucket 弹窗』中的错误提示信息
            bucketNameInputValueError: '',
        };
    },
    computed: {
        // 当前已激活的 bucket
        activatedBucket: function () {
            return this.bucketsList && this.bucketsList[this.activeBucketIndex];
        }
    },
    mounted() {

        this.initBucketsByAPI();
    },
    methods: {
        /**
         * 通过 服务端 API 获取 buckets 数据，并初始化 buckets
         * @returns {Promise<void>}
         */
        async initBucketsByAPI() {
            const {data} = await axios.get('/v1/resources/mocks/buckets');
            // console.log(data, 'datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata');
            this.bucketsList = data.data;
        },
        /**
         * 改变 bucket 列表中激活的索引
         * @param index
         */
        onChangeBucketActiveIndex(index) {
            this.activeBucketIndex = index;
        },

        /**
         * 显示『新建 bucket』弹窗
         */
        showNewBucketDialog() {
            this.dialogVisible = true;
        },
        /**
         * 隐藏『新建 bucket』弹窗
         */
        hideNewBucketDialog() {
            this.dialogVisible = false;
        },
        /**
         * 向服务端 API 发起，新建 bucket 的请求
         */
        async createNewBucketByAPI() {
            if (!/^(?!-)[a-z0-9-]{1,63}(?<!-)$/.test(this.bucketNameInputValue)) {
                this.bucketNameInputValueError = true;
                return;
            }
            this.bucketNameInputValueError = '';

            const params = {
                bucketName: this.bucketNameInputValue,
            };
            const {data} = await axios.post('/v1/resources/mocks/buckets', params);

            if (data.errcode !== 0) {
                this.bucketNameInputValueError = data.msg;
                return;
            }
            this.hideNewBucketDialog();
            this.initBucketsByAPI();
        },
        /**
         * 向 API 发起请求，删除当前激活的 bucket
         * @returns {Promise<void>}
         */
        async removeABucketByAPI() {
            const bucketName = this.activatedBucket.bucketName;
            // console.log(bucketName, 'bucketNamebucketNamebucketName');
            const {data} = await axios.delete(`/v1/resources/mocks/buckets/${bucketName}`);
            // console.log(data, 'datadatadata');

            if (data.errcode !== 0) {
                return this.errorMessage(data.msg);
            }
            this.initBucketsByAPI();
            this.activeBucketIndex = 0;
        },
        /**
         * 处理展示 mock table
         * @returns {Promise<void>}
         */
        async handleMockData() {
            if (!this.activatedBucket) {
                return;
            }
            const params = {
                page: 1,
                pageSize: 10,
                bucketName: this.activatedBucket.bucketName,
                // keywords: '',
                // resourceType: '',
                // projection: '',
            };
            const str = querystring.stringify(params);
            const {data} = await axios.get(`/v1/resources/mocks?${str}`);
            // const {data} = await axios.get(`/v1/resources/mocks`, params);
            // console.log(data, 'data1234123423');
            this.mockTableData = data.data.dataList;
        },

        /**
         * 错误提示框
         * @param text
         */
        errorMessage(text) {
            this.$message.error(text);
        },

        /**
         * 将服务端的日期格式转换成显示日期
         * @param str
         */
        transformToDateString(str) {
            const date = new Date(str);
            // console.log(date.getFullYear(), 'getFullYear');
            // console.log(date.getMonth(), 'getMonth');
            // console.log(date.getDate(), 'getDate');
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        },
        /**
         * 将 服务返回的『比特』数字 进行友好显示
         * @param number
         * @returns {string}
         */
        // humanizeSize(number) {
        //     const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];
        //
        //     if (!number) {
        //         return '';
        //     }
        //
        //     if (number < 1) {
        //         return `${number} B`;
        //     }
        //
        //     const algorithm = 1024;
        //     const exponent = Math.min(Math.floor(Math.log(number) / Math.log(algorithm)), UNITS.length - 1);
        //     number = Number((number / Math.pow(algorithm, exponent)).toPrecision(2));
        //     const unit = UNITS[exponent];
        //
        //     return `${number} ${unit}`;
        // },
    },
    watch: {
        activatedBucket() {
            this.handleMockData();
        }
    }
}
