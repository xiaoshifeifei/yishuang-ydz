<!--
 * @Author: your name
 * @Date: 2020-05-12 16:17:18
 * @LastEditTime: 2020-05-12 17:11:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\components\list-bar\list-bar.vue
 -->
<template>
    <div class="ui-list">
       <ul>
           <li v-for="(item,index) in list" :key="index" @click="go(item.path)">
                <i class="iconfont" v-if="icon&&item.icon" :class="item.icon" :style="{backgroundColor:item.color}" ></i>
                <span>{{item.name}}</span>
                <i class="el-icon-arrow-right go-icon" v-if="item.right_button"></i>
           </li>
       </ul>
    </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            default:[ 
                {
                    icon:'icon-anquan',
                    name:'账户安全',
                    right_button:true
                }
            ]
        },
        icon:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
       
    },
    methods:{
        go(path){
            this.$router.push(path);
        }
    }
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
.ui-list{
    position: relative;
    li{
        height:3.5rem;
        line-height:3.5rem;
        position: relative;
        display: block;
        border-bottom: 0.05rem solid rgb(200,200,200);
        .iconfont,span,.go-icon{
            vertical-align: top;
        }
        span{
             margin-left: 0.5rem;
        }
        .iconfont{
            padding:0.12rem;
            border-radius: 100px;
            color:white;
            font-weight: 500;
            font-size: 1.2rem;
            overflow: hidden;
        }
    }
    li:last-child{
        border-bottom: none;
    }
    .go-icon{
        position: absolute;
        right: 0.8rem;
        top:1.4rem;
        width:0.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 1.5rem;
    }
}
</style>