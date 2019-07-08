import BlockBody from './BlockBody.vue';
import SmallTitle from './SmallTitle.vue';
import DepList from './DepList.vue';
import HeaderAlert from './HeaderAlert.vue';
import UploadFile from './UploadFile/index.vue';
import UploadCover from './UploadCover/index.vue';
import ReleaseSearch from '@/views/release/search/index.vue';
import RichEditor from '@/components/RichEditor/index.vue';
import MetaInfoInput from '@/components/MetaInfoInput/index.vue';

export default {
    name: 'editor',

    components: {
        SmallTitle,
        UploadFile,
        UploadCover,
        ReleaseSearch,
        DepList,
        BlockBody,
        RichEditor,
        MetaInfoInput,
        HeaderAlert,
    },

    data() {
        return {
            // 资源类型选项
            resourceTypes: ['json', 'widget', 'image', 'audio', 'markdown', 'pageBuild', 'revealSlide', 'license', 'video', 'catalog'],
            // 资源类型值
            resourceType: '',
            // 资源类型，是否提醒
            resourceTypeTip: false,

            // 上传文件的信息
            uploadFileInfo: {
                fileID: '',
                sha1: '',
                name: '',
                size: 0,
            },

            // 资源名称
            resourceName: '',

            // 封面图链接
            coverURL: '',

            // 添加依赖弹出框是否显示
            visibleDepDialog: false,
            // 依赖列表
            depList: [],

            // 资源描述
            description: '',

            // meta 信息
            metaInfo: '{}',
            // 是否显示 meta 输入框
            visibleMetaInput: false,
            // meta 错误信息提示
            metaValidError: '',
        };
    },
    mounted() {
        console.log(this.$route, 'this.$routethis.$routethis.$route');
    },

    methods: {
        /**
         * 资源类型改变时
         */
        onChangeResourceType() {
            this.resourceTypeTip = false;
        },

        /**
         * 上传文件信息发生变化
         */
        onFileInfoChange(fileInfo) {
            console.log(fileInfo, 'fileInfofileInfo');
            this.uploadFileInfo = {...fileInfo};
            if (!this.resourceName) {
                const arr = fileInfo.name.split('.');
                arr.pop();
                this.resourceName = arr.join('.');
            }
        },
        /**
         * 当上传时，没有选择文件类型时
         * @param e
         */
        onUploadNoType(e) {
            this.resourceTypeTip = false;

            setTimeout(() => this.resourceTypeTip = true, 30);
        },
        /**
         * 封面上传成功后
         * @param imageUrl
         */
        coverUploaded(imageUrl) {
            this.coverURL = imageUrl;
        },

        /**
         * 显示依赖弹出框
         */
        showDepDialog() {
            this.visibleDepDialog = true;
        },
        /**
         * 添加依赖
         */
        addDep(dep) {
            // console.log(dep, 'debpdebpdebpdebpdebpdebp');
            this.visibleDepDialog = false;
            this.depList.push({
                id: dep.releaseId,
                name: dep.releaseName,
                // 有版本号为正式资源，否则为 mock 资源
                version: dep.latestVersion ? dep.latestVersion.version : undefined,
            });
        },
        /**
         * 依赖列表变化时
         */
        onChangeDeps(deps) {
            this.depList = deps;
        },

        /**
         * 描述的 富文本框 上传图片成功
         */
        // descriptionImgUploadSuccess(detail) {
        //     console.log(detail, 'detaildetaildetail');
        //     const data = detail.data;
        //     const editor = this.$refs.editor;
        //     if (data.errcode === 0) {
        //         editor.insertImg(data.data);
        //     } else {
        //         this.$message.error(data.msg);
        //     }
        // },

        /**
         * 显示 meta 输入框
         */
        showMetaInput() {
            this.visibleMetaInput = true;
        },
        /**
         * 检查 meta 是否合法
         */
        checkMetaValid(valid) {
            console.log(valid, 'validvalidvalid');
            this.metaValidError = valid;
        },

        /**
         * 提交数据
         */
        submit() {
            if (!this.resourceType) {
                return this.$message.error('请选择资源类型');
            }

            if (!this.uploadFileInfo.name) {
                return this.$message.error('请上传文件');
            }

            if (!this.resourceName) {
                return this.$message.error('请输入资源名称');
            }

            if (this.metaValidError) {
                return this.$message.error('meta JSON格式有误');
            }

            const params = {
                bucketName: '12345678',
                uploadFileId: this.uploadFileInfo.fileID,
                name: this.resourceName,
                previewImages: [this.coverURL],
                dependencyInfo: {
                    mocks: this.depList.filter(i => !i.version).map(i => ({mockResourceId: i.id})),
                    releases: this.depList.filter(i => i.version).map(i => ({releaseId: i.id, versionRange: i.version}))
                },
                description: this.description,
                meta: JSON.parse(this.metaInfo),
            };
            this.$axios.post('/v1/resources/mocks', params);
        },
    }

}
