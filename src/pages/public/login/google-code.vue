<template>
    <div id="googleCode">
        <uiTitle  :isback="true" :fontcolor="'white'"></uiTitle>
        <h2 class="title">谷歌验证登录</h2>
        <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-input-list">
                <div class="input-name">手机号</div>
                <input name="phone" type="text" v-model="form.mobile"  placeholder="请输入手机号"  /><!-- @blur="check($event,'phone')"-->
                <i class="el-icon-close el-icon" v-if="form.mobile!=''" @click="empty($event,'mobile')"></i>
            </div>
            <div class="error">{{error.mobile}}</div>
             <div class="ui-input-list">
                <div class="input-name">密码</div>
                <input name="pwd" type="password" v-model="form.password" placeholder="请输入密码"  autocomplete />
                 <i class="el-icon-close el-icon" v-if="form.password!=''"  @click="empty($event,'pwd')"></i>
            </div>
             <div class="error">{{error.password}}</div>
                  <div class="google-code">
                    <div ref='recaptchaDiv' :class='{"google_translate":translate_g}' id="recaptchaDiv" @click="translate($event)"></div>
                    <input type="hidden" class="g-recaptcha" data-sitekey="sitekey" data-size="invisible" data-badge="inline"/>
             </div>
              <el-button class="el-button" @click="login()"><span>登录</span></el-button>
        </el-form></div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import  uiTitle from '../../../components/title-bar/title-bar';
import  LoginService from './login.http'
import util from '../../../dora/util.js'
export default {
    components:{
        uiTitle,
    },
    data(){
        return{
            form:{
                mobile:'',
                password:'',
            },
            error:{
                mobile:'',
                password:'',
            },
            cal:'',
            translate_g:false
        }
    },
    created(){
        this.mobile = this.$route.params.mobile;
    },
    mounted(){
        // let sitekey='';
        // if(process.env.NODE_ENV === 'test'){
        //     sitekey = '6Lco9OkUAAAAAJqHc0P_JwF1FqfiTSL835VkO7QQ';
        // }else if(process.env.NODE_ENV === 'production'){
        //     sitekey = 'http://www.pycac.com/';
        // }else{
        //     grab = '';
        // }
        grecaptcha.render(document.getElementById("recaptchaDiv"), {
            'sitekey': '6Lco9OkUAAAAAJqHc0P_JwF1FqfiTSL835VkO7QQ',//公钥6Lco9OkUAAAAAJqHc0P_JwF1FqfiTSL835VkO7QQ
            'theme': 'light', //主题颜色，有light与dark两个值可选
            'callback': (cal) => {
                this.callback(cal);
            }, //验证成功回调
            'expired-callback': (exp) => {
                this.expiredCallback(exp);
            }, //验证过期回调
            'error-callback': (err) => {
                this.errorCallback(err);
            }, //验证错误回调
        });
    },
    methods:{
        empty(e,type){
            if(type == 'mobile'){
                this.form.mobile = ''
            }else if(type == 'pwd'){
                this.form.password = ''
            }else if(type == 'code'){
                this.form.code = ''
            }
            e.target.previousElementSibling.focus();
        },
        translate(e){
            console.log(222);
            this.translate_g = true;
        },
        callback(cal){
            console.log(cal);
            console.log('验证成功');
            this.cal = cal;
        },
        expiredCallback(exp){
            // console.log(exp);
            console.log('验证过期');
        },
        errorCallback(err){
            // console.log(err);
            console.log('验证错误');
        },
         login(){
            if(this.form.mobile == ''){
                this.error.mobile = '手机号不能为空';
               document.getElementsByName("phone")[0].focus(); 
               return;
            }else{
                 this.error.mobile = '';
            }
            if(this.form.password == ''){
                this.error.password = '密码不能为空';
                document.getElementsByName("pwd")[0].focus();
                return;
            }else{
                 this.error.password = '';
            }
            if(this.cal == ''){
                util.alert({
                    content:'请完成谷歌验证',
                });
                return;
            }
            if(this.error.mobile == '' && this.error.password == ''){
                 const rasPw = this.$getRsaCode(this.form.password);
                 LoginService.google_login({
                    mobile:this.form.mobile, 
                    user_pass:rasPw,
                    recaptcha: this.cal,
                }).then(res=>{
                    if(res.code == 1) {
                        if(res.data==null){
                            return;
                        }
                        this.$store.dispatch("setIsLogin",true);
                        YsConfigJs.setCache("token",res.data.token);
                        YsConfigJs.setCache("user",res.data.user);
                        if(YsConfigJs.getCache("userHistory") == null){
                            YsConfigJs.setCache("userHistory",[res.data.user.mobile]);
                        }else{
                            const result = YsConfigJs.getCache("userHistory");
                            const index = result.some((x)=>{ return res.data.user.mobile == x});
                            if(index == false){
                                 YsConfigJs.setCache("userHistory",result.concat(res.data.user.mobile));
                            }
                        }
                        util.toast({
                            content:'登录成功',
                            times:1000
                        });
                        setTimeout(()=>{
                            LoginService.get_service()
                            .then(res=>{
                                if(res.code == 1){
                                    if(res.data.zskf.type == 'QQ'){
                                        YsConfigJs.setCache('servicer','QQ：'+res.data.zskf.wx);
                                    }else{
                                         YsConfigJs.setCache('servicer','wx：'+res.data.zskf.wx);
                                    }
                                    if (res.data.counsel==1) {
                                        (function () { var _53code = document.createElement("script"); _53code.src = "https://tb.53kf.com/code/code/fd0777bbf73e53b32be504f3d0f2114c2/1"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(_53code, s); })();
                                    }
                                }
                            })
                            this.$router.push('/mypages');   
                        },700);
                    } else if(res.code == 403) {
                        var path = '/google-code/' + this.form.mobile;
                        this.$router.push(path);
                    } else {
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                console.log(res);
                            }
                        })
                    }
                })
            }
        }
    },
    directives:{

    },
    watch: {
     
    },
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#googleCode{
    width: 100%;
    height:100vh;
    background:rgb(139, 202, 245);
    overflow-y: auto;
    z-index: 6;
    .title{
        text-align: center;
        color:rgb(250,250,250);
    }
    .el-form{
        border-radius: 2rem;
        padding:1rem 0.5rem;
        width: 100%;
        margin:auto;
        min-height: 10rem;
        .ui-input-list{
            margin: auto;
            width: 90%;
        }
            .google-code{
            position: relative;
            overflow: hidden;
            height:5.5rem;
            width: 16rem;
            #recaptchaDiv{
                position: absolute;
            }

        }
       
        .code{
            width:60%;
            display: inline-block;
            input{
                width:50%;
            }
        }
        .error{
            font-size: 0.9rem;
            color:red;
            height:1.5rem;
            padding-left: 1rem;
        }
        .forget-pwd{
            margin-top: 0.8rem;
            width: 100%;
            height:2rem;
            color:white;
            text-align: center;
            font-size: 1.2rem;
            a{
                display: inline-block;
                color:white;
                padding:0 0.5rem;
                font-size: 0.9rem;
            }
            a:first-of-type{
                text-align: right;
            }
        }
    }
}
</style>