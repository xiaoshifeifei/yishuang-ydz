<template>
    <div id="order-verify">
          <uiTitle class="title" ref="title" :isback="false" :title="'验证宝贝'" :color="'white'">
         </uiTitle>
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true' :uiPull="true" @uiPullData="uiPullData" :data='scroll_data'>
             <main class="main">
                <el-steps class="step" :active="0" align-center>
                    <el-step title="验证"></el-step>
                    <el-step title="回答问题"></el-step>
                    <el-step v-if="type == 1" title="提交付款"></el-step>
                     <el-step v-else title="提交任务"></el-step>
                    <!-- <el-step title="步骤4"></el-step> -->
                </el-steps>
                <div class="tips" v-if="good.order_type == 1||(good.order_type==3&&step==1)">
                    1.禁止通过旺旺联系商家咨询答案。<br/>
                    2.禁止使用花呗，淘金币，天猫积分，返利网，淘宝客，信用卡，以及村淘下单。（商家要求除外）
                </div>
                <div class="goods" v-if="good!=''">
                    <div class="title">
                        <i class="el-icon-s-promotion"></i>商品详情
                    </div>
                    <uiMosaic class="mosaic" v-if="good.goods_buy_image !=''" :image="good.goods_buy_image" @load='getLoad()'></uiMosaic>
                    <uiMosaic class="mosaic" v-else :image="good.goods_image" @load='getLoad()'></uiMosaic>
                    <img v-if="type == 4" :src="good.goods_qrcode" alt="" @load='getLoad()'>
                    <div>
                        <div class="item">
                            手淘搜索付款人数：{{good.goods_pay_qty}}人付款
                        </div>
                         <div class="item" v-if="(type == 1||type == 5||type == 2)&&entrance == 1">
                          关键词：<span>{{good.keywords!=''?good.keywords:'无'}}</span>
                        </div>
                        <div class="item" v-else-if="(type == 1||type == 5||type == 2)&&entrance == 2">
                          淘口令：<span>{{good.keywords!=''?good.keywords:'无'}}</span>
                        </div>
                        <div class="item  qr-code" v-else-if="(type == 1||type == 5||type == 2)&&entrance == 3">
                          二维码：<img :src="good.keywords" alt="" @load='getLoad()' @click="click_img(good.keywords)">
                          <span class="ui-red">app端点击保存<br>浏览器端长按保存</span>
                        </div>
                         <div class="item" v-else-if='step==2'>
                           关键词：<span>{{good.two_keyword!=''?good.two_keyword:'无'}}</span>
                        </div>
                         <div class="item" v-else>
                              关键词：<span>{{good.keywords!=''?good.keywords:'无'}}</span>
                        </div>
                         <div class="item">
                            此宝贝在此关键词下的大概排名：{{good.sort!=''?good.sort:'无'}}
                        </div>
                         <div class="item">
                           展示价格：{{good.goods_price}}元
                        </div>
                         <div class="item">
                            地区：{{good.goods_location!=''?good.goods_location:'无'}}
                        </div>
                          <div class="item">
                           操作旺旺：{{wangwang}}
                        </div>
                    </div>
                </div>
                <div class="red-tips">
                    如有问题请咨询平台客服（{{servicer}}）,禁止询问商家客服
                </div>
                <div class="note">
                    <div class="title">
                        <i class="el-icon-warning"></i>注意事项
                    </div>
                    <div class="item">
                         <div class="left">
                            剩余时间：
                        </div>
                        <div class="right last-time">
                            {{count_down}}
                        </div>
                    </div>
                    <div class="item">
                         <div class="left">
                            任务类型：
                        </div>
                        <div class="right" v-if="good.order_type == 1">
                           垫付单
                        </div>
                        <div class="right" v-if="good.order_type == 2">
                           浏览单
                        </div>
                         <div class="right" v-if="good.order_type == 3">
                           加购单
                        </div>
                         <div class="right" v-if="good.order_type == 4">
                           扫码多链接单
                        </div>
                         <div class="right" v-if="good.order_type == 5">
                           关键词多链接单
                        </div>
                    </div>
                    <div class="item"   v-if="good.order_type != 2">
                         <div class="left">
                            购买件数：
                        </div>
                        <div class="right">
                            {{good.goods_qty}}件
                        </div>
                    </div>
                     <div class="item" v-if="good.order_type == 2" >
                         <div class="left">
                            操作要求：
                        </div>
                        <div class="right" >
                            <span v-if='good.collects==1'>收藏</span>
                            <span v-if='good.shoppings==1'>加购</span>
                            <span v-if='good.collects==0&&good.shoppings==0'>无</span>
                        </div>
                    </div>
                </div>
                 <div class="note">
                      <div class="title">
                        <i class="el-icon-info"></i>商家要求
                    </div>
                    <div class="item release">
                        <p>
                            {{good.release_remark}}
                        </p>
                    </div>
                 </div>
                 <div class="collate">
                   <div  v-if="good.order_type!=4">
                        <div v-if="step==2">
                            <div class="title">
                                <i class="el-icon-question"></i>截图示例
                            </div>
                            <div class="item">
                                <img class="image" src="../../../../assets/image/label_verify.png" alt="">
                            </div>
                            <div class="title">
                                <i class="el-icon-question"></i>我的截图
                            </div>
                             <div class="item">
                                <img class="image" :src="upload_img" @load='getLoad()' alt="">
                            </div>
                            <input type="file" id='upload-input' style="display:none" @change='fileChange()' >
                            <div class="button"> <button class="el-button"  @click="upload_label_browse($event)">上传截图</button> </div>
                           
                      </div>
                        <div class="title">
                        <i class="el-icon-question"></i>商品核对
                        </div>
                        <textarea class="textarea" v-model="textarea_content" name="" id=""  rows="3">

                        </textarea>
                        <div class="button"> <button class="el-button"  @click="verify($event)">核对</button> </div>
                   </div>
                     <div class="tips"  v-if="good.order_type==2||(good.order_type==3&&step==1)">
                            温馨提示：<br/>
                            1.点击分享，可获得淘口令；<br/>
                            2.苹果手机请长按产品名即可复制产品链接验证；<br/>
                            3.安卓手机需要旺旺上点发送宝贝，然后复制发送的链接验证；<br/>
                    </div>
                     <div class="tips"  v-else-if="good.order_type==4">
                            温馨提示：<br/>
                            1.实付金额超过商家指定金额50元以上请勿付款；<br/>
                            2.在店铺中任意挑选<span>{{good.goods_qty}}</span>件商品，满足指定金额下单<br/>
                            3.必须是不同商品进行下单，否则拒绝审核<br/>
                    </div>
                    <div class="tips"  v-else>
                            温馨提示：<br/>
                            1.实付金额超过商家指定金额50元以上请勿付款；<br/>
                            2.点击分享，可获得淘口令；<br/>
                            3.苹果手机请长按产品名即可复制产品链接验证；<br/>
                            4.安卓手机需要旺旺上点发送宝贝，然后复制发送的链接验证；<br/>
                    </div>
                </div>
                <div class="good-next ui-row" >
                    <div class="ui-col-6" v-if="!(type == 3 && step == 2)">
                        <button class="giveup"  @click="giveup()">放弃</button>
                    </div>
                     <div class="ui-col-6" v-if="!(type == 3 && step == 2)">
                        <button class="accept"   @click="nextStep()">下一步</button>
                    </div>
                     <div class="ui-col-12" v-if="type == 3 && step == 2">
                        <button class="accept"  @click="nextStep()">下一步</button>
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
import publicJs from './../public'
export default {
    components:{
        uiTitle,
        uiScroll,
        uiMosaic
    },
    data(){
        return{
            order_id:'',
            servicer:'',
             bounce:{
                top:false,
                bottom:false,
                left:false,
                right:false
            },
            scroll_data:true,
            good:'',
            type:0,
            step:'',
            upload_img:'',
            wangwang:'',
            entrance:'',
            textarea_content:'',
            timer:null,
            timer_n:3599,
            count_down:'05:00',
            isVerify:false
        }
    },
    created(){
        util.loading(false);
         this.servicer = YsConfigJs.getCache('servicer')?YsConfigJs.getCache('servicer'):'无';
        this.order_id = this.$route.params.id;
        this.type = this.$route.query.type;
         this.step = this.$route.query.step;
        if(this.type == 1){
            this.buy_order();
        }else if(this.type == 2){
            this.browse_order();
        }else if(this.type == 3&&(this.$route.query.step==1)){
            this.labelOne_order();
        }else if(this.type == 3&&(this.$route.query.step==2)){
             this.labelTwo_order();
        }else if(this.type == 4){
             this.link_order();
        }else if(this.type == 5){
             this.keyword_order();
        }
    },
    mounted(){
        this.$refs.scroll.$el.style.height =  document.getElementById('order-verify').offsetHeight - this.$refs.title.$el.offsetHeight + 'px';
        this.count_down = this.get_timer(this.timer_n);
        this.timer = setInterval(()=>{
            if(this.timer_n <= 0){
                clearInterval(this.timer);
                this.giveup(true);
            }else{
                this.timer_n--;
            }
            this.count_down = this.get_timer(this.timer_n);
        },1000);
       window.addEventListener("popstate", ()=>{
            clearInterval( this.timer);
        });
        window.apiready = function() {}
    },
    methods:{
        uiPullData(){
            this.$router.go(0);
        },
        get_timer(n){
            if(this.type == 3 && this.step == 2){
                const s = parseInt((n%3600)%60);
                const m = parseInt((n%3600)/60);
                 const h = parseInt(n/3600);
                return this.toDub(h)+':'+this.toDub(m) + ':' + this.toDub(s);
            }else{
                const s = parseInt(n%60);
                const m = parseInt(n/60);
                return this.toDub(m) + ':' + this.toDub(s);
            }
        },
          //补零
        toDub(n){
            return n<10?"0"+n:""+n;
        },
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
         click_img(url){
            if( YsConfigJs.isApp()){
                YsConfigJs.perserve_img(url);
            }
        },
        /**
         * 垫付单页面获取
         */
        buy_order(){
             MainService.verify_pay({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_order(res);
            });
        },
         /**
         *浏览单页面获取
         */
        browse_order(){
             MainService.verify_browse({
                order_id:this.order_id
            })
            .then(res=>{
                this.public_order(res);
            });
        },
        /**
         * 加购单-一阶段
         */
        labelOne_order(){
            MainService.verify_labelOne({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_order(res);
            });  
        },
        /**
         * 加购单-二阶段
         */
        labelTwo_order(){
            MainService.verify_labelTwo({
                order_id:this.order_id
            })
            .then(res=>{
                if(res.code == 1 && res.data.orderplanfind.order_method == 0){
                    util.closeLoading();
                    this.$router.push('/pay-commit/'+this.order_id+'?type='+this.type+'&step='+this.$route.query.step);
                }else if(res.code == 1 && res.data.orderplanfind.order_method == 1){
                    util.closeLoading();
                    this.$router.push('/answer-question/'+this.order_id+'?type='+this.type+'&step='+this.$route.query.step);
                }else if(res.code == 1){
                    util.alert({
                        content:'本次任务需要重新搜索新关键词下单并截图上传',
                        define:()=>{}
                    }) 
                    this.good = res.data.orderplanfind;
                    this.wangwang = res.data.wangwang;
                    const time1 = parseInt(new Date().getTime()/1000);
                    this.timer_n = res.data.orderplanfind.purchase_end_time - time1>0?res.data.orderplanfind.purchase_end_time - time1:0;
                }else{
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            this.$router.push('/main');
                        }
                    }) 
                }
               
            });  
        },
        link_order(){
            MainService.verify_link({
                order_id:this.order_id
            })
            .then(res=>{
                this.public_order(res);
            });
        },
        keyword_order(){
            MainService.verify_keyword({
                order_id:this.order_id
            })
            .then(res=>{
                this.public_order(res);
            });
        },
        public_order(res){
            if(res.code == 1){
                util.closeLoading();
                if(this.type == 1||this.type == 5||this.type == 2){
                    this.entrance = res.data.entrance;
                }
                this.good = res.data.orderplanfind;
                this.wangwang = res.data.wangwang;
                const time1 = parseInt(new Date().getTime()/1000);
                this.timer_n = res.data.orderplanfind.order_end_time - time1>0?res.data.orderplanfind.order_end_time - time1:0;
            }else{
                util.alert({
                    content:res.msg,
                    define:()=>{
                         this.$router.push('/main');
                    }
                }) 
            }
        },
         upload_label_browse(){
            if(YsConfigJs.isApp()){
                YsConfigJs.upload_image(api)
                .then(res=>{
                    this.upload_img=res; 
                });
            }else{
                document.getElementById('upload-input').click();
            }
        },
        fileChange(obj){
            const files = document.getElementById('upload-input').files[0];
            YsConfigJs.web_upload(files)
            .then (res=>{
                this.upload_img=res;
            });
        },
        public_verify(res,e){
            if(res.code == 1){
                this.isVerify = true;
                e.target.innerHTML = res.msg;
                e.target.disabled = true;
                util.toast({
                    content:res.msg,
                    times:1000
                });
            }else if(res.code == 404){
                    util.alert({
                    content:res.msg,
                    define:()=>{
                        this.$router.push('/main');
                    }
                }) 
            }else{
                e.target.innerHTML = res.msg;
                util.toast({
                    content:res.msg,
                    times:1000
                });
            }
        },
        verify(e){
            if(this.type == 3 && this.step == 2){
                 MainService.comfirm_labelUrl({
                    order_id:this.order_id,
                    confirm_content:this.textarea_content
                 }).then(res=>{
                     this.public_verify(res,e);
                })
            }else if(this.type == 5){
                MainService.comfirm_keyUrl({
                    order_id:this.order_id,
                    confirm_content:this.textarea_content
                 }).then(res=>{
                     this.public_verify(res,e);
                })
            }else{
                 MainService.confirm_Url({
                    order_id:this.order_id,
                    confirm_content:this.textarea_content
                }).then(res=>{
                    this.public_verify(res,e);
                })
            }
           
           
        },
        giveup(overtime){
            if(!overtime){
                 clearInterval(this.timer);
            }
            publicJs.tb_give_up(this.order_id,overtime)
        },
        nextStep(){
            if(!this.isVerify&&this.type!=4){
                 util.alert({
                    content:'请先核对商品链接<br>核对通过即可<br>点击下一步',
                    define:()=>{}
                })
                return;
            }
            if(this.step == 2){
                MainService.confirm_labelUrlNext({
                    order_id:this.order_id,
                    image:this.upload_img
                }).then(res=>{
                    if(res.code == 1){
                        clearInterval(this.timer);
                        this.$router.push('/answer-question/'+this.order_id+'?type='+this.type+'&step='+this.$route.query.step);
                    }else if(res.code == 302){
                        clearInterval(this.timer);
                        this.$router.push('/pay-commit/'+this.order_id+'?type='+this.type+'&step='+this.$route.query.step);
                    }else if(res.code == 404){
                        clearInterval(this.timer);
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                this.$router.push('/main');
                            }
                        }); 
                    }else{
                        util.alert({
                            content:res.msg,
                            define:()=>{}
                        })
                    }
                })
            }else if(this.type == 4){
                 MainService.confirm_linkUrlNext({
                    order_id:this.order_id
                }).then(res=>{
                    if(res.code == 1){
                        clearInterval(this.timer);
                        this.$router.push('/answer-question/'+this.order_id+'?type='+this.type+'&step='+this.$route.query.step);
                    }else if(res.code == 404){
                        clearInterval(this.timer);
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                this.$router.push('/main');
                            }
                        }); 
                    }else{
                        util.alert({
                            content:res.msg,
                            define:()=>{}
                        })
                    }
                })
            }else if(this.type == 5){
                 MainService.confirm_keyUrlNext({
                    order_id:this.order_id
                }).then(res=>{
                    if(res.code == 1){
                        clearInterval(this.timer);
                        this.$router.push('/answer-question/'+this.order_id+'?type='+this.type+'&step='+this.$route.query.step);
                    }else if(res.code == 404){
                        clearInterval(this.timer);
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                this.$router.push('/main');
                            }
                        }); 
                    }else{
                        util.alert({
                            content:res.msg,
                            define:()=>{}
                        })
                    }
                })
            }else{
                MainService.confirm_UrlNext({
                    order_id:this.order_id
                }).then(res=>{
                    if(res.code == 1){
                        clearInterval(this.timer);
                        this.$router.push('/answer-question/'+this.order_id+'?type='+this.type+'&step='+this.$route.query.step);
                    }else if(res.code == 302){
                        clearInterval(this.timer);
                        this.$router.push('/pay-commit/'+this.order_id+'?type='+this.type+'&step='+this.$route.query.step);
                    }else if(res.code == 404){
                        clearInterval(this.timer);
                        util.alert({
                            content:res.msg,
                            define:()=>{
                                this.$router.push('/main');
                            }
                        }); 
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
#order-verify{
    z-index: 4;
    position: relative;
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
        .goods{
            width: 96%;
            margin:auto;
            img{
                width: 100%;
                border-radius: 0.5rem;
            }
            .item{
                font-size: 0.9rem;
                min-height: 2.5rem;
                padding:0 0.3rem;
                line-height: 2.5rem;
                border-bottom: 0.05rem solid rgb(230,230,230);
                span{
                    display: inline-block;
                    line-height: 1rem;
                }
            }
            .qr-code{
                height: 4rem;
                img{
                    display: inline;
                    width: 4rem;
                    vertical-align:middle;
                }
                span{
                     vertical-align:middle;
                    display: inline-block;
                    width: 9rem;
                    line-height: 1rem;
                }
            }
        }
         .title{
            padding:0.5rem;
            font-size: 1rem;
            i{
                color:#ffc125;
                margin-right: 0.5rem;
            }
        }
        .note{
            background-color: white;
            border-radius: 0.5rem;
            width: 96%;
            margin: 0.8rem auto 0.8rem auto;
            padding-bottom: 0.8rem;
           .item{
               font-size: 0.9rem;
               color:#9c9c9c;
               min-height: 1.6rem;
               line-height: 1.6rem;
               padding:0 0.3rem;
               &>div{
                   display: inline-block;
                   font-size: 0.85rem;
                   color:#8c8c8c;
               }
               .right{
                   float: right;
               }
               .last-time{
                   color:rgb(235, 81, 81);
                   font-weight: 700;
                   font-size: 1.1;
                   letter-spacing: 2px;
               }
           }
           .release{
               p{
                   color:#8c8c8c;
                    width: 100%;
                    word-wrap: break-word;
                    -webkit-user-select:text;
                    -moz-user-select:text;
                    -o-user-select:text;
                    user-select:text;
               }
           }
        }
        .collate{
            background-color: white;
            border-radius: 0.5rem;
            width: 96%;
            margin:auto;
             img{
                 display: block;
                 margin:auto;
                width:95%;
                border-radius: 0.5rem;
            }
            .textarea{
                display: block;
                margin: auto;
                border:0.05rem solid rgb(235,235,235);
                border-radius: 0.5rem;
                padding:0.3rem;
                width: 95%;
                box-sizing: border-box;
                resize:none
            }
            .button{
                margin:0.8rem auto ;
                width:95%;
               .el-button{
                    color:white;
               }
            }
        }
    }
 

}
</style>