<template>
    <div class="ui-pop" v-if="type>0">
        <div>
            <div class="alert" v-if="type==1">
        <!-- <div class="title">没有</div> -->
                <div class="txt-content" v-html='content.content'>
                </div>
                <div class="button" @click="close()" v-if="content.times">
                    <button v-if='is_alert_ok' class="ok-button" @click="content.define()" >确定</button>
                     <button v-if='!is_alert_ok' class="unok-button" >{{timer_n}}s</button>
                </div>
                <div class="button" @click="close()" v-else >
                    <button  class="ok-button" @click="content.define()" >确定</button>
                </div>
            </div>
            <div class="comfirm" v-if="type==2">
                <div class="txt-content"  v-html='content.content'></div>
                <div class="button" @click="close()" v-if="content.button">
                    <button class="cancel-button" @click="content.cancel()">{{content.button[1]}}</button>
                    <button class="ok-button"  @click="content.define()">{{content.button[0]}}</button>
                </div>
                 <div class="button" @click="close()" v-else>
                    <button class="cancel-button" @click="content.cancel()">取消</button>
                    <button class="ok-button"  @click="content.define()">确定</button>
                </div>
            </div>
        </div>
    
    </div>
</template>
<script>
export default {
    props:{
        type:{
            type:Number,
            default:0
        },
        content:{
            type:Object,
            default:{
                content:{
                    type:String,
                    default:'密码有误，已连续输错三次，输错六次请联系客服'
                },
                times:{
                     type:Number,
                     default:10
                },
                button:{
                    type:Array,
                    default:['确定','取消']
                },
                define:{
                    type:function(){},
                    default:function(){}
                }
            }
        } 
    },
    data(){
        return{
            is_alert_ok:false,
            timer:null,
            timer_n:this.content.times
        }
    },
    mounted(){
        if(this.content.times){
            this.timer = setInterval(()=>{
                this.timer_n -- ;
            },1000)
            setTimeout(()=>{
                this.is_alert_ok = true;
                clearInterval(this.timer);
            },this.content.times*1000);
        }
    },
    methods:{
        close(){
            this.$emit("close",1);
        },
    },
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
 .ui-pop{
     position: fixed;
     top:0;
     left: 0;
     height: 100vh;
     width:100%;
     background-color: rgba(120,120,120,0.5);
     z-index: 100;
     &>div{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
     }
     .alert,.comfirm{
         position: relative;
        background-color: white;
        border-radius: 1rem;
        overflow: hidden;
        animation: ui-pop 0.3s;    
        div{
            text-align: center;
        }
     }
    @keyframes ui-pop {
        0%{
            transform: scale(0);
        }
        50%{
            transform: scale(1.2);
        }
        100%{
            transform: scale(1) ;
        }
    }
    button{
        display: inline-block;
        width: 49%;
        height:100%;
    }
    .button{
        width: 100%;
        position: absolute;
        bottom:0;
        text-align: center;
        height:calc(100% - 8rem);
    }
    .ok-button{
        color:rgb(40, 145, 236);
    }
    .unok-button{
        color: rgb(230,230,230);
        font-size: 1.2rem;
    }
    .cancel-button{
        color:#707070;
    }
    .txt-content{
       width:80%;
        //  margin:0 1rem;
        //  padding:2rem 1rem 1rem 1rem ;
         font-size: 1.1rem;
         font-weight:700;
         position: absolute;
         top:40%;
         left: 50%;
         transform: translate(-50%,-50%);
         letter-spacing:0.08rem;
        //border-bottom:0.05rem solid #404040;
     }
    .alert{
        width:16rem;
        height:12rem;    
    }
    .comfirm{
        width:16rem;
        height:11rem;    
    }
 }
</style>