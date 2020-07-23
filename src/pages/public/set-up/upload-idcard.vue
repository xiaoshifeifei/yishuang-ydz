<template>
     <div id="upload-idcard">
           <uiTitle :title="'身份认证'" :color="'white'" :isback="true"></uiTitle>
            <!-- <div class="idcard-image" v-if="idcard_image !=''">
                <img :src="idcard_image" alt="">
                <div class="idcardimg-statu">
                    <span v-if="cardimg_status == 1" :style="{color:'rgb(26, 158, 26)'}">( 已审核通过 )</span>
                    <span v-else :style="{color:'#ffc125'}">( 未审核,可以在下方重新上传 )</span>
                </div>
            </div> -->
            <main>
                <input type="file" id='upload-input' style="display:none" @change='fileChange()' >
                <div class="upload" @click="fileClick()" v-if="idcard_img == ''">
                         <i class="el-icon-plus"></i>
                         <i class="el-icon-user-solid"></i>
                </div>
                 <div class="idcard-img" v-if="idcard_img != ''" @click="fileClick()">
                     <img :src="idcard_img" alt="">
                 </div>
                  <span v-if="cardimg_status == 1" :style="{color:'rgb(26, 158, 26)'}">( 已审核通过 )</span>
                  <span v-if='cardimg_status == 0' :style="{color:'red'}">( 未审核,可以点击重新上传 )</span>
                <!-- <el-button class="el-button"  v-if="cardimg_status == 1" round @click="commit()"><span>重新提交身份证</span></el-button>  -->
                <el-button class="el-button" v-if="cardimg_status != 1"  round @click="commit()"><span>提交</span></el-button>  
            </main>
             <div class="tips">
                温馨提示：<br>
                   1.上传身份证必须能清晰看到身份信息。<br>
                   2.整张身份证信息框都必须入境，审核才会快。
            </div>
     </div>
</template>
<script>
import YsConfigJs from '../../../dora/ys.config'
import  uiTitle from '../../../components/title-bar/title-bar';
import util from '../../../dora/util.js'
import qiniu from '../../../dora/qiniu.min.js'
import  SetupService from './set-up.http'
export default {
    components:{
        uiTitle
    },
    data(){
        return{
            //idcard_image:'',
            idcard_img:'',
            cardimg_status:''
        }
    },
    created(){
        util.loading();
         SetupService.get_idcard()
         .then(res=>{
             util.closeLoading();
             if(res.code == 1){
                 this.idcard_img = res.data.card_img;
                 this.cardimg_status = res.data.cardimg_status;
             }

         });
    },
    mounted(){
          window.apiready = function(){
          }
    },
    methods:{
        /**
         * 调用相册
         */
        fileClick() {
            if(this.cardimg_status!=1||this.idcard_img==''){
                 if(YsConfigJs.isApp()){
                    YsConfigJs.upload_image(api)
                    .then(res=>{
                        this.idcard_img=res;
                    });
                } else {
                    document.getElementById('upload-input').click();
                }   
            }
           
        },
        fileChange(obj){
            const files = document.getElementById('upload-input').files[0];
            YsConfigJs.web_upload(files)
            .then (res=>{
                this.idcard_img=res;
            });
        },
        commit(){
            SetupService.bind_idcard({
                card:this.idcard_img
            }).then(res=>{
                if(res.code == 1){
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            util.routerBack();
                        }
                    });
                }else {
                    util.alert({
                        content:res.msg,
                        define:()=>{
                            util.routerBack();
                        }
                    });
                }
            })
        }
      },
}
</script>
<style lang="less" scoped>
@import "../../assets/less/common.less";
#upload-idcard{
    z-index: 5;
    .idcard-image{
        width:94%;
        margin:auto;
        img{
            display: block;
            width: 94%;
            margin: 2rem auto 0;
            border-radius:0.5rem;
        }
        .idcardimg-statu{
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.75rem;
            text-align: center;
        }
    }
    main{
        width:94%;
        margin:auto;
        text-align: center;
    }
    .upload{
        position: relative;
        height: 10rem;
        width:94%;
        margin:2rem auto 2rem auto;
        padding:1rem 0;
        border-radius:0.5rem;
        border:0.1rem dashed rgb(210,210,210);
        text-align: center;
        line-height: 8rem;
        .el-icon-user-solid{
            display: inline-block;
             font-size:4rem;
             color:rgb(48, 124, 211);
        }
        .el-icon-plus{
            display: inline-block;
             font-size:2rem;
        }
    }
    .idcard-img{
        height: 13rem;
        width:94%;
        margin:2rem auto 2rem auto;
        border-radius:0.5rem;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
     .commit-button{
        border:none;
        border-radius: 0.5rem;
        span{
                color:white;
                font-size: 1rem;
        }
        width: 100%;
        background-color: #FFC125;
    }
}
</style>