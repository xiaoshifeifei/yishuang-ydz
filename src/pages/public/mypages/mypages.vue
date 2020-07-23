<template>
    <div id="mypages">
         <uiScroll class="wrapper" ref="scroll" :backcolor="'#f5f5f5'"  :uiPull="true" @uiPullData="uiPullData" :data="scroll_data">
      <header class="header" id="header" ref="header" >
              <div class="ui-message" v-if="isLogin">
                 <div class="message">
                     <div class="item id-photo">
                          <i class="iconfont icon-shenfen"></i>
                     </div>
                     <div class="right">
                         <p class="id-name">用户名：{{user_data.info_name}}</p>
                         <p class="id-name">手机号：{{user_data.mobile}}</p>
                     </div>
                 </div>
                <!-- <div class="cash-account">
                     <p>中心钱包  (元)</p>
                     <div>
                         <span class="int">{{Math.floor(user_data.centre_money)}}.</span><span class="float">{{user_data.centre_money-Math.floor(user_data.centre_money)>=0.1?Math.round((user_data.centre_money-Math.floor(user_data.centre_money))*100):'0'+Math.round((user_data.centre_money-Math.floor(user_data.centre_money))*100)}}</span><span class="cash-out" @click="cash_out()">提现</span>
                     </div>
                 </div> -->
                  <!-- <div class="setup">
                      <router-link to="setup">
                        <i class="iconfont icon-xitong"></i>
                       </router-link>
                 </div>  -->
             </div> 
            <!-- <div class="log-reg" v-else>
                <router-link to="login">
                    <uiButton class="ui-login" :value="'登录'" ></uiButton>
                </router-link>
                 <router-link to="register">
                    <uiButton class="ui-register" :value="'注册'" ></uiButton>
                </router-link>
            </div> -->
           
        </header>
        <div class='ui-content' ref="content">
            <div class="ui-row">
                  <router-link tag='div' :to="item.path" class='ui-content-icon ui-col-3' v-for="(item,index) in icon" :key="index">
                    <i class="iconfont" :class="item.icon"></i>
                    <p>{{item.name}}</p>
                </router-link>
            </div>
            <div>
                <uiList class="ui-list" :list="list" :icon="true"></uiList>
            </div>
             <div class="quit">
                 <el-button class="el-button" @click="quit()" ><span>退出账号</span></el-button>
            </div>
        </div>
         </uiScroll>
    </div>
</template>
<script>
import  uiButton from '../../../components/button-bar/button-bar';
import YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import uiList from '../../../components/list-bar/list-bar'
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import  MypagesService from './mypages.http'
import Api from '../../../dora/api.js'
export default {
    components:{
        uiButton,
        uiList,
        uiScroll,
    },
    data(){
        return{
            icon:[
                {
                    icon:'icon-jieqian',
                    name:'邀请赚钱',
                     path:'/invite'
                },
                 {
                    path:'/myapprentice',
                    name:'我的徒弟',
                    icon:'icon-zutuan',
                },
                 {
                    icon:'icon-taobao1',
                    name:'淘宝账单',
                    path:'/running-water/1',
                },
                 {
                    icon:'icon-jingdong',
                    name:'京东账单',
                    path:'/running-water/2'
                }

            ],
            list:[
               
                {
                    icon:'icon-yue',
                    name:'资金管理',
                    right_button:true,
                    color:'#F8CA47',
                    path:'fund-manager'
                },
                 { 
                    icon:'icon-gerenziliao',
                    name:'个人资料',
                    right_button:true,
                    color:'#D82A54',
                    path:'/frofile'
                },
                 {
                    icon:'icon-xiugaimima',
                    name:'修改密码',
                    right_button:true,
                    color:'#3FBF54',
                    path:'/change-pwd'
                },
                 {
                    icon:'icon-qiaoding',
                    name:'绑定账号',
                    right_button:true,
                    color:'#63C5EA',
                    path:'bind-accout'
                },
                {
                    icon:'icon-xinyongka',
                    name:'绑定银行卡',
                    right_button:true,
                    color:'#E0B233',
                    path:'debit-card'
                },
                {
                    icon:'icon-kefu',
                    name:'专属客服',
                    right_button:true,
                    color:'rgb(52, 149, 235)',
                    path:'service'
                },
            ],
            isLogin:false,
            user_data:YsConfigJs.get_user(),
            scroll_data:true,
        }
    },
    created(){
        if(!YsConfigJs.isMaster()){
            this.icon[1].name="成为师父";
        }
    },
    mounted(){
        //  YsConfigJs.fixStatusBar(this.$refs.content);
        this.$refs.scroll.$el.style.height = document.getElementById("mypages").offsetHeight+'px';
        if(this.$store.state.isLogin){
            this.isLogin = true;
        }
        if(this.$route.query.bank){
             util.comfirm({
                content:'还未绑定银行卡，立即绑定',
                define:()=>{
                   this.$router.push('/debit-card');
                },
                cancel:()=>{
                   console.log('暂时不绑定银行卡');
                }
            });
        }
        YsConfigJs.fixStatusBar(document.getElementById("header"));
    },
    methods:{
        login(){
            util.alert({
                content:'密码输入错误,请重试',
                define:()=>{
                    console.log(1);
                }
            });
        },
        good(path){
            this.$router.push(path);
        },
        cash_out(){
            this.$router.push('/cash-out?cash='+this.user_data.centre_money);
        },
          quit(){
            util.comfirm({
                content:'确定退出账号？',
                define:()=>{
                     MypagesService.logout()
                     .then(res=>{
                         this.$store.dispatch("setIsLogin",false);
                         YsConfigJs.removeCache('user');
                        YsConfigJs.removeCache('token');
                        YsConfigJs.removeCache('isapp');
                        YsConfigJs.removeCache('servicer');
                        util.toast({
                            content:'退出成功',
                            times:1000
                        });
                        setTimeout(()=>{
                            this.$router.push('/login');   
                        },1000);
                    })
                    .catch(error =>{
                         util.toast({
                            content:'网络异常',
                            times:1000
                        });
                    })
                },cancel:()=>{
                    // setTimeout(()=>{
                    //         this.$router.push('/mypages');   
                    // },100);
                }
            })
        },
        uiPullData(){
            MypagesService.get_centerMoney()
            .then(res=>{
                if(res.code == 1){
                    util.toast({
                        content:'获取成功',
                        times:1000
                    });
                    YsConfigJs.setCache("user",res.data);
                    this.user_data = res.data;
                    this.scroll_data = !this.scroll_data;
                }else{
                    util.toast({
                        content:'获取失败',
                        times:1000
                    }); 
                }
            })
        }
    },
    watch:{
      
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#mypages{
    position: absolute;
    width: 100%;
    z-index: 1;
    .wrapper{
        overflow: hidden;
    }
    .header {
        width: 100%;
        min-height: 25vh;
        // padding-top: 3rem;
        background-color: rgb(245,245,245);
        text-align: center;
        border-radius: 0 0 2rem 2rem;
      background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
        // radial-gradient(circle 50vh at 50% -25vh,  #0c5b91 0 40%, transparent),
        // radial-gradient(circle 40vh at 50% -10vh,  #5fafe4 0 99.5%, transparent);
        .ui-message{
            padding-top: 6vh;
            height: 28%;
            position: relative;
            .message{
                text-align: center;
                //  width:60%;
                 height: 6rem;
                margin:auto;
                .item{
                    margin-bottom: 0.2rem;
                    height: 5rem;
                }
                .right{
                    text-align: left;
                   display: inline-block;
                   vertical-align: bottom;
                }
                .id-photo{
                    display: inline-block;
                    background-color: #eeeeee;
                    display: inline-block;
                    width: 3rem;
                    height:3rem;
                    border-radius: 4rem;
                    text-align: center;
                    .icon-shenfen{
                        font-size: 2.4rem;
                        color:#909090;
                    }
                }
                .id-name{
                    font-size: 1.2rem;
                    color:#eeeeee;
                }
                .id-phone{
                    font-size: 0.8rem;
                    color:#eeeeee;
                }
            }
            .cash-account{
                width:93.4%;
                min-height:5.5rem;
                margin:1rem auto 0 auto;
                border-radius: 1rem;
                padding:0.5rem 1rem;
                text-align: left;
                background-color: rgb(243,240,240);
                //background:linear-gradient(to right bottom, RGB(255,225,154) 0%, RGB(240,200,137) 100%);
                box-shadow: 0.1rem 0.2rem 0.3rem rgba(150,150,150,0.6);
                p{
                font-size: 0.8rem;  
                }
                div{
                    margin-top: 1rem;
                }
                .int,.float{
                    color:#ef2c17;
                }
                .int{
                    font-size: 2rem;
                }
                .float{
                    font-size: 1.2rem;
                }
                .cash-out{
                    font-size: 1.2rem;
                    margin-left: 2rem;
                    font-weight: 800;
                    color: #5fafe4;
                }
                .cash-out:hover{
                    color:#ef2c17;
                    text-decoration: underline;
                }
            }
            .setup{
                position: absolute;
                right:1rem;
                top:1rem;
                i{
                    color:white;
                    font-size: 1.5rem;
                }
            }
        }
        .log-reg{
            padding-top: 12vh;
        }
        .log-reg>div{
            display: inline-block;

        }
        .ui-login{
            margin-right: 1rem;
        }
    }
    .ui-content{
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        min-height: 10rem;
        background-color: #f5f5f5;
        .ui-row{
            width: 94%;
            margin:auto;
            padding:0.5rem 0;
            border-radius: 0.5rem;
            background-color: white;
        }
        .ui-content-icon{
            text-align: center;
             i{
                background:linear-gradient(to bottom right, rgb(238, 235, 87) 0% ,#ef2c17 100%);
                color:transparent;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 1.8rem;
            }
            p{
                margin-top: 0.2rem;
                color: rgb(100,100,100);
                font-size: 0.8rem;
            }
        }
        .ui-list{
            margin-top: 1.0rem;
            background-color: rgb(240,240,240);
            width:94%;
            margin:1rem auto;
            padding:0 1.7%;
            border-radius: 0.5rem;
            color:rgb(223, 41, 153)
        }
    }
}

</style>
