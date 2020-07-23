/*
 * @Author: your name
 * @Date: 2020-06-03 10:27:04
 * @LastEditTime: 2020-06-03 10:28:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\router\router.js
 */ 
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import commerce from '../public/ele-commerce/ele-commerce.router'
import fund from '../public/fund/fund.router'
import main from '../public/main/main.router'
import setup from '../public/set-up/set-up.router'
import login from '../public/login/login.router'
import mycenter from '../public/mypages/mypages.router'
import footer from '../public/footer/footer.router'
import apprentice from '../public/myapprentice/myapprentice.router'



export default new Router({
    routes:[   
        ...commerce,
        ...fund,
        ...main,
        ...setup,
        ...login,
        ...mycenter,
        ...footer,
        ...apprentice,
        {path:'*' ,redirect:'/footer'}
    ]
})