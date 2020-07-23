<!--
 * @Author: your name
 * @Date: 2020-06-02 13:47:43
 * @LastEditTime: 2020-07-02 09:46:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\ele-commerce\jd-commerce.vue
--> 
<template>
    <div id="jd-commerce">
          <header class="header ui-header-color" ref="header">
            <uiTitle class="ui-title"  :isback="false" ref="title" :fontcolor="'white'" :title="'京东任务'"  > </uiTitle>
        </header>
        <div class="ui-row nav" ref='nav' >
            <router-link tag="div" class="ui-col-3 row-center" 
                v-for="(item,index) in  nav_bar"
                :to="{name:item.path}"
                :key="index"> 
                <span>{{item.title}}</span>
            </router-link>
        </div>        
        <router-view class="jd-view"></router-view>
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
                    path:'jd-buy',
                    title:'垫付',
                }, 
                 {
                    path:'jd-appraise',
                    title:'评价',
                },
                 {
                    path:'jd-browse',
                    title:'浏览',
                },
                 {
                    path:'jd-appointment',
                    title:'京挑客',
                }
            ]
        }
    },
    mounted(){
    }    
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
#jd-commerce{
    width:100%;
    position: absolute;
    z-index: 1;
    .nav{
        width: 94%;
        margin:auto;
        &>div{
            height: 2rem;
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
    .jd-view{
        height:calc(100vh - 8rem);
    }
}
</style>