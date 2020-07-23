<template>
    <div  class="ui-title"  >
        <div class="uii-title" ref='title' :style="{backgroundColor:color}" >
             <div class="back-icon" id="navback" @click="back()" v-if="isback && title == ''" :style="{color:fontcolor}">
                <i class="el-icon-arrow-left"></i>
            </div>
            <i class="el-icon-arrow-left back-title" id="navback" @click="back()" :style="{color:fontcolor}" v-if="isback && title != ''"></i>
            <div class="title" :style="{color:fontcolor}">{{title}}</div>
            <slot></slot>
        </div> 
        <!-- <div class="block" ref="block"></div> -->
    </div>
</template>
<script>
import YsConfigJs from '../../dora/ys.config'
import util from '../../dora/util'
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        color:{
            type:String,
            default:'transparent'
        },
        fontcolor:{
            type:String,
            default:'#5c5c5c'
        },
        isback:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        back(){
            //this.$router.go(-1);
            util.routerBack();
        }
    },
    mounted(){ 
       YsConfigJs.fixStatusBar(this.$refs.title);
    //    this.$refs.block.style.height = this.$refs.title.offsetHeight + 'px';
    }
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
.ui-title{
    position: relative;
    width:100%;
    .uii-title { 
        // position: fixed;
        // top:0;
        // left: 0;
        position: relative;
        min-height:3rem;
        width: 100%;
        text-align: center;
        line-height: 3rem;
        font-size: 1.1rem;
        font-weight: 650;
        .title{
             display: inline-block;
        }
    }
    .back-title{
        position: absolute;
        left: 0.5rem;
        bottom:0.2rem;
        width:2rem;
        height: 2rem;
        line-height: 1.5rem;
        font-size: 2rem;
    }
    .back-icon{
        position: absolute;
        left: 1rem;
        top:2rem;
        width:2rem;
        height: 2rem;
        line-height: 1.5rem;
        border-radius: 100px;
        background-color: rgba(250,250,250,0.5);
        font-size: 2rem;
    }
}
</style>