<template>
    <div id="app" v-on:touchstart="bodyTouchStart" v-on:touchmove="bodyTouchMove" v-on:touchend="bodyTouchEnd">
        <transition :name="direction">    
            <keep-alive v-if='$route.meta.keepAlive'>
                <router-view class="appView" />
            </keep-alive>
            <router-view v-if='!$route.meta.keepAlive' class="appView" />
        </transition>
        <uiPop :type="type" @close="close" :content="content" v-if="msg == 'pop'"></uiPop>
        <uiToast :content="content" v-else-if="msg == 'toast'"></uiToast>
        <uiLoading  :class="{'load-left':direction=='slide-left','load-right':direction=='slide-right'}" :loadback="loadback" v-if="msg == 'loading'"></uiLoading>
    </div>
</template>

<script>
import Api from '../../../dora/api.js'
import YsConfigJs from '../../../dora/ys.config'
import util from '../../../dora/util'
import  uiPop from '../../../components/pop-bar/pop-bar';
import  uiToast from '../../../components/toast-bar/toast-bar';
import  uiLoading from '../../../components/loading-bar/loading-bar';
export default {
    name:'App',
    components:{
        uiPop,
        uiToast,
        uiLoading
    },
    data(){
        return{
            type:0,
            content:{},
            direction: "slide-left",
            msg:'',
            // touchLeft 划动起点界限，起点在靠近屏幕左侧时才有效
            touchLeft:0,
            // touchStartPoint 记录起始点X坐标
            touchStartPoint:0,
            // distance 记录划动的距离
            distance: 0,
            // 回退按钮的dom，根据页面上是否存在此dom来判断该路由是否可回退
            backBtn: null,
            timer:null,
            loading_time:0,
            loadback:true
        }
    },
    beforeCreate(){
       
        // if(YsConfigJs.isSafari()){
        //     alert(1);
            // window.onload = function() {
            // setTimeout(function() {
            //     window.scrollTo(0, 1)
            //         }, 0);
            // }
       //}
        
    },
    created(){
        if(!YsConfigJs.getCache("isapp")){
             YsConfigJs.setCache('isapp',false);
        }else{
            if(YsConfigJs.getCache("safeTop")){
                 this.$store.dispatch("setSafeTop",YsConfigJs.getCache("safeTop"));
            }  
        }
        if(YsConfigJs.get_token()){
            this.$store.dispatch("setIsLogin",true);
        }
        const that = this;
        window.apiready = function() {
            YsConfigJs.setCache('isapp',true);
            Api.setStatusBarStyle();
            that.$store.dispatch("setSafeTop",Api.fixStatusBar());
            if(!YsConfigJs.getCache('safeTop')){
                 YsConfigJs.setCache('safeTop',that.$store.state.safeTop);
            }
            console.log("屏幕刘海高度="+that.$store.state.safeTop,"屏幕底部高度="+that.$store.state.safeBottom);
        }
        window.addEventListener('beforeunload',()=>{
            YsConfigJs.setCache('router',this.$store.state.router);
        });
        //  window.onload=function(){ 
        //     setTimeout(function() { 
        //         window.scrollTo(0, 1) 
        //     }, 0); 
        // }; 
        // window.onscroll = function(){
        //      var top = document.documentElement.scrollTop;//.scrollTop;
        //      console.log(top);
        // }
    },
    mounted(){      
        this.touchLeft = (document.documentElement.clientWidth)/4;
        // alert(document.getElementById("app").offsetTop);
    },
    methods:{
        alert(params){
            this.msg = 'pop';
            this.type=1;
            this.content = params;
        },
        comfirm(params){
            this.msg = 'pop';
            this.type=2;
            this.content = params;
        },
        close(){
          this.type=0;
           this.msg = '';
        },
        get_offsetTop(){
           return document.getElementById("ui-app").offsetTop;
        },
        toast(params){
            this.msg = 'toast';
            this.content = params;
            if(params.times){
                setTimeout(()=>{
                   if(this.msg == 'toast'){
                        this.msg = ''; 
                   }
                },params.times);
            }
        },
        closeToast(){
            this.msg = '';
        },
        loading(back){
            this.msg = 'loading';
            this.loadback = back;
            this.timer = setInterval(()=>{
                this.loading_time++;
                if(this.loading_time>=45&&this.msg == 'loading'){
                    clearInterval(this.timer);
                    this.loading_time = 0;
                    this.msg = '';
                }
            },1000/60);
          
        },
        closeLoading(){      
            if(this.loading_time>=40){
                clearInterval(this.timer);
                this.loading_time = 0;
                this.msg = '';
            }else{
               setTimeout(()=>{
                    clearInterval(this.timer);
                    this.loading_time = 0;
                    this.msg = '';
               },(40-this.loading_time)*17);
            }
        },
        bodyTouchStart: function(event) {
            this.backBtn = document.getElementById("navback");
            const alias = this.$route.meta.alias.split('-');
            //alert( event.targetTouches[0].pageY);
            if (this.backBtn) {
                 // 获得起点X坐标，初始化distance为0
                 this.touchStartPoint = event.targetTouches[0].pageX;
                
                 this.distance = 0;
             }
         },
        bodyTouchMove: function(event) {
             if (this.backBtn && this.touchStartPoint < this.touchLeft) {
                 // 只监听单指划动，多指划动不作响应
                 if (event.targetTouches.length > 1) {
                    return;
                 }
                 // 实时计算distance
                 this.distance = event.targetTouches[0].pageX - this.touchStartPoint;
                 // 根据distance在页面上做出反馈。这里演示通过返回按钮的背景变化作出反馈
                //  if (this.distance > 0 && this.distance < 100) {
                //     this.backBtn.style.backgroundPosition = ((this.distance - 100) / 100) * 50 + "px 0";
                //  } else if (this.distance >= 100) {
                //      this.backBtn.style.backgroundPosition = "0 0";
                //  } else {
                //      this.backBtn.style.backgroundPosition = "-50px 0";
                //  }
             }
        },
        bodyTouchEnd: function(event) {
             if (this.backBtn && this.touchStartPoint < this.touchLeft) {
                 // 划动结束，重置数据
                this.touchStartPoint = 0;
                // this.backBtn.style.backgroundPosition = "-50px 0";
                // 当划动距离超过100px时，触发返回事件
                if (this.distance > 80) {
                    this.$router.back();
                 }
            }
        }
    },
    watch:{
          $route(to, from) {  
            if(from.name==null&&YsConfigJs.getCache('router')!=[]){
                this.$store.dispatch("setRouter",YsConfigJs.getCache('router'));
            }
            const fromAlias = from.meta.alias?from.meta.alias.split('-'):0;
            const toAlias = to.meta.alias?to.meta.alias.split('-'):0;
            if (toAlias[0]==fromAlias[0] && toAlias[0]=='commerce') { 
      
            }else if(toAlias[0] != 'footer'){
                this.$store.dispatch("pushRouter",{name:to.name,path:to.path,meta:to.meta});
            }
            if(toAlias[0] == fromAlias[0] && toAlias[0] == 'footer') {
                this.direction='';
            }else if(toAlias[0] == 'footer'){
                this.direction = "slide-right";
                YsConfigJs.clearHistory();
            }else if(to.name == from.name){
                this.direction='';
            }else{
                const toIndex = this.$store.state.router.findIndex((value)=>{ return value.name == to.name });
                const fromIndex = this.$store.state.router.findIndex((value)=>{return value.name == from.name });
                if(toIndex < fromIndex){
                    this.direction = "slide-right";  
                }else if(toIndex > fromIndex){
                    this.direction = "slide-left";
                }else{
                    this.direction='';
                }
            }
        }
    },
}
</script>
<style lang="less">
@import url("/src/assets/css/iconfont.css");
#app{
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    position: absolute;
    top:0;
    left: 0;
    bottom:0;
    width: 100%;
    height: 100vh;
}
.appView {
    position: absolute;
    top:0;
    left: 0;
    bottom:0;
    width: 100%;
    height: 100%;
    background-color: rgb(245,245,245);
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-enter-active{
    transition: transform 0.4s linear;
}
.slide-left-leave-active {  
    transition: transform 0.4s linear;
}
.slide-right-leave-active {
    transition: transform 0.4s linear;
    transform: translate(100%, 0);
    z-index: 10000;
}
.load-left{
    animation: loading-left 0.25s linear;
}
@keyframes loading-left{
    0%{
        transform: translateX(100%);
    }
    100%{
        transform: translateX(0);
    }
}
.load-right{
    animation: loading-right 0.3s linear;
}
@keyframes loading-right{
    0%{
        transform: translateX(-100%);
    }
    100%{
        transform: translateX(0);
    }
}

</style>