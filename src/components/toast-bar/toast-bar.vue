<template>
    <div id="ui-toast">
        <div>
            <div class="toast-content">
                {{content.content}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        content:{
            type:Object,
            default:{
                content:{
                    type:String,
                    default:'空'
                } 
            }
        }
    }
}
</script>
<style lang="less" scoped>
#ui-toast{
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 100;
    &>div{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
}
.toast-content{
    min-width:5rem;
    max-width: 10rem;
    min-height: 3rem;
    padding:0.5rem 1rem;
    background-color: rgba(100,100,100,0.9);
    color:white;
    text-align: center;
    line-height: 2rem;
    border-radius: 0.3rem;
    animation: ui-toast 0.3s;
  
}
@keyframes ui-toast{
    0%{
        transform: scale(0);
    }
    100%{
        transform: scale(1) ;
    }
}
</style>