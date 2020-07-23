<template>
    <div id="recommend">
        <div class="master" v-if="isMaster">
            <uiTitle class="ui-title" :isback="false" :color="'white'" >
                <div class="nav-bar ui-row">
                    <router-link tag="div" class="ui-col-4 row-center" 
                        v-for="(item,index) in  nav_bar"
                        :to="{name:item.path}"
                        :key="index"> 
                        <p>{{item.title}}</p>
                    </router-link>              
                </div>
                 <i class="el-icon-arrow-left" @click="back()"></i>
                <div class="seat"></div>
            </uiTitle>
            <div class="ui-master">
                <router-view class="apprentice-view"/>
            </div>
        </div> 

        <div class="apprentice" v-if="!isMaster">
            <div id="content">
                <uiTitle class="ui-title" ref="title" :isback="true" :title="'升级师父'" :color="'white'" >
                </uiTitle>
                <uiScroll class="wrapper" ref="scroll" :bounce="bounce"  :backcolor="'#f5f5f5'" >
                    <div class="scroll-content">
                        <div class="schedule">
                            <div class="title">
                                <p>升级进度</p>
                            </div>
                            <p>
                                达成购买单数量
                            </p>
                            <div class="rate">
                                <div class="ui-rate">
                                    <div class="bottom" id='rate-bottom'></div>
                                    <div class="center" id="rate"></div>
                                    <div class="order-rate">
                                    {{orderRate}}%
                                    </div>
                                </div>
                            </div>
                            <span>
                                {{order_number}} / {{total_order}}
                            </span>
                            <div class='channel'>
                            1、满15单(购买单)可直接点击申请升级。<br>
                            2、已满10单未达15单。由师傅找对应专属客服推荐，并申请升级。 <br>
                            3、有其他平台徒弟资源请联系专属客服直接升级。32
                            </div>
                        </div>
                        <div class='separator'>
                             <el-button class="el-button"  @click="upgrade()"><span>申请升级</span></el-button>
                        </div>
                        <div class="schedule">
                            <div class="title">
                                <p>奖励分成</p>
                            </div>
                            <div class='channel'>
                            1、直接推荐人完成一笔任务奖励分成20%<br>
                            2、间接推荐人完成一笔任务奖励分成5% 
                            </div>
                        </div>
                        <div class="schedule">
                            <div class="title">
                                <p>申请步骤</p>
                            </div>
                            <div class='channel'>
                            1、成为师父要先经过任务流程答题，以确保您掌握充足的技巧。<span  @click="exam_now()">立即答题</span><br> 
                            1、完善<router-link tag="span" to="/frofile">个人资料</router-link>，并<router-link tag="span" to="/upload-idcard">上传手持身份证</router-link>。<br>
                            2、用平台注册微信号添加对应<router-link tag="span" to="/service">专属客服微信</router-link>。<br> 
                            3.申请成功后，耐心等待审核结果，2个工作日内会处理。
                            </div>
                        </div>
                    </div>
                </uiScroll>
             </div>
        </div>
    </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import  uiTitle from '../../../components/title-bar/title-bar';
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import  ApprenticeService from './myapprentice.http'
import util from '../../../dora/util.js'
export default {
    components:{
        uiTitle,
        uiScroll
    },
    data(){
        return{
            isMaster:null,
            isExam:null,
            nav_bar:[
               {
                   path:'apprentice',
                   title:'已审核',
               },
                {
                   path:'wait',
                   title:'待审核',
               },
                {
                   path:'black',
                   title:'已拉黑',
               },
            ],
            order_number:0,
            total_order:15,
            orderRate:0,
            bounce:{
                top:true,
                bottom:true,
                left:false,
                right:false
            }
        }
    },
    created(){
         util.loading();
        this.isMaster = YsConfigJs.isMaster(); /** 查看师父徒弟身份 */
        if(!this.isMaster){
            ApprenticeService.get_order_amout()
            .then(res=>{
                if(res.code == 1){ 
                    if(res.data.reject!=''){
                        util.alert({
                            content:res.data.reject,
                            define:()=>{}
                        })
                    }else{
                         util.closeLoading();
                    }
                    this.order_number = res.data.order_amount > 15 ? 15:res.data.order_amount;
                    this.isExam = (res.data.is_exam.indexOf('2')!= -1) ? true : false;
                    this.order_rate();
                }else{
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            util.routerBack();
                        }
                    })
                }
            })
            
        }else{
             util.closeLoading();
        }
    },
    mounted(){ 
         if(!this.isMaster){  
            this.$refs.scroll.$el.style.height = document.getElementById("recommend").offsetHeight - this.$refs.title.$el.offsetHeight+'px';
         }
    },
    methods:{
        back(){
           this.$router.push('/mypages');
        },
        /** 
         * 完成订单概率
         */
        order_rate(){
            const rate = (this.order_number/this.total_order*100).toFixed(2);
            document.getElementById("rate").style.width = (document.getElementById("rate-bottom").clientWidth) / 100 * rate +'px';
            this.orderRate = rate;
        },
        exam_now(){
            if(this.isExam){
                 util.alert({
                    content:'已经答过题了，立即去升级吧',
                    define:()=>{}
                })
            }else{
                  this.$router.push('/master-exam/1');
            }
        },
        /**
         * 升级师父
         */
        upgrade(){
            if(this.isExam){
                 ApprenticeService.upgrade()
                .then(res=>{
                    if(res.code == 1 || res.code == 100){
                        util.alert({
                            content:res.msg,
                            define:()=>{}
                        });
                    } else {
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                switch(res.code){
                                    case 201:this.$router.push('/frofile');break;
                                    case 202:console.log(1); this.$router.push('/upload-idcard');break;
                                    default:console.log(res.code);
                                }
                            }
                        })
                    }
                })
            }else{
                util.alert({
                    content:'申请升级师父需通过考试，立即参加考试？',
                    define:()=>{
                       this.$router.push('/master-exam/1');
                    }
                })
            }
           
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#recommend {
    width: 100%;
    position: absolute;
    z-index: 3;
    .master{
        height: 100%;
        .ui-master{
            width:100%;
            height: calc(100% - 4rem);
            .apprentice-view{
            height: 100%;
            }
        }
    }
    .ui-title{
        .el-icon-arrow-left{
            position: absolute;
            left: 0.5rem;
            bottom:1.1rem;
            width:2rem;
            height: 2rem;
            font-size: 2rem;
        }
        .seat{
            height: 1rem;
            background-color: white;
        }
         .nav-bar{
             position: absolute;
             bottom: 0.5rem;
             left: 50%;
             transform: translateX(-50%);
             width:14rem;
             border-radius: 0.3rem;
            p{
                font-size: 0.9rem;
                letter-spacing: 1px;
            }
             &>div{
                height: 2rem;
                line-height: 2rem;
                border-radius: 0;
                border:0.1rem solid rgb(67, 153, 224);
                &.router-link-active{
                    background-color:rgb(67, 153, 224);
                    p{
                        color:white;
                    }
                }
             }
              &>div:first-of-type{
                  border-radius: 0.3rem 0 0 0.3rem;
                  border-right: none;
              }
               &>div:last-of-type{
                  border-radius:0 0.3rem 0.3rem 0;
                   border-left: none;
              }
        }
    }
    .apprentice{
        width:100%;
        height: 100%;
        #content{
            height: 100%;
            overflow-y: auto;
            .wrapper{
                height: 100%;
                overflow: hidden;
                .scroll-content{
                    width: 94%;
                    margin:auto;
                    padding:0.8rem 0 1rem 0;
                }
            }
        }
        .schedule{
            width: 100%;
            min-height: 8rem;
            background: linear-gradient(to right , rgb(249, 236, 228) 10% , rgb(235, 207, 190) 100%);
            border-radius: 0.3rem;
            padding:0.5rem 1rem;
            margin-bottom: 0.8rem;
            span{
                display: inline-block;
                vertical-align: bottom;
                margin-top: 0.8rem;
                font-size: 1rem;
                 margin-left: 0.2rem;
                color:rgb(212, 160, 129); 
            }
            .title{
                text-align: left;
                font-size: 1.1rem;
                margin-bottom: 0.8rem;
                padding-left: 1rem;
                p{
                    text-align: center;
                    display: inline-block;
                    width:6rem;
                    font-size: 1.1rem;
                    position: relative;
                    color:white;
                    background-color:rgb(231, 199, 180);
                }
                p::after, p::before {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 0.5rem;
                    height: 0px;
                    width: 0px;
                    border: 0.6rem solid ;
                    z-index: 0;
                }
                     p::before{
                     border-color: rgb(231, 199, 180) rgb(231, 199, 180) rgb(231, 199, 180) transparent;
                    left: -1rem;
                }
                p::after{
                     border-color: rgb(231, 199, 180) transparent rgb(231, 199, 180) rgb(231, 199, 180) ;
                    right: -1rem;
                }
            }
            .rate{
                margin-top: 0.8rem;
                width: 75%;
                display: inline-block;
            }
            p{
               color:rgb(212, 160, 129); 
            }
            .ui-rate{
                height: 0.8rem;
                position: relative;
                width: 100%;
                border-radius: 2rem;
                overflow: hidden;
                .bottom{
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 0.8rem;
                    width: 100%;
                    background-color: white;
                }
                .center{
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 0.8rem;
                    width:20%;
                    border-radius: 2rem;
                    background-color: rgb(212, 160, 129);
                }
                .order-rate{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    z-index: 1;
                    font-size: 0.7rem;
                    color:rgb(235,235,235);
                    transform: translate(-50%,-50%);
                }
            }
            .channel{
                margin-top: 2rem;
                 color:rgb(212, 160, 129); 
                 font-size: 0.9rem;
                 line-height: 1.5rem;
                 letter-spacing: 1.2px;
                 margin-bottom: 1rem;
                 span{
                     text-decoration: underline;
                     font-size: 0.9rem;
                     color:#FFC125;
                     margin:0;
                 }
            }
        }
    }
    .separator{
        margin-bottom: 0.8rem;
         .upgrade-button{
            width:90%;
            height:3rem;
            margin:0 5% 2rem 5%;
            border:none;
            margin-top: 1rem;
            font-size: 1.2rem;
            background: #FFC125;
            box-shadow: 0.05rem 0.1rem 0.1rem rgba(100,100,100,0.5);
            span{
                    color:rgb(240,240,240);
            }
        }
    }

   
}

      
</style>