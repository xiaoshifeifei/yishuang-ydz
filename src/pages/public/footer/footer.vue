<!--
 * @Author: your name
 * @Date: 2020-06-29 13:55:22
 * @LastEditTime: 2020-06-29 16:50:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\footer\footer.vue
--> 
<template>
    <div id="ui-app">
         <keep-alive v-if='$route.meta.keepAlive'>
            <router-view  class="view" ref="view" />
        </keep-alive>
        <router-view v-if='!$route.meta.keepAlive' class="view" ref="view" />
        <footer class="footer ui-row" id="footer" ref="footer">
            <router-link tag="div" class="ui-col-3 row-center" 
                v-for="(item,index) in  nav_bar"
                :to="{name:item.path}"
                :key="index"> 
                <i class="iconfont" :class="item.icon"></i>
                <p>{{item.title}}</p>
            </router-link>
        </footer>
    </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import Api from '../../../dora/api.js'
export default {
    data(){
        return {
            nav_bar:[
                {
                    path:'main',
                    title:'任务大厅',
                    icon:'icon-renwu',
                }, 
                {
                    icon:'icon-taobao',
                    title:'淘宝任务',
                    path:'tb-commerce'
                },
                 {
                    icon:'icon-jingdong-2',
                    title:'京东任务',
                    path:'jd-commerce'
                },
                 {
                    path:'mypages',
                    title:'个人中心',
                    icon:'icon-shenfen',
                }
            ],
        }
    },
    mounted(){  
         
        // this.$refs.view.$el.style.height =  document.getElementById('ui-app').offsetHeight - this.$refs.footer.offsetHeight + 'px';
        // alert(this.$refs.view.$el.offsetHeight+','+document.getElementById('ui-app').offsetHeight+','+this.$refs.footer.offsetHeight);
    }
}
</script>
<style  scoped lang="less">
 @import "../../assets/less/common.less";
#ui-app {
    .view{
        //height:601px;
        // height: 100%;
        // padding-bottom: 3rem;
        overflow: hidden;
        height:calc(100% - 3rem);
    }
     .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 3rem;
        background-color: white;
        border-bottom: none;
        z-index: 1;
        &>div{
            height: 100%;
            padding:0.1rem 0.1rem;
            i{
                color: rgb(100,100,100);
                font-size: 1.5rem;
            }
            p{
                color: rgb(100,100,100);
                font-size: 0.7rem;
            }
            &.router-link-active{
                 i,p{
                     color:rgb(41, 122, 197);
                 }
            }
        }
    }
}
</style>
