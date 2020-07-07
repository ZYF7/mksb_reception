<template>
  <div>
    <top></top>
    <div class="contact-BOX" v-html="AboutUs7"></div>
    <bottom></bottom>
  </div>
</template>
<style>
.contact-BOX {
  width: 1200px;
  margin: 0 auto;
}
</style>
<script>
export default {
  data() {
    return {
      AboutUs7: ""
    };
  },
  methods: {
    //获取关于我们---------------------------------------
    AboutUs72() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/aboutUs",
        params: ""
      })
        .then(result => {
          this.AboutUs7 = result.data.data.info;
          // console.log(this.AboutUs77);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.AboutUs72();
  }
};
</script>