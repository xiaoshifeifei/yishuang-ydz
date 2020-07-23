<!--
 * @Author: your name
 * @Date: 2020-06-28 10:59:46
 * @LastEditTime: 2020-06-30 14:01:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\ele-commerce\tb-commerce.vue
--> 
<template>
    <div id="tb-commerce">
        <header class="header ui-header-color" ref="header">
            <uiTitle class="ui-title"  :isback="false" ref="title" :fontcolor="'white'" :title="'淘宝任务'"  > </uiTitle>
        </header>
        
        <div class="ui-row nav" ref='nav' >
            <router-link tag="div" class="ui-col-3 row-center" 
                v-for="(item,index) in  nav_bar"
                :to="{name:item.path}"
                :key="index"> 
                <span>{{item.title}}</span>
            </router-link>
        </div>        
        <router-view class="tb-view"></router-view>
    </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import  uiTitle from '../../../components/title-bar/title-bar';
export default {
    components:{
        uiTitle,
    },
    data(){
        return {
             nav_bar:[
                {
                    path:'tb-buy',
                    title:'购买',
                }, 
                 {
                    path:'tb-browse',
                    title:'浏览',
                },
                 {
                    path:'tb-appraise',
                    title:'评价',
                },
                 {
                    path:'tb-appointment',
                    title:'预约单',
                }
            ]
        }
    },
    mounted(){
       // alert(document.getElementById("tb-commerce").offsetHeight)
    }    
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
#tb-commerce{
    position: absolute;
    width: 100%;
    z-index: 1;
    .nav{
        width: 94%;
        margin:auto;
        &>div{
            height: 2rem;
            // border-radius: 0  0 0 100%;
            span{
                min-width: 60%;
                height: 1.8rem;
                font-size: 0.9rem;
                line-height: 1.8rem;
                vertical-align: top;
            }
        }
        &>.router-link-active{
           // background-image:linear-gradient(to bottom,#5fafe4,#0c5b91 , );
            span{
                color:white;
                 color: #2d99e0;//RGB(230,174,33);
                 font-weight: 700;
                 font-size: 1rem;
                border-bottom: 0.1rem solid  #2d99e0; // RGB(230,174,33);
                 box-sizing: border-box;
            }
        }
    }
    .tb-view{
        height:calc(100vh - 8rem);
    }
}
</style>