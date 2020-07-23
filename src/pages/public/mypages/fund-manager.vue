<template>
    <div id="fund">
        <div id="content">
         <uiTitle  :isback="true" ref="title" class="ui-title" :title="'资金管理'" :color="'rgb(37, 41, 59)'" :fontcolor="'white'" >
            <router-link :to="'/centre-bill/'" tag='div' class="roll-out-record">
                   账单
            </router-link>     
        </uiTitle> 
          <uiScroll class="wrapper" ref="scroll" :bounce="bounce"  :backcolor="'#f5f5f5'" :uiPull="true" @uiPullData="uiPullData" :data="scroll_data">
            <div class="top">
                <div class="top-back">
                    <div class="center-big">
                        <div class="center-small">
                            <!-- <div class="last-fund">
                                昨日收益<br>
                                +8.9
                            </div> -->
                            <div class="total-fund">
                                中心钱包(元)
                                <p>{{Number(fund.centre_money?fund.centre_money:0).toFixed(2)}}</p>
                            </div>
                        </div>
                    </div> 
                </div>  
                 <el-button class="cash-out" @click="cash_out()"><span>提</span><span>现</span></el-button> 
            </div>
                 <main class="main">
                    <div class="main-list" @click="change_card($event,1)" > <!--:class="{'slide-down1':card==1,'slide-up1':card==2}" -->
                        <div class="header">
                                淘宝资金管理
                        </div>
                        <div class="part-fund">
                            当前余额(元) : <p>{{Number(fund.fund?fund.fund:0).toFixed(2)}}</p>
                        </div>
                        <button class="roll-out" @click="roll_out(0)"><span>转</span><span>出</span></button>
                    </div>
                    <div class="main-list" @click="change_card($event,2)"  ><!--:class="{'slide-down2':card==2,'slide-up2':card==1}" -->
                        <div class="header">
                                京东资金管理
                        </div>
                        <div class="part-fund">
                            当前余额(元) : <p>{{Number(fund.jdFund?fund.jdFund:0).toFixed(2)}}</p>
                        </div>
                        <button class="roll-out" @click="roll_out(1)"><span>转</span><span>出</span></button>
                    </div>
                </main>
                <div class="tips">
                    温馨提示：<br>
                    ①提现后48小时内会到账。提现显示“审核成功,请等待打款”，表示安排打款，24小时内会到账！<br>
                    ②资金管理→资金转出，先将京东/淘宝中的资金转出到我的账户，再进行提现。
                </div>
         
          </uiScroll> 
         <!-- <footer class="footer" ref="footer">
            <el-button class="cash-out" @click="cash_out()"><span>提</span><span>现</span></el-button>
         </footer> -->
         </div>
    </div>
</template>
<script>
import  YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  MypagesService from './mypages.http'
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
export default {
    components:{
        uiTitle,
        uiScroll
    },
    data(){
        return{
            fund:'',
            card:0,
            bounce:{
                top:false,
                bottom:false,
                left:false,
                right:false
            },
            scroll_data:true,
        }
    },
    created(){
        util.loading();
        MypagesService.get_fund()
        .then(res=>{
             util.closeLoading();
            this.fund = res.data;
            this.number_throb(0,this.fund.centre_money);
        })
    },
    mounted(){
         this.$refs.scroll.$el.style.height = document.getElementById("fund").offsetHeight - this.$refs.title.$el.offsetHeight+'px';
    },
    methods:{
        uiPullData(){
            MypagesService.get_fund()
            .then(res=>{
                this.fund = res.data;
                this.number_throb(0,this.fund.centre_money);
                this.scroll_data = !this.scroll_data;
            })
        },
        change_card(e,type){
            if(this.card != type){
                this.card = type;
            }
        },
        cash_out(){
           this.$router.push('/cash-out?cash='+this.fund.centre_money);
        },
        roll_out(type){
            let money = 0;
            if(type == 0){
                 money = this.fund.fund;
            }else{
                 money = this.fund.jdFund;
            }
            this.$router.push('/fund-transfer/'+type+'?roll='+money);
        },
        number_throb(startNum,maxNum){
            var that = this;
            let numText = startNum;
            let golb; // 为了清除requestAnimationFrame
            function numSlideFun(){ // 数字动画
                numText+=maxNum/60;// 速度的计算可以为小数 。数字越大，滚动越快
                if(numText >= maxNum){
                    numText = maxNum;
                    cancelAnimationFrame(golb);
                }else {
                    golb = requestAnimationFrame(numSlideFun);
                }
                that.fund.centre_money=numText;
                // console.log(numText)
            }
            numSlideFun(); // 调用数字动画
        },
    },
}
</script>
<style lang="less" scoped>
#fund{
     position: relative;
     height:100%;
     z-index: 1.5;
    #content{
        width: 100%;
        height:100%;
    }
    .wrapper{
        overflow: hidden;  
        background: rgb(37, 41, 59);
    }
    .ui-title{
        .roll-out-record{
            position: absolute;
            right: 3%;
            bottom:0;
            font-size: 0.9rem;
            font-weight: 400;
            color:#fff;
        }
    }
    .top{
        background: rgb(37, 41, 59);
        position: relative;
        height:13.5rem;
        .cash-out{
            position: absolute;
            bottom:0.3rem;
            height:3rem;
            left: 50%;
            transform: translateX(-50%);
            // height: 100%;
            width: 90%;
            border:0.07rem solid white;
            background-color: rgb(37, 41, 59);
            text-align: center;
            span{
                display: inline-block;
                width:3rem;
                 color:white;
                 font-size: 1.2rem;
                 text-align: center;
            }
        }
        .top-back{
            position: absolute;
            left: 50%;
            top:1.5rem;
            height:10rem;
            transform:translateX(-50%);
            overflow: hidden;
        }
        .center-big{
            position: relative;
            border-radius: 100px;
            height: 15rem;
            width:15rem;
            border-radius: 100%;
            background-color:#FFC125;
            .center-small{
                position: absolute;
                left: 0.5rem;
                top: 0.5rem;
                height: 14rem;
                width:14rem;
                border-radius: 100%;
                background-color:rgb(37, 41, 59);
                text-align: center;
                padding:2rem 0;  
                .last-fund{
                    color:white;
                }
                .total-fund{
                    margin-top: 1.5rem;
                    color:white;
                    p{
                        margin-top: 0.8rem;
                        color:white;
                        font-size: 1.2rem;
                        font-weight: 700;
                        letter-spacing: 2px;
                    }
                }
            }
        }
    }
    .tips{
        width: 100%;
        padding:0.5rem 3%;
        font-size: 0.8rem;
        color:rgb(170,170,170);
        background-color: #f5f5f5;
    }
    .main{
        // height:13rem;
        margin-top: 0.8rem;
        position: relative;
        background-color: #f5f5f5;
        .main-list{
            // position: absolute;
            left: 3%;
            width:94%;
            margin:0 auto 1rem auto;
            padding:0.5rem;
            border-radius: 0.5rem;
            background-color: white;
            height:10rem;
            text-align: center;
            .header{
                text-align: left;
                height: 2.5rem;
                font-size: 1.0rem;
                font-weight: 600;
               color:rgb(253,253,253);
            }
            .part-fund{
                text-align: center;
               color:rgb(253,253,253);
               font-weight: 700;
                p{
                    margin-top: 0.5rem;
                    color:rgb(253,253,253);
                    font-size: 1.5rem;
                    font-weight: 700;
                }
            }
            .roll-out{
                margin-top: 0.5rem;
                width: 90%;
                height:2rem;
                background-color: white;
                border-radius: 0.5rem;
                span{
                    width:3rem;
                }
            }
            transition: all 0.4s;
        }
        .main-list:first-of-type{
            // top:0;
             background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),  url('../../../assets/image/back_tb.jpg') center/100% 100% no-repeat;
        }
        .main-list:last-of-type{
            // top:3rem;
            background: linear-gradient(rgba(201, 22, 35, 0.5), rgba(201, 22, 35, 0.5)),  url('../../../assets/image/back_jd.png') center/100% 100% no-repeat;
        //     background-image:url('../../../assets/image/back_jd.png');
        //    // box-shadow: 0.1rem 0 0.4rem rgb(187, 33, 46);
        //     background-size: 100% 100%;
        //     background-position: center;
        //     background-repeat: no-repeat;
        }
        // .slide-down1{
        //     transform:translateY(3rem);
        //     z-index: 1;
        // }
        //  .slide-up2{
        //     transform:translateY(0);
        // }
        //  .slide-down2{
        //     transform:translateY(0);
           
        // }
        // .slide-up2{
        //     transform:translateY(-3rem);
            
        // }
    }
    // .footer{
    //     position: fixed;
    //     bottom: 0;
    //     width: 100%;
    //     height: 3rem;
    //     .cash-out{
    //         height: 100%;
    //         width: 100%;
    //         border:none;
    //         background-color: rgb(37, 41, 59);
    //         text-align: center;
    //         span{
    //             display: inline-block;
    //             width:3rem;
    //              color:white;
    //              font-size: 1.2rem;
    //              text-align: center;
    //         }
    //     }
    // }
}
</style>