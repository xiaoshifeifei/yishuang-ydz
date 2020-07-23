/*
 * @Author: your name
 * @Date: 2020-06-01 18:46:15
 * @LastEditTime: 2020-06-23 18:02:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\login\login.http.js
 */ 
import http from 'dora/http.config.js';

export default {
    /** 
     * 用户登录
     */
    user_login(ret){
        return http.postHttpRequest('api.php/app/Login/doLogin',ret);
    },
     /** 
     * 获取验证码
     */
    get_code(ret){
        return http.postHttpRequest('api.php/common/Common/getcode',ret);
    },
    /** 
     * 用户注册
     */
    user_register(ret){
        return http.postHttpRequest('api.php/app/Login/doRegister',ret);
    },
     /** 
     * 退出登录
     */
    logout(){
        return http.postHttpRequest('api.php/app/User/logout',{});
    },
    /** 
     * 忘记密码
     */
    forget_password(ret){
        return http.postHttpRequest('api.php/app/Login/findPassword',ret);
    },
    /** 
     * 谷歌验证登录
     */
    google_login(ret){
        return http.postHttpRequest('api.php/app/Login/doLoginAc',ret);
    },
     /**
     * 查看客服
     */
    get_service(){
            return http.postHttpRequest( 'api.php/app/User/staff');
    },
}