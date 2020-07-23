<template>
    <div id="cash-record">
        <div id="content">
            <uiTitle  :isback="true" ref="title" :title="'提现记录'" :color="'white'"  ></uiTitle> 
            <div id="content" >
                 <uiScroll  class="wrapper" ref="scroll"  :backcolor="'#f5f5f5'" :pullup='true' @scrollToEnd="pullup" :data="scroll_data" :scroll_to="scroll_to">
                    <main class="record" v-if="records.length>0">
                        <div class="record-list" v-for="(item,index) in records" :key="index">
                            <i class="el-icon-bank-card"></i>
                            <div>
                                <div class="record-title">
                                    余额提现
                                </div>
                                <div class="record-title">
                                    ({{item.status}})
                                </div>
                                <div class="time">
                                    {{item.time}}
                                </div>
                            </div>
                            <div class="money">
                                <p class="cash-money">-{{item.money}}</p>
                                <p class="fund-money">中心钱包：{{item.fund}}</p>
                            </div>
                        </div>
                    </main>
                    <div  class="brush-bottom" v-if="isBottom&&records.length>0">哎呀！刷到底啦……</div>
                     <uiEmpty v-if="records.length == 0"></uiEmpty>
                </uiScroll>
                 <uiTop v-show="records.length>9"  @goTop="goTop"></uiTop>
            </div>          
        </div>
    </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  uiTop from '../../../components/top-bar/top-bar';
import  FundService from './fund.http'
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import  uiEmpty from '../../../components/absolutely-empty/absolutely-empty';
export default {
    components:{
        uiTitle,
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
            page_num:9,
            last_page:1,
            isBottom:false,
            limit_num:true
        }
    },
    created(){
        util.loading();
        this.get_record();
    },
    mounted(){
        this.$refs.scroll.$el.style.height = document.getElementById("cash-record").offsetHeight - this.$refs.title.$el.offsetHeight+'px';
    },
    methods:{
        get_record(){
            if(this.page <= this.last_page){
                 FundService.get_cash({
                    page:this.page,
                    page_num:this.page_num
                }).then(res=>{
                    util.closeLoading();
                    if(res.code == 1){
                        this.scroll_data = !this.scroll_data;
                        res.data.data.forEach(item => {
                           item.time = YsConfig.get_time(item.time, 'indays');
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
        goTop(){
            this.scroll_to = [!this.scroll_to[0],0];
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
#cash-record{
    position: relative;
    height:100vh;
    z-index: 3;
    #content{
        width: 100%;
        height:100vh;
        overflow-y: auto;
    }
    .wrapper{
        overflow: hidden;
    }
    .record{
        width: 100%;
        box-sizing: border-box;
        padding-top:0.8rem;
        .record-list{
            margin-bottom: 0.8rem;
            padding:0 3%;
            background-color: white;
            height: 5rem;
            position: relative;
             &>div{
                display: inline-block;
                height: 100%;
                vertical-align: top;
                padding:0.2rem;
                .record-title{
                    margin-top: 0.3rem;
                    font-size: 0.85rem;
                }
                .time{
                    margin-top: 0.3rem;
                    font-size: 0.8rem;
                    color:rgb(160,160,160);
                }
            }
            .money{
                float: right;
                font-size: 1.3rem;
                line-height: 2rem;
                font-weight: 400;
                color:#3c3c3c;
                .cash-money{
                   text-align: right;
                }
                 .fund-money{
                     font-size: 0.9rem;
                     color:rgb(170,170,170);
                     text-align: right;
                }
            }
            i{
                height: 100%;
                width: 2.5rem;
                text-align: center;
                line-height: 4.5rem;
                font-size: 2rem;
                color:#FFC125;
            }
        }
    }
}
</style>