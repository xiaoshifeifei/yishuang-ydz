<template>
    <div id="ui-loading">
        <div class="back" ref='back' >
            <i class="el-icon-arrow-left back-icon" v-if="loadback" id="navback" @click="back()"></i>
        </div>
        <div class="loading">
            <img src="../../assets/image/money.png" alt="">
            <p>正在努力加载中...</p>
        </div>
    </div>
</template>
<script>
import YsConfigJs from '../../dora/ys.config'
import util from '../../dora/util'
export default {
    props:{
        loadback:{
            type:Boolean,
            default:true
        }
    },
    mounted(){
       YsConfigJs.fixStatusBar(this.$refs.back);
      // console.log(this.$refs.back.$el.offsetHeight);
    },
    methods:{
        back(){
            util.routerBack();
        } 
    }
}
</script>
<style lang="less" scoped>
#ui-loading{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    background-color: white;
}
.loading{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
        width: 7rem;
        height:  5rem;
        transform: translateY(15px);
        animation: ui-loading 2s infinite;
    }
    p{
        margin-top: 0.8rem;
    }
    @keyframes ui-loading {
        0% {
            transform: translateY(15px);
        }
        50% {
            transform: translateY(-15px);
        }
    }
}
.back{
    position: relative;
    min-height:3rem;
    width: 100%;
    box-sizing: content-box;
     .back-icon{
        position: absolute;
        left: 0.5rem;
        bottom:0.2rem;
        width:2rem;
        height: 2rem;
        line-height: 1.5rem;
        font-size: 2rem;
    }
}
</style>