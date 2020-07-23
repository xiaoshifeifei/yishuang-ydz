<template>
    <div id="grab-center">
         <uiTitle class="title" ref="title" :isback="false" :title="title" :fontcolor="'white'">
             <i class="el-icon-arrow-left" @click='back()'></i>
         </uiTitle>
         <div class="ui-grab">
             <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
             <div class='time'>{{load_time}}</div>
         </div>
    </div>
</template>
<script>
import  YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util.js'
import  uiTitle from '../../../components/title-bar/title-bar';
import  MainService from './main.http'
import publicJs from './public'
export default {
    components:{
        uiTitle,
    },
    data(){
        return{
            title:"快速抢单",
            router_id:'',
            timer:null,
            load_time:'',
            timer_n:0,
            timer_s:0,
            timer_out:null,
            order_id:'',
            can_back:false,
            get_order:null,
        }
    },
    created(){
        this.router_id = this.$route.params.id;
        if(this.router_id == 0){
            this.title = "淘宝抢单"
        }else if(this.router_id == 1){
            this.title = "京东抢单"
        }else{
            this.title = "快速抢单"
        }
        Promise.all([ MainService.get_interface(),MainService.get_unfinishedTask()])
        .then((res)=>{
            if(res[1].code == 1){
                if(res[1].data.userError!=null){
                    util.alert({
                        content:res[1].data.userError,
                        define:()=>{
                            if(res[0].code == 1){
                                this.timer_grab(res[0].data);
                            }else{
                                clearInterval( this.timer);
                                clearTimeout(this.timer_out);
                                util.routerBack();
                            }
                        }
                    })
                }else{
                    if(res[0].code == 1){
                        this.timer_grab(res[0].data);
                    }else{
                        util.alert({
                            content:res[0].msg+'请重试',
                            define:()=>{
                                clearInterval( this.timer);
                                clearTimeout(this.timer_out);
                                 util.routerBack();
                            }
                        }) 
                    }
                }   
            }else{
                publicJs.unfinishedTask(res[1],1);
            }      
        })
    },
    mounted(){
        this.load_time = this.get_timer(this.timer_n);
        window.addEventListener("popstate", ()=>{
            clearInterval( this.timer);
            clearTimeout(this.timer_out);
        });
    },
    methods:{
        get_timer(n){
            const s = parseInt(n%60);
            const m = parseInt(n/60);
            return this.toDub(m) + ':' + this.toDub(s);
        },
          //补零
        toDub(n){
            return n<10?"0"+n:""+n;
        },
        timer_grab(token){
            this.grab(token,0);
            this.timer = setInterval(() => {
                this.timer_n++;
                this.load_time = this.get_timer(this.timer_n);
                if(this.timer_n%5 == 0){
                     this.grab(token,this.timer_n);
                }
                if((this.timer_n/5)>2){
                    this.can_back = true;
                }                
            }, 1000);
            this.timer_out = setTimeout(()=>{
                clearInterval( this.timer);
                this.cancel_order(this.order_id);
                util.alert({
                    content:'抢单超时<br>自动返回',
                    define:()=>{
                        util.routerBack();
                    }
                }) 
            },180000);
        },
        grab(token,timer_n){
             switch(this.router_id){
                case '0':this.tb_grab(token);break;
                case '1': this.jd_grab(token);break;
                case '2': this.center_grab(token,timer_n);break;
            }
        },
        back(){
            if(this.can_back){
                util.comfirm({
                    content:'退出抢单大厅<br>将停止抢单',
                    button:['继续抢单','残忍离开'],
                    define:()=>{},
                    cancel:()=>{
                        clearInterval( this.timer);
                        clearTimeout(this.timer_out);
                        util.routerBack();
                    }
                });
            }else{
                 util.toast({
                    content:'正在努力抢单中，请勿离开',
                    times:1000
                }); 
            }
        },
      
        /**
         * 淘宝抢单
         */
        tb_grab(token){
             MainService.tb_grab(token)
            .then(res=>{
                //this.can_back = true;
                if(res.code == 1){
                    clearInterval( this.timer);
                    this.order_id = res.data.id;
                    this.get_order = 0;
                    const msg = this.order_type(res.data.order_type,res.data.is_new);
                    util.comfirm({
                        content:msg,
                        button:['查看任务','残忍离开'],
                        define:()=>{ 
                            clearTimeout(this.timer_out);
                            this.$router.push('/browse-order/'+res.data.id);
                        },
                        cancel:()=>{
                            this.cancel_order(res.data.id);
                        }
                    });
                }else{
                     this.grab_back(res)
                }
            })
        },
        clear_all(){
            clearInterval( this.timer);
            clearTimeout(this.timer_out);
        },
        grab_back(res){
            switch(res.code){
                case 6004 : 
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            this.clear_all();
                            this.$router.push('/bind-accout');
                        }
                    });break;
                case 6003:
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            this.clear_all();
                            this.$router.push('/master-exam/2');
                        }
                    });break;
                case 6002:
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            this.clear_all();
                            this.$router.push('/debit-card-detail/0');
                        }
                    });break;
                case 6001:
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            this.clear_all();
                            util.routerBack();
                        }
                    });break;
                case 6000:
                     if(this.timer_n>60&&this.timer_s == 0||this.timer_n>120&&this.timer_s == 1){
                        util.comfirm({
                            content:res.msg,
                            button:['继续抢单','离开'],
                            define:()=>{
                                this.timer_s++;
                            },
                            cancel:()=>{
                                this.clear_all();
                                util.routerBack();
                            }
                        });
                     }
                    break;
                default: 
                    this.clear_all();
                    util.alert({
                        content:res.msg,
                        define:()=>{
                           util.routerBack();
                        }
                    });break;
            }
        },
        /**
         * 京东抢单
         */
        jd_grab(token){
             MainService.jd_grab(token)
            .then(res=>{
                //this.can_back = true;
                if(res.code == 1){
                    clearInterval( this.timer);
                     this.get_order = 1;
                    this.order_id = res.data.id;
                    const msg = this.order_type(res.data.order_type,res.data.is_new);
                    util.comfirm({
                        content:msg,
                        button:['查看任务','残忍离开'],
                        define:()=>{
                            clearTimeout(this.timer_out);
                            this.$router.push('/jdbrowse-order/'+res.data.id);
                        },
                        cancel:()=>{
                            this.cancel_order(res.data.id);
                        }
                    });
                }else{
                    this.grab_back(res)
                }
            })
        },
        /**
         * 快速抢单
         */
        center_grab(token,timer_n){
            if(timer_n%10 == 0){
                this.tb_grab(token);
            }else{
                 this.jd_grab(token);
            }
        },

        order_type(type,isNew){
            let ty_msg ='';
            switch (type){
                case 1: ty_msg ='垫付';break;
                case 2: ty_msg ='浏览';break;
                case 3: ty_msg ='加购';break;
                case 4: ty_msg ='扫码多链接';break;
                case 5: ty_msg ='关键词多链接';break;
            }
            return '恭喜你，抢到了<br/>普通'+ty_msg+'单<br/><p style="font-size:0.75rem;color:#9c9c9c">当日累计三次拒绝<br/>会被限制接单三个小时</p>';
        },
        cancel_order(id){
            clearTimeout(this.timer_out);
            util.toast({
                content:'放弃任务中',
            });
            if(this.get_order == 0){
                MainService.giveup_order({
                    order_id:id
                })
                .then(res=>{
                    util.toast({
                        content:res.msg,
                        times:1000
                    });
                    this.$router.push('/main');
                });
            }else if(this.get_order == 1){
               MainService.jdgiveup_order({
                    order_id:id
                })
                .then(res=>{
                    util.toast({
                        content:res.msg,
                        times:1000
                    });
                    this.$router.push('/main');
                });
            }
        },
    }
}
</script>
<style lang="less" scoped>
#grab-center{
    z-index: 2;
    position: relative;
    background-color: #FFC125;
    background-image:
    radial-gradient(circle 30px at 20% 10%, #FFC125 0 20%, transparent),
    radial-gradient(circle 40px at 20% 10%, #FFD700 70%, transparent),
    radial-gradient(circle 30px at 40% 60%, #FFC125 0 20%, transparent),
    radial-gradient(circle 35px at 40% 60%, #FFEC8B 0 70%, transparent),
    radial-gradient(circle 50px at 80% 40%, #FFC125 0 20%, transparent),
    radial-gradient(circle 55px at 80% 40%, #FFD700 0 70%, transparent);
    .title{
        position: relative;
        i{
            position: absolute;
            bottom:0.5rem;
            left: 1rem;
            width:2rem;
            height: 2rem;
            line-height: 1.5rem;
            border-radius: 100px;
            font-size: 2rem;
            color:white;
        }
    }
    .ui-grab{
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%,-50%);
        background-color: #FFEC8B;
        border-radius: 100%;
        width:10rem;
        height: 10rem;
        overflow: hidden;
        .time{
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate(-50%,-50%);
            font-size: 1.6rem;
            font-weight: 700;
        }
    }
    .lds-ring {
        display: inline-block;
        position: relative;
        width:10rem;
        height: 10rem;
        div{
             box-sizing: border-box;
            display: block;
            position: absolute;
            width: 10rem;
            height: 10rem;
            // margin: 1rem;
            border: 8px solid #fff;
            border-radius: 50%;
            transform:rotate(-45deg);
            animation: lds-ring 1.2s infinite ;
            border-color: white transparent transparent transparent;
        }
         div:nth-child(1) {
            animation-delay:-0.1s //-0.45s;
        }
        div:nth-child(2) {
            animation-delay:-0.2s//-0.3s;
        }
        div:nth-child(3) {
            animation-delay:-0.3s //-0.15s;
        }
          @keyframes lds-ring {
            0% {
                transform: rotate(-45deg);
            }
            80%{
                transform: rotate(315deg);
            }
            100% {
                transform: rotate(315deg);
            }
        }
    }

  


}
</style>