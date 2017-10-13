export default {
  name: 'node-policy-signment',
  data() {
    return {

    }
  },
  mounted() {
  },
  created () {
    console.log('created');
    if (!this.$route.query.resourceId) {
      this.$message.error('没有资源Id, 请重新选择');
    } else {
      console.log(this.$route.query.resourceId);
    }
  },
  methods: {

  }
}
