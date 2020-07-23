<template>
    <div id="master-exam">
          <uiTitle class="ui-title" ref="title" :isback="true" :title="title" :color="'white'" > </uiTitle>
            <uiScroll class="wrapper" ref="scroll" :bounce="bounce"  :backcolor="'#f5f5f5'" >
                <main class="main" v-if="exams != ''">
                    <div class="ui-exam" v-for="(item,index) in exams" :key="index" >
                       <div class="title">{{index+1}}、{{item.title}}</div>
                       <div v-if="item.type == 1" class="options">
                           <div v-for="(option,oIndex) in item.options" :key="oIndex">
                                <input :name="index" type="radio"  v-model="checkArray[index].answer[0]" :value="Number(oIndex)+1" /><span>{{option}}</span>
                           </div>
                       </div>
                        <div v-if="item.type == 2" class="options">
                           <div v-for="(option,oIndex) in item.options" :key="oIndex">
                                <input  type="checkbox" v-model="checkArray[index].answer" :value="Number(oIndex)+1" /><span>{{option}}</span>
                           </div>
                       </div>
                    </div>
                     <el-button class="el-button"  @click="upgrade()"><span>提交考试</span></el-button>
                </main>
            </uiScroll>
    </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import  uiTitle from '../../../components/title-bar/title-bar';
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
import  ApprenticeService from './myapprentice.http'
import util from '../../../dora/util.js'
export default {
    components:{
        uiTitle,
        uiScroll
    },
    data(){
        return{
            title:'',
            bounce:{
                top:false,
                bottom:true,
                left:false,
                right:false
            },
            exams:'',
            checkArray:Array(10)
        }
    },
    created(){
        util.loading();
        this.classify = this.$route.params.id;
        if(this.classify == 1){
            this.title='升级考试'
        }else{
            this.title='新粉丝答题'
        }
        ApprenticeService.get_exam({
            classify:this.classify
        })
        .then(res=>{
            util.closeLoading();
            this.exams = res.data;
            res.data.forEach((item,index)=>{
                this.checkArray[index] = {id:item.id,answer:[]};
            })
        })
    },
    mounted(){
         this.$refs.scroll.$el.style.height = document.getElementById("master-exam").offsetHeight - this.$refs.title.$el.offsetHeight+'px';
    },
    methods:{
        upgrade(){
            ApprenticeService.check_exam({
                classify:this.classify,
                exam:this.checkArray
            }).then(res=>{
                if(res.code == 1){
                    util.toast({
                        content:res.msg,
                        times:1000
                    });
                    util.routerBack();
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
@import '../../assets/less/common.less';
#master-exam{
    height: 100vh;
    z-index: 4;
        .wrapper{
            height: 100%;
            overflow: hidden;
        }
        .main{
            width: 94%;
            margin:auto;
            padding-top: 0.8rem;
            .ui-exam{
                min-height: 10rem;
                margin-bottom: 0.8rem;
                padding:0.5rem 0.8rem;
                border-radius: 0.5rem;
                background: linear-gradient(to right, #f9ece4 10%, #ebcfbe 100%);
                .title{
                    position: relative;
                    color: white;
                    background-color: #e7c7b4;
                    padding:0.2rem 0.5rem;
                    border-radius: 0.4rem;
                }
                 .title::after, .title::before {
                    content: "";
                    display: block;
                    position: absolute;
                    bottom:-0.2rem;
                    height: 0px;
                    width: 0px;
                    border: 0.5rem solid ;
                    z-index: 0;
                }
                .title::before{
                     border-color: rgb(231, 199, 180) rgb(231, 199, 180) rgb(231, 199, 180) transparent;
                    left: -0.7rem;
                }
                .title::after{
                     border-color: rgb(231, 199, 180) transparent rgb(231, 199, 180) rgb(231, 199, 180) ;
                    right: -0.7rem;
                }
                .options{
                    margin-top: 0.8rem;
                   &>div{
                        min-height: 2rem;
                        padding:0.3rem 0;
                        input{
                            margin-top: 0.3rem;
                            line-height: 0.8rem;
                            vertical-align: top;
                        }
                        span{
                            width:90%;
                            display: inline-block;
                            margin-left: 0.8rem;
                        }
                   }
                }
            }
            .upgrade-button{
                 width:90%;
                height:3rem;
                margin:0 5% 2rem 5%;
                border:none;
                margin-top: 1rem;
                font-size: 1.2rem;
                background: #FFC125;
                box-shadow: 0.05rem 0.1rem 0.1rem rgba(100,100,100,0.5);
                span{
                        color:rgb(240,240,240);
                }
            }
        }
}
</style>