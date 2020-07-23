/*
 * @Author: your name
 * @Date: 2020-06-01 18:46:15
 * @LastEditTime: 2020-06-05 16:50:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\dora\http.config.js
 */ 

import axios  from 'axios';
import util from './util'
import store from './store'
import YSconfig from './ys.config'
import router from 'pages/router/router.js'
import YsConfigJs from './ys.config';
const http = {
    getHttpRequest(url){
        return new Promise((resolve,reject)=>{
            axios.get(url)
            .then(res=>{
                resolve(res.data);
            })
            .catch(err=> {
                reject(err);
            });
        });
    },
    postHttpRequest(url,data){
        var headers;
        if(YsConfigJs.getCache('isapp')){
            headers ={
                'YDZ-Token':YSconfig.get_token(),
                'YDZ-Device-Type':'app'
            }
        }else{
            headers ={
                'YDZ-Token':YSconfig.get_token(),
                'YDZ-Device-Type':'web'
            }
        }
        return new Promise((resolve,reject)=>{
            axios.post(url,data,{headers:headers})
            .then(res=>{           
                if(res.data.code == 4003){
                    store.dispatch("setIsLogin",false);
                    YSconfig.removeCache('user');
                    YSconfig.removeCache('token');
                    if(router.history.current.name!="login"){
                        router.push('/login');
                    }
                }else{
                    resolve(res.data);
                }
            })
            .catch(err=> {
                reject(err);
            });
        });
    }
}
export default http;