<template>
    <div id="change-pwd">
        <uiTitle  :isback="true" :color="'white'" :title="'修改密码'"></uiTitle>
        <el-form ref="form" class="el-form" v-model="form">
            <div class="ui-input-list" v-if="!haveCode">
                <div class="input-name">旧密码</div>
                <input name="pwd" type="password" v-model="form.old_password" placeholder="请输入旧密码"  autocomplete />
            </div>
            <div class="error">{{error.old_password}}</div>
               <div class="ui-input-list">
                <div class="input-name">新密码</div>
                <input name="pwd" type="password" v-model="form.new_password" placeholder="请输入新密码"  autocomplete />
            </div>
             <div class="error">{{error.new_password}}</div>
              <div class="ui-input-list">
                <div class="input-name">新密码</div>
                <input name="pwd" type="password" v-model="form.new_password_confirm" placeholder="再次输入新密码"  autocomplete />
            </div>
             <div class="error">{{error.again_password}}</div>
              <el-button class="el-button" round @click="change()"><span>修改</span></el-button>
        </el-form>
       
    </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  SetupService from './set-up.http'
export default {
    components:{
        uiTitle,
    },
    data(){
        return{
            form:{
                old_password:'',
                new_password:'',
                new_password_confirm:""
            },
            error:{
                old_password:'',
                new_password:'',
                again_password:""

            },
            haveCode:false,
        }
    },
    mounted(){
       if(this.$route.query.code){
           this.haveCode = true;
       }
    },
    methods:{
        change(){
            if(this.haveCode){
                 SetupService.find_pwd({
                    new_password:this.form.new_password_confirm,
                  }).then(res=>{
                        if(res.code == 1){
                           util.alert({
                                content:res.msg,
                                define:()=>{
                                    this.$router.push('/mypages');
                                }
                            })
                        }else {
                            util.alert({
                                content:res.msg,
                                define:()=>{}
                            })
                        }
                    }).catch(error=>{
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                util.routerBack();
                            }
                        })
                    })
            }else{
                  SetupService.change_pwd(
                    this.form
                  ).then(res=>{
                        if(res.code == 1){
                            util.alert({
                                content:res.msg,
                                define:()=>{
                                    this.$router.push('/mypages');
                                }
                            })
                        }else {
                            util.alert({
                                content:res.msg,
                                define:()=>{}
                            })
                        }
                    }).catch(error=>{
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                util.routerBack();
                            }
                        })
                    })
            }
          
        }
    },
    watch: {
     
    },
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#change-pwd{
    position: relative;
    width: 100%;
    height:100vh;
    z-index: 3;
    overflow-y: auto;
    .title{
        text-align: center;
    }
    .el-form{
        border-radius: 2rem;
        padding:1rem 0.5rem;
        width: 100%;
        margin:auto;
        min-height: 10rem;
        .code{
            width:60%;
            display: inline-block;
            input{
                width:50%;
            }
        }
        .error{
            font-size: 0.9rem;
            color:red;
            height:1.5rem;
            padding-left: 1rem;
        }
        .el-button{
            width:95%;
        }
    }

}
</style>