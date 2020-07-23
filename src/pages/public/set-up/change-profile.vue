<template>
    <div id="change-profile">
        <uiTitle  :isback="true" :color="'white'" :title="'修改资料'"></uiTitle>
        <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-profile-list">
                <div class="input-name-location">地区</div>
                <uiVdistpicker class="location" :province='location.province' :city='location.city' :area='location.county' @province='province'  @city='city'  @area='area'></uiVdistpicker>
            </div>
            <div class="ui-profile-list">
                <div class="input-name">详细地址</div>
                <input name="input" type="text" v-model="form.location" placeholder=""/>
                <i class="el-icon-close el-icon" v-if="form.location !=''"  @click="empty($event,'location')"></i>
            </div>
             <!-- <div class="ui-profile-list" >
                <div class="input-name">QQ号</div>
                <input name="input" type="text" v-model="form.qq" placeholder="" />
                <i class="el-icon-close el-icon" v-if="form.qq !=''"  @click="empty($event,'qq')"></i>
            </div>
            <div class="ui-profile-list" >
                <div class="input-name">微信号</div>
                <input name="input" type="text" v-model="form.wx" placeholder="" />
                <i class="el-icon-close el-icon" v-if="form.wx !=''"  @click="empty($event,'wx')"></i>
            </div> -->
            <div class="ui-profile-list" >
                <div class="input-name">历史订单号</div>
                <input name="input" type="text" v-model="form.tb_id" placeholder="" />
                <i class="el-icon-close el-icon" v-if="form.tb_id !=''"  @click="empty($event,'tb_id')"></i>
            </div>
        </el-form>
       <el-button class="el-button"  round @click="commit()"><span>修改</span></el-button>   
    </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  SetupService from './set-up.http'
import  uiVdistpicker from 'v-distpicker'
export default {
    components:{
        uiTitle,
        uiVdistpicker
    },
    data(){
        return{
             form:{
                all_location:'',
                location:'',
                qq:'',
                wx:"",
                tb_id:'',
                
            },
            location:{
                province:'',
                city:'',
                area:''
            },
        }
    },
    created(){
        util.loading();
         SetupService.get_profile()
         .then(res=>{
              util.closeLoading();
             if(res.code == 1){
                 this.form.true_name = res.data.info_name;
                 this.location.province = res.data.province;
                 this.location.city = res.data.city;
                 this.location.county = res.data.county;
                 this.form.location = res.data.location;
                 this.form.qq = res.data.qq;
                 this.form.wx = res.data.wx;
                 this.form.tb_id = res.data.tb_id;
             }

         });
    },
    methods:{
        province(e){
            this.location.province = e.value;
        },
        city(e){
            this.location.city = e.value;
        },
        area(e){
            this.location.area = e.value;
        },
        empty(e,type){
           switch(type){
                case 'location' : this.form.location = '';break;
                case 'qq' : this.form.qq = '';break;
                case 'wx' : this.form.wx = '';break;
                case 'tb_id' : this.form.tb_id = '';break;

           }
            e.target.previousElementSibling.focus();
        },
        commit(){
             this.form.all_location = this.location.province + ' ' + this.location.city + ' ' + this.location.area;
              SetupService.change_profile(
                  this.form
              )
            .then(res=>{
             if(res.code == 1){
                util.alert({
                    content:res.msg,
                    define:()=>{
                         util.routerBack();
                    }
                })
             }else{
                util.alert({
                    content:res.msg,
                    define:()=>{}
                })
             }
         });
        }
    }
    
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
#change-profile{
    z-index: 4;
    // .reg-button{
    //     display: block;
    //     width:90%;
    //     margin: 1rem auto 0 auto;
    // }
   .el-form{
        position: relative;
        width:100%;
        margin:0.8rem auto 0 auto;
        padding:0.2rem 0.7rem ;
        background-color: white;
        .ui-profile-list:last-of-type{
            border-bottom:none
        }
        .ui-profile-list{
            min-height:4rem;
            line-height:3.4rem;
            background-color: white;
            border-bottom: 0.07rem solid rgb(230,230,230);
            position: relative;    
            .location{
                display: inline-block;
                width:80%;
            }
            .input-name-location{
                display: inline-block;
                height:100%;
                width:3rem;
                line-height:4rem;
                font-size: 1rem;
                color:rgba(100,100,100,0.8);
            }
            .input-name{
                display: inline-block;
                height:100%;
                min-width:4rem;
                line-height:4rem;
                font-size: 0.9rem;
                color:rgba(100,100,100,0.8);
            }
            input{
                display: inline-block;
                height:2.8rem;
                min-width: 50%;
                max-width: 70%;
                font-size: 0.9rem;
                padding-left: 0.1rem;
                color:#4c4c4c;
            }
            input::-webkit-input-placeholder {
                color:rgba(200,200,200,0.8);
            }
            .shortiInput{
                width: 55%;
            }
            .el-icon{
                position: absolute;
                right:1rem;
                top:1.3rem;
                line-height: 1.3rem;
                color:#8c8c8c;
                text-align: center;
                width:1.3rem;
                height:1.3rem;
                font-size: 1rem;
            }
            .location{
                margin-bottom: 0.8rem;
            }
        }  
    }
}
</style>