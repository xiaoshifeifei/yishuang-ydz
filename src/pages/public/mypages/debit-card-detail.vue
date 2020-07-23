<template>
    <div id="debit-card-detail">
        <uiTitle v-if="url_id == 1" class="title" ref="title" :isback="true" :title="'银行卡信息'" :color="'white'"></uiTitle> 
         <uiTitle v-if="url_id == 0" class="title" ref="title" :isback="true" :title="'绑定银行卡'" :color="'white'"></uiTitle> 
         <div class="tips">
            温馨提示：请不要将您的银行卡信息透露给其他人。
        </div>
        <div v-if="url_id == 1">
             <el-form ref="form" class="el-form" v-model="form">
                <div class="ui-card-list">
                    <div class="input-name">所属银行</div>
                    <span class="item-name">{{form.bank_name}}</span>
                </div>
                 <div class="ui-card-list">
                    <div class="input-name">所属支行</div>
                    <span class="item-name">{{form.bank_subname}}</span>
                </div>
                <div class="ui-card-list">
                    <div class="input-name">银行卡号</div>
                    <span class="item-name">{{form.bank_number}}</span>
                </div>
                <div class="ui-card-list">
                    <div class="input-name">持卡人姓名</div>
                    <span class="item-name">{{form.info_name}}</span>
                </div>
                <div class="ui-card-list">
                    <div class="input-name">持卡人身份证号</div>
                <span class="item-name">{{form.id_card}}</span>
                </div>   
                <div class="ui-card-list">
                    <div class="input-name">银行预留手机号</div>
                    <span class="item-name">{{form.bank_mobile}}</span>
                </div>   
            </el-form>
            <el-button class="el-button"  @click="commit()"><span>确定</span></el-button>   
        </div>
        <div  v-if="url_id == 0">
             <el-form ref="form" class="el-form" v-model="bind_form">
                <div class="ui-card-list">
                    <div class="input-name">持卡人姓名</div>
                     <span>{{this.bind_form.info_name}}</span>
                </div>
                <div class="ui-card-list">
                    <div class="input-name">所属银行</div>
                      <uiBank class="select" @bank='bank'></uiBank>
                </div>
                 <div class="ui-card-list">
                    <div class="input-name">所属支行</div>
                     <input name="input" type="text" v-model="bind_form.bank_subname" placeholder="" />
                </div>
                <div class="ui-card-list">
                    <div class="input-name">银行卡号</div>
                    <input name="input" type="text" v-model="bind_form.bank_number" placeholder="" />
                </div>
                <div class="ui-card-list">
                    <div class="input-name">持卡人身份证号</div>
                    <input name="input" type="text" v-model="bind_form.id_card" placeholder="" />
                </div>   
                <div class="ui-card-list">
                    <div class="input-name">银行预留手机号</div>
                     <input name="input" type="text" v-model="bind_form.bank_mobile" placeholder="" />
                </div>   
            </el-form>
            <el-button class="el-button"  @click="bind()"><span>确定</span></el-button>   
        </div>
    </div>
</template>
<script>
import  YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  uiBank from '../../../components/bank-bar/bank-bar';
import  MypagesService from './mypages.http'
export default {
    components:{
        uiTitle,
        uiBank
    },
    data(){
        return{
            /** 
            * 判定是否绑定银行卡 
            */
            url_id:0,

            /** */
            form:{
               bank_name:'',
               bank_number:'',
               bank_subname:'',
               info_name:"",
               id_card:'',
               bank_mobile:''
           },

            bind_form:{
               bank_name:'',
               bank_subname:'',
               bank_number:'',
               info_name:'',
               id_card:'',
               bank_mobile:''
           },

        }
    },
    created(){
        util.loading();
        this.url_id = this.$route.params.id;
        if( this.url_id == 1){
            MypagesService.get_bank()
            .then(res=>{
                 util.closeLoading();
                if(res.code == 1){
                    this.form = res.data
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
        }else{
            util.closeLoading();
            this.bind_form.info_name = YsConfig.get_user().info_name;
        }
    },
    mounted(){

    },
    methods:{
        /** 提交 */
        commit(){
            util.routerBack();
        },
        bind(){
            MypagesService.bind_bank(
                this.bind_form
            ).then(res=>{
                if(res.code == 1){
                     MypagesService.get_centerMoney()
                    .then(res1=>{
                        if(res1.code == 1){
                             YsConfig.setCache("user",res1.data);
                            util.toast({
                                content:'绑定成功',
                                times:1000
                            });
                            util.routerBack();
                        }else{
                            util.toast({
                                content:'获取失败',
                                times:1000
                            }); 
                        }
                    })
                }else{
                    util.alert({
                        content:res.msg,
                        define:()=>{ 
                        }
                    })
                }
            }).catch(error=>{
                 util.alert({
                    content:error.msg,
                    define:()=>{ 
                    }
                })
            })
        },
        bank(data){
            this.bind_form.bank_name=data;
        }
    }
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
#debit-card-detail{
    z-index: 3;
    .el-form{
        position: relative;
        width:100%;
        margin:0.8rem auto 0 auto;
        padding:0.2rem 0.7rem ;
        background-color: white;
        .select{
            display: inline-block;
        }
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
                width: 60%;
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