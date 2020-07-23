<template>
    <div id='money-input'>
      <input  type="text"  :placeholder="placeholder" v-model="curValue" @blur="addFloar"/>
    </div>
</template>

<script>
    export default {
      props:{
        value:{
          type:String|Number,
          default: ''
        },
        type:{
          type:String,
          default: 'Number'
        },
        placeholder:{
          type:String,
          default:''
        },
        disabled:{
          type:String|Boolean,
          default:false
        },
        length:{
          type:String|Number,
          default:''
        },
      },
      data(){
        return{
          curValue:this.value
        }
      },
      methods:{
        addFloar(){
          let inx = this.curValue.indexOf(".");
          console.log(inx);
          if(inx=='-1'){
            //this.curValue = this.curValue!=''?this.curValue:'0';
            this.curValue +='.00';
          }
          this.$emit('input_cash',this.curValue);
        }
      },
      watch:{
        value(val){
            this.curValue = val;
        },
        curValue(val){
          if(val == '.'){
            val = '';
          }
          var arr = [];
          if(!(/^[0-9\.]*$/.test(val))){
            arr = val.split("");
            //判断第一个不能为。
            let thit = this;
            var reg=/^[A-Za-z\u4E00-\u9FA5!！@#*&%$￥~·^+_\-/),/(，/（/）。/|\\]*$/;
            arr.forEach((item,index)=>{
              if(reg.test(item)){
                //Vue.prototype.$set(obj,name,value.substring(index,value.length-1));
                val = val.substring(index,val.length-1);
              }
            });
          }
          //限制只输入一个点
          let str = String(val);
          let inx = str.indexOf(".");
          if(inx!=-1){
            val = str.substr(0,inx+3);
          }
          let smallarr = str.substr(inx+1,str.length-1);
          let arrsmall = smallarr.split('');
          //截取点之后的两个字段验证
          if(inx!=-1 && !(/^[0-9]*$/.test(arrsmall[0]))){
            val = str.substr(0,inx+1);
          }else if(inx!=-1 &&  !(/^[0-9]*$/.test(arrsmall[1]))){
            val = str.substr(0,inx+2);
          }
          this.curValue = val;
          //this.$emit('input_cash',this.curValue);
        }
      }
    }
</script>
<style lang="less" scoped>
#money-input{
    display: inline-block;
    input{
        width: 8rem;
        font-size: 1.2rem;
        font-weight: 700;
    }
        ::-webkit-input-placeholder {
        /* WebKit browsers */
        color: rgb(190,190,190);
        font-weight: 400;
        font-size: 0.9rem;
    }
}
</style>