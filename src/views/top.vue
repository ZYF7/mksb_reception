<template>
  <div>
    <div class="top-box">
      <div class="top-box2">
        <p>麦克斯宝 四川</p>
        <span>
          <a @click="index7">商城首页</a>
          <a @click="relation7">联系我们</a>
          <a @click="login" v-if="uName==''">登录</a>
          <a @click="signUp"  v-if="uName==''">注册</a>
          <a @click="userName" class="us">{{uName}}</a>
          <a @click="quit" v-if="uName!=''">退出</a>
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
     uName:'',//顶部欢迎用户
    }
  },
  methods: {
            // 缓存操作=======================================================缓存操作模块===================================================
            //添加缓存方法-------------------------------------------------
            addcache(cachekey, myArr7) {
            //添加缓存a
            localStorage.setItem(cachekey, myArr7);
            },
            //写入缓存的方法+转json字符串方法-------------------------------------------------
            setmycache(cachekey, myArr) {
            var myArr17 = JSON.stringify(myArr);
            //添加缓存a
            this.addcache(cachekey, myArr17);
            },

            //获取缓存对象方法+转换json对象-----------------------------------------------------------
            getmycache(cachekey) {
            if (window.localStorage[cachekey]) {
                // alert("有");
                return JSON.parse(localStorage.getItem(cachekey));
            } 
            else {
                var myArr7 = [
                {
                    from: "",
                    name: ""
                }
                ];
                myArr7 = JSON.stringify(myArr7);
                this.addcache(cachekey, myArr7);
                return JSON.parse(localStorage.getItem(cachekey));
            }
            },
            // 缓存操作=======================================================缓存操作模块===================================================
    // 联系我们
    relation7() {
      this.$router.push({
        path: "/contact",
        query: ""
      });
    },
    //首页
    index7() {
      this.$router.push({
        path: "/",
        query: ""
      });
    },
    // 登录
    login(){
      var huancun=this.getmycache("info");//获取缓存
      var lujin=this.$route.path;//获取当前路径
      huancun[0].from=lujin;//将当前路径名称给缓存
      this.setmycache("info",huancun);
      this.$router.push({path:'/Login'});
    },
    // 注册
    signUp(){
      var huancun=this.getmycache("info");//获取缓存
      var lujin=this.$route.path;//获取当前路径
      huancun[0].from=lujin;//将当前路径名称给缓存
      this.setmycache("info",huancun);
      this.$router.push({path:'/singUp',query:""});
    },
    //退出
    quit(){
      var huancun=this.getmycache("info");//获取缓存
      var lujin=this.$route.path;//获取用户是在哪个页面点击的退出按钮的路径 
      huancun[0].name='';//清除用户名的缓存
      this.uName='';//将v-model绑定的数据清空，从而隐藏用户名和退出按钮
      this.setmycache("info",huancun);//设置清楚过后的缓存

    },
    // 用户名
    userName(){
      alert("用户名");
    },
    // 判断缓存
    pandun(){
      var huancun=this.getmycache("info");//获取缓存
      if(huancun[0].name){//如果有该缓存
        this.uName="您好，"+huancun[0].name;//就将用户名给顶部导航显示欢迎用户
      }else{//如果没有该缓存
        this.uName="";//就把用户名赋值为空
      }
    }
  },
  mounted(){
    this.pandun();//判断缓存，用来控制用户名的显示、登录和注册的显示和隐藏
  }

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
  margin-right: 10px;
  cursor: pointer;
  user-select: none;
}
.top-box2 > span a:hover {
  color: #f60;
}
.us{
  font-weight: bold;
  color: #f90;
  /* text-shadow: 1px 1px 1px #000000; */
}
</style>