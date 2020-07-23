<template>
    <div id="scroll" ref="wrapper" v-on:touchstart="bodyTouchStart" v-on:touchmove="bodyTouchMove" v-on:touchend="bodyTouchEnd">
        <div class="scroll-main" :style="{backgroundColor:backcolor}">    
            <slot></slot>
        </div>
         <div class="loading" id="loading" v-if="uiPull">
             <div class="lds-ring" v-if="!touch"><div></div><div></div><div></div><div></div></div>
              <div id="refresh" v-if="touch" class="refresh">
                <i class="el-icon-refresh"></i>
            </div>
         </div>
        <!-- <div class="ui-top" @click='go_top()'>
            <i class="iconfont icon-fanhuidingbu" ></i>
        </div> -->
    </div>
</template>
<script>
import YsConfigJs from '../../dora/ys.config'
import util from '../../dora/util'
import BScroll from 'better-scroll'
export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      uiPull:{
            type: Boolean,
            default: false
      },
      backcolor:{
          type:String,
          default:'transparent'
      },
      probeType: {
        type: Number,
        default: 2
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
       /**
       * 是否开启纵向滚动
       */
      scrollY: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: true
      },
      /**
       * 列表的数据
       */
      data: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      },
     
    //   bounce:{
    //        type: Boolean,
    //         default: true
    //   },
       stopPropagation:{
          type:Boolean,
          default:false
      },
    
      bounce:{
        type:[Object,Array],
        default:()=>({
            top:false,
            bottom:true,
            left:false,
            right:false
        })
      },
      pullDownRefresh:{
           type:[Object,Array],
           default:()=>({
              threshold:20,
              stop:0
          })
      },
      scroll_to:{
          type:Array,
          default:()=>([true,0])
      },
      disable_d:{
          type:Boolean,
          default:false
      },
      taps: true
    }, 
    data(){
        return{
             preventDefault:{
                type:Boolean,
                default:true
            },
            touchTop:300,
            touch:false,
            //  touchTop:0,
            // touchStartPoint 记录起始点X坐标
            touchStartPoint:0,
            // distance 记录划动的距离
            distance: 0,
            // 回退按钮的dom，根据页面上是否存在此dom来判断该路由是否可回退,
            posY:0
        }
    },
    created() {
      // 保证在DOM渲染完毕后初始化better-scroll
       this.$nextTick(() => {  //异步初始化better-scroll
            setTimeout(() => {
                this._initScroll()
            }, 20)
        })
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // if(YsConfigJs.getCache('isapp')){
        //     this.preventDefault = false;
        // }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            click: this.click,
            scrollX: this.scrollX,
            scrollY: this.scrollY,
            pulldown:this.pulldown,
            pullup:this.pullup,
            bounce:this.bounce,
            taps:this.taps,
            mouseWheel: true,
            bindToWrapper:true,
            preventDefault:true,
            pullDownRefresh:{
                threshold:50,//触发pullingDown事件的位置
                stop:0//下拉回弹后停留的位置
            },
            preventDefaultException: { tagName: /^(IMG|INPUT|TEXTAREA|BUTTON|SELECT)$/ }
        })
        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
              this.posY = pos.y;
                this.scroll.hasVerticalScroll = true
                this.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
            this.finishPullup = true,
            this.scroll.on('scroll', (pos) => {

            // 滚动到底部
            if ((pos.y <= (this.scroll.maxScrollY + 50)) && this.finishPullup) {
                 this.finishPullup = false;
                this.$emit('scrollToEnd',0);
                this.scroll.on('scrollEnd', (pos) => {
                // 滚动到底部
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {  
                        this.$emit('scrollToEnd',1);
                    }
                })
            }
          })
            
        }
        if(this.disable_d){
            this.disable();
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {   
              this.$emit('pulldown')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      destroy(){
           this.scroll && this.scroll.destroy()
      },
        bodyTouchStart: function(event) {
           this.touch = true;
            if(this.uiPull){
                this.touchStartPoint = event.targetTouches[0].pageY;
                 //console.log(this.touchStartPoint)
                 this.distance = 0;
            }
         },
        bodyTouchMove: function(event) {
            if (this.uiPull &&this.touchStartPoint<this.touchTop&&(this.posY==0)) {
                 // 只监听单指划动，多指划动不作响应
                 if (event.targetTouches.length > 1) {
                    return;
                 }
                 // 实时计算distance
                 this.distance = event.targetTouches[0].pageY - this.touchStartPoint;
                 if( this.distance<80){
                      document.getElementById("loading").style.top = this.distance-135+'px';
                 }else{
                      document.getElementById("loading").style.top ='-55px';
                 }
             } 
        },
        bodyTouchEnd: function(event) {
              this.touch = false;
             if (this.uiPull) {
                 // 划动结束，重置数据
                 if(this.distance>50 &&this.touchStartPoint<this.touchTop){
                    this.touchStartPoint = 0;
                    this.$emit('uiPullData');
                 }else{
                    document.getElementById("loading").style.top = -135+'px';
                 }
         
            }
        }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
          if(this.uiPull){
              document.getElementById("loading").style.top ='-135px';
          }
        setTimeout(() => {
          this.refresh();
           if(!this.finishPullup){
              this.finishPullup = true;
          }
        }, this.refreshDelay)
      },
      scroll_to(newVal,oldVal){
         this.scrollTo(0,newVal[1],1000);
      }
    },
    destroyed(){
       this.disable();
       this.destroy();
    }
}
</script>
<style lang="less" scoped>
#scroll{
    position: relative;
    .loading{
        position: absolute;
        top:-135px;
        width:40px;
        left: 50%;
        height: 135px;
        transform: translateX(-50%);
        text-align: center;
        color:white;
          z-index:1;
        .refresh{
            position: absolute;
            width: 2rem;
            color:white;
            height: 2rem;
            bottom: 0px;
            left: 50%;
            background-color: rgba(100,100,100,0.5);
            border-radius: 1rem;
           text-align: left;
            transform: translateX(-50%);
            //text-align: center;
            i{
                position: absolute;
                top:0.1rem;
               font-size: 2rem;
               font-weight: 700;
            }
        }
    }
    .scroll-main{
        position: relative;
        background-color: #f5f5f5;
        min-height:100%;
        width: 100%;
        z-index:1;
    }
}
.lds-ring {
    position: absolute;
    background-color: rgba(100,100,100,0.5);
    border-radius: 1rem;
    bottom:20px;
    left:50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin:4px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.2s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.1s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>