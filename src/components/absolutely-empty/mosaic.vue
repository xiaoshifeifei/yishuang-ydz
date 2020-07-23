<!--
 * @Author: your name
 * @Date: 2020-06-18 17:18:45
 * @LastEditTime: 2020-06-19 15:13:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\components\absolutely-empty\mosaic.vue
--> 
<!--
 * @Author: your name
 * @Date: 2020-06-02 14:16:38
 * @LastEditTime: 2020-06-02 15:28:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\components\absolutely-empty\absolutely-empty.vue
--> 
<template>
    <div id="mosaic">
        <img :src="image" alt="">
        <img class="shade" src="../../assets/image/mosaic.png" alt="">
    </div>
</template>
<script>
export default {
      props:{
        image:{
          type:String,
          default: ''
        },
      },
      data(){
        return{
          
        }
      },
    mounted(){
        
    },
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
#mosaic{
    position: relative;
    img{
        display: block;
        width: 100%;
    }
    .shade{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
}
</style>