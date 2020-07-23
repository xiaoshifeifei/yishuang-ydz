/*
 * @Author: your name
 * @Date: 2020-06-03 16:14:46
 * @LastEditTime: 2020-06-04 10:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\dora\util.js
 */ 
import vue from '../pages/html/index/app'
import router from 'pages/router/router.js'
import store from './store'
let util = {
    alert(params){
        return new Promise(resolve =>{
            vue.$children[0].alert(params);
            resolve(1);
        })
    },
    comfirm(params){
        return new Promise(resolve =>{
            vue.$children[0].comfirm(params);
            resolve(1);
        })
    },
    closePop(){
        return new Promise(resolve =>{
            vue.$children[0].close();
            resolve(1);
        })
    },
    toast(params){
        return new Promise(resolve =>{
            vue.$children[0].toast(params);
            resolve(1);
        })
    },
    closeToast(){
        return new Promise(resolve =>{
            vue.$children[0].closeToast();
            resolve(1);
        })
    },
    loading(back=true){
        return new Promise(resolve =>{
            vue.$children[0].loading(back);
            resolve(1);
        })
    },
    closeLoading(){
        return new Promise(resolve =>{
            vue.$children[0].closeLoading();
            resolve(1);
        })
    },
    get_uiAppLoc(){
        return  vue.$children[0].get_offsetTop();
    },
    routerBack(){
        let alias = store.state.router[store.state.router.length-1]?store.state.router[store.state.router.length-1].meta.alias.split('-'):0
        let aliasback = store.state.router[store.state.router.length-2]?store.state.router[store.state.router.length-2].meta.alias.split('-'):0
       console.log(aliasback);
        if(alias == 0){
            router.back();
        }else if(alias[0] == 'login'||aliasback[0]=='invite'){   //alias[0] == 'commerce'||
            router.push('/mypages');
        }else if(aliasback[0] == 'main'){ 
            router.push('/main');
        }else{
            router.back();
        }
    },
    get_timer(n){
            const s = parseInt(n/60);
            const m = parseInt(n%60);
            return this.toDub(m) + ':' + this.toDub(s);
     
    },
    //补零
    toDub(n){
        return n<10?"0"+n:""+n;
    }
}
export default util;