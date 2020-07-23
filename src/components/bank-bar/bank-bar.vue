<!--
 * @Author: your name
 * @Date: 2020-06-01 18:46:15
 * @LastEditTime: 2020-07-06 17:26:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\components\bank-bar\bank-bar.vue
--> 
<template>
    <div class="ui-bank">
        <select name="select" class="select" v-model="bank" >
            <option  v-for='(item,index) in banklist' :key="index" :value="item.title">{{item.title}}</option>
        </select>
    </div>
</template>
<script>
export default {
    props:{
        
    },
    data(){
        return{
            banklist:[
                {
                    title: "中国工商银行",
                    value: "001",
                },
                {
                    title: "中国建设银行",
                    value: "002",
                },
                {
                    title: "中国银行",
                    value: "003",
                },
                {
                    title: "中国农业银行",
                    value: "004",
                },
                {
                    title: "中国民生银行",
                    value: "005",
                },
                {
                    title: "中国光大银行",
                    value: "006",
                },
                {
                    title: "中国邮政储蓄银行",
                    value: "007",
                },
                {
                    title: "交通银行",
                    value: "008",
                },
                {
                    title: "招商银行",
                    value: "009",
                },
                {
                    title: "中信银行",
                    value: "012",
                },
                {
                    title: "兴业银行",
                    value: "013",
                },
                {
                    title: "华夏银行",
                    value: "014",
                },
            ],
            bank:'中国工商银行'
        }
    },
    mounted(){

    },
    watch:{
        bank:{
            handler(new_val,old_val){
      　　      this.$emit('bank',new_val);
    　　    },
    　　    immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
 @import "../../assets/less/common.less";
.ui-bank{
    select{
        font-size: 0.9rem;
        height: 2rem;
        background-color: transparent;
        border:none;
         color:#4c4c4c;
        option{
            font-size: 0.9rem;
        }
    }
}
</style>