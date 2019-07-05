import SmallTitle from './SmallTitle.vue';
import UploadFile from './UploadFile/index.vue';
import UploadCover from './UploadCover/index.vue';

export default {
    name: 'editor',

    components: {
        SmallTitle,
        UploadFile,
        UploadCover,
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
        };
    },
    mounted() {
        // setTimeout(() => {
        //     this.resourceTypeTip = true;
        // }, 2000);
    },

    methods: {
        /**
         * 上传文件信息发生变化
         */
        onFileInfoChange(fileInfo) {
            this.uploadFileInfo = {...fileInfo};
            if (!this.formData.resourceName) {
                const arr = fileInfo.name.split('.');
                arr.pop();
                this.formData.resourceName = arr.join('.');
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
    }

}
