<template>
    <div id="browse-order">
          <uiTitle class="title" ref="title" :isback="false" :title="'任务查看'" :color="'white'">
         </uiTitle>
        <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true' >
             <main class="main">
                 <div class="count-down">接单倒计时：<p>{{count_down}}</p></div>
                 <div class="detail">
                     <div class="top">
                        <uiMosaic class="mosaic" v-if="order.goods_buy_image !=''&& order.order_type!=4" :image="order.goods_buy_image" @load='getLoad()'></uiMosaic>
                        <uiMosaic class="mosaic" v-else-if="order.goods_image !=''&& order.order_type!=4" :image="order.goods_image" @load='getLoad()'></uiMosaic>
                        <img class="mosaic" v-if="order.order_type==4" :src="order.goods_qrcode" @load='getLoad()' alt="">
                        <div class='right'>
                            <p>佣金&ensp;<span>¥{{order.commission_buyer}}</span></p>
                            <p>类型&ensp;{{order.orderTypeText}}</p>
                            <p v-if="order.order_type!=2">件数&ensp;{{order.goods_qty}}</p>
                        </div>
                       
                     </div>
                     <div class="center">
                         <div class="title">
                             商家要求
                         </div>
                         <div class="remark">
                            <span>
                                {{order.release_remark}}
                            </span>
                         </div>
                     </div>
                 </div>
             </main>
         </uiScroll> 
         <div class="footer giveup">
            <button  class="button" @click="giveup()"><span>放弃</span></button>
         </div>
        <div class="footer accept">
            <button  class="button"  @click="accept()"><span>接受</span></button>
         </div>
    </div>
</template>
<script>
import  YsConfigJs from '../../../../dora/ys.config'
import util from '../../../../dora/util.js'
import  uiTitle from '../../../../components/title-bar/title-bar';
import  uiScroll from '../../../../components/scroll-bar/scroll-bar';
import  uiMosaic from '../../../../components/absolutely-empty/mosaic';
import  MainService from './../main.http'
import publicJs from './../public'
export default {
    components:{
        uiTitle,
        uiScroll,
        uiMosaic
    },
    data(){
        return{
            order_id:'',
            bounce:{
                top:false,
                bottom:false,
                left:false,
                right:false
            },
            scroll_data:true,
            timer:null,
            timer_n:3599,
            count_down:'05:00',
            order:'',
            type:0,
        }
    },
    created(){
        util.loading();
        this.order_id = this.$route.params.id;
        MainService.tb_grab_detail({
            id:this.order_id
        }).then(res=>{
            if(res.code == 1){
                 util.closeLoading();
                this.order = res.data;
                const time1 = parseInt(new Date().getTime()/1000);
                this.timer_n = res.data.order_end_time - time1 > 0?res.data.order_end_time - time1:0;
                this.type = this.order.order_type;
            }else{
                util.alert({
                    content:res.msg,
                    define:()=>{
                        this.$router.push('/main');
                    }
                }) 
            }
        })
    },
    mounted(){
        this.$refs.scroll.$el.style.height = document.getElementById('browse-order').offsetHeight - this.$refs.title.$el.offsetHeight +'px';
        this.count_down = this.get_timer(this.timer_n);
        this.timer = setInterval(()=>{
            if(this.timer_n <= 0){
                clearInterval(this.timer);
                this.giveup(true);
            }else{
                this.timer_n--;
            }
            this.count_down = this.get_timer(this.timer_n);
        },1000);
        window.addEventListener("popstate", ()=>{
            clearInterval( this.timer);
        });
    },
    methods:{
        get_timer(n){
            const s = parseInt(n%60);
            const m = parseInt(n/60);
            return this.toDub(m) + ':' + this.toDub(s);
        },
          //补零
        toDub(n){
            return n<10?"0"+n:""+n;
        },
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
        giveup(overtime){
             clearInterval(this.timer);
            publicJs.tb_give_up(this.order_id,overtime);
        },
        accept(){
            clearInterval(this.timer);
             MainService.accept_order({
                order_id:this.order_id
            })
            .then(res=>{
               if(res.code == 1){
                    this.$router.push('/order-verify/'+this.order_id+'?type='+this.type+'&step=1');
                }else {
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            this.$router.push('/main');
                        }
                    }) 
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/common.less';
#browse-order{
    position: absolute;
    z-index:3;
    .mosaic{
        margin:0.5rem auto;
        display: block;
        width: 95%;
        border-radius: 0.5rem;
    }
    .wrapper{
        overflow: hidden;
    }
    .main{
        width: 94%;
        margin:auto;
        padding-top: 0.8rem;
        .count-down{
            padding:0.8rem;
            height:6rem;
            width: 100%;
            text-align: center;
            color:#ffc125;
            font-size: 1.1rem;
            letter-spacing: 2px;
            p{
                margin-top: 0.8rem;
                text-align: center;
                font-size: 1.5rem;
               
            }
        }
        .detail{
            width: 100%;
            background-color: white;
            border-radius: 0.5rem;
            padding:0.5rem 0.3rem 5rem 0.3rem;
            .top{
                width: 100%;
                .mosaic{
                    display: inline-block;
                    width:40%;
                }
                .right{
                    float: right;
                    width:58%;
                    p{
                        font-size: 0.9rem;
                        height: 2.5rem;
                        line-height: 2.5rem;
                        span{
                            color:#ec4c4c;
                        }
                    }
                }
            }
            .center{
                .title{
                    margin:0.8rem 0;
                    font-size: 1.1rem;
                    font-weight: 700;
                }
                .remark{
                    margin-bottom: 1rem;
                    span{
                        width: 100%;
                        word-wrap: break-word;
                        color:#7c7c7c;
                    }
                }
            }
        }
    }
    .footer{
        position: fixed;
        bottom: 2rem;
        z-index:4;
        .button{
            height:2.5rem;
            display: block;
            border-radius: 0.5rem;
            border:none;
            width: 6rem;
            span{
                color:white;
            }
            // &:first-of-type{
            //     background-color: rgba(240, 62, 62,0.8) !important;
            // }
        }
    }
    .giveup{
        left: 25%;
        transform: translateX(-50%);
        .button{
            background-color: rgb(180,180,180);
        }
    }
    .accept{
        right: 25%;
        transform: translateX(50%);
        .button{
            background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
        }
    }
}
</style>