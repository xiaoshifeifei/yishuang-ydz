/*
 * @Author: your name
 * @Date: 2020-05-29 13:42:42
 * @LastEditTime: 2020-07-03 09:34:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\fund\fund.http.js
 */ 
import http from 'dora/http.config.js';

export default {
    /**
     * 获取银行卡信息
     */
    get_bank(){
        return http.postHttpRequest('api.php/app/User/bankinfo',{});
    },
    /**
     * 中心钱包提现
     */
    cash_out(ret){
        return http.postHttpRequest('api.php/app/capital/bossWithdraw',ret);
    },
       /**
     * 获取中心钱包资金
     */
    get_centerMoney(ret){
        return http.postHttpRequest('api.php/app/User/onLine',ret);
    },
     /**
     * 淘宝，京东资金转出
     */
    roll_out(ret){
        return http.postHttpRequest('api.php/app/capital/rollOut',ret);
    },
     /**
     * 获取提现记录
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
    get_tb_account(ret){
        return http.postHttpRequest('api.php/app/capital/withdraw',ret);
    },
     /**
     * 获取淘宝京东流水详情
     */
    get_flow_details(ret){
        return http.postHttpRequest('api.php/app/capital/billInfo',ret);
    },
    /**
    * 获取中心账单
    */
    get_centre_bill(ret){
       return http.postHttpRequest('api.php/app/capital/userBill',ret);
    },
    /**
    * 获取中心账单详情
    */
    get_centre_particulars(ret){
       return http.postHttpRequest('api.php/app/capital/userbillinfo',ret);
    },
}