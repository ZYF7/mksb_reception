<template>
    <div>
        <!-- contact-form -->	
        <div class="message warning">
        <div class="inset">
            <div class="login-head">
                <h1>注册</h1>
                <div class="alert-close"> </div> 			
            </div>
                <form>
                    <li>
                        <input type="text" placeholder="username" v-model="userName"><a href="#" class=" icon user"></a>
                    </li>
                        <div class="clear"> </div>
                    <li>
                        <input type="password" placeholder="password" v-model="password"> <a href="#" class="icon lock"></a>
                    </li>
                    <div class="clear"> </div>
                    <div class="submit">
                        <input type="button" @click="sign" value="注册">
                        <h4><a href="javascript:;">登录</a></h4>
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
        sign(){
            this.axios({
            methods: "post",
            url: "http://api_dev.wanxikeji.cn/api/register",
            params: {name:this.userName,pw:this.password},
            })
            .then(result => {
                var code=result.data.code;//返回的码
                // 如果为2000，就说明成功
                if(code==2000){
                    alert("注册成功！");
                    this.$router.push({path:'Login'});
                }
                // 如果为2010，就说明已经有该用户了，需要用户重新输入用户名
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