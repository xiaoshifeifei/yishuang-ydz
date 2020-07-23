<!--
 * @Author: your name
 * @Date: 2020-05-29 13:42:42
 * @LastEditTime: 2020-07-03 16:26:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\myapprentice\list-apprentice.vue
--> 
<template> 
    <div id="apprentice">
        <uiScroll class="wrapper" ref="scroll" :bounce="bounce" :backcolor="'#f5f5f5'" :pullup='true' @scrollToEnd="pullup" :data="scroll_data">
            <div class="paddingtop">
                <div class="number_people">
                    <span class="user_all">徒弟总人数：{{userAll}}</span>
                    <span class="user_to_audited">待审核人数:{{userToAudited}}</span>    
                </div>
                <main class="pd" v-if="prentice.length > 0">
                    <div class="ccc" v-for="(item, index) in prentice" :key="index">
                        <div class="ccc_hs">
                            <span class="name">姓名: {{item.info_name}}</span>
                            <span class="bank_balidate">{{item.bank_validate}}</span> 
                        </div>
                        <div class="ccc_hs">
                            <span class="mobile">电话: {{item.mobile}}</span>
                            <span class="remark" @click="blacklist(item.mobile)">拉黑</span>
                        </div>
                        <div class="ccc_hs">
                            <span class="audit">提交时间: {{item.create_time}}</span>
                        </div>
                    </div>
                </main>
            </div>
            <div class="brush-bottom" v-if="isBottom && prentice.length > 0">哎呀！刷到底啦……</div>
            <uiEmpty v-if="prentice.length < 1"></uiEmpty>
        </uiScroll> 
    </div>
</template>
<script>
import YsConfig from '../../../dora/ys.config'
import  ApprenticeService from './myapprentice.http'
import uiEmpty from '../../../components/absolutely-empty/absolutely-empty';
import  uiScroll from '../../../components/scroll-bar/scroll-bar';
export default {
    name:'apprentice',
    components:{
        uiEmpty,
        uiScroll
    },
    data(){
        return{
            state: 2,
            page: 1,
            page_num: 8,
            prentice: [],
            userAll: 0,
            userToAudited: 0,
            last_page:1,
            limiter: true,
            isBottom:false,
            bounce:{
                top:false,
                bottom:true,
                left:false,
                right:false
            },
            scroll_data:true,
        }
    },
    created(){
        this.apprentice_info();
    },
    mounted(){
         this.$refs.scroll.$el.style.height = document.getElementById("apprentice").offsetHeight - this.$store.state.safeTop + 'px';   
    },
    methods:{
        apprentice_info(){
            ApprenticeService.get_apprentice_info({
                    state:this.state,
                    page: this.page,
                    page_num: this.page_num,
                }).then(res=>{
                    if(res.code == 1){
                        this.scroll_data = !this.scroll_data;
                        res.data.user.data.forEach(item => {
                           item.create_time = YsConfig.get_time(item.create_time, 'indays');
                        });
                        this.prentice = this.prentice.concat(res.data.user.data);
                        this.last_page = res.data.user.last_page;
                        this.userAll = res.data.userAll;
                        this.userToAudited = res.data.userToAudited;
                        if(res.data.user.current_page == res.data.user.last_page){
                             this.page++;
                        }
                        this.limiter = true;
                    }
                })
        },
        pullup(data){
             if(data == 1&&this.page>this.last_page){
                if(this.isBottom == false){
                    this.isBottom = true;
                    this.scroll_data = !this.scroll_data;
                }
            }
            console.log(this.page)
            if(this.limiter&&this.page<this.last_page){
                this.limiter = false;
                this.page++;
                this.apprentice_info();
            }
        },
        blacklist(mobile){
            var path = '/blacklist/' + mobile;
            this.$router.push(path);
        },
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#apprentice{
    width:100%;
    height: 100%;
    .pd{
        width: 100%;
    }
    .wrapper{
        overflow: hidden;
        height: 100%;
        .paddingtop{
            padding-top: 0.8rem;
        }
    }
    .number_people{
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 0.8rem;
        background-color:#6fbaec;
        font-size: 0.75rem;
        .user_all{
            float: left;
            margin-left: 1rem;
            color:white;
        }
        .user_to_audited{
            float: right;
            margin-right: 1rem;
             color:white;
        }
    }
    .ccc{
        position: relative;
        width: 96%;
        height: 5.5rem;
        margin: 0 auto 0.8rem;
        background-color: #fff;
        border-radius: 0.5rem;
        border-top: 1px solid #ccc;
        .ccc_hs{
            width: 90%;
            height: 1rem;
            margin: 0.5rem auto;
            line-height: 1rem;
            .name{
                float: left;
                font-size: 0.9rem;
            }
            .bank_balidate{
                float: right;
                font-size: 0.9rem;
            }
            .mobile{
                float: left;
                font-size: 0.9rem;
            }
            .remark{
                float: right;
                width: 3rem;
                height: 1.25rem;
                font-size: 0.7rem;
                border-radius: 0.5rem;
                background-image:linear-gradient(to bottom right,#2d99e0,#6fbaec);
                color:white;
                text-align: center;
                line-height: 1.25rem;
                font-weight: 700;
            }
            .audit{
                font-size: 0.9rem;
                color: #ccc;
            }
        }
    }

}
</style>