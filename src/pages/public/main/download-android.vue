<!--
 * @Author: your name
 * @Date: 2020-06-28 17:27:03
 * @LastEditTime: 2020-06-28 17:51:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\main\download-android.vue
--> 
<template>
     <div id="service">
           <uiTitle :title="'下载app'" :color="'white'" :isback="true"></uiTitle>
            <main>
                <div class="title">app抢单更快速</div>
                <p class="ui-red" style="text-align:center">请用浏览器扫码下载</p>
                <div class="qr-code">
                    <img src="../../../assets/image/qr.png" alt="">
                </div>
                <div class="button">
                    <div class="download-button"  @click="download_android()">立即体验</div>
                </div>
            </main>
     </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
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
        
    },
    mounted(){
        
    },
    methods:{
        download_android(){
            window.location.href = "http://static.pycac.com/ydz-app.apk";
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
        .title{
            height: 6rem;
            line-height: 6rem;
            font-size: 2.25rem;
            font-weight: 800;
        }
        .qr-code{
            img{
                width: 60vw;
                margin: 0 auto;
            }
        }
        .button{
            margin-top: 1rem;
            height: 2rem;
            .download-button{
                width: 5rem;
                height: 2rem;
                line-height: 2rem;
                color: azure;
                background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
                margin: 0 auto;
                border-radius: 0.5rem;
            }
        }
    }
}
</style>