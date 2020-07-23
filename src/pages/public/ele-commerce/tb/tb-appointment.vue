<template>
    <div id="tb-appointment">
       <div id='content'>
            <uiEmpty></uiEmpty>
            <!-- <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true'  :data="scroll_data">
                <main>
                  
                </main>
            </uiScroll> -->
        </div>
    </div>
</template>
<script>
import  uiScroll from '../../../../components/scroll-bar/scroll-bar';
import  uiEmpty from '../../../../components/absolutely-empty/absolutely-empty';
import  CommerceService from '../ele-commerce.http'
export default {
    components:{
        uiScroll,
        uiEmpty
    },
    data(){
        return{
            scroll_data:true,
            records:[],
            bounce:{
                top:false,
                bottom:false,
                left:false,
                right:false
            },
            scroll_data:true,
        }
    },
    created(){

    },
    mounted(){
        document.getElementById('tb-appointment').style.height = document.getElementById('tb-appointment').offsetHeight - this.$store.state.safeTop +'px';    
    },
    methods:{
     
    }
}
</script>
<style lang="less" scoped>
#tb-appointment{
    position: relative;
    width:94%;
    margin: auto;
    z-index: 2;
     #content{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        main{
            padding-top: 0.8rem;
        }
        .buy-list{
            border-radius: 0.5rem;
            padding:0.5rem;
            margin-bottom: 0.8rem;
            background-color: white;
            .top,.center{
                 margin-bottom: 0.8rem;
            }
            .top{
                height: 1.5rem;
                font-size: 0.8rem;
                color:#8c8c8c;
                border-bottom: 0.05rem solid #9c9c9c;
            }
            .center{
                font-size: 0.9rem;
                span{
                    font-size: 0.9rem;
                }
                .goods{
                    width:94%;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    font-size: 0.9rem;
                }
                .bonus{
                    float: right;
                    margin-right: 0.8rem;
                    font-size:1.2rem;
                    font-weight: 700;
                    color:#FFC125;
                }
                 .status{
                    float: right;
                    margin-right: 0.8rem;
                    font-size:0.9rem;
                }
                .appraise{
                    color:#FFC125;
                }
            }
            .bottom{
                font-size: 0.8rem;   
                color:#8c8c8c;            
            }
        }
    }
    .wrapper{
        overflow: hidden;
        height: 100%;
    }
}
</style>