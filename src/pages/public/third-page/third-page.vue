<template>
    <div id="third-page">
        <uiTitle  :title="'第三方'" ref="title" :color="'white'"></uiTitle>
        <div  id="third">
            <iframe 
            width="100%"
            height="100%"
            :src='url'
            frameborder='0'
            ></iframe>
        </div>   
    </div>
</template>
<script>
import  uiTitle from '../../../components/title-bar/title-bar';
export default {
    components:{
        uiTitle
    },
    data(){
        return{
            url:'',
        }
    },
    mounted(){
        this.url = this.$route.query.url;
        const iframe = document.getElementById("third");
        const titleHeight = this.$refs.title.$el.offsetHeight;
        const deviceHeight = document.body.clientHeight;
        iframe.style.height = (Number(deviceHeight)-titleHeight)+'px';
    }
}
</script>
<style lang="less" scoped>
#third-page{
    position: absolute;
    z-index: 2;
    .header{
        background-color: white;
        width: 100%;
        min-height: 2.5rem;
        padding-top: 2rem;
    }
}
</style>