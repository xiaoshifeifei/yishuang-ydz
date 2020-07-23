<template>
    <div id="appraise-order">
          <uiTitle class="title" ref="title" :isback="false" :title="'评价任务'" :color="'white'">
         </uiTitle>
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true' :data='scroll_data'>
             <main class='main'>
                 <div class="note">
                    <div class="title">
                        <i class="el-icon-warning"></i>商品详情
                    </div>
                    <uiMosaic class="mosaic" v-if="good.goods_buy_image !=''" :image="good.goods_buy_image" @load='getLoad()'></uiMosaic>
                    <uiMosaic class="mosaic" v-else :image="good.goods_image" @load='getLoad()'></uiMosaic>
                   <div class="good-name">
                       {{good.goods_name}}
                    </div>
                    <div class="item" >
                         <div class="left">
                            店铺名
                        </div>
                        <div class="right">
                            <input type="text" style="color:#ffc125" readonly :value="good.store_name"/>
                        </div>
                    </div>
                    <div class="item">
                         <div class="left">
                            任务编号
                        </div>
                        <div class="right">
                           {{good.order_number}}
                        </div>
                    </div>
                     <div class="item">
                         <div class="left">
                            订单编号
                        </div>
                        <div class="right">
                            <input type="text" style="color:#8c8c8c" readonly :value="good.order_number"/>
                            <button class="copy" @click="copy_content(good.order_number)" :data-clipboard-text='good.order_number'>复制</button>
                        </div>
                    </div>
                </div>
                <div class="note">
                    <div class="title">
                        <i class="el-icon-warning"></i>评价内容
                    </div>
                   <div class="item">
                         <div class="left">
                            评价类型
                        </div>
                        <div class="right" v-if="good.review_type == 1">
                           自由发挥
                        </div>
                        <div class="right" v-if="good.review_type == 2">
                           文字评价
                        </div>
                         <div class="right" v-if="good.review_type == 3">
                           图文评价
                        </div>
                    </div>
                     <div class="item">
                         <div class="left">
                            评价图片:
                        </div>
                    </div>
                    <img v-for='(item,index) in good.review_pic' :key="index" :src="item" alt="" @load='getLoad()'>
                    <div class="item">
                         <div class="left">
                            评价内容:
                        </div>
                    </div>
                    <div class="appraise-content">
                       <textarea name="" id="" readonly :value="good.review_content" ></textarea>
                    </div>
                    <div class="button"> <button class="el-button copy"  @click="copy_content(good.review_content)" :data-clipboard-text='good.review_content'>复制评价内容</button> </div>
                     <div class="tips">
                        注意事项：<br>
                        1.请复制提供内容进行评价，五星好评<br>
                        2.认真评价，通过审核的概率更大，更快拿到佣金哦。<br>
                        3.未按要求操作，恶意评价等等，会被关小黑屋。
                    </div>
                </div>
                 <div class="note">
                    <div class="title">
                        <i class="el-icon-warning"></i>新手不懂如何完成任务？
                    </div>
                     <div class="item">
                         <div class="left">
                            <router-link to='/screenshot'> 点击这里查看截图示例</router-link>
                        </div>
                    </div>
                 </div>
                 <div class="note">
                    <div class="title">
                        <i class="el-icon-warning"></i>上传评价截图
                    </div>
                     <div  class="item"  v-if='appraise_img==""'>
                        <p>已收到货？上传评价截图</p>
                    </div>
                     <div class="item screenshot" v-if='appraise_img!=""'>
                        <img class="image" :src="appraise_img" @load='getLoad()' alt="">
                        <i class="el-icon-close el-icon"   @click="empty()"></i>
                    </div>
                     <input type="file" id='upload-input' style="display:none" @change='fileChange()' >
                     <div class="button"> <button class="el-button"  @click="upload_img()">上传评价截图</button> </div>
                 </div>
                 <div class="next ui-row" >
                     <div class="ui-col-12" >
                        <button class="accept"  @click="nextStep()">提交任务</button>
                    </div>
                </div>
             </main>
         </uiScroll>
    </div>
</template>
<script>
import  YsConfigJs from '../../../../dora/ys.config'
import util from '../../../../dora/util.js'
import  uiTitle from '../../../../components/title-bar/title-bar';
import  uiScroll from '../../../../components/scroll-bar/scroll-bar';
import  uiMosaic from '../../../../components/absolutely-empty/mosaic';
import  MainService from './../main.http'
export default {
    components:{
        uiTitle,
        uiScroll,
        uiMosaic
    },
    data(){
        return{
            order_id:'',
             bounce:{
                top:false,
                bottom:false,
                left:false,
                right:false
            },
            scroll_data:true,
            good:'',
            appraise_img:'',
            wangwang:'',
            order_number:'',
            order_price:''
        }
    },
    created(){
        util.loading();
        this.order_id = this.$route.params.id;
        MainService.get_jdappraiseOrder({
            order_id:this.order_id
        }).then(res=>{
            if(res.code == 1){
                this.good = res.data.order;
            }
            util.closeLoading();
        })      
    },
    mounted(){
        this.$refs.scroll.$el.style.height =  document.getElementById('appraise-order').offsetHeight - this.$refs.title.$el.offsetHeight + 'px';
         window.apiready = function(){
        }
    },
    methods:{
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
        copy_content(code){
            YsConfigJs.copy_text(code)
            .then(res =>{
                util.toast({
                    content:res,
                    times:1000
                });
            });
        },
         upload_img(){
            if(YsConfigJs.isApp()){
                YsConfigJs.upload_image(api)
                .then(res=>{
                    this.appraise_img = res;
                });
            } else {
                document.getElementById('upload-input').click();
            }   
        },
        fileChange(){
            const files = document.getElementById('upload-input').files[0];
            YsConfigJs.web_upload(files)
            .then (res=>{
                this.appraise_img = res;
            });
        },
        empty(type){
            this.appraise_img = '';
            document.getElementById('upload-input').value = null;
           
        },
        nextStep(){
             util.toast({
                 content:'正在提交,请稍后...'
             });
            MainService.jdappraise_commit({
                order_id:this.order_id,
                image:this.appraise_img,
                port:1
            }).then(res=>{
                 util.closeToast();
                if(res.code == 1){
                    util.toast({
                        content:res.msg,
                        times:1000
                    });
                    this.$router.push('/main');
                }else if(res.code == 404){
                    util.toast({
                        content:res.msg,
                        times:1000
                    });
                    this.$router.push('/main');
                }else{
                    util.alert({
                        content:res.msg,
                        define:()=>{}
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../assets/css/reset.css';
@import '../../../assets/less/common.less';
#appraise-order{
    z-index: 3;
    position: absolute;
    height: 100vh;
    .mosaic{
        margin:0.5rem auto;
        display: block;
        width: 95%;
        border-radius: 0.5rem;
    }
    .wrapper{
        overflow: hidden;
    }
    .main{
        padding: 0.8rem 0;
         .title{
            padding:0.5rem;
            font-size: 1rem;
            i{
                color:#ffc125;
                margin-right: 0.5rem;
            }
        }
        .good-name{
            padding:0.5rem;
            font-size: 0.9rem;
        }
        .appraise-content{
           textarea{
               border:0.05rem solid rgb(230,230,230);
                width: 95%;
                display: block;
                margin:auto;
                border-radius: 0.5rem;
                padding:0.3rem 0.5rem;
                min-height: 4rem;
                font-size: 0.85rem;
                line-height: 1.2rem;
                resize:none;
           }
        }
         .note{
            background-color: white;
            border-radius: 0.5rem;
            width: 96%;
            margin: 0 auto 0.8rem auto;
            padding-bottom: 0.8rem;
            a{
                text-decoration: underline;
                color:#ffc125;
                margin-left:1.8rem;
            }
             img{
                 margin:0.5rem auto;
                display: block;
                width: 95%;
                border-radius: 0.5rem;
            }
            .screenshot{
                position: relative;
                i{
                    position: absolute;
                    right:0.5rem;
                    top:0.5rem;
                    font-size: 2rem;
                }
            }
           .item{
               font-size: 0.9rem;
               color:#9c9c9c;
               min-height: 1.6rem;
               line-height: 1.6rem;
               padding:0 0.3rem;
                p{
                    margin-left: 1rem;
                }
               &>div{
                   display: inline-block;
                   font-size: 0.85rem;
                   color:#8c8c8c;
               }
               .right{
                   float: right;
                   input{
                       text-align: right;
                   }
               }
           }
            .button{
                margin:0.8rem auto ;
                width:95%;
            }
        }
         .next{
            font-size: 0;
           // padding-bottom: 0.8rem;
            &>div{
                height: 3rem;
                font-size: 0.9rem;
                text-align: center;
                button{
                    border-radius: 0.5rem;
                    width:80%;
                    text-align: center;
                    padding:1rem 0;
                    color:white;
                }
                .accept{
                     background-color: rgba(44, 201, 23,0.8);
                }
            }
        }
    }
}
</style>