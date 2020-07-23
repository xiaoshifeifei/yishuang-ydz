/*
 * @Author: your name
 * @Date: 2019-11-27 16:37:55
 * @LastEditTime: 2020-04-26 11:38:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tbk_web\script\factory.js
 */
var ApiFactory = {
	pro: {
		host: 'http://10.200.197.242:8080',
	},
	dev: {
		host: 'http://tbkapi.ybtbk.com',
	},
	location: {
		check_token: '/api/token/check',//检测token接口
		send_code: '/api/sms/send',
		login_username: '/api/user/login',//账号密码登录接口
		login_phone: '/api/user/mobilelogin',//手机短信登录接口  mobile登录手机号 captcha手机验证码
		head_list: '/api/tb/Category/getHeaderCategory',//头部分类 无参数
		swiper_img: '/api/index/index',//首页轮播图，含路径，无参数
		big_news: '/api/tb/Category/getIndexCategory',//推荐页的活动接口 type int 类别:0=banner图下面的分类,1=图片加产品,为1的时候，要用活动分类接口请求8个产品作为滑动
		category_products: '/api/tb/Products/getCategoryProducts',//分类的产品列表接口 cat_id int 分类Id page int 页码 page_size int 单页显示数量
		get_detail: '/api/tb/Products/getDetail',//根据产品Id获取产品详情 products_id 产品id
		index_list: '/api/tb/Products/getIndexList',//page int 页码 page_size int 单页显示数量
		show_collection: '/api/tb/Collection/index',//收藏夹列表 无参数
		add_collection: '/api/tb/Collection/addCollection',//添加收藏夹 product_id string 产品id
		delete_collection: '/api/tb/Collection/deleteCollection',//删除收藏夹 product_id string 产品id
		get_search: '/api/tb/Products/search',//key_word string 关键词 page int 页码 page_size int 单页显示数量
		order_list: '/api/tb/order/getOrder',//获取订单列表 页码 page 单页显示数量 page_size 订单类别 type 订单状态 status
		change_information: '/api/user/profile',//修改用户昵称与头像 昵称 nickname 头像信息 file
		zfb_account: '/api/user/profileAlipay',//操作用户支付宝账户 支付宝名字 name 支付宝账号 account 验证码captcha
		change_cipher: '/api/user/resetpwd',//修改密码 类型 type 手机号 mobile 新密码 newpassword 验证码 captcha
		gain_fans: '/api/user/getFans',//获取粉丝信息 无参数
		gain_kefu: '/api/Config/getCustomerService',//获取客服微信号 无参数
		gain_fansList: '/api/user/getFansList',//获取粉丝列表 类型 type 页码 page 单页数量 page_size 搜索参数 parem
		account_detail: '/api/bill/getBillList',//收支明细-账户明细 页码 page 单页数量 page_size
		deposit_detail: '/api/bill/getWithdrawalList',//收支明细-提现记录 页码 page 单页数量 page_size
		taobao_detail: '/api/tb/bill/getBillList',//收支明细-淘宝明细 页码 page 单页数量 page_size
		apply_for: '/api/user/withdrawal',//提现申请 提现金额 money
		get_promote: '/api/tb/Products/getPromote',//根据产品Id获取产品推广链接 products_id int 产品Id
		log_off: '/api/user/logout',//退出登录 无参数
		touxiang: '/addons/qiniu/index/upload',//上传头像 头像名字 name 头像资源 file
		qiniu: '/addons/qiniu/index/uploadQiniu',//七牛token
		get_imgUrl: '/api/user/getPost',//获取对应的海报 无参数
		track_list: '/api/user/history',//获取浏览记录 页码 page 单页显示数量 page_size
		get_zfb_account: '/api/user/getAlipay',//获取绑定支付宝账号 无参数
		get_userinfo: '/api/user/getUseData',//获取用户账号信息 无参数
		get_sign_in: '/api/user/signIn',//签到接口 无参数
		check_sign_in: '/api/user/checkSignIn',//签到状态接口 无参数
		ceshi_taobao: '/api/tb/Relation/getRelation',//测试淘宝授权
		get_shop_url: '/api/tb/products/getShopUrl',//根据卖家Id获取店铺地址  seller_id 详情页接口返回的卖家Id
		activity_theme_url: '/api/tb/Homepage/index',//首页活动主题模块 无参数
		activity_theme_products: '/api/tb/Products/getCommon',//根据物料Id获取产品列表 id 物料Id(推广下面的活动)page 页码 page_size 单页显示数量
		get_activity_organization: '/api/tb/Homepage/carousel',//获取活动列表 无参数
		get_copy_title: '/api/tb/search/getTitle',//获取复制内容的标题 无参数
		get_context_menu: '/api/tb/Homepage/icons',//获取轮播图下的功能表 无参数
		get_hair_ring: '/api/tb/promotion/moments',//获取发圈信息 page page_size
		get_classify_list: '/api/tb/Category/getMaterialCategory',//获取分类列表 type
		get_popularization_plan: '/api/index/checkshow',//推广接口 无参数
	}
};

var headers = {
	'TOKEN': localStorage.getItem('HTTP_TOKEN'),
	'SECRET': 'ys_tbk_963_9987',
}
var Api = {
	mode: 'dev',
	get: function (name) {
		return ApiFactory[this.mode]['host'] + ApiFactory['location'][name];
	}
};
export default {Api,headers};
