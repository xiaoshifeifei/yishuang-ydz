<template>
    <div id="debit-card">
        <uiTitle class="title" ref="title" :isback="true" :title="'我的银行卡'" :color="'white'"></uiTitle> 
        <div class="tips" v-if="!isBind">
            您未绑定任何银行卡
        </div>
        <router-link :to="'/debit-card-detail/'+isBindId" tag="div" class="debit-message" v-if="isBind">
            <div class="card-title">
                {{bank_info.bank_name}}
            </div>
            <div class="card-number">
                 {{bank_info.bank_number}}
            </div>
            <!-- <div class="card-type">
               储蓄卡
            </div> -->
        </router-link>
        <router-link :to="'/debit-card-detail/'+isBindId" tag="div" class="binding"  v-if="!isBind">
            <div class="bind-name">
                <i class="el-icon-plus"></i> 绑定银行卡
            </div>
        </router-link>
        <div class="tips" v-if='isBind'>
            温馨提示：<br>
            本站暂不支持线上解绑/换绑银行卡，请联系您的客服进行解绑/换绑。
        </div>
        <div class="tips" v-else>
            温馨提示：本站目前仅支持绑定一张银行卡，请慎重选择绑定您最后账户余额流向的银行卡。
        </div>
    </div>
</template>
<script>
import  YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  MypagesService from './mypages.http'
export default {
    components:{
        uiTitle
    },
    data(){
        return{
            isBind:false,
            isBindId:0,
            bank_info:Object
        }
    },
    created(){
         util.loading();
         MypagesService.get_bank()
        .then(res=>{
            util.closeLoading();
            if(res.code == 1){
                this.isBind = true;
                this.isBindId = 1;
                this.bank_info = res.data
            }
        })
        .catch(res=>{
             util.closeLoading();
             util.alert({
                content:res.msg,
                define:()=>{ 
                    util.routerBack();
                }
            })
        })
    },
    mounted(){     
    }
}
</script>
<style lang="less" scoped>
#debit-card{
    height: 100vh;
    position: relative;
    .debit-message{
        padding:0.5rem 1rem;
        width: 94%;
        margin:1rem auto 0.5rem auto;
        border-radius: 0.5rem;
        min-height: 8rem;
        background-image:linear-gradient(to right bottom, RGB(218,199,130) 30% , RGB(109,101,73) 70%);
        .card-title{
            color:RGB(138,133,90);
            font-size: 1.1rem;
        }
        .card-number{
            //color:RGB(87,81,58);
            margin-top: 1rem;
            text-align: center;
            letter-spacing: 1px;
            font-size: 1.2rem;
            color:white;
            // background:linear-gradient(to   bottom, RGB(87,81,58) 0% , RGB(230,207,0) 100%  ) ;
            // color:transparent;
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
        }
        .card-type{
            color:RGB(161,155,105);
            margin-top: 1rem;
            text-align: right;
        }
    }
    .binding{
        width:94%;
        margin:0.8rem auto 1rem auto;
        padding:1rem;
        border-radius:0.5rem;
        border:0.1rem dashed rgb(210,210,210);
        .bind-name{
            text-align: center;
            letter-spacing: 5px;
            color:rgb(48, 124, 211);
           i{
                font-size: 1.2rem;
                font-weight: 700;
           }
        }
    }
     .tips{
         margin-top: 0.8rem;
        width: 100%;
        padding:0 3%;
        font-size: 0.8rem;
        color:rgb(170,170,170);
        background-color: #f5f5f5;
    }
}
</style>