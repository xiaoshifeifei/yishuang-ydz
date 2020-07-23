<!--
 * @Author: wmy
 * @Date: 2020-05-12 16:17:18
 * @LastEditTime: 2020-06-30 17:41:36
 * @LastEditors: Please set LastEditors
 * @Description: 有单做首页
 * @FilePath: \ydz_web\src\pages\public\main\main.vue
 -->
<template>
    <div id='main'>
        <header class="header ui-header" ref="header">
            <div id="block"> </div>
            <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'"  :scroll_to="scroll_to" :uiPull="true" @uiPullData="uiPullData" :data="scroll_data" >
                <div class="notice-nav" id="notice-nav">
                    <p>有单公告</p>
                    <div class="download-button" @click="toApp()" v-if="!isApp"><i class="iconfont icon-anzhuo"></i> <span>App</span></div> 
                </div>
                 <div class="notice" >
                       <div class="third"
                       style="margin-bottom:0.8rem">
                        近期出现一款新的抢单助手，可有效提高做单效率，推荐官方下载:<span class="ui-red" @click="go_third()">http://dl.kuaidan123.com,点击立即注册</span>
                    </div>
                     <!-- <div v-html='notice.buyerRoll'>

                     </div> -->
                       <div v-html='notice.buyerNotice'>

                     </div>
                </div>
                <!-- <p class="title"></p>
                <div class="notice">
                  
                    <div class="note">
                        【任务须知】<br>
                        1.做完垫付单，务必在3-5天内登录平台做对应评价单。不做评价单平台将冻结账号，把单子留给肯配合的粉丝。<br>
                        2.必须加客服微信做单，否则限制接单。不得串号，禁止秒拍。使用拍立淘、淘宝客、返利网，淘金币等任何红包将限制提现！<br>
                        3.接到任务必须在本店浏览5分钟以上。私自联系商家或擅自退款，将限制提现、拉黑处理！<br>
                        4.评价单一定要做，否则拉黑处理！！！评价后截图上传不成功的，联系客服处理。<br>
                    </div>
                    <div class="note">
                        联系客服：会员管理——联系客服。（小萌：youdanzuo）
                    </div>
                    <div class="note">
                        【平台升级】<br>
                        1.提现请在个人中心→资金转出，先将淘宝中的资金转出到平台首页中的我的账户再进行提现<br>
                        2.提现显示“审核通过”，表示安排打款未到账，24小时内会到账！<br>
                        3.未收到返款不要着急，反馈给客服后还请耐心等待，感谢大家的支持！<br>
                    </div>
                    <div class="note">
                       【升级师傅】<br>
                        1.平台持续优化升级中！ 徒弟必须是认识、靠谱的，问题徒弟请及时联系客服处理~<br>
                        2.你收的徒弟如果有违规操作，您将会受到处罚，如果您的徒弟的操作带来平台的损失，您需承担相应的损失。<br>
                        3.1年3心，周点2.5以下，非降权号。做单必须加客服微信，2天内审核，超过2天未审核联系客服。<br>
                        4.绑定银行卡：<br>
                    </div>
                </div> -->
            </uiScroll>
        </header>
        <div class="tb-nav"  @click="rob(0)">{{tbRob}}</div>
        <div class="jd-nav" @click="rob(1)">{{jdRob}}</div>
        <div class="quick-nav"  @click="rob(2)" >{{quickRob}}</div>
    </div>
</template>
<script>
import  YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import  MainService from './main.http'
import publicJs from './public'
export default {
    components:{
        uiTitle,
        uiScroll
    },
    data(){
        return{
            message:'',
            notice:'',
            bounce:{
                top:false,
                bottom:true,
                left:false,
                right:false
            },
            scroll_to:[true,0],
            tbRob:'淘宝抢单',
            jdRob:'京东抢单',
            quickRob:'快速抢单',
            is_robing:false,
            isApp:false,
            scroll_data:true,
        }
    },
    created(){        
        if(!YsConfigJs.get_time_session('notice')){
             MainService.get_notice()
            .then(res=>{
                if(res.code == 1){
                        this.notice = res.data;
                        YsConfigJs.set_time_session('notice',this.notice);
                }
            })
        }else{
            this.notice = YsConfigJs.get_time_session('notice');
        }
        MainService.get_unfinishedTask()
        .then(res=>{
                publicJs.unfinishedTask(res,0);
        })
     
    },
    mounted() {
        this.isApp = YsConfigJs.isApp();
        if(this.isApp){
            document.getElementById("block").style.height = this.$store.state.safeTop+'px';
        }
        this.$refs.scroll.$el.style.height = document.getElementById("main").offsetHeight -this.$store.state.safeTop+'px';
    },
    methods:{
        uiPullData(){
            if(!YsConfigJs.get_time_session('notice')){
                 MainService.get_notice()
                .then(res=>{
                    this.notice = res.data;
                    YsConfigJs.set_time_session('notice',this.notice);
                    this.scroll_data = !this.scroll_data;
                })
            }else{
                this.notice = YsConfigJs.get_time_session('notice');
            }
            MainService.get_unfinishedTask()
            .then(res=>{
                publicJs.unfinishedTask(res,0);
                this.scroll_data = !this.scroll_data;
            })
        },
        go_third(){
            if(YsConfigJs.isApp()){
                 api.openApp({
                        androidPkg : 'android.intent.action.VIEW',
                        uri: 'http://dl.kuaidan123.com'
                }, function(ret, err) {
                });
            }else{
              this.$router.push('/thirdpages?url=http://dl.kuaidan123.com');
            }
            //
        },
        toTop(){
            this.scroll_to = [!this.scroll_to[0],0];
        },
        rob(type){
            this.$router.push('/grab-center/'+type);
        },
        toApp(){
            // 判断是否为app
            if(!this.isApp){//web
                var u = navigator.userAgent, app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                // if (isAndroid) {//这个是安卓操作系统
                    // console.log("安卓");
                    this.$router.push('/download-android');
//                 }
//                 if (isIOS) {//这个是ios操作系统
//                     // console.log("ios");
//                     util.alert({
//                         content:'目前只有安卓版APP',
//                         define:()=>{
                           
//                         }
//                     });
//                 }
            }else{//app
                
            }
        }       
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
.header {
    position: relative;
    width: 100%;
    // min-height: 2.5rem;
    height: 100%;
    background-color: #f5f5f5;
    #block{
        z-index: 1;
       //height: 25px;
       width: 100%;
    }
    .wrapper{
        height: 100%;
        overflow: hidden;
        .title{
            height: 2.5rem;
            padding:0.2rem 0;
            text-align: center;
            font-size: 1.3rem;
            font-weight: 700;
            color: transparent;
            text-shadow:0 0 1px #FFD700, -1px -1px #FFF, 1px -1px  #444;
        }
    }
    .notice{
        padding-top: 0.8rem;
        color:white;
        font-size: 0.9rem;
        width:90%;
        margin:auto;
        padding-bottom: 5.5rem;
        // .third{
        //     font-size: 13px;
        // }
    }
}
#main{
    .tb-nav ,.jd-nav,.quick-nav,.wrapper-quick-nav{
        position: fixed;
        z-index: 1;
        font-size: 1.1rem;
        color:white;
    }
    .notice-nav{
        position: relative;
       height: 3rem;
       text-align: center;
        p{
            margin-top: 0.3rem;
            position: relative;
           display: inline-block;
            line-height: 2.4rem;
            height: 2.4rem;
            width: 6.4rem;
            text-align: center;
            border-radius: 1rem 1rem 0 0;
            color:white;
            background:linear-gradient(to right bottom,#2d99e0,#6fbaec);
        }
        p::after, p::before {
            content: "";
            display: block;
            position: absolute;
            bottom: -0.1rem;
            height: 0px;
            width: 0px;
            border: 0.6rem solid ;
            z-index: 0;
        }
        p::before{
            border-color: #2d99e0 #2d99e0 #2d99e0 transparent;
            left: -1rem;
        }
        p::after{
            border-color: #6fbaec transparent #6fbaec #6fbaec ;
            right: -1rem;
        }
        .download-button{
            position: absolute;
            right: 0.5rem;
            bottom: 0.6rem;
            font-size: 0.9rem;
            font-weight: 600;
           color:#2d99e0;
            i{
                height: 1rem;
                font-weight: normal;
                font-size: 1.3rem;
            }
            span{
                display: inline-block;
                vertical-align: bottom;
                 height: 1.2rem;
                 padding-bottom: 0.6rem;
                 line-height: 1rem;
                color:#2d99e0;
                font-size: 0.9rem;
                font-weight: 600;
            }
        }
    }
    .tb-nav,.jd-nav{
         height: 3rem;
        width: 8.5rem;
         bottom:3rem;
        text-align: center;
        right: 0;
        line-height: 3.5rem;
    }
    .jd-nav{
        right: 0;
        border-radius: 0 100%  0 0;
        background:linear-gradient(to left bottom,#2d99e0,#6fbaec);
    }
    .tb-nav{
        left: 0;
        border-radius: 100% 0 0 0;
        background:linear-gradient(to right bottom,#2d99e0,#6fbaec);
    }
    .quick-nav,.wrapper-quick-nav{
        text-align: center;
        width:7rem;
        height:7rem;
        line-height: 6rem;
        border-radius: 100%;
        left: 50%;
        transform: translateX(-50%);
         background-color:#FFC125;
    }
    .quick-nav{
         bottom:1rem;
    }
    .wrapper-quick-nav{
        bottom:0.5rem;
    }
}
      
</style>