<template>
    <div id="fund-transfer">
        <uiTitle  :isback="true" class="ui-title" ref="title" :title="account_name" :color="'white'"  >
             <router-link :to="'/fund-record/'+url_id" tag='div' class="roll-out-record">
                   转出记录
            </router-link>
        </uiTitle> 
        <!-- <p class="fund-account">{{account_name}}</p> -->
         <div class="tips">
            温馨提示： 提现最小额度为10元
          
        </div>
         <el-form ref="form" class="el-form">
                <div class="ui-card-list">
                    <div class="input-name">可转金额</div>
                    <span class="item-name">¥  {{Number(account_money?account_money:0).toFixed(2)}}</span>
                     <div class="cashout-all">
                        (元)
                    </div>
                </div>
                 <div class="ui-card-list">
                    <div class="input-name">转出金额</div>
                    <span>¥</span>
                    <uiInput :placeholder="'输入提现金额'" :value='cash_money' @input_cash='input_cash'></uiInput>
                    <div class="cashout-all" @click="all_out()">
                        全部转出
                    </div>
                </div>
         </el-form>
         <el-button class="el-button"  @click="roll_out()"><span>转出到中心钱包</span></el-button>   
    </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  uiList from '../../../components/list-bar/list-bar';
import uiInput from '../../../components/input-bar/input-bar';
import  FundService from './fund.http'
export default {
    components:{
        uiTitle,
        uiList,
        uiInput
    },
    data(){
        return{
            url_id:'',
            bank_info:'',
            isBindId:0,
            account_name:'',
            account_money:29.678,
            cash_money:null
        }
    },
    mounted(){
        this.url_id = this.$route.params.id;
       if(this.$route.params.id == 0){
            this.account_name = '淘宝账户'
       }else{
            this.account_name = '京东账户'
       }
       this.account_money = Number(this.$route.query.roll);
    },
    methods:{
        all_out(){
            this.cash_money = this.account_money.toFixed(2);
        },
        roll_out(){
            if(Number(this.cash_money)>this.account_money){
                 util.alert({
                    content:'转出金额必须<br>小于账户金额',
                    define:()=>{
                        this.cash_money = this.account_money.toFixed(2);
                    }
                });
                return;
            }
             util.toast({
                content:'正在努力提现...'
            })
             FundService.roll_out({
               targetMoney:Number(this.cash_money),
               db:this.url_id==0?1:2
            }).then(res=>{
                if(res.code == 1){
                    FundService.get_centerMoney()
                   .then(res=>{
                        if(res.code == 1){
                            YsConfig.setCache("user",res.data);
                        }
                   })
                   util.alert({
                        content:'转出成功，请到资金管理进行提现',
                        define:()=>{
                             util.routerBack();
                        }
                    })
                } else {
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            this.cash_money = null;
                        }
                    })
                }
            }).catch(error=>{
                util.alert({
                    content:error.msg,
                    define:()=>{
                        this.cash_money = null;
                    }
                })
            })
        },
        input_cash(data){
            this.cash_money = data;
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#fund-transfer{
        width: 100%;
        height: 100%;
        z-index: 2;
        .ui-title{
            .roll-out-record{
                position: absolute;
                right: 3%;
                bottom:0;
                font-size: 0.9rem;
                font-weight: 400;
                color:#4c4c4c;
            }
        }
        .fund-account{
            padding:0 3%;
            height: 3rem;
            line-height: 3rem;
            font-size: 1rem;
            background-color: white;
            margin-top: 0.8rem;
        }
        .commit-button{
            width: 94%;
            margin:0.8rem  0 0 3%;
            border:none;
            background-color: #FFC125;
            span{
                color: white;
            }
        }
         .el-form{
            position: relative;
            width:100%;
            margin:0 auto 0 auto;
            padding:0.2rem 0.7rem ;
            background-color: white;
            .ui-card-list:last-of-type{
                border-bottom:none
            }
            .ui-card-list{
                min-height:3rem;
                line-height:2.4rem;
                background-color: white;
                border-bottom: 0.07rem solid rgb(230,230,230);
                position: relative;  
                .input-name{
                    margin-right: 0.5rem;
                    display: inline-block;
                    height:100%;
                    line-height:3rem;
                    font-size: 0.9rem;
                    color:rgba(100,100,100,0.8);
                } 
                .item-name{
                    font-size: 0.9rem;
                }
                input{
                    width: 8rem;
                    font-size: 0.9rem;
                    font-weight: 700;
                    font-size: 1.2rem;
                }
                ::-webkit-input-placeholder {
                    /* WebKit browsers */
                    color: rgb(190,190,190);
                    font-weight: 400;
                    font-size: 0.8rem;
                }
                .cashout-all{
                    position: absolute;
                    right: 1rem;
                    top: 0.4rem;
                    color:rgb(160,160,160);
                    font-size: 0.8rem;
                }
            }
        }
}
</style>