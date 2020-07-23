<template>
    <div id="jd-review">
        <uiTitle class="title" ref="title" :isback="true" :title="'有单详情'" :color="'white'"></uiTitle> 
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :pullup='true' :backcolor="'#f5f5f5'"  :data='scroll_data'>
           <main class="main">
                <div class="list" v-if="detail !=''">
                    <div class="bonus"><span>+{{detail.orderPlanFind.commission_buyer}}</span>元</div>
                     <div v-if="detail.orderPlanFind.goods_name!=''" class="item-value good-name">{{detail.orderPlanFind.goods_name}}</div>
                     <div class="item">
                        <span class='item-name'>订单编号</span>
                        <div class="item-value order-number"><p>{{detail.orderPlanFind.order_number}}</p></div>
                    </div>
                   
                    <div class="item">
                        <span class='item-name'>店铺名</span>
                        <div class="item-value">{{detail.orderPlanFind.goods_store}}</div>
                    </div>
                     <!-- <div class="item" v-if="detail.orderPlanFind.goods_name!=''">
                        <span class='item-name'>商品名</span>
                       
                    </div> -->
                     <div class="item" >
                        <span class='item-name'>有单状态</span>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 0" :style="{color:'#ffc125'}">未接</div>
                        <div class="item-value" v-if="detail.orderPlanFind.status == 0" :style="{color:'rgb(241, 91, 91)'}">未领取</div>
                        <div class="item-value" v-if="detail.orderPlanFind.status == 1" :style="{color:'rgb(241, 91, 91)'}">已领取</div>
                        <div class="item-value" v-if="detail.orderPlanFind.status == 2" :style="{color:'rgb(41, 86, 209)'}">已做完</div>
                        <div class="item-value" v-if="detail.orderPlanFind.status == 3" :style="{color:'rgb(26, 158, 26)'}" >已审核</div> 
                        <div class="item-value" v-if="detail.orderPlanFind.status == 4" :style="{color:'rgb(253, 0, 0)'}">审核拒绝</div>
                        <div class="item-value" v-if="detail.orderPlanFind.status == 9" :style="{color:'rgb(253, 0, 0)'}">放弃</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 4" :style="{color:'#ffc125'}">待评价</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 5" :style="{color:'#ffc125'}">评价待审核</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 6" :style="{color:'rgb(26, 158, 26)'}">评价已审核</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 9" :style="{color:'rgb(253, 0, 0)'}">评价拒绝</div>
                        <div class="item-value" v-if="detail.orderPlanFind.order_state == 10" :style="{color:'#ffc125'}">未执行</div>
                    </div>
                    <div class="item ui-time">
                        <span class='item-name'>完成时间</span>
                         <div class="item-time">{{detail.orderPlanFind.order_finish_time}}</div>
                    </div>
                     <div class="item-note">
                        <span class='item-name'>商家备注：</span>
                         <div class="note"><p>{{detail.orderPlanFind.release_remark}}</p></div>
                    </div>
                    <div class="item-image" v-if="detail.orderPlanFind.review_pic!=null">
                        <span class='item-name'>评价示例图</span>
                        <div class="item-img" v-for="(item,index) in detail.orderPlanFind.review_pic" :key="index">
                            <img  :src="item" alt="" @load='getLoad()'>
                        </div>
                    </div>
                     <div class="item-image" >
                        <span class='item-name'>我的评价截图</span>
                        <div class="item-img">
                            <img  :src="detail.orderPlanFind.review_img" alt="" @load='getLoad()'>
                        </div>
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
        uiScroll,
    },
    data(){
        return {
            detail_id:'',
            bounce:{
                top:true,
                bottom:true,
                left:false,
                right:false
            },
            scroll_data:true,
            detail:''
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
                     console.log(this.detail);
                 }
            });
        }else if(this.step == 3) {
            CommerceService.get_review_jtk({
                order_id:this.detail_id
            }).then(res=>{
                 util.closeLoading();
                 if(res.code == 1){
                     res.data.orderPlanFind.order_finish_time = YsConfig.get_time(res.data.orderPlanFind.order_finish_time, 'inseconds');
                     this.detail = res.data;
                     console.log(this.detail);
                 }
            });
        }
        
    },
    mounted(){
        this.$refs.scroll.$el.style.height = document.getElementById('jd-review').offsetHeight - this.$refs.title.$el.offsetHeight +'px';
    },
    methods:{
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
    }
}
</script>
<style lang="less" scoped>
#jd-review{
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
            .item-time{
                margin-left: 0.2rem;
                display: inline-block;
                color:#9c9c9c;
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
        .item-image{
            margin-top: 0.8rem;
            .item-name{
                margin:0.5rem 0 ;
                font-size: 1rem;
                color:#4c4c4c;
                font-weight: 700;
            }
            .item-img{
                img{
                    margin-top: 0.8rem;
                    width: 100%;
                }
            }
        }
        .ui-time{
            border:none;
            height: 1.5rem;
            .item-name{
                font-size: 0.8rem;
            }
            .item-time{
                font-size: 0.8rem;
            }
        }
    }
}
</style>