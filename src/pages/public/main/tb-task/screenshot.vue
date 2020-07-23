<template>
    <div id="screenshot">
          <uiTitle class="title" ref="title" :isback="true" :title="'评价示例'" :color="'white'">
         </uiTitle>
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true' :data='scroll_data'>
             <main>
                 <img src="http://pic.mystreet100.com/cashApply/20200420/af1f06f05125885d63d446cf666e2c22.png" alt="" @load='getLoad()'>
                  <div class="button"> <button class="el-button"  @click="commit()">确定</button> </div>
             </main>
         </uiScroll>
    </div>
</template>
<script>
import util from '../../../../dora/util.js'
import  uiTitle from '../../../../components/title-bar/title-bar';
import  uiScroll from '../../../../components/scroll-bar/scroll-bar';
export default {
    components:{
        uiTitle,
        uiScroll
    },
    data(){
        return{
             bounce:{
                top:false,
                bottom:false,
                left:false,
                right:false
            },
            scroll_data:true
        }
    },
    mounted(){
        this.$refs.scroll.$el.style.height =  document.getElementById('screenshot').offsetHeight - this.$refs.title.$el.offsetHeight + 'px';
    },
    methods:{
        commit(){
            util.routerBack();
        },
           getLoad(){
            this.scroll_data = !this.scroll_data;
        },
    }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/common.less';
#screenshot{
    z-index: 4;
    position: absolute;
    height: 100vh;
    .wrapper{
        overflow: hidden;
        main{
            width:94%;
            margin:auto;
            padding: 0.8rem 0;
        }
    }
    img{
        width: 100%;
        border-radius: 0.8rem;
        margin-bottom: 0.8rem;
    }
}
</style>