<template>
    <div id="pay-commit">
          <uiTitle class="title" ref="title" :isback="false" :title="'付款提交'" :color="'white'">
         </uiTitle>
         <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true' :uiPull="true" @uiPullData="uiPullData" :data="scroll_data">
             <main class="main">
                <el-steps class="step" :active="2" align-center>
                    <el-step title="验证"></el-step>
                    <el-step title="回答问题"></el-step>
                    <el-step v-if="type==3&&step == 1" title="第一阶段提交"></el-step>
                    <el-step v-else-if="type == 1||type==3&&step == 2||type == 4||type == 5" title="提交付款"></el-step>
                     <el-step v-else title="提交任务"></el-step>
                </el-steps>
                 <div class="note" v-if='type==3&&step==2'>
                    <div class="title">
                        <i class="el-icon-warning"></i>商品详情
                    </div>
                    <uiMosaic class="mosaic" v-if="good.goods_buy_image !=''" :image="good.goods_buy_image" @load='getLoad()'></uiMosaic>
                    <uiMosaic class="mosaic" v-else :image="good.goods_image" @load='getLoad()'></uiMosaic>
                    <div class="item" v-if='type!=1'>
                         <div class="left">
                            操作旺旺：
                        </div>
                        <div class="right">
                           {{wangwang}}
                        </div>
                    </div>
                     <div class="item" v-if='type!=1'>
                         <div class="left">
                            地区：
                        </div>
                        <div class="right">
                           {{good.goods_location}}
                        </div>
                    </div>
                </div>
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
                         <div class="right" v-if="type == 3 && step == 1">
                            加购单一阶段,切记勿付款
                        </div>
                         <div class="right" v-if="type == 3 && step == 2">
                            加购单二阶段
                        </div>
                           <div class="right" v-if="type == 4 ">
                            扫码多链接单
                        </div>
                          <div class="right" v-if="type == 5 ">
                            关键词多链接单
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
                     <div class="item" v-if="type == 1||(type == 3&&step==2)||type==4">
                         <div class="left">
                            订单付款总价：
                        </div>
                        <div class="right">
                            ¥{{good.price}}
                        </div>
                    </div>
                    <div class="item" v-if="type == 1||(type == 3&&step==2)||type==4">
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
                        </div>
                    </div>
                     <div class="item" v-if="type == 3&&step ==1">
                         <div class="left">
                            加购件数：
                        </div>
                        <div class="right">
                           {{good.goods_qty}}件
                        </div>
                    </div>
                   
                </div>
                 <div class="red-tips">
                    如有问题请咨询平台客服（{{servicer}}）,禁止询问商家客服
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
                 </div>
                  <div class="note" v-if="type == 5">
                      <div class="title">
                        <i class="el-icon-info"></i>加购示例
                    </div>
                    <img src="http://pic.mystreet100.com/cashApply/1585796996162" alt=""   @load='getLoad()'>
                 </div>
                <div class="note" v-if="type ==1||(type == 3 && step == 2)||type==4||type==5">
                      <div class="title">
                        <i class="el-icon-info"></i>订单号
                    </div>
                       <input type="text" v-model="order_number" class="input" placeholder="输入订单号">
                       <div class="title">
                        <i class="el-icon-info"></i>实付金额
                    </div>
                       <input type="text" v-model="order_price" class="input" placeholder="输入实付金额">
                        <div class="red-tips">
                        商家指定付款金额为{{good.price}}元
                    </div>
                 </div>
                  <div class="tips" v-if="type ==1||(type == 3 && step == 2)||type==4">
                         订单须知：<br>
                        1.付多少填多少，无法提交先按任务金额（<span>{{good.price}}</span>）提交，并及时联系平台客服修改金额。<br>
                        2.返款以填写金额为准，乱提交会被拒绝，拿不到佣金。
                    </div>
                    <div class="tips" v-if="type ==5">
                         订单须知：<br>
                        1.必须多个产品合并为一单付款。<br>
                        2.返款以填写金额为准，乱提交会被拒绝，拿不到佣金。<br>
                        3.若付款金额大于<span>{{(Number(good.price)*1.2).toFixed(2)}}元</span>或小于<span>{{(Number(good.price)*0.8).toFixed(2)}}元</span>先按可提交金额提交，并及时联系平台客服修改金额。<br>
                    </div>
                 <div class="note">
                      <div class="title">
                        <i class="el-icon-question"></i>注意事项
                    </div>
                    <el-checkbox-group class="checkbox-group" v-model="checkList" v-if="type ==1||(type == 3 && step == 2)||type==4||type==5">
                        <el-checkbox label="1">已确认使用账号<span class="ui-red">{{wangwang}}</span>在店铺<span class="ui-red">{{good.goods_store}}</span>下单</el-checkbox>
                        <el-checkbox label="2">已确认未使用淘客/淘金币/红包等方式付款</el-checkbox>
                        <el-checkbox label="3">已确认下单方式及金额符合商家任务要求</el-checkbox>
                    </el-checkbox-group>
                     <el-checkbox-group class="checkbox-group" v-model="checkList" v-if="type ==2">
                        <el-checkbox label="1">已确认使用账号<span class="ui-red">{{wangwang}}</span>在店铺浏览任务</el-checkbox>
                        <el-checkbox label="2">已确认收藏/加购宝贝</el-checkbox>
                        <el-checkbox label="3">已确认浏览方式符合商家任务要求</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group class="checkbox-group" v-model="checkList" v-if="type ==3&&step==1">
                        <el-checkbox label="1">已确认使用账号<span class="ui-red">{{wangwang}}</span>完成加购第一阶段任务</el-checkbox>
                        <el-checkbox label="2">已确认货比加购宝贝</el-checkbox>
                        <el-checkbox label="3">已确认浏览方式符合商家任务要求</el-checkbox>
                    </el-checkbox-group>
                     <!-- <el-checkbox-group class="checkbox-group" v-model="checkList" v-if="type ==5">
                        <el-checkbox label="1">已确认使用账号<span>{{wangwang}}</span>完成加购第一阶段任务</el-checkbox>
                        <el-checkbox label="2">已确认货比加购宝贝</el-checkbox>
                        <el-checkbox label="3">已确认浏览方式符合商家任务要求</el-checkbox>
                    </el-checkbox-group> -->
                </div>
                
                 <div class="good-next ui-row" >
                    <div class="ui-col-6" v-if="!(type == 3 && step == 2)">
                        <button class="giveup"  @click="giveup()">放弃</button>
                    </div>
                     <div class="ui-col-6" v-if="!(type == 3 && step == 2)">
                        <button class="accept"  @click="nextStep()">提交任务</button>
                    </div>
                     <div class="ui-col-12" v-if="type == 3 && step == 2">
                        <button class="accept"  @click="nextStep()">提交任务</button>
                    </div>
                </div>
                  <div class="red-tips" v-if="type ==3&&step==1">
                         第二阶段付款阶段将在{{good.pay_time_continue}}继续开放，请及时登录平台继续操作
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
            servicer:'',
            order_id:'',
             bounce:{
                top:false,
                bottom:false,
                left:false,
                right:false
            },
            good:'',
            type:0,
            step:0,
            wangwang:'',
            question_content:'',
            answerlen:0,
            timer:null,
            timer_n:3599,
            count_down:'05:00',
            checkList:[],
            order_number:'',
            order_price:'',
            scroll_data:true,
        }
    },
    created(){
       util.loading(false);
         this.servicer = YsConfigJs.getCache('servicer')?YsConfigJs.getCache('servicer'):'无';
        this.order_id = this.$route.params.id;
         this.type = this.$route.query.type;
         this.step = this.$route.query.step;
        if(this.type == 1){
            this.pay_commit();
        }else if(this.type == 2){
            this.browse_commit();
        }else if(this.type == 3 && this.$route.query.step == 1){
            this.labelOne_commit();
        }else if(this.type == 3 && this.$route.query.step == 2){
            this.labelTwo_commit();
        }else if(this.type == 4){
             this.link_commit();
        }else if(this.type == 5){
            this.key_commit();
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
         getLoad(){
            this.scroll_data = !this.scroll_data;
        },
          //补零
        toDub(n){
            return n<10?"0"+n:""+n;
        },
        pay_commit(){
            MainService.pay_commit({
                order_id:this.order_id
            })
            .then(res=>{
                 this.public_commit(res);
            });
        },
        browse_commit(){
             MainService.browse_commit({
                order_id:this.order_id
            })
            .then(res=>{
               this.public_commit(res);
            });
        },
        labelOne_commit(){
             MainService.label_commitOne({
                order_id:this.order_id
            })
            .then(res=>{
                this.public_commit(res);
            });
        },
        labelTwo_commit(){
             MainService.label_commitTwo({
                order_id:this.order_id
            })
            .then(res=>{
                if(res.code == 1){
                    util.closeLoading();
                    this.good = res.data.orderplanfind;
                    this.wangwang = res.data.wangwang;
                    const time1 = parseInt(new Date().getTime()/1000);
                    this.timer_n = res.data.orderplanfind.purchase_end_time - time1>0?res.data.orderplanfind.purchase_end_time - time1:0;
                    this.count_down = this.get_timer(this.timer_n);
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
        link_commit(){
            MainService.link_commit({
                order_id:this.order_id
            })
            .then(res=>{
                this.public_commit(res);
            });
        },
        key_commit(){
             MainService.key_commit({
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
                    }else  if(this.type == 3){
                        util.alert({
                            content:'加购单浏览阶段<br>切记勿付款',
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
            publicJs.tb_give_up(this.order_id,overtime);
        },
        public_next(res){
            if(res.code == 1){
                clearInterval(this.timer);
                if(this.type == 3 && this.step == 1){
                    const time = new Date(this.good.endTime * 1000).toLocaleString('chinese', { hour12: false });
                    util.alert({
                        content:'第二阶段将在'+time+'之后结束,请尽快完成',
                        define:()=>{
                             this.$router.push('/main');
                        }
                    })
                }else{
                    util.toast({
                        content:res.msg,
                        times:1000
                    });
                    this.$router.push('/main');
                }
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
        nextStep(){
           if(this.checkList.length < 3){
               util.alert({
                    content:'请仔细阅读<br>注意事项并勾选',
                    define:()=>{}
                }) 
           } else {
               console.log(this.type);
               switch(this.type){
                   case '1': 
                        MainService.pay_complete({
                            order_id:this.order_id,
                            buyer_target_number:this.order_number,
                            buyer_target_price:this.order_price
                        }).then(res=>{
                            this.public_next(res);
                        });break;
                    case '2': 
                        MainService.browse_complete({
                            order_id:this.order_id,
                        }).then(res=>{
                            this.public_next(res);
                        });break;
                    case '3': 
                        if(this.step == 1){
                            MainService.label_completeOne({
                                order_id:this.order_id,
                            }).then(res=>{
                                this.public_next(res);
                            })
                        }else{
                             MainService.label_completeTwo({
                                order_id:this.order_id,
                                buyer_target_number:this.order_number,
                                buyer_target_price:this.order_price
                            }).then(res=>{
                                this.public_next(res);
                            })
                        }
                        break;
                    case '4':
                         MainService.link_complete({
                            order_id:this.order_id,
                            buyer_target_number:this.order_number,
                            buyer_target_price:this.order_price
                        }).then(res=>{
                            this.public_next(res);
                        });break;
                     case '5':
                         MainService.key_complete({
                            order_id:this.order_id,
                            buyer_target_number:this.order_number,
                            buyer_target_price:this.order_price
                        }).then(res=>{
                            this.public_next(res);
                        });break;
               }
             
           }
        }
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
         .note{
            background-color: white;
            border-radius: 0.5rem;
            width: 96%;
            margin: 0.8rem auto 0.8rem auto;
            padding-bottom: 0.8rem;
             img{
                 display: block;
                width: 97%;
                margin:auto;
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