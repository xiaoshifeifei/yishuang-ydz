<!--
 * @Author: your name
 * @Date: 2020-07-02 18:10:23
 * @LastEditTime: 2020-07-03 16:23:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\fund\centre-bill.vue
--> 
<!--
 * @Author: your name
 * @Date: 2020-05-29 16:05:13
 * @LastEditTime: 2020-06-30 17:47:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\fund\jd-running.vue
--> 
<template>
    <div id="centre-bill">
            <uiTitle  :isback="true" ref="title" :title="'中心账单'" :color="'white'"  ></uiTitle>         
            <uiScroll class="wrapper" ref="scroll"  :backcolor="'#f5f5f5'" :pullup='true' @scrollToEnd="pullup" :uiPull="true" @uiPullData="uiPullData" :data="scroll_data" :scroll_to="scroll_to"> 
                <div class="paddingtop">
                    <main class="record" v-if="records.length>0">
                        <div class="record-list" v-for="(item,index) in records" :key="index" @click="go_flow(item.id)">
                            <div class="record-center">
                                    <div class="record-title">
                                       {{item.title}}
                                    </div>
                                     <div class="record-detail" v-if="item.type == 1">
                                        [充值]
                                    </div>
                                    <div class="record-detail" v-if="item.type == 2">
                                        [提现]
                                    </div>
                                    <div class="record-detail" v-if="item.type == 3">
                                        [转入]
                                    </div>
                                    <div class="record-detail" v-if="item.type == 4">
                                        [转出]
                                    </div>
                                    <div class="record-detail" v-if="item.type == 5">
                                        [调账]
                                    </div>
                                    <div class="record-detail" v-if="item.type == 6">
                                        [提现手续费]
                                    </div>
                                    <div class="time">
                                        {{item.time}}
                                    </div>
                            </div>
                            <div class="money" :class="{'money-color':Number(item.money)<0}">
                                {{item.money}}
                                <p class="status" v-if="item.status == 1" :style="{color:'#ffc125'}">
                                    {{item.statusText}}
                                </p>
                                <p class="status" v-if="item.status == 2" :style="{color:'rgb(26, 158, 26)'}">
                                    {{item.statusText}}
                                </p>
                                <p class="status" v-if="item.status == 3" :style="{color:'rgb(26, 158, 26)'}">
                                    {{item.statusText}}
                                </p>
                                <p class="status" v-if="item.status == 4" :style="{color:'rgb(253, 0, 0)'}">
                                    {{item.statusText}}
                                </p>
                                <p class="status" v-if="item.status == 9" :style="{color:'rgb(253, 0, 0)'}">
                                    {{item.statusText}}
                                </p>
                                <p>
                                    余额:{{item.fund}}
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
                <div class="brush-bottom" v-if="isBottom && records.length > 0">哎呀！刷到底啦……</div>
                <uiEmpty v-if="records.length < 1"></uiEmpty>
            </uiScroll> 
             <uiTop class="uitop" v-show="records.length>9" @goTop="goTop"></uiTop>
    </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  FundService from './fund.http'
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import uiEmpty from '../../../components/absolutely-empty/absolutely-empty';
import  uiTop from '../../../components/top-bar/top-bar';
export default {
    components:{
        uiTitle,
        uiScroll,
        uiEmpty,
        uiTop,
    },
    data(){
        return{
            scroll_data:true,
            records:[],
            scroll_to:[true,0],
            type:1,
            page:1,
            page_num:8,
            last_page:1,
            limiter: true,
            isBottom:false,
            path_lj: '',
        }
    },
    created(){
        util.loading();
        this.type = 2;
        this.get_record();
        
    },
    mounted(){
         this.$refs.scroll.$el.style.height = document.getElementById("centre-bill").offsetHeight - this.$refs.title.$el.offsetHeight + 'px';   
    },
    methods:{
        get_record(){
             if(this.page <= this.last_page){
                 FundService.get_centre_bill({
                    page:this.page,
                    page_num:this.page_num,
                }).then(res=>{
                     util.closeLoading();
                    if(res.code == 1){
                        this.scroll_data = !this.scroll_data;
                        res.data.data.forEach(item => {
                           item.time = YsConfig.get_time(item.time, 'inseconds');
                        });
                        this.records = this.records.concat(res.data.data);
                        this.last_page = res.data.last_page;
                        if(res.data.current_page == res.data.last_page){
                            this.page++;
                        }
                        this.limiter = true;
                    }
                }).catch(err => {
                     util.closeLoading();
                     util.routerBack();
                });
            }
        },
        pullup(data){
             if(data == 1&&this.page>this.last_page){
                if(this.isBottom == false){
                    this.isBottom = true;
                    this.scroll_data = !this.scroll_data;
                }
            }
            if(this.limiter&&this.page<this.last_page){
                this.limiter = false;
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
        go_flow(id){
            var path = '/centre-particulars/' + id;
            this.$router.push(path);
        },
        goTop(){
            this.scroll_to = [!this.scroll_to[0],0];
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
#centre-bill{
    position: relative;
    height:100%;
    z-index: 3;
    .uitop{
        bottom: 4rem;
    }
    .wrapper{
        overflow: hidden;
        .paddingtop{
            padding-top: 0.8rem;
        }
    }
    .record{
        width: 100%;
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
                    font-size: 1rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                }
                .record-detail{
                     margin-top: 0.3rem;
                    font-size: 0.9rem;
                    color: #ccc;
                }
                .time{
                    margin-top: 0.3rem;
                    font-size: 0.8rem;
                    color:rgb(160,160,160);
                }
            }
            .money{
                position: relative;
                float: right;
                // width: 6rem;
                font-size: 1.3rem;
                line-height: 2.25rem;
                font-weight: 400;
                color:#3c3c3c;
                text-align: right;
                p{
                    font-size: 0.8rem;
                    color:rgb(160,160,160);
                    line-height: 3.25rem;
                }
                .status{
                    position: absolute;
                    right: 0.2rem;
                    top:2.3rem;
                    width: 3.5rem;
                    text-align: right;
                    font-size: 0.8rem;
                    color: #dd6563;
                    line-height: 0.8rem;
                }
            }
            .money-color{
                 color:rgb(81, 136, 238);
            }
        }
    }
}
</style>