/*
 * @Author: your name
 * @Date: 2020-06-04 10:05:14
 * @LastEditTime: 2020-06-22 14:43:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\set-up\set-up.http.js
 */ 
import http from 'dora/http.config.js';

export default {
    /**
     * 退出账号
     */
    logout() {
        return http.postHttpRequest( 'api.php/app/User/logout',{} );
    },
     /**
     * 修改密码
     */
    change_pwd(ret) {
        return http.postHttpRequest( 'api.php/app/User/setpasswordUpdate',ret );
    },
     /**
     * 找回密码
     */
    find_pwd(ret) {
        return http.postHttpRequest( 'api.php/app/User/findPasswordUpdate',ret );
    },
    /**
     * 获取个人资料
     */
    get_profile() {
        return http.postHttpRequest( 'api.php/app/User/moreData',{} );
    },
    /**
     * 修改个人资料
     */
    change_profile(ret){
        return http.postHttpRequest( 'api.php/app/User/infoUpdate',ret );
    },
    /**
     * 上传
     */
    upload_idcard(){
        return http.postHttpRequest( 'common/Common/upload_jssdk',{});
    },
    /**
     * 上传
     */
    bind_idcard(ret){
        return http.postHttpRequest( 'api.php/app/User/uploadCard',ret);
    },
    /**
     * 查看客服
     */
    get_service(){
        return http.postHttpRequest( 'api.php/app/User/staff');
    },
    /**
     * 获取身份证图片
     */
    get_idcard() {
        return http.postHttpRequest( 'api.php/app/User/myCard',{} );
    },
}