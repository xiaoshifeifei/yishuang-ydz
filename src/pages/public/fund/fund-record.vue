<template>
    <div id="fund-record">
        <uiTitle  :isback="true" ref="title" :title="title_name" :color="'white'"  ></uiTitle> 
        <uiScroll   class="wrapper" ref="scroll"  :backcolor="'#f5f5f5'" :pullup='true' @scrollToEnd="pullup" :data="scroll_data" :scroll_to="scroll_to">
            <main class="record" v-if="records.length>0">
                <div class="record-list" v-for="(item,index) in records" :key="index">
                    <i class="iconfont icon-zhuanchu" v-if="item.type!='转出'"></i>
                    <i class="iconfont icon-zhuanru" v-else></i>
                    <div class="record-center">
                            <div class="record-title">
                            {{item.bill_number}}
                            </div>
                            <div class="record-detail" v-if="item.status == 1" :style="{color:'#ffc125'}">待审核</div>
                             <div class="record-detail" v-if="item.status == 2" :style="{color:'rgb(26, 158, 26)'}" >已审核</div>
                             <div class="record-detail" v-if="item.status == 3" :style="{color:'rgb(26, 158, 26)'}">已到账</div>
                              <div class="record-detail" v-if="item.status == 4" :style="{color:'rgb(253, 0, 0)'}">已打回</div>
                             <div class="record-detail" v-if="item.status == 9" :style="{color:'rgb(253, 0, 0)'}">拒绝</div>
                            
                            <div class="time">
                                {{item.time}}
                            </div>
                    </div>
                    <div class="money" :class="{'money-color':Number(item.money)<0}">
                        -{{item.money}}
                        <p>
                            {{item.fund}}
                        </p>
                    </div>
                </div>
            </main>
            <div class="brush-bottom" v-if="isBottom&&records.length>0">哎呀！刷到底啦……</div>
                <uiEmpty v-if="records.length == 0"></uiEmpty>
        </uiScroll>    
          <uiTop v-show="records.length>9"  @goTop="goTop"></uiTop>     
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
            title_name:'',
            scroll_data:true,
            records:[],
            scroll_to:[true,0],
            page:1,
            page_num:8,
            last_page:1,
            isBottom:false
        }
    },
    created(){
        util.loading();
        if(this.$route.params.id == 0){
            this.title_name = '淘宝转出记录'
            this.get_record(1);
        }else if(this.$route.params.id == 1){
            this.title_name = '京东转出记录'
            this.get_record(2);
        }
        
    },
    mounted(){  
        this.$refs.scroll.$el.style.height = document.getElementById("fund-record").offsetHeight - this.$refs.title.$el.offsetHeight+'px';     
    },
    methods:{
        get_record(type){
             if(this.page <= this.last_page){
                 FundService.get_tb_account({
                    status:1,
                    page:this.page,
                    page_num:this.page_num,
                    db:type
                }).then(res=>{    
                    util.closeLoading();
                    if(res.code == 1){
                        this.scroll_data = !this.scroll_data;
                        res.data.data.forEach(item => {
                           item.time = YsConfig.get_time(item.time, 'indays');
                        });
                        this.records = this.records.concat(res.data.data);
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
            if(data == 0&&this.page<this.last_page){
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
#fund-record{
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
        padding-top: 0.8rem;
        box-sizing: border-box;
        .record-list{
            margin-bottom: 0.8rem;
            padding:0 3%;
            background-color: white;
            height: 5rem;
            position: relative;
            .record-center{
                width:56%;
            }
             &>div{
                display: inline-block;
                height: 100%;
                vertical-align: top;
                padding:0.2rem;
                .record-title{
                    width:100%;
                    margin-top: 0.3rem;
                    font-size: 0.75rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                }
                .record-detail{
                     margin-top: 0.3rem;
                    font-size: 0.9rem;
                }
                .time{
                    margin-top: 0.5rem;
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
                p{
                    font-size: 0.8rem;
                    color:rgb(160,160,160);
                    text-align: right;
                }
            }
            .money-color{
                 color:rgb(81, 136, 238);
            }
            i{
                height: 100%;
                width: 2.5rem;
                text-align: center;
                line-height: 3.5rem;
                font-size: 2rem;
                color:#FFC125;
            }
            .icon-zhuanru{
                color:rgb(81, 136, 238);
            }
        }
    }
}
</style>