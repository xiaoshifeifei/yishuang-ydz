<!--
    换绑旺旺号
 -->
<template>
    <div id="bind_wangwang">
         <uiTitle class="title" ref="title" :isback="true" :title="title_name" :color="'white'"></uiTitle> 
          <uiScroll class="wrapper" ref="scroll"  :data="scroll_data">
              <main>
                   <el-form ref="form" class="el-form" v-if='bind_id == 0' v-model="form">
                        <div class="ui-card-list">
                            <div class="input-name">旺旺号</div>
                        <input name="input" type="text" v-model="form.wangwang" placeholder="请输入新旺旺号" />
                        </div>
                        <div class="ui-card-list">
                            <div class="input-name">历史订单号</div>
                            <input name="input" type="text" v-model="form.tb_id" placeholder="请输入历史订单号" />
                        </div>
                </el-form>
                <el-form ref="form" class="el-form" v-if='bind_id == 1' v-model="jingdong">
                        <div class="ui-card-list">
                            <div class="input-name">京东号</div>
                        <input name="input" type="text" v-model="jingdong.wangwang" placeholder="请输入新京东号" />
                        </div>
                </el-form>
                <el-button class="el-button"  @click="bind()"><span>绑定</span></el-button>  
                <div class="note" v-if='bind_id == 1'>
                        <div class="title">
                            <i class="el-icon-question"></i>截图示例
                        </div>
                        &ensp;第一步
                        <img src="../../../assets/image/bind3.png" alt="" @load='getLoad()'>
                        &ensp;第二步
                        <img src="../../../assets/image/bind2.png" alt="" @load='getLoad()'>
                        &ensp;第三步
                        <img src="../../../assets/image/bind1.png" alt="" @load='getLoad()'>
                        
                    </div> 
                <div class="tips" v-if='bind_id == 0'>
                    温馨提示：
                    换绑旺旺号需要输入新旺旺号的任一历史订单号进行确认验证。
                </div>
              </main>
         </uiScroll> 
    </div>
</template>
<script>
import  YsConfig from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import  MypagesService from './mypages.http'
export default {
    components:{
        uiTitle,
        uiScroll
    },
    data(){
        return{
            bind_id:'',
            title_name:'',
            form:{
                wangwang:'',
                tb_id:''
            },
            jingdong:{
                wangwang:''
            },
            scroll_data:true
        }
    },
    mounted(){
        this.bind_id = this.$route.params.id;
        if(this.bind_id == 0){
            this.title_name = '换绑旺旺号';
        }else{
             this.title_name = '换绑京东号';
        }
         this.$refs.scroll.$el.style.height = document.getElementById("bind_wangwang").offsetHeight - this.$refs.title.$el.offsetHeight+'px';
    },
    methods:{
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
         bind(){
             if(this.bind_id == 0){
                MypagesService.bind_wang(
                    this.form
                ).then(res=>{
                    if(res.code == 1){
                        util.alert({
                            content:res.msg,
                            define:()=>{
                            util.routerBack();
                            }
                        });   
                    }else{
                        util.alert({
                            content:res.msg,
                            define:()=>{ }
                        }); 
                    }
                })
             }else{
                 MypagesService.bind_jdwang(
                    this.jingdong
                ).then(res=>{
                    if(res.code == 1){
                        util.alert({
                            content:res.msg,
                            define:()=>{
                            util.routerBack();
                            }
                        });   
                    }else{
                         util.alert({
                            content:res.msg,
                            define:()=>{ }
                        }); 
                    }
                }) 
             }
             
         }
    }
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
#bind_wangwang{
    z-index: 1;
    height: 100%;
    .wrapper{
        overflow: hidden;
        main{
            padding-top:0.8rem;
        }
    }
    .el-form{
         position: relative;
        width:100%;
        margin:auto;
        padding:0.2rem 0.7rem ;
        background-color: white;
        .ui-card-list:last-of-type{
            border-bottom:none
        }
         .ui-card-list{
              min-height:4rem;
            line-height:3.4rem;
            background-color: white;
            border-bottom: 0.07rem solid rgb(230,230,230);
            position: relative;  
            .input-name{
                margin-right: 0.5rem;
                display: inline-block;
                height:100%;
                line-height:4rem;
                font-size: 0.9rem;
                color:rgba(100,100,100,0.8);
            } 
            input{
                width: 60%;
            }
         }
    }
     .note{
        background-color: white;
        border-radius: 0.5rem;
        width: 96%;
        margin: 0.8rem auto 0.8rem auto;
        padding-bottom: 0.8rem;
         .title{
            padding:0.5rem;
            font-size: 1rem;
            i{
                color:#ffc125;
                margin-right: 0.5rem;
            }
        }
        img{
            width:95%;
            display: block;
            margin:auto;
            border-radius: 1rem;
            margin:0.8rem 0 2rem 0;
        }
     }
    .commit-button{
        width: 94%;
        margin:0.8rem  0 0 3%;
        border:none;
        background-color: #FFC125;
        span{
            color: white;
        }
    }
    .tips{
         margin-top: 0.8rem;
        width: 100%;
        padding:0 3%;
        font-size: 0.8rem;
        color:rgb(170,170,170);
        background-color: #f5f5f5;
    }
}
</style>