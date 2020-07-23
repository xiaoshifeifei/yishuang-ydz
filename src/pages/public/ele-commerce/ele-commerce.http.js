/*
 * @Author: your name
 * @Date: 2020-06-11 09:43:27
 * @LastEditTime: 2020-06-16 20:42:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\ele-commerce\ele-commerce.http.js
 */ 
import http from 'dora/http.config.js';

export default {
    /**
     * 获取淘宝购买单
     */
    get_buyList(ret){
        return http.postHttpRequest('api.php/app/Myplan/index',ret);
    },
     /**
     * 获取淘宝浏览单
     */
    get_browseList(ret){
        return http.postHttpRequest('api.php/app/Myplan/browse',ret);
    },
    /**
     * 获取淘宝评价单
     */
    get_reviewList(ret){
        return http.postHttpRequest('api.php/app/Myplan/review',ret);
    },
     /**
     * 淘宝，京东资金转出
     */
    roll_out(ret){
        return http.postHttpRequest('api.php/app/capital/rollOut',ret);
    },
     /**
     * 获取淘宝提现记录
     */
    get_cash(ret){
        return http.postHttpRequest('api.php/app/capital/record',ret);
    },
     /**
     * 获取淘宝京东账户记录
     */
    get_tb_record(ret){
        return http.postHttpRequest('api.php/app/capital/bill',ret);
    },
    /**
     * 获取淘宝任务详情
     */
    get_detail(ret){
        return http.postHttpRequest('api.php/app/Myplan/planDetail',ret);
    },
    /**
     * 获取淘宝任务详情
     */
    get_review(ret){
        return http.postHttpRequest('api.php/app/Myplan/reviewDetail',ret);
    },
    /**
     * 获取京东购买单
     */
    get_buyList_jd(ret){
        return http.postHttpRequest('api.php/app/Jdtask/account',ret);
    },
    /**
    * 获取京东浏览单
    */
    get_browseList_jd(ret){
        return http.postHttpRequest('api.php/app/Jdtask/browse',ret);
    },
    /**
    * 获取京挑客
    */
    get_jtk_jd(ret){
       return http.postHttpRequest('api.php/app/Jdtask/jtk',ret);
    },
    /**
    * 获取京挑客--评价部分
    */
    get_jtk_pj(ret){
       return http.postHttpRequest('api.php/app/Jdtask/jtkPj',ret);
    },
    /**
     * 获取京东浏览任务详情
     */
    get_detail_jd(ret){
        return http.postHttpRequest('api.php/app/Jdtask/browseDetail',ret);
    },
    /**
     * 获取京东垫付任务详情
     */
    get_review_jd(ret){
        return http.postHttpRequest('api.php/app/Jdtask/payDetail',ret);
    },
    /**
     * 获取京挑客任务详情
     */
    get_detail_jtk(ret){
        return http.postHttpRequest('api.php/app/Jdtask/jtkDetail',ret);
    },
    /**
     * 获取京挑客评价任务详情
     */
    get_review_jtk(ret){
        return http.postHttpRequest('api.php/app/Jdtask/jtkpjDetail',ret);
    },
}