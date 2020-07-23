<template>
    <div class="ui-button">
        <button><span>{{value}}</span></button>
    </div>
</template>
<script>
export default {
    props:{
        value:{
            type:String,
            default:'按钮'
        },
       
    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
.ui-button{
    display: inline-block;
    text-align: center;
    line-height: 2rem;
    width:5rem;
    height:2rem;
    border-radius: 0.6rem;
    background:rgb(249,249,249);
}
</style>