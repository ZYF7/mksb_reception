<template>
  <div class="BOX">
    <!-- 公共top -->
    <top></top>

    <section id="heders-box" class="heders-box">
      <div class="headrs">
        <!-- log -->
        <a class="log">
          <img src="../assets/img/download.png" alt />
        </a>
        <!-- 搜索框 -->
        <div class="search-box">
          <div class="search">
            <input v-model="searchName" type="text" placeholder=" 请输入内容" />
            <a @click="search117()">搜索</a>
          </div>
          <ul class="search-list">
            <li @click="promotion7" v-for="(item,index) in indexPromotionData227" :key="index">{{item.title}}</li>
          
          </ul>
        </div>
        <div style=" clear: both;"></div>
      </div>
    </section>
    <section class="classify-slideshow">
      <!-- 分类列表 -->
      <div class="classify-box">
        <div class="classify-title">{{classifyDataTitle}}</div>
        <ul class="classify-list">
          <li v-for="(item,index) in classifyData" :key="index">
            <div class="class-list-title">{{item.type_name}}</div>
            <div class="class-list">
              <a
                v-for="(t,i) in item.children"
                :key="i"
                @click="classify7Id(t.good_type_id)"
              >{{t.type_name}}</a>
            </div>
          </li>
        </ul>
      </div>
      <!-- 轮播图 -->
      <div class="slideshow">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <a
              v-for="(item,index) in slideshowData"
              :key="index"
              href="item.url"
              class="swiper-slide"
            >
              <img :src="item.pic" :title="item.title" alt />
            </a>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </section>
    <!-- 广告 -->
    <section class="advertising">
      <a v-for="(item,index) in advertisingArr" :key="index" href="item.url">
        <img :src="item.pic" alt />
      </a>
    </section>

    <!-- 促销列表 -->
    <div class="promotion">
      <!-- title -->

      <div class="promotion-box" v-for="(item,index) in indexPromotionData117" :key="index">
        <div
          :id="item.promotion_id"
          class="promotion-title"
          @click="promotion7"
          :style="bciimgdata[index]"
        >
          <!-- :style="{ backgroundImage:'url('+require('')+')'}" -->
          <span></span>
          <h1>{{item.title}}</h1>
          <span></span>
        </div>
        <!-- list -->
        <div class="promotion-list">
          <div
            class="list-box7"
            @click="goParticulars(t.good_id)"
            v-for="(t,i) in item.child"
            :key="i"
          >
            <a>
              <div class="list-img-box">
                <img :src="t.pic" />
              </div>
              <p class="list-text7">{{t.title}}</p>
              <p class="list-price">&yen;:{{t.promotion_price}}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 回顶部 -->
    <ul class="back-to-the-top" ref="abcTop">
      <li
        v-for="(item,index) in indexPromotionData117"
        :key="index"
        @click="scrollbarTop(item.promotion_id)"
      >
        <a>{{item.title}}</a>
      </li>

      <li @click="scrollbarTop('top')">
        <a>top</a>
      </li>
    </ul>

    <!-- 公共底部 -->
    <bottom></bottom>
  </div>
</template>
<script>
import Swiper from "swiper";
import "../../node_modules/swiper/css/swiper.min.css";
import "../../node_modules/swiper/js/swiper.min.js";

export default {
  // ============================================================== data===========================================
  // 数据
  data() {
    return {
      // 搜索用
      searchName: "",
      classifyData: [],
      classifyDataTitle: "",
      slideshowData: [],
      advertisingArr: [],
      indexPromotionData: [],
      indexPromotionData117: [],
         indexPromotionData227: [],
      bciimgdata: [],
      // goodid
      goodid7: ""
    };
  },

  // ============================================================== fun===========================================
  methods: {
    //搜索
    search117() {
      // 调用跳转页面方法----------
      this.classify7();
    },
    // 促销
    promotion7() {
      this.$router.push({
        path: "/promotion",
        query:""
      });
    },
    // 点击分类跳转
    classify7Id(t) {
      this.goodid7 = t;
      // 调用跳转页面方法----------
      this.classify7();
    },
    // 分类--------------------------------
    classify7() {
      var nameValue = this.searchName;
      var goodidval = this.goodid7;
      this.$router.push({
        path: "/classify",
        query: { name: nameValue, goodid: goodidval }
      });
    },

    // 商品详情
    merchandise7() {
      this.$router.push({
        path: "/particulars",
        query: ""
      });
    },
    // 轮播图渲染方法
    slideshow() {
      var mySwiper = new Swiper(".swiper-container", {
        // autoplay: true, //
        autoplay: {
          delay: 3000, //3秒切换一次
          disableOnInteraction: false //点击后不会停止轮播
        },
        // direction: "vertical", // 垂直切换选项
        loop: true, // 循环模式选项 // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }, // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    },
    // 回顶部按钮
    sbgl() {
      window.onscroll = () => {
        var TOP = document.documentElement.scrollTop;
        if (TOP > 400) {
          // console.log( this.$refs.abcTop.style.display);
          this.$refs.abcTop.style.display = "block";
        } else {
          this.$refs.abcTop.style.display = "none";
        }
      };
    },
    // 回顶部方法
    scrollbarTop(t) {
      if (t == "top") {
        document.documentElement.scrollTop = 0;
      } else {
        var topVal = document.querySelector("#" + t).offsetTop;
        console.log(topVal);
        document.documentElement.scrollTop = topVal;
      }
      // 计时
    },
    // 获取分类--------------------------------------------------
    funClassify() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/goodType",
        params: ""
      })
        .then(result => {
          var testdata = [];
          var classData = result.data.data;
          // console.log(classData);
          for (let i = 0; i < classData.length; i++) {
            if (classData[i].parent_id == "0") {
              console.log(classData[i].type_name);
              classData[i].children = [];
              testdata.push(classData[i]);
            }
          }
          for (let q = 0; q < classData.length; q++) {
            if (classData[q].parent_id != "0") {
              for (let a = 0; a < testdata.length; a++) {
                if (testdata[a].good_type_id == classData[q].parent_id) {
                  testdata[a].children.push(classData[q]);
                }
              }
            }
          }
          this.classifyData = testdata;
          this.classifyDataTitle = testdata[0].type_name;
          // console.log("testdata", this.classifyData);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取轮播图数据---------------------------------
    slideData() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/bannerList",
        params: ""
      })
        .then(result => {
          this.slideshowData = result.data.data;
          // console.log(this.slideshowData);
          // 执行轮播图swiper实例化方法
          this.$nextTick(() => {
            this.slideshow();
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取广告信息---------------------------------------
    advertisingData() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/advertList",
        params: {
          is_new: 1
        }
      })
        .then(result => {
          // console.log(result.data.data);
          this.advertisingArr = result.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //获取首页促销列表信息---------------------------------------
    indexPromotion() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/promotionTypeGoodList",
        params: "",
      })
        .then(result => {
          // console.log(result.data.data);
          this.indexPromotionData = result.data.data;
          var a117 = result.data.data;
          for (let i = 0; i < a117.length; i++) {
            a117[i].promotion_id = "z" + a117[i].promotion_id;
          }
          this.indexPromotionData117 = a117;
          this.indexPromotionData227=a117.slice(0,5);
          // title图片
          for (var n = 0; n < a117.length; n++) {
            this.bciimgdata.push({
              backgroundImage: "url(" + a117[n].pic + ")"
            });
          }
          console.log(this.bciimgdata);
          console.log("117", this.indexPromotionData117);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 去商品详情页
    goParticulars(x) {
      this.$router.push({
        path: "/particulars",
        query: { myid: x,r:1}
      });
    }
  },

  // ============================================================mounted=============================================
  mounted() {
    // 获取轮播图数据
    this.slideData();

    // 获取分类
    this.funClassify();

    //获取广告信息
    this.advertisingData();

    //获取首页促销列表信息
    this.indexPromotion();

    this.sbgl();

    document.documentElement.scrollTop = 0;
  },
  destroyed() {
   window.onscroll=null;
  },
 
};
</script>


<style>
.slideshow
  > .swiper-container
  > .swiper-pagination
  > .swiper-pagination-bullet {
  background-color: rgba(255, 255, 255, 0);
  width: 38px;
  height: 26px;
  border-radius: 0;
  transition: all 0.2s;
}

.slideshow
  > .swiper-container
  > .swiper-pagination
  > .swiper-pagination-bullet:hover {
  opacity: 1;
}

.slideshow
  > .swiper-container
  > .swiper-pagination
  > .swiper-pagination-bullet::after {
  content: "";
  display: block;
  width: 30px;
  height: 2px;
  background-color: #fff;
  margin-top: 12px;
  margin-left: 4px;
}
</style>


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

/* 页面背景色 */

.BOX {
  background-color: #fff1f1;
}

.testbtn {
  width: 100px;
  height: 30px;
  background-color: #f60;
  cursor: pointer;
  user-select: none;
  margin: 10px;
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

/* 搜索框 */

.search-box {
  display: block;
  float: left;
  width: 600px;
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
  width: 490px;
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

/* 搜索框list */

.search-list {
  font-size: 12px;
  margin-top: 3px;
}

.search-list li {
  float: left;
  margin: 0 2px;
  color: #666;
  cursor: pointer;
}

.search-list li:hover {
  color: #ff9900;
}

.search-list::after {
  content: "";
  display: block;
  clear: both;
}

/* 分类&轮播图 */

.classify-slideshow {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
}

/* 分类列 */

.classify-box {
  float: left;
  width: 230px;
  height: 600px;
  background-color: #fff;
  box-shadow: 0px 3px 5px #8888;
}

/* 标题 */

.classify-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #ff9900;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
}

/* 分类ul */

.classify-list {
  width: 100%;
  margin-top: 20px;
}

.classify-list li {
  width: 190px;
  padding: 5px 20px;
  min-height: 55px;
  transition: all 0.2s;
}

.classify-list li:hover {
  background-color: #ffecce;
}
/* .promotion-box{
  width: 100%;
} */
/* 分类标题 */

.class-list-title {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 14px;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.2s;
}

/* 具体类 */

.class-list a {
  font-size: 12px;
  color: #9c9e9c;
  margin-right: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.class-list a:hover {
  color: rgb(235, 146, 14);
}

.class-list-title:hover {
  color: rgb(235, 146, 14);
}

/* 轮播图 */

.slideshow {
  width: 960px;
  height: 600px;
  /* background-color: rgb(46, 228, 128); */
  float: right;
}

.slideshow > .swiper-container {
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.slideshow > .swiper-container > .swiper-pagination {
  bottom: 0;
}
/* swiper-pagination-bullet swiper-pagination-bullet-active */
/* .slideshow>.swiper-container>.swiper-pagination>.swiper-pagination-bullet{
    background-color: rgba(255, 255, 255, 0);
    width: 38px;
    height: 26px;
    border-radius: 0;
    transition: all .2s;
}


.slideshow>.swiper-container>.swiper-pagination>.swiper-pagination-bullet:hover {
    opacity: 1;
}

.slideshow>.swiper-container>.swiper-pagination>.swiper-pagination-bullet::after {
    content: "";
    display: block;
    width: 30px;
    height: 2px;
    background-color: #fff;
    margin-top: 12px;
    margin-left: 4px;
} */

/* 上下叶 */

.swiper-container > .swiper-button-prev {
  background-color: rgba(0, 0, 0, 0.3);
  left: 0px;
  opacity: 0;
  width: 36px;
  height: 36px;
  transition: all 0.2s;
  border-radius: 50%;
}

.swiper-container > .swiper-button-next {
  background-color: rgba(0, 0, 0, 0.3);
  right: 0px;
  opacity: 0;
  width: 36px;
  height: 36px;
  transition: all 0.2s;
  border-radius: 50%;
}

.swiper-container:hover .swiper-button-prev {
  left: 17px;
  opacity: 1;
}

.swiper-container:hover .swiper-button-next {
  right: 17px;
  opacity: 1;
}

.swiper-button-prev::after {
  content: "<";
  display: block;
  font-size: 12px;
  color: #fff;
}

.swiper-button-next::after {
  content: ">";
  display: block;
  font-size: 12px;
  color: #fff;
}

.swiper-container > .swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.swiper-container > .swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

/* <div class="swiper-button-prev"></div><div class="swiper-button-next"></div> */

/* 轮播图图片 */

.swiper-container > .swiper-wrapper > .swiper-slide > img {
  width: 100%;
  height: 100%;
}

/* 广告 */

.advertising {
  width: 1200px;
  /* height: 200px; */
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}

.advertising > a {
  width: 288px;
  height: 200px;
  display: inline-block;
  cursor: pointer;
  margin-right: 168px;
  margin-bottom: 20px;
}
.advertising a:nth-child(3n) {
  margin: 0;
}
.advertising > a > img {
  width: 100%;
  height: 100%;
}

/* 促销咧 */

.promotion {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff1f1;
  margin-top: 20px;
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
  background-color: #f60;
  margin: 0 auto;
  line-height: 47px;
  cursor: pointer;
  /* margin-top: 30px; */
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.promotion-title > h1 {
  text-align: center;
  line-height: 47px;
  font-size: 36px;
  display: block;
  user-select: none;
  text-shadow: 0 0 5px #888;
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

/* 促销列表 */

.promotion-list {
  width: 1200px;
  padding-bottom: 60px;
}

.promotion-list::after {
  content: "";
  display: block;
  clear: both;
}

.list-box7 {
  float: left;
  margin-top: 10px;
  width: 274px;
  height: 354px;
  /* background-color: #606; */
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  margin-right: 34px;
  transition: all 0.2s;
}

.list-box7:hover {
  box-shadow: 1px 1px 15px #2c3e50;
}

.list-box7:nth-child(4n) {
  margin-right: 0;
}

.list-box7 > a {
  display: block;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 7px;
  padding-right: 7px;
  cursor: pointer;
}

.list-box7 > a > .list-img-box {
  transition: all 0.2s ease-in-out;
}

.list-box7 > a:hover > .list-img-box {
  transform: scale(1.05);
}

.list-img-box {
  width: 240px;
  height: 240px;
  /* background-color: #060; */
}

.list-img-box > img {
  width: 100%;
  height: 100%;
  display: block;
}

.list-text7 {
  width: 100%;
  /* background-color: rgb(39, 39, 85); */
  height: 40px;
  margin-top: 10px;
  padding: 4px 0;
  font-size: 14px;
  line-height: 20px;
  color: #666;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.list-price {
  width: 100%;
  height: 26px;
  font-size: 20px;
  color: #dd4545;
  font-weight: 700;
}

.back-to-the-top {
  display: none;
  width: 50px;
  position: fixed;
  top: 50%;
  right: 5%;
  /* height: 100px; */
  background-color: #fff;
  z-index: 999;
}

.back-to-the-top li {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  color: #666666;
  border-bottom: 1px solid #6666;
  text-align: center;
}

.back-to-the-top li > a {
  width: 100%;
  font-size: 14px;
  user-select: none;
}

.back-to-the-top li:nth-last-child(1) {
  background-color: #f34601;
  color: #fff;
  border-bottom: none;
}

.back-to-the-top li:hover {
  background-color: #f34601;
  color: #fff;
  border-bottom: 1px solid #fff;
}
</style>


