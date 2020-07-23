<template>
    <div id="tb-review">
        <uiTitle class="title" ref="title" :isback="true" :title="'有单详情'" :color="'white'"></uiTitle> 
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :pullup='true' :backcolor="'#f5f5f5'"  :data='scroll_data'>
           <main class="main">
                <div class="list" v-if="detail !=''">
                    <div class="bonus"><span>+{{detail.commission_buyer}}</span>元</div>
                    <div class="item-value good-name">{{detail.goods_name}}</div>
                     <div class="item">
                        <span class='item-name'>订单编号</span>
                        <div class="item-value order-number"><p>{{detail.order_number}}</p></div>
                    </div>
                   
                    <div class="item">
                        <span class='item-name'>店铺名</span>
                        <div class="item-value">{{detail.store_name}}</div>
                    </div>
                     <!-- <div class="item">
                        <span class='item-name'>商品名</span>
                        
                    </div> -->
                     <div class="item" >
                        <span class='item-name' >有单状态</span>
                         <div class="item-value good-name">{{detail.statustext}}</div>
                          <!-- <div class="item-value good-name" v-if="detail.statustext!='审核拒绝'>{{detail.fail_note}}</div> -->
                    </div>
                    <div class="item" v-if="detail.statustext == '审核拒绝'">
                        <span class='item-name'>拒绝原因</span>
                        <div class="item-value " v-if="detail.fail_note!=null">{{detail.fail_note}}</div>
                         <div class="item-value " v-else>无</div>
                    </div>
                      <div class="item ui-time">
                        <span class='item-name'>邀请评价</span>
                        <div class="item-time">{{detail.invite_time}}</div>
                    </div>
                    <div class="item ui-time">
                        <span class='item-name'>评价时间</span>
                         <div class="item-time">{{detail.buyer_target_time}}</div>
                    </div>
                    <div class="item-image" v-if="detail.pic!=null">
                        <span class='item-name'>评价示例图</span>
                        <div class="item-img">
                            <img v-for="(item,index) in detail.pic" :key="index" :src="item" alt=""  @load='getLoad()'>
                        </div>
                    </div>
                     <div class="item-image" >
                        <span class='item-name'>我的评价截图</span>
                        <div class="item-img">
                            <img  :src="detail.review_img" alt=""  @load='getLoad()'>
                        </div>
                    </div>
                     <div class="item-image" v-if="detail.picSun!=null">
                        <span class='item-name'>副宝贝评价示例图</span>
                        <div class="item-img">
                            <img  :src="detail.picSun" alt=""  @load='getLoad()'>
                        </div>
                    </div>
                      <div class="item-image" v-if='detail.reviewImgSun!=null' >
                        <span class='item-name'>副宝贝我的评价截图</span>
                        <div class="item-img">
                            <img  :src="detail.reviewImgSun" alt=""  @load='getLoad()'>
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
        uiScroll
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
        util.loading();
        CommerceService.get_review({
            id:this.detail_id
        }).then(res=>{
             util.closeLoading();
             if(res.code == 1){
                res.data.invite_time = YsConfig.get_time(res.data.invite_time, 'inseconds');
                res.data.buyer_target_time= YsConfig.get_time(res.data.buyer_target_time, 'inseconds');
                this.detail = res.data;
                console.log(this.detail);
             }
        })
    },
    mounted(){
        this.$refs.scroll.$el.style.height = document.getElementById('tb-review').offsetHeight - this.$refs.title.$el.offsetHeight +'px';
    },
    methods:{
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
    }
}
</script>
<style lang="less" scoped>
#tb-review{
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