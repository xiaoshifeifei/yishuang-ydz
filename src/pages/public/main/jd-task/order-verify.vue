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
                <div class="goods" v-if="good!=''">
                    <div class="title">
                        <i class="el-icon-s-promotion"></i>商品详情
                    </div>
                    <uiMosaic class="mosaic" :image="good.goods_image" @load='getLoad()'></uiMosaic>
                    <div>
                        <div class="item">
                            手淘搜索付款人数：{{good.goods_pay_qty}}人付款
                        </div>
                         <div class="item">
                           关键词：<span>{{good.keywords}}</span>
                        </div>
                         <div class="item">
                            此宝贝在此关键词下的大概排名：{{good.sort}}
                        </div>
                         <div class="item">
                           展示价格：{{good.goods_price}}元
                        </div>
                         <div class="item">
                            地区：{{good.goods_location}}
                        </div>
                          <div class="item">
                           操作旺旺：{{wangwang}}
                        </div>
                    </div>
                </div>
                <div class="tips">
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
                           浏览单,切勿付款
                        </div>
                    </div>
                    <div class="item" v-if='good.order_type == 1'>
                         <div class="left">
                            购买件数：
                        </div>
                        <div class="right">
                            {{good.goods_qty}}件
                        </div>
                    </div>
                     <div class="item" v-if='good.order_type == 2'>
                        <div class="left">
                            操作要求：
                        </div>
                        <div class="right" >
                            <span v-if='good.collects==1'>收藏</span>
                            <span v-if='good.shoppings==1'>加购</span>
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
                    <img v-if="type==1" :src="good.release_note_img" alt="" @load='getLoad()'>
                 </div>
                 <div class="collate">
                    <div class="title">
                       <i class="el-icon-question"></i>商品核对
                    </div>
                    <p v-if="good.order_type == 1">商品规格:<span>{{good.goods_sku}}</span></p>
                    <textarea class="textarea" v-model="textarea_content" name="" id=""  rows="3">

                    </textarea>
                   <el-button class="el-button"  @click="verify($event)"><span>核对</span></el-button>
                     <div class="tips">
                         温馨提示：<br/>
                        √ 点击分享可以获取完整京东链接<br/>
                        √ 苹果手机请长按产品名即可复制产品链接验证；
                    </div>
                </div>
                <div class="good-next ui-row" >
                    <div class="ui-col-6">
                        <button class="giveup"  @click="giveup()">放弃</button>
                    </div>
                     <div class="ui-col-6">
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
        if(this.type == 1){
            this.buy_order();
        }else if(this.type == 2){
            this.browse_order();
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
        /**
         * 垫付单页面获取
         */
        buy_order(){
             MainService.jdverify_pay({
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
             MainService.jdverify_browse({
                order_id:this.order_id
            })
            .then(res=>{
                this.public_order(res);
            });
        },
        public_order(res){
            if(res.code == 1){
                 util.closeLoading();
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
            MainService.jdconfirm_Url({
                order_id:this.order_id,
                confirm_content:this.textarea_content
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
        giveup(overtime){
            if(!overtime){
                 clearInterval(this.timer);
            }
            publicJs.jd_give_up(this.order_id,overtime);
        },
        nextStep(){
            if(!this.isVerify){
                 util.alert({
                    content:'请先核对商品答案<br>核对通过即可<br>点击下一步',
                    define:()=>{}
                })
                return;
            }
            MainService.jdconfirm_UrlNext({
                order_id:this.order_id
            }).then(res=>{
                if(res.code == 1){
                    clearInterval(this.timer);
                    this.$router.push('/jdanswer-question/'+this.order_id+'?type='+this.type);
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
                height: 2.5rem;
                padding:0 0.3rem;
                line-height: 2.5rem;
                border-bottom: 0.05rem solid rgb(230,230,230);
                 span{
                    display: inline-block;
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
            img{
                  width:95%;
                   display: block;
                   margin:auto;
                   border-radius: 1rem;
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
        }
        .collate{
            background-color: white;
            border-radius: 0.5rem;
            width: 96%;
            margin:auto;
            p{
                font-size: 0.9rem;
                height: 2rem;
                line-height: 2rem;
                margin-left: 0.8rem;
                span{
                    color:#ffc125;
                    font-size: 0.85rem;
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