<template>
    <div id="tb-detail">
        <uiTitle class="title" ref="title" :isback="true" :title="'有单详情'" :color="'white'"></uiTitle> 
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :pullup='true' :backcolor="'#f5f5f5'" >
           <main class="main">
                <div class="list" v-if="detail !=''">
                    <div class="bonus"><span>+{{detail.orderplanfind.commission_buyer}}</span>元</div>

                    <div class="good-name"><p>{{detail.orderplanfind.goods_name}}</p></div>
                     <div class="item">
                        <span class='item-name'>订单编号</span>
                        <div class="item-value order-number">{{detail.orderplanfind.order_number}}</div>
                    </div>
                   
                    <div class="item">
                        <span class='item-name'>店铺名</span>
                        <div class="item-value">{{detail.orderplanfind.goods_store}}</div>
                    </div>
                     <!-- <div class="item">
                        <span class='item-name'>商品名</span>
                        
                    </div> -->
                    <div class="item">
                        <span class='item-name'>操作旺旺号</span>
                        <div class="item-value good-name">{{detail.orderplanfind.buyer_account}}</div>
                    </div>
                     <div class="item">
                        <span class='item-name'>买手实付金额</span>
                        <div class="item-value">{{detail.orderplanfind.buyer_money}}</div>
                    </div>
                     <div class="item" v-if="detail.orderplanfind.order_type==3&&detail.sellerExtend">
                        <span class='item-name'>下单方式</span>
                        <div class="item-value order-type" v-if="detail.sellerExtend.order_method == 0">直接购物车付款</div>
                        <div class="item-value order-type" v-if="detail.sellerExtend.order_method == 1">再次浏览后下单</div>
                        <div class="item-value order-type" v-if="detail.sellerExtend.order_method == 2">关键词搜索后下单</div>
                    </div>
                      <div class="item" v-if="detail.sellerExtend">
                        <span class='item-name'>是否假聊</span>
                         <div class="item-value" v-if="detail.sellerExtend.is_chat == 1">否</div>
                        <div class="item-value" v-if="detail.sellerExtend.is_chat == 2">是</div>
                    </div>
                     <div class="item">
                        <span class='item-name'>有单状态</span>
                        <div class="item-value" v-if="detail.orderplanfind.order_state == 0" :style="{color:'#ffc125'}">未接</div>
                        <div class="item-value" v-if="detail.orderplanfind.order_state == 1" :style="{color:'#ffc125'}">待操作</div>
                        <div class="item-value" v-if="detail.orderplanfind.order_state == 2" :style="{color:'#ffc125'}">待审核</div>
                        <div class="item-value" v-if="detail.orderplanfind.order_state == 3" :style="{color:'rgb(26, 158, 26)'}">通过</div>
                        <div class="item-value" v-if="detail.orderplanfind.order_state == 4" :style="{color:'#ffc125'}">加购操作中</div>
                        <div class="item-value" v-if="detail.orderplanfind.order_state == 9" :style="{color:'rgb(253, 0, 0)'}">拒绝</div>
                        <div class="item-value" v-if="detail.orderplanfind.order_state == 10" :style="{color:'#ffc125'}">未执行</div>
                    </div>
                    <div class="item" v-if="detail.orderplanfind.buyer_order_number">
                        <span class='item-name'>淘宝订单号</span>
                        <div class="item-value">{{detail.orderplanfind.buyer_order_number}}</div>
                    </div>
                    <div class="item ui-time">
                        <span class='item-name'>完成时间:</span>
                         <div class="item-time">{{detail.orderplanfind.order_finish_time}}</div>
                    </div>
                    <div class="item count-down" v-if="detail.orderplanfind.order_state == 2">
                        <span class='item-name'>等待审核:</span>
                         <div class="item-time">{{count_down}}</div>
                    </div>
                     <div class="item-note">
                        <span class='item-name'>商家备注：</span>
                         <div class="note"><p>{{detail.orderplanfind.release_remark}}</p></div>
                    </div>
                </div>
           </main>
         </uiScroll>
    </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import uiTitle from '../../../components/title-bar/title-bar';
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import  CommerceService from './ele-commerce.http'
export default {
    components:{
        uiTitle,
        uiScroll
    },
    data(){
        return {
            detail_id:'',
            bounce:{
                top:true,
                bottom:false,
                left:false,
                right:false
            },
            detail:'',
            timer_n:3599,
            count_down:'24:00:00',
        }

    },
    created(){
        this.detail_id = this.$route.params.id;
        util.loading();
        CommerceService.get_detail({
            id:this.detail_id
        }).then(res=>{
             util.closeLoading();
             if(res.code == 1){
                 const time1 = parseInt(new Date().getTime()/1000);
                 this.timer_n = res.data.orderplanfind.order_finish_time + 86400 - time1>0?res.data.orderplanfind.order_finish_time + 86400 - time1:0;
                res.data.orderplanfind.order_finish_time = YsConfig.get_time(res.data.orderplanfind.order_finish_time, 'inseconds');
                 this.detail = res.data;
                 console.log(this.detail);
             }
        })
    },
    mounted(){
        this.$refs.scroll.$el.style.height = document.getElementById('tb-detail').offsetHeight - this.$refs.title.$el.offsetHeight +'px';
        this.count_down = this.get_timer(this.timer_n);
        this.timer = setInterval(()=>{
            if(this.timer_n <= 0){
                clearInterval(this.timer);
            }else{
                this.timer_n--;
            }
            this.count_down = this.get_timer(this.timer_n);
        },1000);
        setTimeout(()=>{
            clearInterval(this.timer);
        },this.timer_n*1000);
    },
    methods:{
        get_timer(n){
            const s = parseInt((n%3600)%60);
            const m = parseInt((n%3600)/60);
            const h = parseInt(n/3600);
            return this.toDub(h) + ':' + this.toDub(m) + ':' + this.toDub(s);
        },
          //补零
        toDub(n){
            return n<10?"0"+n:""+n;
        },
    }
}
</script>
<style lang="less" scoped>
#tb-detail{
    z-index: 3;
    .wrapper{
        overflow: hidden;
    }
    .main{
        padding-top: 0.8rem;
    }
    .list{
        background-color: white;
        padding:0.5rem 0.5rem;
        border-radius: 0.5rem;
        .bonus{
            height:5rem;
            text-align: center;
            font-size:1rem;
             color:#ffc125;
            span{
                font-size:2rem;
                color:#ffc125;
                font-weight: 800;
                margin-right: 0.2rem;
            }
            line-height: 5rem;
        }
       .good-name{
            font-size: 0.9rem;
            p{
                width: 100%;
                word-wrap: break-word;
                -webkit-user-select:text;
                -moz-user-select:text;
                -o-user-select:text;
                user-select:text;
            }
        }
        .item{
            width: 100%;
            padding:1rem 0; 
            border-bottom: 0.05rem solid rgb(230,230,230);
            .item-name{
                color:#8c8c8c;
                font-size: 0.9rem;
            }
            .item-value{
                float: right;
                width:70%;
                text-align: right;
            }
            .good-name{
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            }
            .order-number,.order-type{
                font-size: 0.9rem;
                line-height: 1.5rem;
                color:#8c8c8c;
            }
        }
        .ui-time{
            border:none;
            height: 1.5rem;
            .item-name{
                font-size: 0.8rem;
            }
            .item-time{
                display: inline-block;
                margin-left: 0.3rem;
                color:#9c9c9c;
                font-size: 0.8rem;
            }
        }
        .count-down{
            border:none;
            height: 2rem;
            .item-name{
                font-size: 1rem;
            }
            .item-time{
                display: inline-block;
                margin-left: 0.3rem;
                color:red;
                font-size: 01rem;
            }
        }
        .item-note{
            margin-top:0.8rem;
            .item-name{
                font-weight: 700;
                color:#4c4c4c;
            }
            .note{
                margin:0.5rem 0;
                p{
                   color:#8c8c8c;
                    width: 100%;
                    word-wrap: break-word;
                    -webkit-user-select:text;
                    -moz-user-select:text;
                    -o-user-select:text;
                    user-select:text;
               }
            }
        }
    }
}
</style>