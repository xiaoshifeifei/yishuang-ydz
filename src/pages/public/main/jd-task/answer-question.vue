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
                    </div>
                    <div class="item" v-if="good.order_type == 2">
                        <div class="left">
                            操作要求：
                        </div>
                        <div class="right" >
                            <span v-if='good.collects==1'>收藏</span>
                            <span v-if='good.shoppings==1'>加购</span>
                        </div>
                    </div>
                     <div class="item"  v-if="good.order_type == 1">
                         <div class="left">
                            有无优惠券
                        </div>
                        <div class="right" v-if='good.goods_qrcode_link!=""'>
                            有
                        </div>
                        <div class="right" v-else>
                           无
                        </div>
                    </div>
                      <div class="red-tips"  v-if="good.order_type == 1">
                        有优惠券要在下一步扫码领取优惠券再付款下单，否则超过商家预计金额有可能被拒绝，拿不到佣金。
                    </div>
                </div>
                 <div class="tips">
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
                     <img v-if="type==1" :src="good.release_note_img" alt="" @load='getLoad()'>
                 </div>
                  <div class="note"  v-if="good.order_type == 2">
                      <div class="title">
                        <i class="el-icon-info"></i>操作示例
                    </div>
                    <div class="item">
                       <img class="image" src="../../../../assets/image/browse.png" alt="" @load='getLoad()'>
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
                      <div class="title">
                        <i class="el-icon-question"></i>回答问题<span v-if="good.order_type!=3">(提示：{{answerlen}}个字)</span>
                    </div>
                    <textarea class="textarea" v-model="question_content" name="" id=""  rows="3">

                    </textarea>
                    <el-button class="el-button"  @click="verify($event)"><span>核对</span></el-button>
                </div>
                <div class="tips"  v-if="good.order_type==1">
                        温馨提示：<br/>
                    1.请使用 <span>{{wangwang}}</span> 账号在店铺 <span>{{good.goods_store}}</span> 下单<br/>
                    2.请确保在宝贝详情页浏览五分钟以上，否则被商家拒绝，拿不到佣金
                </div>
                 <div class="tips"  v-if="good.order_type==2">
                        温馨提示：<br/>
                    请确保在宝贝详情页浏览五分钟以上，否则被商家拒绝，拿不到佣金
                </div>
                 <div class="good-next ui-row" >
                    <div class="ui-col-6">
                        <button class="giveup"  @click="giveup()">放弃</button>
                    </div>
                     <div class="ui-col-6">
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
            servicer:'',
            order_id:'',
             bounce:{
                top:false,
                bottom:false,
                left:false,
                right:false
            },
            scroll_data:true,
            good:'',
            type:0,
            wangwang:'',
            question_content:'',
            answerlen:0,
            timer:null,
            timer_n:3599,
            count_down:'05:00',
            is_nextStep:false,
            next_time:'05:00',
            isVerify:false
        }
    },
    created(){
       util.loading(false);
         this.servicer = YsConfigJs.getCache('servicer')?YsConfigJs.getCache('servicer'):'无';
        this.order_id = this.$route.params.id;
         this.type = this.$route.query.type;
        if(this.type == 1){
            this.pay_question();
        }else if(this.type == 2){
            this.browse_question();
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
            const s = parseInt(n%60);
            const m = parseInt(n/60);
            return this.toDub(m) + ':' + this.toDub(s);
        },
          //补零
        toDub(n){
            return n<10?"0"+n:""+n;
        },
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
        pay_question(){
             MainService.jdpay_question({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_question(res);
            });
        },
        browse_question(){
             MainService.jdbrowse_question({
                order_id:this.order_id
            })
            .then(res=>{
                this.public_question(res);
            });
        },
        public_question(res){
               if(res.code == 1){
                     util.closeLoading();
                     if(res.data.three){
                           this.next_timer(res.data.three);
                     }
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
        },
        verify(e){
            MainService.jdconfirm_signal({
                order_id:this.order_id,
                confirm_content:this.question_content
            }).then(res=>{
                if(res.code == 1){
                    this.isVerify = true;
                    e.target.innerHTML = res.msg;
                    e.target.disabled = true;
                    util.toast({
                        content:res.msg,
                        times:1000
                    });
                }else if(res.code == 404){
                     clearInterval(this.timer);
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
            })
        },
        next_timer(three){
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
             publicJs.jd_give_up(this.order_id,overtime)
        },
        nextStep(){
            if(!this.isVerify){
                 util.alert({
                    content:'请先核对问题答案<br>核对通过即可<br>点击下一步',
                    define:()=>{}
                })
                return;
            }
            MainService.jdconfirm_signalNext({
                order_id:this.order_id
            }).then(res=>{
                 if(res.code == 1||res.code == 102){
                    clearInterval(this.timer);
                    this.$router.push('/jdpay-commit/'+this.order_id+'?type='+this.type);
                 }else if(res.code == 404){
                    clearInterval(this.timer);
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
               img{
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