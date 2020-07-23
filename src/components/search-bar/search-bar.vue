<template>
    <div class="ui-search">
        <div class="ui-input">
            <div class="ui-search-icon"></div>
            <input type="text" v-model="Input" :placeholder="placeholder" :readonly="routerNew" />
        </div>
    </div>
</template>
<script>
export default {
    name:'ui-search',
    props:{
        placeholder:{
            type:String,
            default:''
        },
        routerNew:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
             Input:''
        }
    },
    directives:{
        // focus:{
        //     inserted:function(el){
        //         el.focus();
        //         console.log(focus);
        //     }
        // }
    }
}
</script>
<style lang="less" scoped>
.ui-search{
    width:100%;
    min-height: 3rem;
    .ui-input{
        height:2rem;
        line-height: 1.6rem;
        padding:0.2rem 0.5rem;
        border-radius: 1rem;
        background-color: rgb(235,235,235);
        .ui-search-icon{
            display: inline-block;
            width:1.6rem;
            height:1.6rem;
            background-image: url('../../assets/image/search.png');
            background-repeat: no-repeat;
            background-position: center;
        }
        input{
            display: inline-block;
            height:1.6rem;
            width:80%;
            vertical-align:top;
        }
    }
}
</style>