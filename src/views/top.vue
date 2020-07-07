<template>
  <div>
    <div class="top-box">
      <div class="top-box2">
        <p>麦克斯宝 四川</p>
        <span>
          <a @click="index7">商城首页</a>
          <a @click="relation7">联系我们</a>
        </span>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
     
    }
  },
  methods: {
    // 联系我们
    relation7() {
      this.$router.push({
        path: "/contact",
        query: ""
      });
    },
    index7() {
      this.$router.push({
        path: "/",
        query: ""
      });
    },
   
  },

};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
/* 顶部box */
.top-box {
  width: 100%;
  background: #f1f1f1;
}
.top-box2 {
  width: 1200px;
  margin: 0 auto;
  font-size: 12px;
  color: #666;
  padding: 4px 0;
  overflow: hidden;
}
.top-box2 > p {
  float: left;
}
.top-box2 > span {
  float: right;
}
.top-box2 > span a:nth-of-type(2) {
  margin-left: 10px;
}
.top-box2 > span a {
  cursor: pointer;
  user-select: none;
}
.top-box2 > span a:hover {
  color: #f60;
}
</style>