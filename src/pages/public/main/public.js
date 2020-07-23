import util from '../../../dora/util'
import  MainService from './main.http'
import router from 'pages/router/router.js'
const publicJs = {
    jd_give_up(orderid,overtime=false){
        if(overtime){
            MainService.jdgiveup_order({
                order_id:orderid
            })
            .then(res=>{
                if(res.code == 1){
                    util.alert({
                        content:'订单超时<br>视为自动放弃',
                        define:()=>{ 
                            router.push('/main');
                        }
                    })
                }else{
                    util.alert({
                        content:res.msg,
                        define:()=>{ 
                            router.push('/main');
                        }
                    })
                }
            });
        }else{
            util.comfirm({
                content:'确认放弃订单？',
                define:()=>{
                    MainService.jdgiveup_order({
                        order_id:orderid
                    })
                    .then(res=>{
                        if(res.code == 1){
                            util.toast({
                                content:res.msg,
                                times:1000
                            });
                            router.push('/main');
                        }else{
                            util.alert({
                                content:res.msg,
                                define:()=>{ 
                                    router.push('/main');
                                }
                            })
                        }
                    });
                },
                cancel:()=>{}
            });
        }
    },
    tb_give_up(orderid,overtime=false){
        if(overtime){
            MainService.giveup_order({
                order_id:orderid
            })
            .then(res=>{
                if(res.code == 1){
                    util.alert({
                        content:'订单超时<br>视为自动放弃',
                        define:()=>{ 
                            router.push('/main');
                        }
                    })
                }else{
                    util.alert({
                        content:res.msg,
                        define:()=>{ 
                            router.push('/main');
                        }
                    })
                }
            });
        }else{
            util.comfirm({
                content:'确认放弃订单？',
                define:()=>{
                    MainService.giveup_order({
                        order_id:orderid
                    })
                    .then(res=>{
                        if(res.code == 1){
                            util.toast({
                                content:res.msg,
                                times:1000
                            });
                            router.push('/main');
                        }else{
                            util.alert({
                                content:res.msg,
                                define:()=>{ 
                                    router.push('/main');
                                }
                            })
                        }
                    });
                },
                cancel:()=>{}
            });
        }
      
    },
    unfinishedTask(res,url){
        switch(res.code){
            case 201:   //淘宝待操作任务
                this.comfirm(res.msg,url)
                .then(()=>{
                    if(res.data.order.pass == 1){
                        router.push('/order-verify/'+res.data.order.id+'?type='+res.data.order.order_type+'&step=1');
                    }else if(res.data.order.pass == 2){
                        router.push('/answer-question/'+res.data.order.id+'?type='+res.data.order.order_type+'&step=1');
                    }else if(res.data.order.pass == 3){
                        router.push('/pay-commit/'+res.data.order.id+'?type='+res.data.order.order_type+'&step=1');
                    }else if(res.data.order.pass == 4){
                        router.push('/browse-order/'+res.data.order.id);
                    }else if(res.data.order.pass == 5){
                        router.push('/order-verify/'+res.data.order.sonData.id+'?type='+res.data.order.sonData.order_type+'&step=1');
                    }else if(res.data.order.pass == 6){
                        router.push('/answer-question/'+res.data.order.sonData.id+'?type='+res.data.order.sonData.order_type+'&step=1');
                    }
                })
                break;
            case 203 :
                 this.comfirm(res.msg,url)
                 .then(()=>{
                     if(res.data.order.order_method == 0){
                        router.push('/pay-commit/'+res.data.order.id+'?type=3&step=2');
                     }else if(res.data.order.order_method == 1){
                        router.push('/answer-question/'+res.data.order.id+'?type=3&step=2');
                     }else{
                        router.push('/order-verify/'+res.data.order.id+'?type=3&step=2');
                     }
                 })
                break;
            case 204: 
                 this.comfirm(res.msg,url).then(()=>{
                    router.push('/appraise-order/'+res.data.order);
                 })
                ;break;
            case 205:
                this.comfirm(res.msg,url).then(()=>{
                    router.push('/take-over/'+res.data.order);
                })
                break;
            case 211: 
                this.comfirm(res.msg,url)
                .then(()=>{
                    if(res.data.order.order_accept_time==0){
                        router.push('/jdbrowse-order/'+res.data.order.id);
                    }else if(res.data.order.pass == 1){
                        router.push('/jdorder-verify/'+res.data.order.id+'?type='+res.data.order.order_type);
                    }else if(res.data.order.pass == 2){
                        router.push('/jdanswer-question/'+res.data.order.id+'?type='+res.data.order.order_type);
                    }else if(res.data.order.pass == 3){
                        router.push('/jdpay-commit/'+res.data.order.id+'?type='+res.data.order.order_type);
                    }else if(res.data.order.pass == 4){
                        router.push('/jdbrowse-order/'+res.data.order.id);
                    }
                })
                break;
            case 212:
                this.comfirm(res.msg,url).then(()=>{
                    router.push('/jdappraise-order/'+res.data.order);
                 })
                ;break;

        }
    },
    comfirm(msg,url){
        return new Promise(resolve=>{
            util.comfirm({
                content:msg+'前往继续',
                define:()=>{
                    resolve(true);
                },
                cancel:()=>{
                    if(url==1){
                        router.push('/main');
                    }
                }
             });
        });
    },
}
export default publicJs;