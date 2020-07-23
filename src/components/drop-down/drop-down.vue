<!--
 * @Author: your name
 * @Date: 2020-07-01 10:43:28
 * @LastEditTime: 2020-07-02 09:43:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\components\drop-down\drop-down.vue
--> 
<template>
    <div class="ui-drop">
        <ul>
            <li class="all-first" @click="unfold()">
                <span>{{title_name}}</span>
                <i class="el-icon-arrow-down go-icon" v-show="!unfold_state"></i>
                <i class="el-icon-arrow-up go-icon" v-show="unfold_state"></i>
            </li>
            <transition name="effect">
                <ul class="remaining" ref="remaining" v-show="unfold_state">
                    <li v-for="(item,index) in list" :key="index" @click="substitute(item)">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </transition>
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
                    name:'账户安全',
                }
            ]
        },
    },
    data(){
        return{
            title_name: '全部',
            unfold_state:false,
            show_height: '',
        }
    },
    mounted(){
        this.show_height = this.list.length * 2.5 + 'rem';
        this.$refs.remaining.style.height = this.show_height;
    },
    methods:{
        unfold(){
            this.unfold_state = !this.unfold_state;
            
        },
        substitute(item){
            this.title_name = item.name;
            this.unfold();
        }
    }
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
.ui-drop{
    z-index: 9;
    position: relative;
    .all-first{
        border-bottom: 0.05rem solid rgb(200,200,200);
        text-align: left;
        span{
             margin-left: 0.5rem;
        }
    }
    .remaining{
        overflow: hidden;
        background-color: rgb(233, 233, 233);
        position: absolute;
        left: 0;
        top: 2.5rem;
        width: 100%;
        li{
            border-bottom: 0.05rem solid rgb(200,200,200);
        }
    }
    li{
        height:2.5rem;
        line-height:2.5rem;
        position: relative;
        display: block;
        text-align: center;
        span,.go-icon{
            vertical-align: top;
        }
    }
    li:last-child{
        border-bottom: none;
    }
    .go-icon{
        position: absolute;
        right: 0.8rem;
        top:1rem;
        width:0.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 1.5rem;
    }
    .effect-enter{
        height: 0 !important;
        // transform:scale(0,0);
    }
    .effect-enter-active{
        // height: 100vh;
        transition:all 0.2s linear;
    }
    .effect-leave-active{
        // height: 100vh;
        transition:all 0.2s linear;
    }
    .effect-leave-to{
        height: 0 !important;
        // transform:scale(0,0);
    }
}
</style>