<template>
    <div id="cash-out">
        <uiTitle class="ui-title"  :isback="true" ref="title" :title="'提现'" :color="'white'"  >
            <router-link to="/cash-record" tag='div' class="cash-out-record">
                    提现记录
            </router-link>
        </uiTitle> 
        <uiList class="ui-list" :list="list"></uiList>
          <div class="tips">
            温馨提示： 500元以下提现手续费1.00 元
        </div>
         <el-form ref="form" class="el-form">
                <div class="ui-card-list">
                    <div class="input-name">账户余额</div>
                    <span class="item-name">¥  {{(account_money?account_money:0).toFixed(2)}}</span>
                     <div class="cashout-all">
                        (元)
                    </div>
                </div>
                 <div class="ui-card-list">
                    <div class="input-name">提现金额</div>
                    <span>¥</span>
                    <uiInput :placeholder="'输入提现金额'" :value='cash_money' @input_cash='input_cash'></uiInput>
                    <!-- <input name="input" type="number" v-model="cash_money" placeholder="输入提现金额" @change='cash_change()' /> -->
                    <div class="cashout-all" @click="all_out()">
                        全部提现
                    </div>
                </div>
         </el-form>
         <el-button class="el-button"  @click="cash_out()"><span>确定</span></el-button>   
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
            bank_info:'',
            isBindId:0,
            list:[
                {
                    name:'',
                    right_button:true,
                    path:''
                }
            ],
            account_money:0,
            cash_money:''
        }
    },
    mounted(){
        if (YsConfig.get_user().bank_validate == 0) {
             util.comfirm({
                content:'还未绑定银行卡，立即绑定',
                define:()=>{
                   this.$router.push('/debit-card-detail/0');
                },
                cancel:()=>{
                    util.routerBack();
                }
            });
        }else{
             FundService.get_bank()
            .then(res=>{
                if(res.code == 1){
                    this.isBindId = 1;
                    const bankinfo = res.data;
                    this.list[0].name = bankinfo.bank_name +'('+ bankinfo.bank_number.substr(bankinfo.bank_number.length-4)+')';
                    this.list[0].path = 'debit-card-detail/'+this.isBindId;
                }else{}
            })
            .catch(res=>{
                util.alert({
                    content:res.msg,
                    define:()=>{ 
                        util.routerBack();
                    }
                })
            })
            this.account_money = Number(this.$route.query.cash);
        }
    },
    methods:{
        all_out(){
            this.cash_money = this.account_money.toFixed(2);
        },
        cash_out(){
            if(Number(this.cash_money)>this.account_money){
                 util.alert({
                    content:'提现金额必须<br>小于账户金额',
                    define:()=>{
                        this.cash_money = this.account_money.toFixed(2);
                    }
                });
                return;
            }
            util.toast({
                content:'正在努力提现...'
            })
           FundService.cash_out({
               targetMoney:Number(this.cash_money)
           }).then(res=>{
               if(res.code == 1){
                   FundService.get_centerMoney()
                   .then(res=>{
                        if(res.code == 1){
                            YsConfig.setCache("user",res.data);
                        }
                   })
                   util.alert({
                        content:res.msg,
                        define:()=>{
                           util.routerBack();
                        }
                    })
               }else{
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
    },
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#cash-out{
        width: 100%;
        height: 100%;
        z-index: 2;
        .ui-title{
            .cash-out-record{
                position: absolute;
                right: 3%;
                bottom:0;
                font-size: 0.9rem;
                font-weight: 400;
                color:#4c4c4c;
            }
        }
        .ui-list{
            padding:0 3%;
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
                    font-size: 1.2rem;
                    font-weight: 700;
                }
                 ::-webkit-input-placeholder {
                    /* WebKit browsers */
                    color: rgb(190,190,190);
                    font-weight: 400;
                    font-size: 0.9rem;
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