<template>
    <div id="jd-appointment">
       <div id='content'>
            <uiScroll class="wrapper" ref="scroll"  :backcolor="'#f5f5f5'" :pullup='true' @scrollToEnd="pullup" :uiPull="true" @uiPullData="uiPullData" :data="scroll_data" :scroll_to="scroll_to">
                <main v-if="records.length>0">
                    <router-link :to="path_name +item.id+'?step='+step" tag="div" class="buy-list" v-for="(item,index) in records" :key="index"  >
                        <div class="top">
                            任务编号：{{item.order_number}}
                        </div>
                        <div class="center" >
                            <div class="goods" v-if="item.goods_name!=''">
                               {{item.goods_name}}
                            </div>
                        </div>
                        <div class="center">
                           <div v-if="status == 1" class="type">
                                类型：
                                <span v-if="item.order_type == 1">垫付单</span>
                                <span v-if="item.order_type == 2">浏览单</span>
                                <span v-if="item.order_type == 3">多链接单</span>
                           </div>
                           <div v-if="status == 2" class="type">
                                类型：
                                <span v-if="item.type == 1">文字评价</span>
                                <span v-if="item.type == 2">图片评价</span>
                                <span v-if="item.type == 3">视频评价</span>
                           </div>
                            <div class="bonus">+{{item.commission_buyer}}</div>
                        </div>
                        <div class="center">
                            <span v-if="status == 1">实付金额：<span class="money">¥ {{item.buyer_money}}</span></span>
                            <span v-if="status == 2">店铺名称：<span class="money">{{item.goods_store}}</span></span>
                             <div class="status">
                                <span v-if="item.order_state == 0" :style="{color:'rgb(241, 91, 91)'}">未接</span>
                                <span v-if="item.order_state == 1" :style="{color:'rgb(241, 91, 91)'}">垫付未提交</span>
                                <span v-if="item.order_state == 2" :style="{color:'rgb(41, 86, 209)'}">垫付待审核</span>
                                <span v-if="item.order_state == 3" :style="{color:'rgb(26, 158, 26)'}" >垫付通过</span> 
                                <span v-if="item.order_state == 8" :style="{color:'rgb(253, 0, 0)'}">垫付拒绝</span>
                                <span v-if="item.order_state == 4" :style="{color:'rgb(230,174,33)'}">待评价</span>
                                <span v-if="item.order_state == 5" :style="{color:'rgb(41, 86, 209)'}">评价待审核</span>
                                <span v-if="item.order_state == 6" :style="{color:'rgb(26, 158, 26)'}">评价已审核</span>
                                <span v-if="item.order_state == 9" :style="{color:'rgb(253, 0, 0)'}">评价拒绝</span>
                                <span v-if="item.order_state == 10" :style="{color:'rgb(253, 0, 0)'}">未执行</span>
                                <span v-if="item.status == 0" :style="{color:'rgb(241, 91, 91)'}">未领取</span>
                                <span v-if="item.status == 1" :style="{color:'rgb(241, 91, 91)'}">已领取</span>
                                <span v-if="item.status == 2" :style="{color:'rgb(41, 86, 209)'}">已做完</span>
                                <span v-if="item.status == 3" :style="{color:'rgb(26, 158, 26)'}" >已审核</span> 
                                <span v-if="item.status == 4" :style="{color:'rgb(253, 0, 0)'}">审核拒绝</span>
                                <span v-if="item.status == 9" :style="{color:'rgb(253, 0, 0)'}">放弃</span>
                            </div>
                        </div>
                        <div class="bottom">
                            接单时间：{{item.order_start_time}}
                        </div>
                    </router-link>
                    <div class="brush-bottom" v-if="isBottom">哎呀！刷到底啦……</div>
                </main>
                  <uiEmpty v-if="records.length == 0"></uiEmpty>
            </uiScroll>
              <uiTop v-show="records.length>6"  @goTop="goTop"></uiTop>
            <div class="settle_accounts" id="settle_accounts" @touchmove.prevent>
                <div class="yet" :class="{'hove_xs':status == 1}" @click="change_status(1)">任务查看</div>
                <div class="not" :class="{'hove_xs':status == 2}" @click="change_status(2)">评价任务</div>
            </div>
        </div>
    </div>
</template>
<script>
import YsConfig from '../../../../dora/ys.config'
import  uiScroll from '../../../../components/scroll-bar/scroll-bar';
import  CommerceService from '../ele-commerce.http'
import  uiEmpty from '../../../../components/absolutely-empty/absolutely-empty';
import  uiTop from '../../../../components/top-bar/top-bar';
export default {
    components:{
        uiScroll,
         uiEmpty,
        uiTop
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
            limiter: true,
            status: 1,
            step: 3,
            path_name: '/jd-detail/',
        }
    },
    created(){
        this.get_record();
    },
    mounted(){
        document.getElementById('jd-appointment').style.height = document.getElementById('jd-appointment').offsetHeight - this.$store.state.safeTop - document.getElementById("settle_accounts").offsetHeight +'px';    
    },
    methods:{
        get_record(){
            if(this.page <= this.last_page){
                if(this.status == 1){
                    this.path_name = '/jd-detail/';
                    CommerceService.get_jtk_jd({
                        page:this.page,
                        page_num:this.page_num,
                    }).then(res=>{
                        if(res.code == 1){
                            this.scroll_data = !this.scroll_data;
                            res.data.data.forEach(item => {
                               item.order_start_time = YsConfig.get_time(item.order_start_time, 'inseconds');
                            });
                            this.records = this.records.concat(res.data.data);
                            this.limit_num = true;
                            this.last_page = res.data.last_page;
                            if(res.data.current_page == res.data.last_page){
                                this.page++;
                            }
                            this.limiter = true;
                        }
                    })
                }else if(this.status == 2) {
                    this.path_name = '/jd-review/';
                    CommerceService.get_jtk_pj({
                        page:this.page,
                        page_num:this.page_num,
                    }).then(res=>{
                        if(res.code == 1){
                            this.scroll_data = !this.scroll_data;
                            res.data.data.forEach(item => {
                               item.order_start_time = YsConfig.get_time(item.order_start_time, 'inseconds');
                            });
                            this.records = this.records.concat(res.data.data);
                            this.limit_num = true;
                            this.last_page = res.data.last_page;
                            if(res.data.current_page == res.data.last_page){
                                this.page++;
                            }
                            this.limiter = true;
                        }
                    })
                }
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
            if( this.limiter){
                this.limiter = false;
                this.isBottom = false;
                this.page = 1;
                this.last_page = 1;
                this.records = [];
                this.get_record();
            }
        },
        goTop(){
            this.scroll_to = [!this.scroll_to[0],0];
        },
        change_status(index){
                if(index != this.status && this.limiter){
                this.limiter = false;
                this.status = index;
                this.isBottom = false;
                this.page = 1;
                this.last_page = 1;
                this.records = [];
                this.get_record();
            }
        },
    }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/common.less';
#jd-appointment{
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
    .settle_accounts{
        position: fixed;
        width: 100vw;
        bottom: 3rem;
        right: 0;
        border-bottom: 1px solid #ccc;
        div{
            display: inline-block;
            width: 50vw;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
            font-size: 1rem;
            font-weight: 650;
            z-index: 5;
            background-color: #fff;
            color: #2d99e0;
        }
        .yet{
            float: left;
        }
        .not{
            float: right;
        }
        .hove_xs{
            background-image: linear-gradient(to bottom right, #2d99e0, #6fbaec);
            color: #fff;
        }
    }
}
</style>