<template>
  <div>
    <top></top>
    <section id="heders-box" class="heders-box">
      <div class="headrs">
        <!-- log -->
        <a  @click="index7" class="log">
          <img src="../assets/img/download.png" alt />
        </a>
        <!-- 搜索框 -->
        <div class="search-box">
          <div class="search">
            <input id="ss77" type="text" placeholder=" 请输入内容" />
            <a @click="search647">搜索</a>
          </div>
        </div>
        <div style=" clear: both;"></div>
      </div>
    </section>
    <!-- 主体 -->
    <section class="subjectBox">
      <div v-for="(item,index) in indexPromotionData7777" :key="index">
      <!-- 标题 -->
      <div :id="item.promotion_id" class="promotion-title">
        <span></span>
    <h1>{{item.title}}</h1>
        <span></span>
      </div>
      <!-- 列表 -->
      <ul class="promotion-list">
        <li  v-for="(t,i) in item.child" :key="i" @click="goParticulars(t.good_id)" >
          <img
            class="promotion-img"
            :src="t.pic"
          />
          <h4 class="promotion-price">&yen;:{{t.promotion_price}}</h4>
          <p class="promotion-text">{{t.title}}</p>
        </li>
        
      </ul>
      </div>
    </section>
    <!-- 提示 -->
    <section class="hint77">
      暂无促销商品
    </section>
    <!-- 回顶部 -->
    <ul class="back-to-the-top">
      <li @click="scrollbarTop2(item.promotion_id)"
       v-for="(item,index) in indexPromotionData7777"
        :key="index"
      >
        <a>{{item.title}}</a>
      </li>
      <li @click="scrollbarTop2('top')">
        <a>top</a>
      </li>
    </ul>
    <bottom></bottom>
  </div>
</template>
<script>
// import "../assets/css/promotion.css";
export default {
  data() {
    return {
      indexPromotionData7777:[],
      // 模糊查询
      inquire7:"",
    };
  },
  methods: {
        // 回顶部按钮
    sbgl() {
      window.onscroll = function() {
        var TOP = document.documentElement.scrollTop;
        if (TOP > 400) {
          document.querySelector(".back-to-the-top").style.display = "block";
        } else {
          document.querySelector(".back-to-the-top").style.display = "none";
        }
      };
    },
    // 回顶部方法
    scrollbarTop2(t) {
      if (t == "top") {
        document.documentElement.scrollTop = 0;
      } else {
        var topVal = document.querySelector("#" + t).offsetTop;
        console.log(topVal);
        document.documentElement.scrollTop = topVal;
      }
      // 计时
    },
    // 搜索方法
    search647(){
      this.inquire7=document.querySelector("#ss77").value;
        this.PromotionList7();
    },
      goParticulars(x){
       this.$router.push({
        path: "/particulars",
        query: { myid: x}
      });
        },
    //获取首页促销列表信息---------------------------------------
    PromotionList7() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/promotionTypeGoodList",
        params: {
          search:this.inquire7
        }
      })
        .then(result => {
          // console.log(result.data.data);
          this.indexPromotionData = result.data.data;
          var a117 = result.data.data;
          for (let i = 0; i < a117.length; i++) {
            a117[i].promotion_id = "z" + a117[i].promotion_id;
          }
          this.indexPromotionData7777 = a117;
          console.log("117", this.indexPromotionData7777);
        })
        .catch(function(error) {
          console.log(error);
        });

      // TEST
      // this.axios({
      //   methods: "post",
      //   url: "http://api_dev.wanxikeji.cn/api/goodList",
      //   params: {
      //     page:"1",
      //     // size:"2",
      //     search:"" //为:""就全查
      //   }
      // })
      //   .then(result => {
      //     console.log("TEST",result.data.data.data);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
      index7() {
      this.$router.push({
        path: "/",
        query: ""
      });
    }
  },
  mounted(){
    this.PromotionList7();
    this.sbgl();
  },
  watch:{
     // 检测是否为空
    indexPromotionData7777:function(){
      if(this.indexPromotionData7777.length==0){
       document.querySelector(".hint77").style.display="block"
      }else{
         document.querySelector(".hint77").style.display="none"
      }
    }
  }
};
</script>

<style scoped>
ul,
li {
  list-style: none;
}

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

/* 头部 */

.heders-box {
  padding: 40px 0;
  background-color: #fff;
}

.headrs {
  width: 1200px;
  margin: 0 auto;
  height: 81px;
}
.headrs a{
  cursor: pointer;
}
.log {
  float: left;
  width: 144px;
  height: 54px;
  box-sizing: border-box;
  margin-top: 30px;
  display: block;
}

.log > img {
  width: 100%;
  height: 100%;
  display: block;
}
/* 提示 */
.hint77{
width: 100%;
height: 600px;
font-size: 20px;
font-weight: 700;
text-align: center;
user-select: none;
line-height: 600px;
display: none;
}
/* 搜索框 */

.search-box {
  display: block;
  float: right;
  width: 400px;
  height: 81px;
  margin-left: 300px;
  box-sizing: border-box;
  padding-top: 20px;
}

.search {
  width: 100%;
  height: 38px;
  box-sizing: border-box;
  border: 2px solid #ff9900;
}

/* 输入框 */

.search > input {
  display: block;
  margin-left: 0;
  float: left;
  height: 34px;
  width: 290px;
  border: none;
  outline: none;
  padding-left: 10px;
  padding-right: 5px;
  box-sizing: border-box;
}

/* 搜索按钮 */

.search > a {
  display: block;
  width: 105px;
  height: 34px;
  float: right;
  background-color: #ff9900;
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 34px;
  user-select: none;
  cursor: pointer;
}

/* 主体样式 */

.subjectBox {
  width: 100%;
  background-color: #ff9900;
  /* height: 1000px; */
  min-height: 50px;

}

/* 标题 */

.promotion-title {
  display: flex;
  justify-content: center;
  width: 1200px;
  height: 96px;
  box-sizing: border-box;
  padding: 25px;
  color: #fff;
  /* background-color: #f60; */
  margin: 0 auto;
  line-height: 47px;
  /* cursor: pointer; */
  /* margin-top: 30px; */
}

.promotion-title > h1 {
  text-align: center;
  line-height: 47px;
  font-size: 36px;
  display: block;
  user-select: none;
}

.promotion-title span {
  width: 120px;
  height: 47px;
}

.promotion-title > span:nth-child(1) {
  display: block;
  background-image: url("../assets/img/下载.png");
  height: 47px;
}

.promotion-title > span:nth-child(3) {
  display: block;
  transform: scaleX(-1);
  height: 47px;
  background-image: url("../assets/img/下载.png");
}

/* 列表 */

.promotion-list {
  width: 1020px;
  margin: 0 auto;
  /* background-color: #fff; */
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 50px;
}

.promotion-list li {
  background-color: #fff;
  margin: 10px;
  width: 234px;
  height: 300px;
  box-sizing: border-box;
  /* background-color: rgb(23, 221, 83); */
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 2px 2px 5px #fff;
}

.promotion-img {
  width: 180px;
  height: 180px;
  margin-left: 27px;
  display: block;
}
.promotion-price {
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px 5px;
  color: #ff9900;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.promotion-text {
  width: 100%;
  box-sizing: border-box;
  padding: 5px 20px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  height: 40px;
  color: #444444;
}

.back-to-the-top {
  display: none;
  width: 120px;
  padding: 15px 0;
  position: fixed;
  top: 50%;
  right: 5%;
  /* height: 100px; */
  background-color: #e6e6e6;
  z-index: 999;
}

.back-to-the-top li {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  color: #666666;
  /* border-bottom: 1px solid #6666; */
  text-align: center;
}

.back-to-the-top li > a {
  width: 100%;
  font-size: 14px;
  user-select: none;
}

/* .back-to-the-top li:nth-last-child(1) {
  background-color: #f34601;
  color: #fff;
  border-bottom: none;
} */

.back-to-the-top li:hover {
  background-color: #f34601;
  color: #fff;
  /* border-bottom: 1px solid #fff; */
}
</style>