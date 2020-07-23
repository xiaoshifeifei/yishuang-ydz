<!--
 * @Author: your name
 * @Date: 2020-06-15 13:48:01
 * @LastEditTime: 2020-06-28 11:15:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\ele-commerce\jd-detail.vue
--> 
<template>
    <div id="jd-detail">
        <uiTitle class="title" ref="title" :isback="true" :title="'有单详情'" :color="'white'"></uiTitle> 
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :pullup='true' :backcolor="'#f5f5f5'" >
           <main class="main">
                <div class="list" v-if="detail !=''">
                    <div class="bonus"><span>+{{detail.orderPlanFind.commission_buyer}}</span>元</div>
                    <div class="item-value good-name"><p>{{detail.orderPlanFind.goods_name}}</p></div>
                     <div class="item">
                        <span class='item-name'>订单编号</span>
                        <div class="item-value order-number">{{detail.orderPlanFind.order_number}}</div>
                    </div>
                   
                    <div class="item">
                        <span class='item-name'>店铺名</span>
                        <div class="item-value">{{detail.orderPlanFind.goods_store}}</div>
                    </div>
                     <!-- <div class="item">
                        <span class='item-name'>商品名</span>
                        <div class="item-value good-name">{{detail.orderPlanFind.goods_name}}</div>
                    </div> -->
                     <div class="item">
                        <span class='item-name'>买手实付金额</span>
                        <div class="item-value">{{detail.orderPlanFind.buyer_money}}</div>
                    </div>
                     <div class="item">
                        <span class='item-name'>有单状态</span>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 0" :style="{color:'#ffc125'}">未接</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 1" :style="{color:'#ffc125'}">待操作</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 2" :style="{color:'#ffc125'}">待审核</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 3" :style="{color:'rgb(26, 158, 26)'}">通过</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 8" :style="{color:'rgb(253, 0, 0)'}">垫付拒绝</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 10" :style="{color:'#ffc125'}">未执行</div>
                    </div>
                    <div class="item" v-if="detail.orderPlanFind.buyer_order_number">
                        <span class='item-name'>京东订单号</span>
                        <div class="item-value">{{detail.orderPlanFind.buyer_order_number}}</div>
                    </div>
                    <div class="item ui-time">
                        <span class='item-name'>完成时间:</span>
                         <div class="item-time">{{detail.orderPlanFind.order_finish_time}}</div>
                    </div>
                     <div class="item-note">
                        <span class='item-name'>商家备注：</span>
                         <div class="note"><p>{{detail.orderPlanFind.release_remark}}</p></div>
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
            step:'',
        }

    },
    created(){
        this.detail_id = this.$route.params.id;
        this.step = this.$route.query.step;
        util.loading();
        if(this.step == 1){
            CommerceService.get_review_jd({
                order_id:this.detail_id
            }).then(res=>{
                 util.closeLoading();
                 if(res.code == 1){
                     res.data.orderPlanFind.order_finish_time = YsConfig.get_time(res.data.orderPlanFind.order_finish_time, 'inseconds');
                     this.detail = res.data;
                 }
            });
        }else if(this.step == 2) {
            CommerceService.get_detail_jd({
                order_id:this.detail_id
            }).then(res=>{
                 util.closeLoading();
                 if(res.code == 1){
                     res.data.orderPlanFind.order_finish_time = YsConfig.get_time(res.data.orderPlanFind.order_finish_time, 'inseconds');
                     this.detail = res.data;
                 }
            });
        }else if(this.step == 3){
            CommerceService.get_detail_jtk({
                order_id:this.detail_id
            }).then(res=>{
                 util.closeLoading();
                 if(res.code == 1){
                     res.data.orderPlanFind.order_finish_time = YsConfig.get_time(res.data.orderPlanFind.order_finish_time, 'inseconds');
                     this.detail = res.data;
                 }
            });
        }else {
            util.closeLoading();
        }
    },
    mounted(){
        this.$refs.scroll.$el.style.height = document.getElementById('jd-detail').offsetHeight - this.$refs.title.$el.offsetHeight +'px';
    }
}
</script>
<style lang="less" scoped>
#jd-detail{
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
        .item-note{
            margin-top:0.8rem;
            .item-name{
                font-weight: 700;
                color:#4c4c4c;
            }
            .note{
                margin:0.5rem 0;
                  p{
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