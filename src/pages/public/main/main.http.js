import http from 'dora/http.config.js';
let grab = '';
if(process.env.NODE_ENV === 'test'){
    grab = 'http://admin.fzyishuang.top/';
}else if(process.env.NODE_ENV === 'production'){
    grab = 'http://www.pycac.com/';
}else{
    grab = '';
}
export default {
    /**
     * 获取首页公告
     */
    get_notice(){
        return http.postHttpRequest('api.php/app/Index/notice');
    },
    /**
     * 获取未完成任务
     */
    get_unfinishedTask(){
        return http.postHttpRequest('api.php/app/index/index');
    },
    /**
     * 获取抢单接口
     */
    get_interface(){
        return http.postHttpRequest('api.php/app/Index/getport');
    },
    /**
     * 淘宝抢单
     */
    tb_grab(token){
        return http.getHttpRequest(grab+'api.php/app/Dispatch/tb?token='+token);
    },
    /**
     * 获取未接订单详情
     */
    tb_grab_detail(ret){
        return http.postHttpRequest('api.php/app/index/getplan',ret);
    },
    /**
     * 京东抢单
     */
    jd_grab(token){
        return http.getHttpRequest(grab+'api.php/app/Dispatch/jd?token='+token);
    },
    /**
     * 获取未接订单详情
     */
    jd_grab_detail(ret){
        return http.postHttpRequest('api.php/app/Jdindex/getplan',ret);
    },
     /**
     * 预约单
     */
    book_grab(token){
        return http.getHttpRequest('api.php/home/index/bookOrder?token='+token);
    },
    /**
     * 放弃订单
     */
    giveup_order(ret){
        return http.postHttpRequest('api.php/app/index/buyerCancel',ret);
    },
    /**
     * 领取订单
     */
    accept_order(ret){
        return http.postHttpRequest('api.php/app/index/change',ret);
    },
     /**
     * 验证商品链接
     */
    confirm_Url(ret){
        return http.postHttpRequest('api.php/app/index/verifiedLink',ret)
    },
       /**
     * 验证宝贝-下一步
     */
    confirm_UrlNext(ret){
        return http.postHttpRequest('api.php/app/index/submitPlan',ret);
    },
    /**
     * 验证商品问题
     */
    confirm_signal(ret){
        return http.postHttpRequest('api.php/app/index/signalConfirm',ret)
    },
    /**
     * 回答问题-下一步
     */
    confirm_signalNext(ret){
        return http.postHttpRequest('api.php/app/index/twoAsubmit',ret);
    },
  
    /**
     * 验证订单页面-垫付单-1
     */
    verify_pay(ret){
        return http.postHttpRequest('api.php/app/Paytask/verify',ret);
    },
    /**
     * 回答问题页面-垫付单-2
     */
    pay_question(ret){
        return http.postHttpRequest('api.php/app/Paytask/answer',ret)
    },
    /**
     * 付款提交页面-垫付单-3
     */
    pay_commit(ret){
        return http.postHttpRequest('api.php/app/Paytask/payment',ret)
    },
    /**
     * 确认收货-垫付单-提交-4
     */
    pay_complete(ret){
        return http.postHttpRequest('api.php/app/Paytask/complete',ret)
    },
    /**
     * 验证商品页面-浏览单-1
     */
    verify_browse(ret){
        return http.postHttpRequest('api.php/app/Browsetask/Verify',ret)
    },
    /**
     *回答问题页面-浏览单-2
     */
    browse_question(ret){
        return http.postHttpRequest('api.php/app/Browsetask/answer',ret)
    },
     /**
     * 提交任务页面-浏览单-3
     */
    browse_commit(ret){
        return http.postHttpRequest('api.php/app/Browsetask/payment',ret)
    },
      /**
     * 提交任务-浏览单-4
     */
    browse_complete(ret){
        return http.postHttpRequest('api.php/app/Browsetask/signalcomplete',ret)
    },
     /**
     * 验证商品链接页面-加购单-第一关
     */
    verify_labelOne(ret){
        return http.postHttpRequest('api.php/app/Labeltask/labelVerify',ret)
    },
    /**
     * 回答问题页面-加购单-第一关
     */
    label_questionOne(ret){
        return http.postHttpRequest('api.php/app/Labeltask/labelAnswer',ret)
    },
    /**
     * 上传截图-加购单-第一关
     */
    label_uploadImg(ret){
        return http.postHttpRequest('api.php/app/Labeltask/answernext',ret)
    },
      /**
     * 上传截图-加购单-第一关-下一步
     */
    label_questionOne_next(ret){
        return http.postHttpRequest('api.php/app/Labeltask/goAnswernext',ret)
    },
     /**
     * 提交任务页面-加购单-第一关
     */
    label_commitOne(ret){
        return http.postHttpRequest('api.php/app/Labeltask/labelPayment',ret)
    },
     /**
     * 提交任务-加购单-第一关
     */
    label_completeOne(ret){
        return http.postHttpRequest('api.php/app/Labeltask/labelcomplete',ret)
    },
    /**
     * 验证商品链接-加购单-第二关
     */
    verify_labelTwo(ret){
        return http.postHttpRequest('api.php/app/Labeltask/twoLabelVerify',ret)
    },
     /**
     * 验证商品链接-加购单-第二关
     */
    comfirm_labelUrl(ret){
        return http.postHttpRequest('api.php/app/Labeltask/twoBuyerConfirm',ret)
    },
      /**
     * 验证商品链接-加购单-第二关 -下一步
     */
    confirm_labelUrlNext(ret){
        return http.postHttpRequest('api.php/app/Labeltask/goTwoBuyerConfirm',ret)
    },
        /**
     * 回答问题页面-加购单-第二关
     */
    label_questionTwo(ret){
        return http.postHttpRequest('api.php/app/Labeltask/twoLabelAnswer',ret)
    },
      /**
     *回答问题-加购单-第二关
     */
    TwoConfirm_signal(ret){
        return http.postHttpRequest('api.php/app/Labeltask/twoLabelConfirm',ret)
    },
    /**
     * 回答问题-加购单-第二关-下一步
     */
    label_questionTwo_next(ret){
        return http.postHttpRequest('api.php/app/Labeltask/goTwoLabelConfirm',ret)
    },
     /**
     * 提交任务页面-加购单-第二关
     */
    label_commitTwo(ret){
        return http.postHttpRequest('api.php/app/Labeltask/twoLabelPayment',ret)
    },
     /**
     * 提交任务-加购单-第二关
     */
    label_completeTwo(ret){
        return http.postHttpRequest('api.php/app/Labeltask/twoLabelComplete',ret)
    },
    /**
     * 评价任务-页面
    */
    get_appraiseOrder(ret){
        return http.postHttpRequest('api.php/app/Myplan/Submit',ret)
    },
    /**
     * 评价截图-提交
    */
    appraise_commit(ret){
         return http.postHttpRequest('api.php/app/Myplan/reviewSubmit',ret)
    },
     /**
     * 物流截图-提交
    */
    logisticsSubmit(ret){
        return http.postHttpRequest('api.php/app/Myplan/logisticsSubmit',ret)
    },
    /**
     * 确认收货页面
    */
    take_over(ret){
        return http.postHttpRequest('api.php/app/index/getreceive',ret)
    },
     /**
     * 确认收货页面
    */
   take_over_commit(ret){
        return http.postHttpRequest('api.php/app/index/receiveSubmit',ret)
    },
    /**
     * 验证链接页面 - 扫码多链接
     */
    verify_link(ret){
        return http.postHttpRequest('api.php/app/Link/linkVerify',ret)
    },
    /**
     * 验证链接页面  -下一步
     */
    confirm_linkUrlNext(ret){
        return http.postHttpRequest('api.php/app/Link/nextLink',ret)
    },
    /**
     * 回答问题页面-扫码多链接单
     */
    link_question(ret){
        return http.postHttpRequest('api.php/app/Link/linkAnswer',ret)
    },
    /**
     * 提交任务页面 -扫码多链接单
     */
    link_commit(ret){
        return http.postHttpRequest('api.php/app/Link/linkPayment',ret)
    },
    /**
     * 提交任务 -扫码多链接单
     */
    link_complete(ret){
        return http.postHttpRequest('api.php/app/Link/complete',ret)
    },
      /**
     * 验证关键词链接页面 -关键多链接
     */
    verify_keyword(ret){
        return http.postHttpRequest('api.php/app/Keyword/index',ret)
    },
    /**
     * 验证商品链接-关键多链接
     */
    comfirm_keyUrl(ret){
        return http.postHttpRequest('api.php/app/Keyword/confirmLink',ret)
    },
    /**
     * 验证链接页面  -下一步 -关键多链接
     */
    confirm_keyUrlNext(ret){
        return http.postHttpRequest('api.php/app/Keyword/checkLink',ret)
    },
    /**
     * 回答问题页面-关键多链接
     */
    key_question(ret){
        return http.postHttpRequest('api.php/app/Keyword/answer',ret)
    },
    /**
     *回答问题-关键多链接
     */
    keyConfirm_signal(ret){
        return http.postHttpRequest('api.php/app/Keyword/signalConfirm',ret)
    },
     /**
     * 回答问题-关键多链接-下一步
     */
    key_question_next(ret){
        return http.postHttpRequest('api.php/app/Keyword/twoAsubmit',ret)
    },
    /**
     * 提交任务页面 -关键多链接
     */
    key_commit(ret){
        return http.postHttpRequest('api.php/app/Keyword/payment',ret)
    },
    /**
     * 提交任务 -关键多链接
     */
    key_complete(ret){
        return http.postHttpRequest('api.php/app/Keyword/complete',ret)
    },


    /**  京东操作 */

    /**
     * 领取订单
     */
    jdaccept_order(){
        return http.postHttpRequest('api.php/app/Jdindex/change');
    },
    /**
     * 放弃订单
     */
    jdgiveup_order(ret){
        return http.postHttpRequest('api.php/app/Jdindex/buyerCancel',ret);
    },
      /**
     * 验证商品链接
     */
    jdconfirm_Url(ret){
        return http.postHttpRequest('api.php/app/Jdindex/verifiedLink',ret)
    },
       /**
     * 验证宝贝-下一步
     */
    jdconfirm_UrlNext(ret){
        return http.postHttpRequest('api.php/app/Jdindex/submitPlan',ret);
    },
    /**
     * 验证商品问题
     */
    jdconfirm_signal(ret){
        return http.postHttpRequest('api.php/app/Jdindex/signalConfirm',ret)
    },
    /**
     * 回答问题-下一步
     */
    jdconfirm_signalNext(ret){
        return http.postHttpRequest('api.php/app/Jdindex/twoAsubmit',ret);
    },
       /**
     * 验证订单页面-垫付单-1
     */
    jdverify_pay(ret){
        return http.postHttpRequest('api.php/app/Jdpayment/verify',ret);
    },
      /**
     * 回答问题页面-垫付单-2
     */
    jdpay_question(ret){
        return http.postHttpRequest('api.php/app/Jdpayment/answer',ret)
    },
     /**
     * 付款提交页面-垫付单-3
     */
    jdpay_commit(ret){
        return http.postHttpRequest('api.php/app/Jdpayment/payment',ret)
    },
      /**
     * 确认收货-垫付单-提交-4
     */
    jdpay_complete(ret){
        return http.postHttpRequest('api.php/app/Jdpayment/complete',ret)
    },
     /**
     * 验证商品页面-浏览单-1
     */
    jdverify_browse(ret){
        return http.postHttpRequest('api.php/app/Jdbrowse/Verify',ret)
    },
    /**
     *回答问题页面-浏览单-2
     */
    jdbrowse_question(ret){
        return http.postHttpRequest('api.php/app/Jdbrowse/answer',ret)
    },
    
     /**
     * 提交任务页面-浏览单-3
     */
    jdbrowse_commit(ret){
        return http.postHttpRequest('api.php/app/Jdbrowse/payment',ret)
    },
      /**
     * 提交任务-浏览单-4
     */
    jdbrowse_complete(ret){
        return http.postHttpRequest('api.php/app/Jdbrowse/signalcomplete',ret)
    },
        /**
     * 评价任务-页面
    */
    get_jdappraiseOrder(ret){
        return http.postHttpRequest('api.php/app/Jdtask/Submit',ret)
    },
    /**
     * 评价任务-提交
    */
    jdappraise_commit(ret){
        return http.postHttpRequest('api.php/app/Jdtask/reviewSubmit',ret)
    },

}