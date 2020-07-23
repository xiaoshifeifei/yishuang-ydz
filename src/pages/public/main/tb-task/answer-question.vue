<template>
    <div id="answer-question">
          <uiTitle class="title" ref="title" :isback="false" :title="'回答问题'" :color="'white'">
         </uiTitle>
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :uiPull="true" @uiPullData="uiPullData" :data="scroll_data" :pullup='true' >
             <main class="main">
                <el-steps class="step" :active="1" align-center>
                    <el-step title="验证"></el-step>
                    <el-step title="回答问题"></el-step>
                     <el-step v-if="type == 1" title="提交付款"></el-step>
                     <el-step v-else title="提交任务"></el-step>
                    <!-- <el-step title="步骤4"></el-step> -->
                </el-steps>
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
                            浏览单，切记勿付款
                        </div>
                        <div class="right" v-if="good.order_type == 3 && step == 1">
                           加购单第一阶段，切记勿付款
                        </div>
                        <div class="right" v-if="good.order_type == 3 && step == 2">
                           加购单第二阶段
                        </div>
                         <div class="right" v-if="good.order_type == 4">
                           扫码多链接单
                        </div>
                         <div class="right" v-if="good.order_type == 5">
                           关键词多链接单
                        </div>
                    </div>
                    <div class="item" v-if="good.order_type == 2" >
                         <div class="left">
                            操作要求：
                        </div>
                        <div class="right" >
                            <span v-if='good.collects==1'>收藏</span>
                            <span v-if='good.shoppings==1'>加购</span>
                        </div>
                    </div>
                     <div class="item" v-if="type == 1||(type == 3 && step == 2)||type==4">
                         <div class="left">
                            订单付款总价：
                        </div>
                        <div class="right">
                            ¥{{good.price}}
                        </div>
                    </div>
                    <div class="item" v-if="type == 1||(type == 3 && step == 2)||type==4">
                         <div class="left">
                            购买件数：
                        </div>
                        <div class="right">
                           {{good.goods_qty}}件
                        </div>
                    </div>
                </div>
                 <div class="red-tips" >
                    如有问题请咨询平台客服（{{servicer}}）,禁止询问商家客服
                </div>
                 <div class="note">
                      <div class="title">
                        <i class="el-icon-info"></i>商家要求(按要求进行完成)
                    </div>
                   <div class="item release">
                        <p>
                            {{good.release_remark}}
                        </p>
                    </div>
                 </div>
                  <div class="note"  v-if="type == 2">
                      <div class="title">
                        <i class="el-icon-info"></i>操作示例
                    </div>
                    <div class="item">
                       <img class="image" src="../../../../assets/image/browse.png" alt=""  @load='getLoad()'>
                    </div>
                 </div>
                <div class="note">
                     <div class="title">
                        <i class="el-icon-question"></i>问答说明：
                    </div>
                    <p class="signal" v-if="good.order_type !=3">
                        {{good.signal_note}}
                    </p>
                    <p class="signal" v-if="good.order_type == 3 &&step ==1">
                        {{good.browse_signal}}
                    </p>
                     <p class="signal" v-if="good.order_type == 3 &&step ==2">
                        {{good.pay_signal}}
                    </p>
                    
                      <div class="title">
                        <i class="el-icon-question"></i>回答问题<span v-if="good.order_type!=3">(提示：{{answerlen}}个字)</span>
                    </div>
                    <textarea class="textarea" v-model="question_content" name="" id=""  rows="3">

                    </textarea>
                   <button class="el-button"  @click="verify($event)">核对</button>
                </div>
                 <div class="note" v-if='good.order_type == 3&&step==1'>
                     <div class="title">
                        <i class="el-icon-question"></i>加购验证
                    </div>
                     <div class="tips">
                        注意事项：<br>
                        1.该任务浏览阶段不能付款！<br>
                        2.需要将商品进行对比，将同一个关键词下的不同商品一起加入购物车，而后截图购物车上传。
                    </div>
                    <div class="title">
                        <i class="el-icon-question"></i>截图示例
                    </div>
                    <div class="item">
                        <img class="image" src="../../../../assets/image/label_browse.png" alt="" @load='getLoad()'>
                    </div>
                     <input type="file" id='upload-input' style="display:none" @change='fileChange()' >
                    <div class="button"> <button class="el-button"  @click="upload_label_browse($event)">上传截图</button> </div>
                     <div class="item">
                        <img class="image" :src="upload_img" @load='getLoad()' alt="">
                    </div>
                     <div class="button" v-if="upload_img!=''"> <button class="el-button"  @click="upload_imgOne()">上传</button> </div>
                 </div>
                  <div class="tips"  v-if="good.order_type==2||(good.order_type==3&&step==1)">
                        温馨提示：<br/>
                    1.请确保在宝贝详情页浏览五分钟以上，否则被商家拒绝，拿不到佣金
                </div>
                 <div class="tips"  v-else-if="good.order_type==5">
                        温馨提示：<br/>
                    <span>1.请将该产品加入购物车，切勿先付款</span><br/>
                    2.请使用<span>{{wangwang}}</span>账号在店铺<span>{{good.goods_store}}</span>下单<br/>
                    3.请确保在宝贝详情页浏览五分钟以上，否则被商家拒绝，拿不到佣金
                </div>
                  <div class="tips"  v-else>
                        温馨提示：<br/>
                    1.请使用<span>{{wangwang}}</span>账号在店铺<span>{{good.goods_store}}</span>下单<br/>
                    2.请确保在宝贝详情页浏览五分钟以上，否则被商家拒绝，拿不到佣金
                </div>
                 <div class="good-next ui-row" >
                    <div class="ui-col-6" v-if="!(type == 3 && step == 2)">
                        <button class="giveup"  @click="giveup()">放弃</button>
                    </div>
                     <div class="ui-col-6" v-if="!(type == 3 && step == 2)">
                        <button class="accept" v-if="is_nextStep"  @click="nextStep()">下一步</button>
                        <button class="accept-wait" v-else>{{next_time}}</button>
                    </div>
                      <div class="ui-col-12" v-if="type == 3 && step == 2">
                        <button class="accept" v-if="is_nextStep"  @click="nextStep()">下一步</button>
                        <button class="accept-wait" v-else>{{next_time}}</button>
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
import  MainService from './../main.http'
import publicJs from './../public'
export default {
    components:{
        uiTitle,
        uiScroll,
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
            step:0,
            wangwang:'',
            question_content:'',
            answerlen:0,
            timer:null,
            timer_n:3599,
            count_down:'05:00',
            is_nextStep:true,
            next_time:'05:00',
            upload_img:'',
            isVerify:false,
            isChat:1
        }
    },
    created(){
        util.loading(false);
        this.order_id = this.$route.params.id;
         this.type = this.$route.query.type;
         this.step = this.$route.query.step;
         this.servicer = YsConfigJs.getCache('servicer')?YsConfigJs.getCache('servicer'):'无';
        if(this.type == 1){
            this.pay_question();
        }else if(this.type == 2){
            this.browse_question();
        }else if(this.type == 3 && this.$route.query.step == 1){
            this.label_questionOne();
        }else if(this.type == 3 && this.$route.query.step == 2){
             this.label_questionTwo();
        }else if(this.type == 4){
            this.link_question();
        }else if(this.type == 5){
            this.key_question();
        }
    },
    mounted(){
        this.$refs.scroll.$el.style.height =  document.getElementById('answer-question').offsetHeight - this.$refs.title.$el.offsetHeight + 'px';
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
        window.apiready = function(){
        }
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
        pay_question(){
             MainService.pay_question({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_question(res);
            });
        },
        browse_question(){
             MainService.browse_question({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_question(res);
            });
        },
        label_questionOne(){
             MainService.label_questionOne({
                order_id:this.order_id
            })
            .then(res=>{
                if(res.code == 1){
                    if(this.step == 1){
                        this.isChat = res.data.isChat;
                    }
                    util.closeLoading();
                    this.answerlen = res.data.answerlen;
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
            });
        },
        label_questionTwo(){
            MainService.label_questionTwo({
                order_id:this.order_id
            })
            .then(res=>{
               if(res.code == 1){
                        if(this.step == 1){
                            this.isChat = res.data.isChat;
                        }
                        util.closeLoading();
                        this.answerlen = res.data.answerlen;
                        this.good = res.data.orderplanfind;
                        this.wangwang = res.data.wangwang;
                        const time1 = parseInt(new Date().getTime()/1000);
                        this.timer_n = res.data.orderplanfind.purchase_end_time - time1 >0 ? res.data.orderplanfind.purchase_end_time - time1:0;
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
        link_question(){
            MainService.link_question({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_question(res);
            });
        },
        key_question(){
            MainService.key_question({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_question(res);
            });
        },
        public_question(res){
            if(res.code == 1){
                if(this.type == 1||this.type == 4||this.type ==5){
                    this.isChat = res.data.isChat;
                    if(res.data.three){
                        this.next_timer(res.data.three);
                    }   
                }
                util.closeLoading();
                this.answerlen = res.data.answerlen;
                this.good = res.data.orderplanfind;
                console.log(this.good);
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
        public_verify(res,e){
             if(res.code == 1){  
                this.isVerify = true;
                e.target.innerHTML = res.msg;
                e.target.disabled = true;
                if(this.isChat == 2){
                    util.alert({
                        content:'本阶段需要找商家客服<br>进行商品有关假聊<br>请认真操作',
                        times:10,
                        define:()=>{}
                    })
                }
            }else if(res.code == 302){
                clearInterval(this.timer);
                this.$router.push('/pay-commit/'+this.order_id+'?type='+this.type+'&step='+this.step);
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
                MainService.TwoConfirm_signal({
                    order_id:this.order_id,
                    confirm_content:this.question_content
                }).then(res=>{
                   this.public_verify(res,e);
                })
            }else if(this.type == 5){
                 MainService.keyConfirm_signal({
                    order_id:this.order_id,
                    confirm_content:this.question_content
                }).then(res=>{
                   this.public_verify(res,e);
                })
            }else{
                MainService.confirm_signal({
                    order_id:this.order_id,
                    confirm_content:this.question_content
                }).then(res=>{
                    this.public_verify(res,e);
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
        upload_imgOne(){
            MainService.label_uploadImg({
                order_id:this.order_id,
                image:this.upload_img
            }).then(res=>{
                if(res.code == 1){
                    util.toast({
                        content:'上传成功',
                        times:1000
                    });
                }else{
                     util.alert({
                        content:res.msg,
                        define:()=>{}
                    })
                }
            })
        },

        next_timer(three){
            this.is_nextStep = false;
            const time1 = parseInt(new Date().getTime()/1000);
            let next_time = three - time1 >0 ? three - time1:0;
            this.next_time = this.get_timer(next_time);
            let next_timer = setInterval(()=>{
                if(next_time<=0){
                     clearInterval(next_timer);
                      this.is_nextStep = true;
                }else{
                    next_time--;
                }
                this.next_time = this.get_timer(next_time);
            },1000);
        },
        giveup(overtime){
            if(!overtime){
                 clearInterval(this.timer);
            }
            publicJs.tb_give_up(this.order_id,overtime);
        },
        nextStep(){
             if(!this.isVerify){
                 util.alert({
                    content:'请先核对问题答案<br>核对通过即可<br>点击下一步',
                    define:()=>{}
                })
                return;
            }
            if(this.type == 3&& this.step == 1){
                MainService.label_questionOne_next({
                    order_id:this.order_id
                }).then(res=>{
                    this.public_next(res);
                })
            }else if(this.type == 3&& this.step == 2){
                MainService.label_questionTwo_next({
                    order_id:this.order_id
                }).then(res=>{
                    this.public_next(res);
                })
            }else if(this.type == 5){
                 MainService.key_question_next({
                    order_id:this.order_id
                }).then(res=>{
                    if(res.code == 1){
                        clearInterval(this.timer);
                        if(res.data.type == 1){
                            util.alert({
                                content:'多链接单未完成<br>继续添加商品',
                                define:()=>{
                                    this.$router.push('/order-verify/'+res.data.order_id+'?type='+this.type+'&step='+this.step);
                                }
                            }); 
                        }else if(res.data.type == 2){
                            this.$router.push('/pay-commit/'+res.data.order_id+'?type='+this.type+'&step='+this.step);
                        }
                        //this.$router.push('/pay-commit/'+this.order_id+'?type='+this.type+'&step='+this.step);
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
                MainService.confirm_signalNext({
                    order_id:this.order_id
                }).then(res=>{
                    this.public_next(res);
                })
            }
          
        },
        public_next(res){
                if(res.code == 1){
                     clearInterval(this.timer);
                    this.$router.push('/pay-commit/'+this.order_id+'?type='+this.type+'&step='+this.step);
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
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../assets/css/reset.css';
@import '../../../assets/less/common.less';
#answer-question{
    z-index: 5;
    position: absolute;
    height: 100vh;
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
         .note{
            background-color: white;
            border-radius: 0.5rem;
            width: 96%;
            margin: 0.8rem auto 0.8rem auto;
            padding-bottom: 0.8rem;
            .signal{
                margin-left:0.8rem;
                font-size: 0.9rem;
            }
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
               .image{
                   width:95%;
                   display: block;
                   margin:auto;
                   border-radius: 1rem;
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
            .textarea{
                display: block;
                margin: auto;
                border:0.05rem solid rgb(235,235,235);
                border-radius: 0.5rem;
                padding:0.3rem;
                width: 95%;
                box-sizing: border-box;
                resize:none;
            }
            .button{
                margin:0.8rem auto ;
                width:95%;
            }
        }
    }
}
</style>