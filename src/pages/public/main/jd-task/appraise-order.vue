<template>
    <div id="appraise-order">
          <uiTitle class="title" ref="title" :isback="false" :title="'评价任务'" :color="'white'">
         </uiTitle>
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true' :uiPull="true" @uiPullData="uiPullData" :data='scroll_data'>
             <main class='main'>
                 <div class="note">
                    <div class="title">
                        <i class="el-icon-warning"></i>商品详情
                    </div>
                    <uiMosaic class="mosaic"  :image="good.goods_image" @load='getLoad()'></uiMosaic>
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
                            <input type="text" style="color:#8c8c8c" readonly :value="good.buyer_order_number"/>
                             <button class="copy" @click="copy_content(good.buyer_order_number)" :data-clipboard-text='good.buyer_order_number'>复制</button>
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
                        <div class="right">
                           {{good.reviewTypetext}}
                        </div>
                    </div>
                    <div class="item">
                         <div class="left">
                            评价内容:
                        </div>
                    </div>
                     <div class="video-download" >
                        <div   id="video-download">

                        </div>
                    </div>
                     <div class="button" v-if='isApp&&good.review_type==4' > <button class="el-button copy" @click="video_download(good.review_video)">App下载视频</button> </div>
                    <div class="pic" v-if='good.review_type==3||good.review_type==4'>
                        <img v-for='(item,index) in good.review_pic' :key="index" :src="item" @load='getLoad()' @click="click_img(item)" >
                    </div>
                    <div class="appraise-content">
                       <textarea name="" id="" readonly :value="good.review_content" ></textarea>
                    </div>
                    <el-button v-if='good.review_type!=1' class="el-button copy"  @click="copy_content(good.review_content)" :data-clipboard-text='good.review_content'><span>复制评价内容</span></el-button>
                    <div class="tips" v-if="good.review_type==2">
                        注意事项：<br>
                        1.请复制提供内容进行评价，五星好评<br>
                    </div>
                     <div class="tips" v-else-if="good.review_type==3">
                        注意事项：<br>
                        1.请复制提供内容进行评价，五星好评<br>
                        <span>2.app端点击保存图片，浏览器登录长按保存。</span>
                    </div>
                     <div class="tips" v-else-if="good.review_type==4">
                        注意事项：<br>
                        1.请复制提供内容进行评价，五星好评<br>
                        <span>2.视频评价，app端点击App下载视频，浏览器请用手机自带浏览器下载。</span>
                    </div>
                    <div class="red-tips" v-else-if="good.review_type==1">
                        注意事项：<br>
                        1.内容自由发挥，不少于15字，五星好评<br>
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
            isApp:YsConfigJs.getCache('isapp'),
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
                util.closeLoading();
                this.good = res.data.order;
                if(this.good.review_type == 4){
                    new Player({
                        id: "video-download",
                        url:this.good.review_video,
                        playsinline: true,
                        whitelist: [""],
                        download: true,
                        keyShortcut: "on"
                    })
                }
            }else{
                util.alert({
                    content:res.msg,
                    define:()=>{
                        this.$router.push('/main');
                    }
                }) 
            }
            
        })      
    },
    mounted(){
        this.$refs.scroll.$el.style.height =  document.getElementById('appraise-order').offsetHeight - this.$refs.title.$el.offsetHeight + 'px';
        window.apiready = function() {}
    },
    methods:{
        uiPullData(){
            this.$router.go(0);
        },
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
        click_img(url){
            if( YsConfigJs.isApp()){
                YsConfigJs.perserve_img(url);
            }
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
        video_download(url){
            // 判断是否为app
            if(YsConfigJs.getCache('isapp')){//app
                YsConfigJs.perserve_video(url);
            }else{//web
                
            }
        },
        nextStep(){
            if(this.appraise_img==''){
                    util.alert({
                        content:'请上传图片',
                        define:()=>{}
                    })
            }else{
                util.toast({
                    content:'正在提交,请稍后...'
                });
                MainService.jdappraise_commit({
                    order_id:this.order_id,
                    image:this.appraise_img!=''?[this.appraise_img]:null,
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
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                this.$router.push('/main');
                            }
                        }) 
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
            .pic{
                width:98%;
                margin:0 auto 0.8rem auto;
               img{
                   display: inline-block;
                    height: 6rem;
                    width:30%;
                    border-radius: 0.5rem;
                    margin-right: 0.3rem;
               }
            }
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
                        width:12rem;
                   }
                    button{
                       //vertical-align: middle;
                       font-size: 0.9rem;
                       font-weight: 700;
                       color:#2d99e0;
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
                      background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
                }
            }
        }
    }
}
</style>