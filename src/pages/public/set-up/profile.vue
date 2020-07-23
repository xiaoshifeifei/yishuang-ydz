<template>
    <div id="frofile">
        <uiTitle  :isback="true" :color="'white'" :title="'个人资料'">
            <router-link to="/change-profile" tag='div' class="change-profile">
                编辑
            </router-link>
        </uiTitle>
         <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-profile-list">
                <div class="input-name">姓名</div>
                <input name="input" type="text" v-model="form.true_name" placeholder="" readonly />
            </div>         
        </el-form>
        <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-profile-list">
                <div class="input-name">地区</div>
                <input name="input" type="text" v-model="form.all_location" placeholder="" readonly/>
            </div>
            <div class="ui-profile-list">
                <div class="input-name">详细地址</div>
                <input name="input" type="text" v-model="form.location" placeholder="" readonly/>
            </div>
        </el-form>
        <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-profile-list">
                <div class="input-name">QQ号</div>
                <input name="input" type="text" v-model="form.qq" placeholder="" readonly/>
            </div>
            <div class="ui-profile-list">
                <div class="input-name">微信号</div>
                <input name="input" type="text" v-model="form.wx" placeholder="" readonly/>
            </div>
             <div class="ui-profile-list">
                <div class="input-name">历史订单号</div>
                <input name="input" type="text" v-model="form.tb_id" placeholder="" readonly/>
            </div>
        </el-form>
       <el-form ref="form" class="el-form" v-model="form">    
           <uiList class="ui-list" :list="list" ></uiList>
        </el-form>
    </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import uiList from '../../../components/list-bar/list-bar'
import  SetupService from './set-up.http'
export default {
    components:{
        uiTitle,
        uiList
    },
    data(){
        return{
            form:{
                true_name:'',
                mobile:'',
                all_location:'',
                location:'',
                qq:'',
                wx:"",
                tb_id:'',
            },
            list:[
                {
                    name:'上传手持身份证',
                    right_button:true,
                    path:'/upload-idcard'
                }
            ]
        }
    },
    created(){
        util.loading();
         SetupService.get_profile()
         .then(res=>{
             util.closeLoading();
             if(res.code == 1){
                 this.form.true_name = res.data.info_name;
                 this.form.all_location = res.data.province + res.data.city + res.data.county;
                 this.form.location = res.data.location;
                 this.form.qq = res.data.qq;
                 this.form.wx = res.data.wx;
                 this.form.tb_id = res.data.tb_id;
             }

         });
    },
    mounted(){

    },
    methods:{
        change(type){
            this.$router.push('/change-profile/'+type);
        }
    },
    watch: {
     
    },
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#frofile{
    position: relative;
    width: 100%;
    height:100vh;
    overflow-y: auto;
    z-index: 3;
    .change-profile{
        position: absolute;
        right: 1.5rem;
        bottom:0;
        font-size: 0.9rem;
        font-weight: 400;
    }
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
            min-height:3rem;
            line-height:2.4rem;
            background-color: white;
            border-bottom: 0.07rem solid rgb(230,230,230);
            position: relative;    
            .ime-mode{
                ime-mode:active;
            }
            .input-name{
                display: inline-block;
                height:100%;
                width:5rem;
                line-height:3rem;
                font-size: 0.9rem;
                color:rgba(100,100,100,0.8);
            }
            input{
                display: inline-block;
                height:2.8rem;
                min-width: 55%;
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
                top:0.8rem;
                background-color: rgba(100,100,100,0.1);
                border-radius: 100px;
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