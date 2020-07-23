<template>
    <div id="accout">
         <uiTitle class="title" ref="title" :isback="true" :title="'绑定账号'" :color="'white'"></uiTitle> 
        <main class="main"> 
             <div class="taobao" v-if="accout_info!=''" :class="{'down-animation':is_taobaoDown}">
                 <div class="header">
                     <div class="taobao-icon"></div>
                    <div class="title">
                        淘宝账号
                    </div>
                    <div class="status">
                        状态：{{accout_info.tb.user_status}}
                    </div>
                 </div>
                 <button class="down-button"   @click="is_taobaoDown = !is_taobaoDown">
                     <i v-if="is_taobaoDown" class="el-icon-arrow-up "></i>
                     <i v-else class="el-icon-arrow-down"></i>
                 </button>   
                <div class="appear">
                    <div class="accout-main">
                        绑定账号名：{{accout_info.tb.wangwang}}
                    </div>
                    <el-button v-if="accout_info.tb.user_status=='待换绑'" class="bind-button" @click="change_bind(0)" ><span>换绑旺旺号</span></el-button>
                </div>
             
            </div>
            <div class="jingdong" v-if="accout_info!=''" :class="{'down-animation':is_jingdongDown}">
                <div class="header">
                     <div class="jingdong-icon"></div>
                    <div class="title">
                        京东账号
                    </div>
                     <div class="status">
                        状态：{{accout_info.jd.jd_user_status}}
                    </div>
                </div>
                 <div class="appear">
                    <div class="accout-main">
                        绑定账号名：{{accout_info.jd.jd_wangwang}}
                    </div>
                    <el-button v-if="accout_info.jd.jd_user_status=='待换绑'" class="bind-button" @click="change_bind(1)" ><span>换绑京东号</span></el-button>
                    <el-button class="bind-button" v-if="accout_info.jd.jd_wangwang==''"  @click="change_bind(1)"  ><span>马上绑定</span></el-button>
                </div>
                <button class="down-button"   @click="is_jingdongDown = !is_jingdongDown">
                    <i v-if="is_jingdongDown" class="el-icon-arrow-up "></i>
                     <i v-else class="el-icon-arrow-down"></i>
                </button>   
            </div>
        </main>
        <div class="tips">
                本站目前暂无解绑功能，一经绑定，不可解绑。 
        </div>
    </div>
</template>
<script>
import  YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  MypagesService from './mypages.http'
export default {
    components:{
        uiTitle
    },
    data(){
        return{
            is_taobaoDown:false,
            is_jingdongDown:false,
            accout_info:''
        }
    },
    created(){
        util.loading();
         MypagesService.get_accout()
        .then(res=>{
             util.closeLoading();
            if(res.code == 1){
                this.accout_info = res.data;
            }
        })
        .catch(error=>{
             util.closeLoading();
        })
    },
    mounted(){
       
    },
    methods:{
        change_bind(type){
            this.$router.push('/bind-wangwang/'+type);
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
#accout{
    .tips{
        width: 100%;
        padding:0.5rem 3%;
        font-size: 0.8rem;
        color:rgb(170,170,170);
        background-color: #f5f5f5;
    }
    .main{
        width: 94%;
        margin:auto;  
        &>div{
            position: relative;
            height: 7rem;
            width: 100%;
            margin-top: 0.8rem;
            border-radius: 0.5rem;
            overflow: hidden;
            .header{
                width:94%;
                margin:auto;
                padding-top: 0.8rem;
                height:3rem;
                line-height: 3rem;
                &>div{
                    display: inline-block;
                }
                 .title{
                    margin-left: 1.5rem;
                    vertical-align: top;
                    color:#5c5c5c;
                    font-size: 1.2rem;
                }
                .status{
                    vertical-align: top;
                    float: right;
                    font-size: 0.8rem;
                    color:rgb(180,180,180);
                }
            }
            .appear{
                position: absolute;
                top:5rem;
                left: 0;
                width:100%;
                height:6rem;
            }
            transition: all 0.4s;
        }
        .down-animation{
            height: 13rem;
        }
        .accout-main{
            margin-left: 20%;
            height: 2.5rem;
            line-height: 2.5rem;
            color:rgb(150,150,150);
        }
        .bind-button{
            margin-top: 1rem;
            height: 2.5rem;
            border: none;
            width: 100%;
            border-radius: 0;
           background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
            span{
                color: white;
            }
        }
        .taobao{
            position: relative;
            background-color: white;
            .taobao-icon{
                display: inline-block;
                width: 3rem;
                height:  3rem;
                 background-image: url('../../../assets/image/tb_logo.png');
                background-size: 100%;
                background-position: center;
                background-repeat: no-repeat;
            }
           

        }
        .jingdong{
            position: relative;
             background-color: white;
             .jingdong-icon{
                display: inline-block;
                width: 3rem;
                height:  3rem;
                background-image: url('../../../assets/image/house1.png');
                background-size: 100%;
                background-position: center;
                background-repeat: no-repeat;
             }
        }
        .down-button{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            border:none;
            border-radius: 0;
            padding:0.3rem 0;
            z-index: 1;
            background-color:rgb(230,230,230);
            i{
                font-size: 1.5rem;
                color:white;
            }
        }
    }
}
</style>