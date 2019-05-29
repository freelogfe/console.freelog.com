import {axios} from "@/lib";

export default {
    name: "index",
    data() {
        return {
            // 根 div 样式对象
            styleObject: {
                minHeight: (window.innerHeight - 60) + 'px',
            },

            // 『mock 表格』数据
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

            // 『bucket 列表』
            bucketsList: [],
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
    mounted() {
        // console.log(axios, 'this');

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
         * 向服务端 API 发起新建 bucket 的请求
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

    },

}
