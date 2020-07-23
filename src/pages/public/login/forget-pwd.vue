<template>
    <div id="forget-pwd">
        <uiTitle  :isback="true" :color="'white'"  :title="'忘记密码'"></uiTitle>
        <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-profile-list">
                <div class="input-name">电话号码</div>
                <input name="phone" type="number" v-model="form.mobile" placeholder="输入电话号码"  />
                <i class="el-icon-close el-icon" v-if="form.mobile!=''"  @click="empty($event,'mobile')"></i>
            </div>     
            <div class="ui-profile-list code">
                <div class="input-name">验证码</div>
                <input name="code" type="text" v-model="form.code" placeholder="输入验证码"  />
                <i class="el-icon-close el-icon" v-if="form.code!=''"  @click="empty($event)"></i>
            </div>  
             <div class="send-code" v-if="!num_show">
                <el-button class="send-button" @click='send_code()' ><span >发送验证码</span></el-button>  
            </div>
             <div class="send-code" v-if="num_show">
                <el-button class="send-button numShow" ><span>({{num}}秒)</span></el-button>  
            </div>
         </el-form>  
          <el-button class="el-button"  @click="next()"><span>下一步</span></el-button>
    </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  LoginService from './login.http'
import  uiTitle from '../../../components/title-bar/title-bar';
export default {
    components:{
        uiTitle
    },
    data(){
        return{
            phone:'',
            form:{
                mobile:'',
                code:''
            },
            num: 60,
            num_show:false,
            countdown:null
        }
    },
    mounted(){
       
    },
    methods:{
        empty(e,type){
            if(type == 'mobile'){
               this.form.mobile = ''; 
            }else{
                this.form.code='';
            } 
            e.target.previousElementSibling.focus();
        },
        send_code(){
            if(this.form.mobile == ''){
                util.alert({
                    content:'手机号不能为空',
                    define:()=>{
                        // console.log(res);
                    }
                });
               return;
            }
            YsConfigJs.check_Re('phone',this.form.mobile)
            .then(res=>{
                if(res == true){
                        LoginService.get_code({
                        mobile:this.form.mobile
                    }).then(res=>{
                        if(res.code == 1){
                            this.num_show = true;
                            this.countdown = setInterval(() => {
                                this.num--;
                                if (this.num === 0) {
                                    this.num = 60;
                                    this.num_show = false;
                                    clearInterval(this.countdown);
                                }
                            }, 1000);
                            util.toast({
                                content:res.msg,
                                times:1000
                            });
                        }else{
                            util.alert({
                                content:res.msg,
                                define:()=>{}
                            }) 
                        }
                    });
                }else{
                    util.alert({
                        content:res,
                        define:()=>{
                            console.log(res);
                        }
                    })
                    this.form.mobile='';
                }
            });
        },
        next(){
            if(this.form.mobile == ''){
                util.alert({
                    content:'手机号不能为空',
                    define:()=>{
                        // console.log(res);
                    }
                });
               return;
            }
            if(this.form.code == ''){
                util.alert({
                    content:'验证码不能为空',
                    define:()=>{
                        // console.log(res);
                    }
                });
                return;
            }
             LoginService.forget_password({
                mobile:this.form.mobile, 
                vCode:this.form.code, 
            }).then(res=>{
                if(res.code == 1) {
                    clearInterval(this.countdown);
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
                        content:'验证成功',
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
                       this.$router.push('/change-pwd?code='+this.form.code);
                    },700);
                } else {
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            // console.log(res);
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
#forget-pwd{
    z-index: 5;
    .tips{
        position: sticky;
        height:3rem;
        line-height: 3rem;
        margin-left: 1rem;
        font-size: 0.9rem;
    }
    .el-form{
        position: relative;
        width:100%;
        margin:0.8rem auto 0 auto;
        padding:0.2rem 0.7rem ;
        background-color: white;
        .code{
            width:60%;
            display: inline-block;
             .input-name{
                 width:28% !important;
                 
             }
            input{
                width:50%;
                font-size: 0.9rem;
            }
        } 
       .send-code{
        //display: inline-block;
            float: right;
            padding:1.2rem 0 0.5rem 0;
            .send-button{
                width: 100%;
                border:none;
                padding: 0 0.5rem;
                text-align: center;
                background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
                span{
                    color:white;
                    font-size: 0.8rem;
                }
                margin: 0 auto 0 auto;
                height: 2rem;
                font-size: 0.8rem;
                border-radius: 0.5rem;
            }
        }
      
        .ui-profile-list{
            min-height:4rem;
            line-height:3.6rem;
            background-color: white;
            position: relative;        
            .ime-mode{
                ime-mode:active;
            }
            .input-name{
                display: inline-block;
                height:100%;
                line-height:4rem;
                font-size: 0.9rem;
                color:rgba(100,100,100,0.8);
            }
            input{
                display: inline-block;
               line-height:4rem;
               height: 4rem;
                min-width: 60%;
                max-width: 70%;
                font-size: 0.9rem;
                padding-left: 0.1rem;
                color:#4c4c4c;
            }
            .el-icon{
                position: absolute;
                right:0.5rem;
                top:1.4rem;
                background-color: rgba(100,100,100,0.3);
                border-radius: 100px;
                line-height: 1.3rem;
                color:#7c7c7c;
                text-align: center;
                width:1.3rem;
                height:1.3rem;
                font-size: 1rem;
            }
        }
    }
}
</style>