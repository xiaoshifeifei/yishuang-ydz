<template>
    <div id="invite">
        <!-- <header class="header ui-header-color" ref="header">
           
        </header> -->
         <uiTitle :title="'邀请赚钱'" ref="header" :color="'white'" :isback="true"></uiTitle>
        <div class="alert" ref="alert">
                <el-alert
                    :title="tips"
                    type="warning"
                    :closable="false"
                    show-icon>
                </el-alert>
        </div>
        <uiScroll class="wrapper" ref="scroll" :backcolor="'#f5f5f5'" >
            <main class="main">
            <div class="master">
                <div class="title">
                    我的邀请码: 
                </div>
                <div class="ui-invite">
                    <input type="text" class="invite-code" :value='invite_code' readonly />
                    <button class="button"  @click="get_inviteCode()"><span>刷新</span></button>
                    <button class="button copy"  @click="copy_inviteCode(copy1+invite_code+copy2)" :data-clipboard-text='copy1+invite_code+copy2' ><span>一键复制</span></button>
                    <p class="invite-tips">(备注：邀请码一对一，48小时内有效)</p>
                </div> 
            </div>
            <div class="use-code">
                <div class="title">
                    可用邀请码({{this.invitation.codeAll}}/{{this.invitation.inviteUser}})
                </div>
                <div class="code-list" v-for="(item,index) in invitation.code" :key="index">
                    <div class="code"><input type="text" class="invite-code" :value='item.code' readonly /> <span class="copy" :data-clipboard-text='copy1+item.code+copy2'  @click="copy_inviteCode(copy1+item.code+copy2)">复制</span></div>
                    <div class="time">{{item.time}}   <span class="status">未激活</span>   </div>
                </div>
            </div>
            </main>
        </uiScroll>
          
    </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import  InviteService from './invite.http'
export default {
    components:{
        uiScroll,
        uiTitle
    },
    data(){
        return{
            tips:'邀请徒弟做单有相应分成，禁止邀请陌生人！必须是靠谱的，否则取消师傅资格！',
            header_code:'',
            invitation:'',
            isMaster:null,
            copy1:'',
            copy2:'',
            invite_code:'还没有邀请码，点击生成'
        }
    },
    created(){ 
        util.loading();
        this.isMaster = YsConfig.isMaster(); /** 查看师父徒弟身份 */
        if(this.isMaster){
           this.get_invitation();
        } else {
             util.comfirm({
                content:'立即升级师父，享受师傅待遇，邀请徒弟',
                define:()=>{
                   this.$router.push('/apprentice');
                },cancel:()=>{
                   util.routerBack();
                }
            })
        }
      
    },
    mounted(){
        let url = window.location.href;
        let index = url.lastIndexOf("\/");
        this.header_code = decodeURI(url.substring(0, index+1));
        this.copy1=" 【有单做】\n本佣立返，无需证件照\n二代提成，全年皆可提现\n旺号：一年三心无降权\n 单限：日2月40\n 注册链接："+this.header_code+"register?code="
        this.copy2 = "\n网页登录链接："+this.header_code+"login\n安卓APP下载链接(请用浏览器打开下载)：http://static.pycac.com/ydz-app.apk";
           
            // 本佣立返，无需证件照
            // 二代提成，全年皆可提现
            // 旺号：一年三心无降权
            // 单限：日2月40
            // 注册链接：域名+/htm/html/index.html#/register?code=邀请码
            // 网页登录链接：域名+/htm/html/index.html#/login
            // 安卓APP下载链接：域名+/ydz-app.apk
        
       
        this.$refs.scroll.$el.style.height = document.getElementById("invite").offsetHeight - this.$refs.header.$el.offsetHeight - this.$refs.alert.offsetHeight +'px';
        window.apiready = function(){}
    },
    methods:{
        get_inviteCode(){
            InviteService.get_newCode()
            .then(res=>{
                if(res.code == 1){
                   this.invite_code = res.data.code; 
                   this.get_invitation();
                } else {
                    util.toast({
                        content:res.msg,
                        times:1000
                    });
                }
            });
        },
        get_invitation(){
            InviteService.get_invitation()
            .then(res=>{
                if(res.code == 1){
                    util.closeLoading();
                    this.invite_code = res.data.finallyCode == 0?'还没有邀请码，点击生成':res.data.finallyCode;
                    res.data.code.forEach(item=>{
                        item.time = new Date(item.time * 1000).toLocaleString('chinese', { hour12: false });
                    })
                    this.invitation = res.data;
                }else{
                    util.alert({
                        content:res.msg,
                        define:()=>{
                           util.routerBack();
                        }
                    })
                }
            });
        },
        copy_inviteCode(code){
            if(this.invite_code == '还没有邀请码，点击生成'){
                util.toast({
                    content:'还没有邀请码，去点击生成',
                    times:1000
                });
                return;
            }
            YsConfig.copy_text(code)
            .then(res =>{
                util.toast({
                    content:res,
                    times:1000
                });
            });
        }
    }
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
#invite{
     position: absolute;
     z-index: 2;
    .wrapper{
        overflow: hidden;
        .main{
            padding-top: 0.8rem;
        }
    }
    .master{
        position: relative;
        width:100%;
        min-height:10rem;
        margin-bottom: 0.8rem;
        padding:0.5rem 3%;
        background-color:white;
        box-shadow: 0.1rem 0.1rem 0.5rem rgba(0,0,0,0.2);
        .button{ 
            padding:0 0.5rem;
            height:1.6rem;
            line-height: 1.6rem;
            background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
            border-radius: 0.5rem;
            span{
                height: 100%;
                font-size: 0.8rem;
                color:white;
            }
        }
        .button:last-of-type{
             margin-left: 1rem;
        }
        .ui-invite{
            height:10rem;
            padding:0.5rem 0.2rem;
            border-radius: 1rem;
            line-height: 2rem;
            text-align: center;
            .invite-code{
                display: block;
                margin:0.8rem auto;
                min-width:100%;
                text-align: center;
                font-size: 1.2rem;
                color:rgb(180,180,180);   
                -webkit-user-select:text;
                -moz-user-select:text;
                -o-user-select:text;
                user-select:text;         
            }
            p{
                font-size: 0.8rem;
                padding:1rem 0;
            }
            .again-code{
                text-decoration: underline;
            }
            .invite-tips{
                text-align: right;
                color:#8c8c8c;
            }
        }
        .title{
            height: 2rem;
            font-weight: 700;
        }
    }
    .use-code{
        position: relative;
        width:100%;
        min-height:10rem;
        margin-bottom: 0.8rem;
        padding:0.5rem 3%;
        .title{
            font-weight: 700;
            position: sticky;
            height: 2.5rem;
        }
        .code-list{
            position: relative;
            background-color: white;
            min-height: 5rem;
            border-radius: 0.5rem;
            padding:0.8rem 0.5rem;
            margin-bottom: 0.8rem;
            .code{
                margin-left: 0.5rem;
                .invite-code{
                    // color:rgb(180,180,180);     
                    min-width:13rem;
                }
                .copy{
                    //  display: inline-block;
                     float: right;
                     margin-right: 0.8rem;
                     color:#6fbaec;
                     font-size: 0.9rem;
                     border:0.05rem solid #6fbaec;
                     padding:0 0.3rem;
                     border-radius: 0.6rem;
                }
            }
            .time{
                margin-top: 0.8rem;
                 margin-left: 0.5rem;
                 color:#8c8c8c;
                .status{
                    float: right;
                    margin-right: 0.8rem;
                    font-size: 0.9rem;
                 }
            }
        }
    }
}

      
</style>