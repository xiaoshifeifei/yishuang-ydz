import http from 'dora/http.config.js';

export default {
     /**
     * 退出账号
     */
    logout() {
        return http.postHttpRequest( 'api.php/app/User/logout',{} );
    },
    /** 
     * 绑定银行卡
     */
    bind_bank(ret){
        return http.postHttpRequest('api.php/app/User/bankUpdate',ret);
    },
     /** 
     * 获取银行卡信息
     */
    get_bank(){
        return http.postHttpRequest('api.php/app/User/bankinfo',{});
    },
     /** 
     * 获取淘宝、京东账户信息
     */
    get_accout(){
        return http.postHttpRequest('api.php/app/User/userStatus',{});
    },
     /** 
     * 换绑旺旺号
     */
    bind_wang(ret){
        return http.postHttpRequest('api.php/app/User/updateWang',ret);
    },
      /** 
     * 换绑京东号
     */
    bind_jdwang(ret){
        return http.postHttpRequest('api.php/app/User/updateJdwang',ret);
    },
     /** 
     * 获取中心钱包资金，淘宝账户资金，京东账户资金信息
     */
    get_fund(){
        return http.postHttpRequest('api.php/app/Capital/moneyShows',{});
    },
    /**
     * 获取中心钱包资金
     */
    get_centerMoney(ret){
        return http.postHttpRequest('api.php/app/User/onLine',ret);
    },
}