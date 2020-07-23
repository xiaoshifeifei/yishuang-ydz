<template>
    <div id="pay-commit">
          <uiTitle class="title" ref="title" :isback="false" :title="'付款提交'" :color="'white'">
         </uiTitle>
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true' :uiPull="true" @uiPullData="uiPullData" :data='scroll_data' >
             <main class="main">
                <el-steps class="step" :active="2" align-center>
                    <el-step title="验证"></el-step>
                    <el-step title="回答问题"></el-step>
                    <el-step v-if="type == 1" title="提交付款"></el-step>
                     <el-step v-else title="提交任务"></el-step>
                    <!-- <el-step title="步骤4"></el-step> -->
                </el-steps>
                
                <div class="note">
                    <div class="title">
                        <i class="el-icon-warning"></i>任务说明
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
                        <div class="right" v-if="type == 1">
                            垫付单
                        </div>
                         <div class="right" v-if="type == 2">
                            浏览单,切记勿付款
                        </div>
                    </div>
                     <div class="item" v-if="type == 2">
                         <div class="left">
                            关键词：
                        </div>
                        <div class="right">
                            {{good.keywords}}
                        </div>
                    </div>
                     <div class="item" v-if="type == 2&& good.sort!=''">
                         <div class="left">
                            排序：
                        </div>
                        <div class="right">
                            第{{good.sort}}名
                        </div>
                    </div>
                     <div class="item" v-if="type == 1">
                         <div class="left">
                            订单付款总价：
                        </div>
                        <div class="right">
                            ¥{{good.plan_price}}
                        </div>
                    </div>
                    <div class="item" v-if="type == 1">
                         <div class="left">
                            购买件数：
                        </div>
                        <div class="right">
                           {{good.goods_qty}}件
                        </div>
                    </div>
                     <div class="item" v-if="type == 2">
                         <div class="left">
                            操作要求：
                        </div>
                        <div class="right" >
                            <span v-if='good.collect==1'>收藏</span>
                            <span v-if='good.shopping==1'>加购</span>
                        </div>
                    </div>
                   
                </div>
                 <div class="tips">
                    如有问题请咨询平台客服（{{servicer}}）,禁止询问商家客服
                </div>
                 <div class="note" v-if='good.goods_qrcode!=""&&type==1'>
                    <div class="title">
                        <i class="el-icon-warning"></i>领取优惠券下单
                    </div>
                     <div class="tips" >
                        下单前须知：<br>
                       请领取优惠券后再下单，否则高于商家指定金额付款会被商家拒绝。
                    </div>
                     <div >
                        <img  :src="good.goods_qrcode" alt="" @load='getLoad()' @click="click_img(good.goods_qrcode)">
                   </div>
                </div>
                 <div class="note">
                      <div class="title">
                        <i class="el-icon-info"></i>商家要求(按要求进行完成)
                    </div>
                    <div class="item release">
                        <p class="ui-red">
                            {{good.release_remark}}
                        </p>
                    </div>
                     <img v-if="type==1" :src="good.release_note_img" alt="" @load='getLoad()'>
                 </div>
                <div class="note" v-if="type ==1">
                      <div class="title">
                        <i class="el-icon-info"></i>订单号
                    </div>
                       <input type="text" v-model="order_number" class="input" placeholder="输入订单号">
                    <div class="title">
                        <i class="el-icon-info"></i>收件人
                    </div>
                       <input type="text" v-model="order_people" class="input" placeholder="输入收件人姓名">
                       <div class="title">
                        <i class="el-icon-info"></i>实付金额
                    </div>
                       <input type="text" v-model="order_price" class="input" placeholder="输入实付金额">
                    <div class="tips" v-if="type ==1">
                       商家指定付款金额为：<span>{{good.plan_price}}</span>元<br>
                       若实付金额大于<span>{{Number(good.plan_price)*1.2}}</span>请勿付款。<br>
                       若实付金额小于<span>{{Number(good.plan_price)*0.8}}</span>请勿付款。<br>
                    </div>
                 </div>
                  
                 <div class="note">
                      <div class="title">
                        <i class="el-icon-question"></i>注意事项
                    </div>
                    <el-checkbox-group class="checkbox-group" v-model="checkList" v-if="type ==1">
                        <el-checkbox label="1">已确认使用账号<span>{{wangwang}}</span>在店铺<span>{{good.goods_store}}</span>下单</el-checkbox>
                        <el-checkbox label="2">已确认未使用京挑客/信用卡等方式付款</el-checkbox>
                        <el-checkbox label="3">已确认下单方式及金额符合商家任务要求</el-checkbox>
                         <el-checkbox label="4">已确认下单金额未高于/低于商家要求，如果超出，很可能被商家拒绝，审核极慢</el-checkbox>
                    </el-checkbox-group>
                     <el-checkbox-group class="checkbox-group" v-model="checkList" v-if="type ==2">
                        <el-checkbox label="1">已确认使用账号<span>{{wangwang}}</span>在店铺浏览任务</el-checkbox>
                        <el-checkbox label="2">已确认收藏/加购宝贝</el-checkbox>
                        <el-checkbox label="3">已确认浏览方式符合商家任务要求</el-checkbox>
                    </el-checkbox-group>
                </div>
                
                 <div class="good-next ui-row" >
                    <div class="ui-col-6" >
                        <button class="giveup"  @click="giveup()">放弃</button>
                    </div>
                     <div class="ui-col-6" >
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
            checkList:[],
            order_number:'',
            order_price:'',
            order_people:''
        }
    },
    created(){
        util.loading(false);
        this.servicer = YsConfigJs.getCache('servicer')?YsConfigJs.getCache('servicer'):'无';
        this.order_id = this.$route.params.id;
         this.type = this.$route.query.type;
        if(this.type == 1){
            this.pay_commit();
        }else if(this.type == 2){
            this.browse_commit();
        } 
    },
    mounted(){
        this.$refs.scroll.$el.style.height =  document.getElementById('pay-commit').offsetHeight - this.$refs.title.$el.offsetHeight + 'px';
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
            const s = parseInt(n%60);
            const m = parseInt(n/60);
            return this.toDub(m) + ':' + this.toDub(s);
        },
        click_img(url){
            if( YsConfigJs.isApp()){
                YsConfigJs.perserve_img(url);
            }
        },
          //补零
        toDub(n){
            return n<10?"0"+n:""+n;
        },
        getLoad(){
            this.scroll_data = !this.scroll_data;
        },
        pay_commit(){
            MainService.jdpay_commit({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_commit(res);
            });
        },
        browse_commit(){
             MainService.jdbrowse_commit({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_commit(res);
            });
        },
        public_commit(res){
                if(res.code == 1){
                    if(this.type == 2){
                         util.alert({
                            content:'浏览单<br>切记勿付款',
                            define:()=>{}
                        }) 
                    }else{
                         util.closeLoading();
                    } 
                    this.good = res.data.orderplanfind;
                    this.wangwang = res.data.wangwang;
                    const time1 = parseInt(new Date().getTime()/1000);
                    this.timer_n = res.data.orderplanfind.order_end_time - time1>0?res.data.orderplanfind.order_end_time - time1:0;
                    this.count_down = this.get_timer(this.timer_n);
                }else{
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            this.$router.push('/main');
                        }
                    }) 
                }
        },
        giveup(overtime){
            if(!overtime){
                 clearInterval(this.timer);
            }
            publicJs.jd_give_up(this.order_id,overtime);
        },
      
        nextStep(){
           if((this.type == 1&&this.checkList.length < 4)||(this.type == 2&&this.checkList.length < 3)){
               util.alert({
                    content:'请仔细阅读<br>注意事项并勾选',
                    define:()=>{}
                }) 
           } else {
               if(this.type == 1){
                     MainService.jdpay_complete({
                        order_id:this.order_id,
                        buyer_target_number:this.order_number,
                        buyer_target_price:this.order_price,
                        buyer_recipients:this.order_people
                    }).then(res=>{
                       this.public_next(res);
                    })
               }else if(this.type == 2){
                    MainService.jdbrowse_complete({
                        order_id:this.order_id,
                    }).then(res=>{
                        this.public_next(res);
                    })
               }
             
           }
        },
          public_next(res){
            if(res.code == 1){
                clearInterval(this.timer);
                util.toast({
                    content:res.msg,
                    times:1000
                });
                this.$router.push('/main');
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
        },
    }
}
</script>
<style lang="less" scoped>
@import '../../../assets/css/reset.css';
@import '../../../assets/less/common.less';
#pay-commit{
    z-index: 6;
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
             img{
                width: 100%;
                border-radius: 0.5rem;
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
            .input{
                display: block;
                width: 90%;
                margin:auto;
                padding:0 0.5rem;
                height: 2.8rem;
                border-radius: 0.7rem;
                border:0.08rem solid rgb(230,230,230);
            }
            .button{
                margin:0.8rem auto ;
                width:95%;
            }
            .checkbox-group{
                margin:auto;
                width: 90%;
            }
        }
    }
}
</style>