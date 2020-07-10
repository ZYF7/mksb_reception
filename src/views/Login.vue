<template>
    <div>
        <!-- contact-form -->	
        <div class="message warning">
        <div class="inset">
            <div class="login-head">
                <h1>登录</h1>
                <div class="alert-close"></div> 			
            </div>
                <form>
                    <li>
                        <input type="text" placeholder="username" v-model="userName"><a href="#" class=" icon user"></a>
                    </li>
                        <div class="clear"> </div>
                    <li>
                        <input type="password" placeholder="password" v-model="password"> <a href="#" class="icon lock"></a>
                    </li>
                    <div class="clear"></div>
                    <div class="submit">
                        <input type="button" @click="login" value="登录" >
                        <h4><a href="javascript:;">忘记密码 ?</a></h4>
                        <div class="clear"></div>	
                    </div>
                        
                </form>
            </div>					
        </div>
	    <div class="clear"></div>
	</div>
</template>
<script>
import '../assets/css/style.css'
export default {
    data(){
        return{
            userName:'',//用户名
            password:'',//密码
        }
    },
    created(){},
    methods:{
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
                    from: "/",
                    name: ""
                }
                ];
                myArr7 = JSON.stringify(myArr7);
                this.addcache(cachekey, myArr7);
                return JSON.parse(localStorage.getItem(cachekey));
            }
            },
            // 缓存操作=======================================================缓存操作模块===================================================
        login(){
                this.axios({
                    methods: "post",
                    url: "http://api_dev.wanxikeji.cn/api/login",
                    params: {name:this.userName,pw:this.password},
                    })
                    .then((result) => {
                        var code=result.data.code;//返回的状态码
                        // 如果为2000，就说明成功
                        if(code==2000){
                            //首先要判断有没有缓存
                            alert("登录成功！");
                            var um=result.data.data.user_account;//用户名，需要存到缓存
                            var getname=this.getmycache("info"); //获取缓存
                            getname[0].name=um;//将用户名赋值给缓存的name
                            var pat=getname[0].from;//跳转的路劲
                            // console.log(pat);
                            this.setmycache("info",getname);
                            this.$router.push({path:pat});

                        }
                        // 如果为2010，就说明账号或者密码错误
                        if(code==2010){
                            alert(result.data.msg);
                        }
                    })
                    .catch(function(error) {
                    console.log(error);
                    });
        }
        
    },
    mounted(){

    },
    watch:{}
}
</script>
<style scoped>

</style>