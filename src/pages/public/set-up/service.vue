<!--
 * @Author: your name
 * @Date: 2020-06-04 17:20:06
 * @LastEditTime: 2020-07-02 17:06:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\set-up\service.vue
--> 
<!--
 * @Author: your name
 * @Date: 2020-06-04 13:44:53
 * @LastEditTime: 2020-06-04 15:11:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\myapprentice\blacklist.vue
--> 
<template>
     <div id="service">
           <uiTitle :title="'查看客服'" :color="'white'" :isback="true"></uiTitle>
            <main  v-if="service.type == '微信'">
                <div class="tt">联系客服微信号</div>
                <div class="tmq" >{{hm}}</div>
                <div class="copy_fz">
                    <div class="copy_button copy"  @click="copy_kefu(hm)" :data-clipboard-text='hm'>点击复制</div>
                </div>
                <div class="bb" v-if="service.type == '微信'">(打开微信搜索wx号)</div>
            </main>
            <main  v-if="service.type == 'QQ'">
                <div class="tt">联系客服QQ号</div>
                <div class="tmq" >{{hm}}</div>
                <div class="copy_fz">
                    <div class="copy_button copy"  @click="copy_kefu(hm)" :data-clipboard-text='hm'>点击复制</div>
                </div>
                <div class="bb" v-if="service.type == 'QQ'">(打开QQ搜索qq号)</div>
            </main>
     </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  SetupService from './set-up.http'
export default {
    components:{
        uiTitle
    },
    data(){
        return{
            service:'',
            hm: ''
        }
    },
    created(){
        util.loading();
        SetupService.get_service()
        .then(res=>{
            if(res.code == 1){
                util.closeLoading();
                this.service = res.data.zskf;
                this.hm = res.data.zskf.wx;
            }else{
                util.alert({
                    content:res.msg,
                    define:()=>{ 
                        util.routerBack();
                    }
                })
            }
        })
    },
    mounted(){
         window.apiready = function() {}
    },
    methods:{
        copy_kefu(code){
            YsConfig.copy_text(code)
            .then(res =>{
                util.toast({
                    content:res,
                    times:1000
                });
            });
        }
    },
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#service{
    z-index: 5;
    main{
        width:94%;
        margin:auto;
        div{
            width: 100%;
            text-align: center;
        }
        .tt{
            height: 12rem;
            line-height: 12rem;
            font-size: 2.25rem;
            font-weight: 800;
        }
        .tmq{
            height: 2rem;
            line-height: 1rem;
            font-size: 2rem;
        }
        .copy_fz{
            margin-top: 1rem;
            height: 2rem;
            .copy_button{
                width: 5rem;
                height: 2rem;
                line-height: 2rem;
                color: azure;
                background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
                margin: 0 auto;
                border-radius: 0.5rem;
            }
        }
        .bb{
            margin-top: 0.8rem;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.75rem;
            color: #ccc;
        }
    }
}
</style>