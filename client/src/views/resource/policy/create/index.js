import {mapGetters} from 'vuex'

export default {
  name: 'resource-creator',
  data() {
    return {
      textarea: '',
      resourceType:'',
      validateLoading:false,
      submitLoading:false,
      options: [
        {value: 'widget', label: 'widget'},
        {value: 'file', label: 'file'}
      ],
      headers: {}
    }
  },
  computed: mapGetters({
    session: 'session'
  }),
  mounted(){
    this.headers.Authorization =  `Bearer ${this.session.token}`
  },
  methods: {
    errorHandler(err, file){
      switch (err.status){
        case 400:
          this.$message.error('不支持的文件类型');break;
        case 401:
          this.$message.error('权限未经验证');break;
      }
    },
    nextAction () {
      console.log('successfully upload!');
    },
    validate () {
      console.log('validating');
      this.validateLoading = true;
    },
    submit () {
      this.submitLoading = true;
    }
  }
}
