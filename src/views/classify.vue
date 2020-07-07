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
            <input id="myname77" type="text" placeholder=" 请输入内容" />
            <a @click="search77">搜索</a>
          </div>
        </div>
        <div style=" clear: both;"></div>
      </div>
    </section>
    <!-- 主体 -->
    <section class="classify-subject">
      <!-- 推荐 -->
      <div class="recommend">
        <!-- 标题 -->
        <!-- 热卖------------------------------------热卖------------- -->
        <div class="class-title">热卖推荐:</div>
        <ul class="recommend-list7">
          <li v-for="(t,i) in is_newData" :key="i" @click="goParticulars(t.good_id)">
            <img :src="t.img" alt />
            <p>{{t.price}}</p>
            <p>{{t.good_name}}</p>
          </li>
        </ul>
      </div>
      <!-- 分类 -->
      <div class="classification">
        <!-- 标题 -->
        <div class="class-title">
          <span id="class-title" @click="allClass">所有分类></span>
        </div>
        <ul class="class-list7">
          <li v-for="(item,index) in classifyData2" :key="index" >
            <span>{{item.type_name}}：</span>
            <span
              class="goodClass"
              :goodidid="t.good_type_id"
              v-for="(t,i) in item.children"
              :key="i"
              @click="classClick(t.good_type_id)"
            >{{t.type_name}}</span>
          </li>
        </ul>
        <div class="price-range">
          <span class="price-title">价格：</span>
          <input id="minPrice" type="number" min="0" v-model="minPrice" placeholder="￥" />
          <span>-</span>
          <input id="maxPrice" type="number" min="0" v-model="maxPrice" placeholder="￥" />
          <a class="price-btn" @click="priceFun">确定</a>
        </div>
        <!-- 列表 ------------------------------------------------>
        <ul class="recommend-list7117">
          <li v-for="(item,index) in commodityListData" :key="index" @click="goParticulars(item.good_id)">
            <img :src="item.img" alt />
            <p>{{item.price}}</p>
            <p>{{item.good_name}}</p>
          </li>
        </ul>

        <div class="paging7">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage2"
            :page-sizes="[8, 12, 16, 24]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count7"
            
          ></el-pagination>
        </div>
        <!-- 搜索框 -->
        <div class="search-box-bottom">
          <div class="search-bottom">
            <input id="myname277" type="text" placeholder=" 请输入内容" />
            <a @click="search277">搜索</a>
          </div>
        </div>
      </div>
    </section>
    <bottom></bottom>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 搜索字段name
      searchName2: "",
      // 价格区间arr
      price2: [],
      //当前页码
      currentPage2: 1,
      //每页数据条数
      pageSize1: 8,
      // 分类data
      classifyData2: [],
      // 商品列表
      commodityListData: [],
      // 热卖
      is_newData: [],
      // 总条数
      count7: 0,
      // 关键字
      myName: "",
      // 价格区间
      price717: [],
      maxPrice: null,
      minPrice: null,
      // 二级id
      goodTypeid: ""
    };
  },
  methods: {
    //清空分类选中样式方法
    emptyClassColor() {
      document.querySelector("#class-title").classList = "";
      var goodClass7 = document.querySelectorAll(".goodClass");
      for (let i = 0; i < goodClass7.length; i++) {
        goodClass7[i].classList = "goodClass";
      }
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize1 = val;
      console.log(this.pageSize1);

      this.commodityList();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage2 = val;
      this.commodityList();
    },
    // 获取分类--------------------------------------------------
    funClassify2() {
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/goodType",
        params: ""
      })
        .then(result => {
          var testdata = [];
          var classData = result.data.data;
          console.log(classData);
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
          this.classifyData2 = testdata;
          // this.classifyDataTitle = testdata[0].type_name;
          console.log("testdata", this.classifyData2);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取列表 +计算总条数
    commodityList() {
      // 获取列表------------------------------
      this.axios({
        methods: "post",
        url: "http://api_dev.wanxikeji.cn/api/goodList",
        params: {
          search: this.myName, //关键字
          size: this.pageSize1, //为:""就全查
          page: this.currentPage2, //当前页
          //价格区间
          price: this.price717,
          good_type: this.goodTypeid
        }
      })
        .then(result => {
          console.log("TEST", result.data.data.data);
          //  this.commodityListData=[];
          this.count7 = result.data.data.count;
          this.commodityListData = result.data.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //初始化关键字方法+id+...
    keywordfun() {
      this.myName = this.$route.query.name;
      this.goodTypeid = this.$route.query.goodid;
    },
    // 分类选中样页码加载初始化
    classcolorfun() {
// this.$nextTick(()=>{


      if (this.goodTypeid == "" || this.goodTypeid == null) {
        document.querySelector("#class-title").classList = "class117";
        //  document.querySelector("#class-title").style.color="red"
      } else {
        var goodClass7 = document.querySelectorAll(".goodClass");
        // console.log(goodClass7);

        for (let i = 0; i < goodClass7.length; i++) {
          // console.log(goodClass7[i].getAttribute("goodidid"));

          if (goodClass7[i].getAttribute("goodidid") == this.goodTypeid) {
            // alert("sdfjsla");
            goodClass7[i].classList = "goodClass class117";
          }
        }
      }

      // })
    },
    //热卖列表数据
    hotSale() {
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
          console.log("TEST热", result.data.data.data);
          this.is_newData = result.data.data.data;
          //  分类选中样式
          this.$nextTick(() => {
            this.classcolorfun();
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    search77() {
      this.price717 = [];
      this.maxPrice = null;
      this.minPrice = null;
      this.myName = document.querySelector("#myname77").value;
      this.goodTypeid = "";
      // console.log(this.myName);
      this.commodityList();
      this.emptyClassColor();
      document.querySelector("#class-title").classList = "class117";
    },
    search277() {
      this.price717 = [];
      this.maxPrice = null;
      this.minPrice = null;
      this.myName = document.querySelector("#myname277").value;
      this.goodTypeid = "";
      // console.log(this.myName);
      this.commodityList();
      this.emptyClassColor();
      document.querySelector("#class-title").classList = "class117";
    },
    // 价格筛选
    priceFun() {
      var myarr = [];

      if (this.minPrice == null && this.maxPrice == null) {
        //  this.price717=myarr;
      } else if (this.maxPrice == null) {
        alert("请输入最大价格");
      } else {
        myarr.push(this.minPrice);
        myarr.push(this.maxPrice);
      }

      this.price717 = myarr;
      // 调用查询
      this.commodityList();
    },

    // 全部分类点击事件
    allClass() {
      this.emptyClassColor();
           this.price717 = [];
            this.maxPrice = null;
      this.minPrice = null;
      this.myName="";
      document.querySelector("#class-title").classList = "class117";
      this.goodTypeid = "";
      this.commodityList();
    },
    //分类点击事件
    classClick(n) {
      // alert(n);
      this.emptyClassColor();
           this.price717 = [];
            this.maxPrice = null;
      this.minPrice = null;
      this.myName="";
      var goodClass7 = document.querySelectorAll(".goodClass");
      for (let i = 0; i < goodClass7.length; i++) {
        if (goodClass7[i].getAttribute("goodidid") == n) {
          goodClass7[i].classList = "goodClass class117";
        }
      }
      this.goodTypeid=n;
      this.commodityList();
    },
      index7() {
      this.$router.push({
        path: "/",
        query: ""
      });
    },
    goParticulars(x){
       this.$router.push({
        path: "/particulars",
        query: { myid: x}
      });
    }
  },
  mounted() {
    //加载初始化关键字+二级id
    this.keywordfun();

    // 获取分类
    this.funClassify2();
    // 获取商品列表
    this.commodityList();
    // 热卖列表
    this.hotSale();
  }
  // created(){
  //   this.classcolorfun();
  // }
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
/* 主体 */
.classify-subject {
  width: 1200px;
  margin: 0 auto;
  /* height: 1000px; */
  /* background-color: rgba(18, 156, 92, 0.342); */
}
/* 推荐 */
.recommend {
  width: 100%;
  /* background-color: rgba(31, 138, 31, 0.527); */
  border-top: 2px solid #ff9900;
}
.classification {
  width: 100%;
  /* height: 200px; */
  /* background-color: rgba(72, 31, 138, 0.527); */
  border-top: 2px solid #ff9900;
}
/* 分类标题 */
.class-title {
  font-size: 14px;
  margin: 14px 0;
  color: #2c3e50;
  cursor: pointer;
}
.recommend-list7 {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.recommend-list7 li {
  width: 220px;
  height: 235px;
  cursor: pointer;
  /* background-color: #ff0; */
  /* margin: 0 10px; */
  margin-right: 92px;
  margin-left: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 5px;
  transition: all 0.2s;
}
.recommend-list7 li:hover {
  box-shadow: 2px 2px 7px #888888;
}
.recommend-list7 li:nth-child(4n) {
  margin-right: 0;
}
.recommend-list7 li > img {
  width: 100%;
  height: 150px;
}
.recommend-list7 li p:nth-of-type(1) {
  width: 100%;
  font-size: 18px;
  color: #dd4545;
  font-weight: 700;
  padding: 0 10px;
  box-sizing: border-box;
}
.recommend-list7 li p:nth-of-type(2) {
  width: 100%;
  font-size: 14px;
  color: #2c3e50;
  padding: 0 10px;
  box-sizing: border-box;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.recommend-list7117 {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.recommend-list7117 li {
  width: 288px;
  cursor: pointer;
  height: 350px;
  /* background-color: #ff0; */
  margin-right: 16px;
  margin-bottom: 30px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 5px;
  transition: all 0.2s;
}
.recommend-list7117 li:hover {
  box-shadow: 2px 2px 10px #888888;
}
.recommend-list7117 li:nth-child(4n) {
  margin: 0;
}
.recommend-list7117 li > img {
  width: 100%;
  height: 250px;
}
.recommend-list7117 li p:nth-of-type(1) {
  width: 100%;
  font-size: 18px;
  color: #dd4545;
  font-weight: 700;
  padding: 0 10px;
  box-sizing: border-box;
}
.recommend-list7117 li p:nth-of-type(2) {
  width: 100%;
  font-size: 14px;
  color: #2c3e50;
  padding: 0 10px;
  box-sizing: border-box;

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.class-list7 {
  width: 1200px;
  border: 1px solid #2c3e50;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 20px;
}
.class-list7 > li {
  margin: 5px;
  /* margin-left: 20px; */
  border-bottom: 1px dashed #2c3e50;
  box-sizing: border-box;
  padding: 10px;
}
.class-list7 > li > span {
  margin: 0 20px;
  font-size: 14px;
  color: #2c3e50;
  cursor: pointer;
}
.class-list7 > li > span:nth-of-type(1) {
  cursor: auto;
}
.class-list7 > li > .class117 {
  color: #dd4545;
  background-color: #ccc;
  border-radius: 3px;
  padding: 0 3px;
}
.class117 {
  color: #dd4545;
  background-color: #ccc;
  border-radius: 3px;
  padding: 0 3px;
}

.price-range {
  width: 1200px;
  margin: 0 auto;
  height: 39px;
  border: 1px solid #666666;
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.price-range > input {
  width: 68px;
  margin: 0 10px;
  height: 21px;
}
.price-title {
  padding: 10px;
  font-size: 14px;
  color: #666666;
}
.price-btn {
  font-size: 13px;
  width: 40px;
  height: 21px;
  line-height: 21px;
  background-color: #f60;
  color: #fff;
  cursor: pointer;
  text-align: center;
  border-radius: 2px;
}
.price-btn:hover {
  background-color: rgb(204, 7, 66);
}
/* 分页器 */
.paging7 {
  margin: 0 auto;
  width: 700px;
  margin-top: 60px;
}

/* 搜索框2-bottom============================ */

.search-box-bottom {
  display: block;
  width: 601px;
  height: 31px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: 30px;
  margin-bottom: 90px;
}

.search-bottom {
  width: 100%;
  height: 31px;
  box-sizing: border-box;
  border: 2px solid #ff9900;
}

/* 输入框 */

.search-bottom > input {
  display: block;
  margin-left: 0;
  float: left;
  height: 27px;
  width: 290px;
  border: none;
  outline: none;
  padding-left: 10px;
  padding-right: 5px;
  box-sizing: border-box;
}

/* 搜索按钮 */

.search-bottom > a {
  display: block;
  width: 105px;
  height: 27px;
  float: right;
  background-color: #ff9900;
  text-align: center;
  color: #fff;
  font-size: 16px;
  height: 27px;
  user-select: none;
  cursor: pointer;
}
</style>