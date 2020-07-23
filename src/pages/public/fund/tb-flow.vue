<!--
 * @Author: your name
 * @Date: 2020-06-05 10:47:11
 * @LastEditTime: 2020-07-06 15:39:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\fund\tb-flow.vue
--> 
<template>
    <div id="tb-flow">
        <uiTitle class="title" ref="title" :isback="true" :title="'淘宝流水详情'" :color="'white'"></uiTitle> 
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" >
           <main class="main">
                <div class="list" v-if="detail !=''">
                    <div class="bonus"><span>{{detail.money}}</span>元</div>
                     <div class="good-name"><p>{{detail.title}}</p></div>
                     <div class="item">
                        <span class='item-name'>账单编号</span>
                        <div class="item-value order-number">{{detail.bill_number}}</div>
                    </div>
                   
                    <div class="item">
                        <span class='item-name'>类型</span>
                        <div class="item-value">{{detail.type}}</div>
                    </div>

                     <div class="item">
                        <span class='item-name'>生成时间</span>
                        <div class="item-value">{{detail.time}}</div>
                    </div>
                     <div class="item" v-if="detail.status != 1">
                        <span class='item-name'>审核时间</span>
                        <div class="item-value order-type">{{detail.audit_time}}</div>
                    </div>
                     <div class="item">
                        <span class='item-name'>账单状态</span>
                        <div class="item-value" v-if="detail.status == 1" :style="{color:'#ffc125'}">
                            待审核
                        </div>
                        <div class="item-value" v-if="detail.status == 2" :style="{color:'rgb(26, 158, 26)'}">
                            已审核
                        </div>
                        <div class="item-value" v-if="detail.status == 3" :style="{color:'rgb(26, 158, 26)'}">
                            已到账
                        </div>
                        <div class="item-value" v-if="detail.status == 4" :style="{color:'rgb(253, 0, 0)'}">
                            已打回
                        </div>
                        <div class="item-value" v-if="detail.status == 9" :style="{color:'rgb(253, 0, 0)'}">
                            拒绝
                        </div>
                    </div>
                    <div class="item">
                        <span class='item-name'>用户可用资金</span>
                        <div class="item-value">{{detail.fund}}元</div>
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
import  FundService from './fund.http'
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
            detail:''
        }

    },
    created(){
        this.detail_id = this.$route.params.id;
        util.loading();
        FundService.get_flow_details({
            id:this.detail_id,
            db: 1,
        }).then(res=>{
             util.closeLoading();
             if(res.code == 1){
                 res.data.time = YsConfig.get_time(res.data.time, 'inseconds');
                 res.data.audit_time = YsConfig.get_time(res.data.audit_time, 'inseconds');
                 this.detail = res.data;
                 console.log(this.detail);
             }
        }).catch(err => {
             util.closeLoading();
        });
    },
    mounted(){
        this.$refs.scroll.$el.style.height = document.getElementById('tb-flow').offsetHeight - this.$refs.title.$el.style.height +'px';
    }
}
</script>
<style lang="less" scoped>
#tb-flow{
    z-index: 3;
    height:100vh;
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
    }
}
</style>