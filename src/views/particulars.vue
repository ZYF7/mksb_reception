<template>
  <div>
    <!-- 公共top -->
    <top></top>

    <section id="heders-box" class="heders-box">
      <div class="headrs">
        <!-- log -->
        <a @click="index7" class="log">
          <img src="../assets/img/download.png" alt />
        </a>
        <!-- 搜索框 -->
        <div class="search-box">
          <div class="search">
            <input v-model="searchName2" type="text" placeholder=" 请输入内容" />
            <a @click="classify72()">搜索</a>
          </div>
        </div>
        <div style=" clear: both;"></div>
      </div>
    </section>
    <div class="myPiece"></div>
    <!-- 主体 -->
    <section class="mybody">
      <div class="Tabs-1">
        <div class="Tabs-option-box">
          <div class="Tabs-option" v-for="(item,index) in good_img" :key="index">
            <img :src="good_img[index]" alt />
          </div>
        </div>

        <ul class="Tabs-nav-box">
          <li class="Tabs-nav" v-for="(item2,index2) in good_img" :key="index2">
            <img :src="good_img[index2]" alt />
          </li>
        </ul>
      </div>
      <div class="purchase">
        <h3>{{particularsData.good_name}}</h3>
        <div class="price7">
          <div class="price7-all">
            价格:
            <span class="price-num" ref="r">&yen;{{myPrice}}</span>
            <span class="price-num" ref="r2">&yen;{{myPrice7}}</span>
          </div>
          <div class="price7-all">
            颜色:
            <span
              class="Choose7 mycolor7"
              @click="choose(1,index)"
              ref="color"
              v-for="(item,index) in color77"
              :key="index"
            >{{item}}</span>
          </div>
          <div class="price7-all">
            版本:
            <span
              class="Choose7 myversions7"
              @click="choose(2,index2)"
              ref="versions"
              v-for="(item2,index2) in versions77"
              :key="index2"
            >{{item2}}</span>
          </div>
        </div>
        <!-- 数量 -->
        <div class="quantity">
          <span class="num-title">数量：</span>
          <el-input-number
            v-model="num"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
            class="mynum"
            size="medium"
          ></el-input-number>
          <span class="contact-us">联系我们</span>
        </div>
      </div>
      <div class="advertising-right">
        <a class="adv" v-for="(item,index) in advertisingArr2" :key="index" href="item.url">
          <img :src="item.pic" alt />
          <p>公积金代缴</p>
        </a>
      </div>
    </section>
    <!-- 商品详情 -->
    <div class="particulars7">
      <div class="particulars7-left" @click="par77(is_newData2.good_id)">
        <div class="particulars7-left-title">爆款商品</div>
        <img :src="is_newData2.img" alt />
        <div class="particulars7-left-price">￥{{is_newData2.price}}</div>
        <a class="particulars7-left-details">{{is_newData2.good_name}}</a>
      </div>

      <!-- 选项卡2 -->
      <div class="Tabs2">
        <nav class="Tabs2-nav">
          <a class="red7 Tabs-nav2">商品介绍</a>
          <a class="Tabs-nav2">联系我们</a>
        </nav>
        <div class="Tabs2-option-box">
          <div class="Tabs2-option2" v-html="goodReferral"></div>
          <!-- <img class="Tabs2-option2" :src="particularsData.img" alt /> -->
          <div class="Tabs2-option2" v-html="AboutUs77">联系我们</div>
        </div>
      </div>
    </div>
    <bottom></bottom>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 1,
      // data
      particularsData: [],
      // 商品价格
      myPrice: "",
      // 促销
      myPrice7: "",
      good_img: [],
      searchName2: "",
      goodid72: "",
      goodReferral: "",
      // 颜色
      color77: ["默认"],
      // 版本
      versions77: ["默认"],
      // 广告
      advertisingArr2: [],
      is_newData2: [],
      goodid7: 0,
      AboutUs77: ""
    };
  },
  methods: {
    handleChange() {},
    // 选项卡一
    Tabs1() {
      var tabNav = document.querySelectorAll(".Tabs-nav");
      var tabOption = document.querySelectorAll(".Tabs-option");
      for (let i = 0; i < tabNav.length; i++) {
        tabNav[i].onmouseover = function() {
          for (var a = 0; a < tabOption.length; a++) {
            tabOption[a].style.display = "none";
          }
          tabOption[i].style.display = "block";
        };
      }
    },
    // 选项卡二
    Tabs2() {
      var tabNav2 = document.querySelectorAll(".Tabs-nav2");
      var tabOption2 = document.querySelectorAll(".Tabs2-option2");
      for (let i = 0; i < tabNav2.length; i++) {
        tabNav2[i].onclick = function() {
          for (var a = 0; a < tabOption2.length; a++) {
            tabOption2[a].style.display = "none";
            tabNav2[a].classList = "Tabs-nav2";
          }
          tabOption2[i].style.display = "block";
          tabNav2[i].classList = "red7 Tabs-nav2";
        };
      }
    },
    index7() {
      this.$router.push({
        path: "/",
        query: ""
      });
    },
    //商品数据获取
    commodityData() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/goodInfo",
        params: {
          good_id: this.$route.query.myid
          // good_id: this.$route.params.myid
        }
      })
        .then(result => {
          console.log(result.data.data);
          this.particularsData = result.data.data;
          if (this.$route.query.r == "" || this.$route.query.r == null) {
            // alert("fsadf");
            this.myPrice = this.particularsData.price;
            this.$refs.r2.style.display="none"
             this.$refs.r.style.textDecoration="none";
          } else if (this.$route.query.r == 1) {
            // alert("sp");
            this.myPrice = this.particularsData.price;
            this.myPrice7 = this.particularsData.promotion_price;
               this.$refs.r2.style.display="inline-block"
              this.$refs.r.style.textDecoration="line-through";
          }

          var go = this.particularsData.info;
          console.log(this.particularsData);

          for (let i = 0; i < go.length; i++) {
            var a = eval("'" + go[i].imgs + "'");

            a = go[i].imgs.replace(new RegExp("\\\\", "g"), "");
            //  console.log(a);
            var b = a.replace(new RegExp('\\"', "g"), "");
            var d = b.split(",");
            if (d[d.length - 1] == "" || d[d.length - 1] == null) {
              d.splice(d.length - 1, 1);
            }
            // console.log(d);

            this.good_img = d;

            var a2 = eval("'" + go[i].colour + "'");
            // a2 = go[i].colour.replace(new RegExp("\\\\", "g"), "");

            var b2 = a2.replace(new RegExp('"', "g"), "");
            var d2 = b2.split(",");
            if (d2[d2.length - 1] == "" || d2[d2.length - 1] == null) {
              d2.splice(d.length - 1, 1);
            }
            this.color77 = d2;
            // console.log(this.color77);

            var a3 = eval("'" + go[i].edition + "'");
            console.log(a3);
            a3 = a3.replace(new RegExp("\\\\", "g"), "");
            var b3 = a3.replace(new RegExp('\\"', "g"), "");
            var d3 = b3.split(",");
            if (d3[d3.length - 1] == "" || d3[d3.length - 1] == null) {
              d3.splice(d.length - 1, 1);
            }
            this.versions77 = d3;
            // console.log(this.versions77);

            var a7 = eval("'" + go[i].info + "'");
            var b7 = a7.replace(new RegExp('\\"', "g"), "");
            this.goodReferral = b7;
            this.$nextTick(() => {
              this.Tabs1();
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    par77(x) {
      this.$router.push({
        path: "/particulars",
        query: { myid: x }
      });
      this.commodityData();
      document.documentElement.scrollTop = 0;
    },
    // 分类--------------------------------
    classify72() {
      var nameValue = this.searchName2;
      var goodidval = this.goodid72;
      this.$router.push({
        path: "/classify",
        query: { name: nameValue, goodid: goodidval }
      });
    },
    choose(n, d) {
      var cl;
      if (n == 1) {
        cl = this.$refs.color;
        // console.log(cl);
      } else if (n == 2) {
        cl = this.$refs.versions;
        // console.log(cl);
      }
      for (let i = 0; i < cl.length; i++) {
        cl[i].style.borderColor = "#ccc";
      }
      // console.log(d);

      cl[d].style.borderColor = "#dd4545";
    },
    //获取广告信息---------------------------------------
    advertisingData2() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/advertList",
        params: {
          is_new: 1
        }
      })
        .then(result => {
          var advertising2 = result.data.data.slice(0, 2);
          this.advertisingArr2 = advertising2;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //数据
    hotSale2() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/goodList",
        params: {
          page: "1",
          // size:"2",
          search: "", //为:""就全查
          is_new: 1 //1就热卖
        }
      })
        .then(result => {
          var hotSale777 = result.data.data.data[0];
          this.is_newData2 = hotSale777;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取关于我们---------------------------------------
    AboutUs7() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/aboutUs",
        params: ""
      })
        .then(result => {
          this.AboutUs77 = result.data.data.info;
          // console.log(this.AboutUs77);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.Tabs2();
    this.commodityData();
    // alert(this.$route.query.myid)
    this.advertisingData2();
    this.hotSale2();
    document.documentElement.scrollTop = 0;
    this.AboutUs7();
  },
  watch: {
    $route(to, from) {
      if (to.query.myid !== from.query.myid) {
        // 加载数据
        this.Tabs2();
        this.commodityData();
        // alert(this.$route.query.myid)
        this.advertisingData2();
        this.hotSale2();
        document.documentElement.scrollTop = 0;
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
.headrs a {
  cursor: pointer;
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
.myPiece {
  width: 100%;
  background-color: #ff9900;
  height: 50px;
  margin-bottom: 20px;
}
/* 主体 */
.mybody {
  overflow: hidden;
  width: 1200px;
  /* height: 1500px; */
  /* background-color: rgba(93, 230, 14, 0.425); */
  margin: 0 auto;
}
.Tabs-1 {
  width: 360px;
  height: 438px;
  /* background-color: #f60; */
  float: left;
}
.Tabs-option-box {
  width: 360px;
  height: 350px;
  /* background-color: #fff; */
}
.Tabs-option {
  width: 100%;
  height: 100%;
  display: none;
}
/* //================================ */
.Tabs-option:nth-of-type(1) {
  display: block;
}
.Tabs-option > img {
  width: 100%;
  height: 100%;
}
.Tabs-nav-box {
  width: 360px;
  height: 77px;
  /* background-color: rgb(252, 18, 18); */
}
.Tabs-nav {
  width: 65px;
  height: 66px;
  margin: 4px;
  float: left;
}
.Tabs-nav > img {
  width: 100%;
  height: 100%;
}
/* 选项卡二 */

.purchase {
  width: 600px;
  /* height: 395px; */
  min-height: 395px;
  /* background-color: rgb(48, 177, 138); */
  float: left;
  padding: 10px 30px;
}
.advertising-right {
  width: 180px;
  height: 420px;
  float: left;
  /* background-color: #600; */
}
.purchase > h3 {
  width: 100%;
  height: 42px;
  margin: 16.5px 0;
  /* background-color: #fff; */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
}
.price7 {
  width: 520px;
  /* height: 150px; */
  min-height: 150px;
  margin: 40px;
  font-size: 14px;
}
.price7-all > .price-num {
  font-size: 22px;
  color: #dd4545;
  font-weight: 700;
}
.price7-all > .price-num:nth-child(2){
margin-left: 15px;
}

.Choose7 {
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  /* user-select: none; */
  cursor: pointer;
  display: inline-block;
}
.mycolor7:nth-child(1) {
  border-color: #dd4545;
}
.Choose7:hover {
  border: 1px solid #dd4545;
}
.myversions7:nth-child(1) {
  border-color: #dd4545;
}
.price7-all {
  margin: 10px 0;
}
.quantity {
  width: 600px;
  height: 83px;
  /* background-color: #fff; */
  box-sizing: border-box;
  padding: 20px 40px;
}
.num-title {
  font-size: 14px;
  /* display: inline-block; */
}
.contact-us {
  width: 124px;
  height: 41px;
  background-color: #dd4545;
  padding: 10px 30px;
  margin-left: 160px;
  color: #fff;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s;

}
.contact-us:hover {
  box-shadow: 0 0 7px #000;
}
/* 计数器 */
.mynum {
  width: 100px;
}
.adv {
  width: 180px;
  height: 210px;
  box-sizing: border-box;
  padding: 10px;
}
.adv > img {
  width: 160px;
  height: 150px;
}
.adv > p {
  width: 100%;
  height: 50px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 19px;
  color: rgb(5, 4, 4);
  margin: 5px;
}
.adv:hover > p {
  color: rgb(219, 78, 13);
}
/* 商品详情 */
.particulars7 {
  width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
  /* height: 1500px; */
  margin-bottom: 50px;
  /* background-color: rgba(53, 136, 101, 0.575); */
  overflow: hidden;
}
.particulars7::after {
  content: "";
  display: block;
  clear: both;
}
.particulars7-left {
  width: 230px;
  height: 383px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 0 10px;
  cursor: pointer;
  float: left;
}
.particulars7-left-title {
  margin: 10px 0;
  font-size: 16px;
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: 600;
}
.particulars7-left > img {
  width: 100%;
  height: 220px;
  display: block;
}
.particulars7-left-price {
  font-size: 18px;
  font-weight: 700;
  color: #dd4545;
  margin-top: 10px;
}
.particulars7-left-details {
  margin: 5px 0;
  color: #444;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  font-size: 14px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.particulars7-left:hover > .particulars7-left-details {
  color: rgb(189, 63, 63);
  cursor: pointer;
}
/* 选项卡 */
.Tabs2 {
  float: right;
  width: 960px;
  /* height: 1200px; */
  /* background-color: rgb(132, 132, 218); */
}
.Tabs2-nav {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  background-color: #f6f6f6;
  border-bottom: 1px solid #dd4545;
}
.Tabs2-nav a {
  height: 40px;
  padding: 0 15px;
  line-height: 40px;
  display: inline-block;
  color: #2c3e50;
  font-size: 14px;
  cursor: pointer;
}
.Tabs2-nav .red7 {
  background-color: #dd4545;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}
.Tabs2-option-box {
  width: 960px;
  /* height: 1133px; */
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 20px;
}

.Tabs2-option2 {
  width: 100%;
  /* height: 100%; */
  display: none;
}
.Tabs2-option2:nth-child(1) {
  display: block;
}
</style>

