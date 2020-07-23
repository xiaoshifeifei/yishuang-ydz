<template>
    <div id="set-up">
        <uiTitle  :isback="true" :title="'设置'" :color="'white'" ></uiTitle>
        <main>
            <div class="list-form">
                 <uiList class="ui-list" :list="list[0]" ></uiList>
            </div>
             <!-- <div class="list-form">
                 <uiList class="ui-list" :list="list[1]" ></uiList>
            </div> -->
            <div class="quit">
                 <el-button class="el-button" @click="quit()" ><span>退出账号</span></el-button>
            </div>
        </main>
   
    </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import uiList from '../../../components/list-bar/list-bar'
import  uiTitle from '../../../components/title-bar/title-bar';
import util from '../../../dora/util.js'
import  SetupService from './set-up.http'
export default {
    components:{
        uiTitle,
        uiList
    },
    data(){
        return{
            list:[
                [{
                    name:'个人资料',
                    right_button:true,
                    color:'#E0B233',
                    path:'/frofile'
                },
                {
                    name:'修改密码',
                    right_button:true,
                    color:'#E0B233',
                    path:'/change-pwd'
                }],
                // [{
                //     name:'客服',
                //     right_button:true,
                //     color:'#63C5EA',
                //     path:'/service'
                // },
                //  {
                //     name:'关于我们',
                //     right_button:true,
                //     color:'rgb(52, 149, 235)'
                // },
               
                //],
            ],
        }
    },
    mounted(){
        //  YsConfigJs.fixStatusBar(document.getElementById("set-up"));
    },
    methods:{
        quit(){
            util.comfirm({
                content:'确定退出账号？',
                define:()=>{
                     SetupService.logout()
                     .then(res=>{
                         this.$store.dispatch("setIsLogin",false);
                         YsConfigJs.removeCache('user');
                        YsConfigJs.removeCache('token');
                        YsConfigJs.removeCache('isapp');
                        YsConfigJs.removeCache('servicer');
                        util.toast({
                            content:'退出成功',
                            times:1000
                        });
                        setTimeout(()=>{
                            this.$router.push('/mypages');   
                        },1000);
                    })
                    .catch(error =>{
                         util.toast({
                            content:'网络异常',
                            times:1000
                        });
                    })
                },cancel:()=>{
                    setTimeout(()=>{
                            this.$router.push('/mypages');   
                    },100);
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#set-up{
    z-index: 2;
    position: absolute;
    main{
        width:100%;
        .list-form{
            background-color: white;
            padding:0 0.5rem;
            margin-top:0.8rem;
            .ui-list{
                background-color: white;
            }
        }
       .exchange{
            width: 90%;
            margin:0.8rem  auto 0 auto;
        }
    }
}
</style>