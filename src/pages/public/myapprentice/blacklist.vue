<!--
 * @Author: your name
 * @Date: 2020-06-04 13:44:53
 * @LastEditTime: 2020-06-15 16:45:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\myapprentice\blacklist.vue
--> 
<template>
     <div id="blacklist">
           <uiTitle :title="'拉黑原因'" :color="'white'" :isback="true"></uiTitle>
            <main>
                <div class="tips">请在下方白色区域填写你拉黑他的原因：</div>
                <textarea name="blocking_reason" id="blocking_reason" autofocus="autofocus"></textarea>
                 <el-button class="el-button"  @click="send_blacklist()"><span>提交</span></el-button>
            </main>
           
     </div>
</template>
<script>
import  ApprenticeService from './myapprentice.http'
import  uiTitle from '../../../components/title-bar/title-bar';
import util from '../../../dora/util'
export default {
    components:{
        uiTitle
    },
    data(){
        return{
            mobile: ''
        }
    },
    created(){
        this.mobile = this.$route.params.mobile;
    },
    mounted(){
        
    },
    methods:{
        send_blacklist(){
            let content = document.getElementById('blocking_reason').value;
            if(content == ''){
               util.alert({
                    content:'拉黑理由不能为空',
                    define:()=>{}
                })       
            }else{
                ApprenticeService.go_blacklist({
                    content:content,
                    mobile: this.mobile,
                }).then(res=>{
                    if(res.code == 1){
                        util.toast({
                            content:res.msg,
                            times:1000
                        });
                        util.routerBack();
                    }else {
                        util.alert({
                            content:res.msg,
                            define:()=>{}
                        })
                    }
                })
            }
            
        }
    },
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#blacklist{
    z-index: 3;
    background-color: #eee;
    main{
        width:94%;
        margin:auto;
        #blocking_reason{
            width: 100%;
            box-sizing: border-box;
            padding: 0.25rem 1rem;
            height: 8rem;
            font-size: 0.75rem;
            border-radius: 1rem;
            background-color: #fff;
        }
         .el-button{
            width:100%;
        }
    }
   
}
</style>