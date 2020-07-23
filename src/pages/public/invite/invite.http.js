import http from 'dora/http.config.js';

export default {
    /**
     * 获取所有邀请码
     */
    get_invitation(){
        return http.postHttpRequest('api.php/app/Master/invitation');
    },
    /**
     * 生成邀请码
     */
    get_newCode(){
        return http.postHttpRequest('api.php/app/Master/newcode');
    }
}