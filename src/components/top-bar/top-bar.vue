<template>
    <div id="ui-top" @click='go_top()'>
        <i class="iconfont icon-fanhuidingbu" ></i>
    </div>
</template>
<script>
export default {
    props:{

    },
    methods:{
        go_top(){
           this.$emit('goTop');
        }
    }
}
</script>
<style lang="less" scoped>
#ui-top{
    position: absolute;
    bottom: 2rem;
    z-index: 10;
    right: 0.8rem;
    height: 2rem;
    width: 2rem;
    border-radius: 100%;
    text-align: center;
    line-height: 2rem;
    i{
        font-size: 1.8rem;
        color:#2d99e0;
    }
    p{
        font-size: 0.7rem;
        width: 4rem;
    }
}
</style>