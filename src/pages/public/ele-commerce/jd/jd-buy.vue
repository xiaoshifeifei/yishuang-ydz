<template>
    <div id="jd-buy">
        <div id='content'>
            <uiScroll class="wrapper" ref="scroll"  :backcolor="'#f5f5f5'" :pullup='true' @scrollToEnd="pullup" :uiPull="true" @uiPullData="uiPullData" :data="scroll_data"  :scroll_to="scroll_to">
                <!-- <uiDrop class="drop-down" id="drop-down" :list="list"></uiDrop> -->
                <main v-if="records.length>0">
                    <router-link :to="item.judeg_to" tag="div" class="buy-list" v-for="(item,index) in records" :key="index"  >
                        <div class="top">
                            任务编号：{{item.order_number}}
                        </div>
                        <div class="center" >
                            <div class="goods" v-if="item.goods_name!=''">
                               {{item.goods_name}}
                            </div>
                        </div>
                        <div class="center">
                           <div class="type">
                                类型：
                                <span v-if="item.order_type == 1">垫付单</span>
                                <span v-if="item.order_type == 2">浏览单</span>
                                <span v-if="item.order_type == 3">多链接单</span>
                           </div>
                            <div class="bonus">+{{item.commission_buyer}}</div>
                        </div>
                        <div class="center">
                            实付金额：<span class="money">¥ {{item.buyer_money}}</span>
                             <div class="status">
                                <span v-if="item.order_state == 0" :style="{color:'rgb(241, 91, 91)'}">未接</span>
                                <span v-if="item.order_state == 1" :style="{color:'rgb(241, 91, 91)'}">点击继续任务</span>
                                <span v-if="item.order_state == 2" :style="{color:'rgb(41, 86, 209)'}">待审核</span>
                                <span v-if="item.order_state == 3" :style="{color:'rgb(26, 158, 26)'}" >通过</span> 
                                <span v-if="item.order_state == 8" :style="{color:'rgb(253, 0, 0)'}">拒绝</span>
                                <span v-if="item.order_state == 10" :style="{color:'rgb(253, 0, 0)'}">未执行</span>
                            </div>
                        </div>
                        <div class="bottom">
                            接单时间：{{item.order_accept_time}}
                        </div>
                    </router-link>
                      <div class="brush-bottom" v-if="isBottom">哎呀！刷到底啦……</div>
                </main>
                <uiEmpty v-if="records.length == 0"></uiEmpty>
            </uiScroll>
            <uiTop v-show="records.length>6"  @goTop="goTop"></uiTop>
        </div>
    </div>
</template>
<script>
import YsConfig from '../../../../dora/ys.config'
import  uiScroll from '../../../../components/scroll-bar/scroll-bar';
import  uiEmpty from '../../../../components/absolutely-empty/absolutely-empty';
import  uiDrop from '../../../../components/drop-down/drop-down';
import  CommerceService from '../ele-commerce.http'
import  uiTop from '../../../../components/top-bar/top-bar';
export default {
    components:{
        uiScroll,
        uiEmpty,
        uiTop,
        uiDrop
    },
    data(){
        return{
            scroll_data:true,
            records:[],
            scroll_to:[true,0],
            page:1,
            page_num:6,
            type: 1,
            last_page:1,
            isBottom:false,
            limit_num:true,
            scroll_data:true,
            loading:true,
            list:[
                 {
                    name:'待返款',
                },
                 {
                    name:'发货中',
                },
                {
                    name:'待收货',
                },
                {
                    name:'已评价',
                },
                {
                    name:'已完成',
                },
                {
                    name:'已失败',
                },
                {
                    name:'全部',
                },
            ],
        }
    },
    created(){
        this.get_record();
    },
    mounted(){
        document.getElementById('jd-buy').style.height = document.getElementById('jd-buy').offsetHeight - this.$store.state.safeTop +'px';
    },
    methods:{
         get_record(){
            if(this.page <= this.last_page){
                 CommerceService.get_buyList_jd({
                    page:this.page,
                    page_num:this.page_num,
                    type: this.type
                }).then(res=>{
                    if(res.code == 1){
                        this.scroll_data = !this.scroll_data;
                        res.data.data.forEach(item => {
                           item.order_accept_time = YsConfig.get_time(item.order_accept_time, 'inseconds');
                           if(item.pass){
                                if(item.pass == 1){
                                   item.judeg_to = '/jdorder-verify/'+item.id+'?type='+item.order_type;
                                }else if(item.pass == 2){
                                   item.judeg_to = '/jdanswer-question/'+item.id+'?type='+item.order_type;
                                }else if(item.pass == 3){
                                   item.judeg_to = '/jdpay-commit/'+item.id+'?type='+item.order_type;
                                }else if(item.pass == 4){
                                   item.judeg_to = '/jdbrowse-order/'+item.id;
                                }
                           }else{
                               item.judeg_to = '/jd-detail/'+item.id+'?step=1';
                           }
                        });
                        this.records = this.records.concat(res.data.data);
                        this.limit_num = true;
                        this.last_page = res.data.last_page;
                        if(res.data.current_page == res.data.last_page){
                            this.page++;
                        }
                    }
                })
            }
        },
         pullup(data){
             if(data == 1&&this.page>this.last_page){
                if(this.isBottom == false){
                    this.isBottom = true;
                    this.scroll_data = !this.scroll_data;
                }
            }
            if(this.page<this.last_page&&this.limit_num){
                this.limit_num = false;
                this.page++;
                this.get_record();
            }
         },
        uiPullData(){
            this.isBottom = false;
            this.page = 1;
            this.last_page = 1;
            this.records = [];
            this.get_record();
        },
        goTop(){
            this.scroll_to = [!this.scroll_to[0],0];
        }
         
    }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/common.less';
#jd-buy{
    position: relative;
    width:94%;
    margin: auto;
    z-index: 1;
     #content{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        main{
            padding-top: 0.8rem;
        }
        .buy-list{
            border-radius: 0.5rem;
            padding:0.5rem;
            margin-bottom: 0.8rem;
            background-color: white;
            .top,.center{
                 margin-bottom: 0.8rem;
            }
            .top{
                height: 1.5rem;
                font-size: 0.8rem;
                color:#8c8c8c;
                border-bottom: 0.05rem solid #9c9c9c;
            }
            .center{
                font-size: 0.9rem;
                color:#8c8c8c;
                .type{
                     color:#8c8c8c;
                    display: inline-block;
                    span{
                         color:#FFC125;
                    }
                }
                span{
                    font-size: 0.9rem;
                }
                .goods{
                    width:94%;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    font-size: 0.9rem;
                }
                .bonus{
                    float: right;
                    margin-right: 0.8rem;
                    font-size:1.2rem;
                    font-weight: 700;
                    color:#FFC125;
                }
                 .status{
                    float: right;
                    margin-right: 0.8rem;
                    font-size:0.9rem;
                }
                .money{
                    color:#4c4c4c;
                }
            }
            .bottom{
                font-size: 0.8rem;   
                color:#8c8c8c;            
            }
        }
    }
    .wrapper{
        overflow: hidden;
        height: 100%;
    }
    .drop-down{
        background-color: rgb(240,240,240);
        width:100%;
        border-radius: 0.5rem;
    }
}
</style>