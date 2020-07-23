/*
 * @Author: your name
 * @Date: 2020-06-03 10:27:04
 * @LastEditTime: 2020-06-17 21:06:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\login\login.router.js
 */ 
const login = [
    {
        path:"/login",
        name:'login',
        meta:{
            alias:'login-1',
        },
        component:resolve=>(require(["pages/public/login/login"],resolve))
    },
    {
        path:"/register",
        name:'register',
        meta:{
            alias:'register-2',
        },
        component:resolve=>(require(["pages/public/login/register"],resolve))
    },
    {
        path:"/forget-pwd",
        name:'forget-pwd',
        meta:{
            alias:'pwd-3',
        },
        component:resolve=>(require(["pages/public/login/forget-pwd"],resolve))
    },
    {
        path:"/google-code/:mobile",
        name:'google-code',
        meta:{
            alias:'3',
        },
        component:resolve=>(require(["pages/public/login/google-code"],resolve))
    },
]
export default login;