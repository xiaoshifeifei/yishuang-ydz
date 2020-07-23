<!--
 * @Author: your name
 * @Date: 2020-06-02 14:16:38
 * @LastEditTime: 2020-06-02 15:28:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\components\absolutely-empty\absolutely-empty.vue
--> 
<template>
        <div class="absolutely">
            <img src="../../assets/image/konghezi.png" alt="">
            <p>~空空如也~</p>
        </div>
</template>
<script>
export default {
    mounted(){
        
    },
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
.absolutely{
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    img{
        width: 8rem;
        height:  8rem;
    }
    p{
        color: #bfbfbf;
    }
}
</style>