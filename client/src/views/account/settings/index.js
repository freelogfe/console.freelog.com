import {mapGetters} from 'vuex'
import ImageCropUpload from 'vue-image-crop-upload';

export default {
  name: 'fl-account-setting',
  data() {
    return {
      form: {},
      showImageCropUploader: false,
      params: {},
      headers: {},
      imgDataUrl: ''
    }
  },
  components: {
    'image-crop-upload': ImageCropUpload
  },
  computed: mapGetters({
    session: 'session'
  }),

  created() {
    this.form = {...this.session.user}
    this.params.username = this.session.user.username;
    this.headers.Authorization = `Bearer ${this.session.token}`
  },
  methods: {
    saveSettingHandler() {

    },
    showAvatarSettingHandler() {
      this.showImageCropUploader = true
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      console.log(jsonData);
      console.log('field: ' + field);
    },
    cropUploadFail(status, field) {
      console.log(status);
      console.log('field: ' + field);
    }
  }
}
