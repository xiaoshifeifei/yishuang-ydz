/*
 * @Author: your name
 * @Date: 2020-06-02 13:47:43
 * @LastEditTime: 2020-06-04 14:55:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\myapprentice\myapprentice.http.js
 */
import http from 'dora/http.config.js';

export default {
    /** 
     * 获取已审核徒弟信息
    */
    get_already_apprentice(ret) {
        return http.postHttpRequest('api.php/app/User/bankUpdate', ret);
    },
    /** 
     * 获取购买单单数
    */
    get_order_amout() {
        return http.postHttpRequest('api.php/app/User/promotion', {});
    },
    /** 
    * 获取购买单单数
   */
    upgrade() {
        return http.postHttpRequest('api.php/app/user/upgrade', {});
    },
    /** 
     * 获取徒弟信息
    */
    get_apprentice_info(ret) {
        return http.postHttpRequest('api.php/app/Master/apprentice', ret);
    },
    /** 
     * 获取考试题
    */
    get_exam(ret) {
        return http.postHttpRequest('api.php/app/user/examPage', ret);
    },
    /** 
    * 验证考试题
   */
    check_exam(ret) {
        return http.postHttpRequest('api.php/app/user/exam', ret);
    },
    /** 
    * 提交拉黑理由
    */
    go_blacklist(ret) {
        return http.postHttpRequest('api.php/app/Master/blackBtn', ret);
    },
}