import {onloadResourceDetail} from '@/data/resource/loader'
import ResourceInput from '../input/index.vue'

export default {
    name: 'resource-creator',
    components: {
        ResourceInput
    },
    data() {
        return {
            resourceDetail: {}
        }
    },
    mounted() {
        const params = this.$route.params
        if (params.resourceId) {
            onloadResourceDetail(params.resourceId)
                .then((data) => {
                    this.resourceDetail = data
                }).catch(this.$error.showErrorMessage)
        }
    },
    methods: {
        executeNext(callback) {
            if (this.isRequesting) return

            this.isRequesting = true
            if (this.$refs.inputArea.nextHandler) {
                this.$refs.inputArea.nextHandler(this.data)
                    .then((detail) => {
                        if (detail && detail.resourceId) {
                            Object.assign(this.resourceDetail, detail)
                        }
                        this.isRequesting = false
                        callback()
                    }).catch((err) => {
                    this.isRequesting = false
                    this.$nextTick(() => {
                        const $error = this.$el.querySelector('.el-form-item__error')
                        if ($error) {
                            $error.parentElement.scrollIntoView()
                            window.scrollBy(0, -80) // 填补fixed占位的高度
                        } else {
                            this.$error.showErrorMessage(err)
                        }
                    })
                })
            } else {
                this.isRequesting = false
                callback()
            }
        },
        create2QuitHandler() {
            this.executeNext(() => {
                const detail = this.resourceDetail
                if (this.$route.params.resourceId) {
                    this.$message.success(this.$t('resource.updateSuccess'))
                } else {
                    this.$message.success(this.$t('resource.createSuccess'))
                }
                setTimeout(() => {
                    this.$router.push(`/resource/detail/${detail.resourceId}`)
                }, 5e2)
            })
        },
        create2AddHandler() {
            const detail = this.resourceDetail
            this.executeNext(() => {
                if (detail.resourceId) {
                    this.$router.push(`/resource/detail/${detail.resourceId}`)
                }
            })
        },
        cancelHandler() {
            this.$confirm(this.$t('resource.cancelQuestion'))
                .then(() => {
                    this.$router.push('/resource/list')
                }).catch(() => {
            })
        }
    }
}
