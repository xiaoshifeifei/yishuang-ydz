/*
 * @Author: your name
 * @Date: 2020-06-03 10:27:04
 * @LastEditTime: 2020-06-04 17:19:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\set-up\set-up.router.js
 */ 
const setup = [
    {
        path:"/setup",
        name:'setup',
        meta:{
            alias:'setup-1',
            need_login:true
        },
        component:resolve=>(require(["pages/public/set-up/set-up"],resolve))
    },
    {
        path:'/change-profile',
        name:'change-profile',
        meta:{
            alias:'setup-2',
            need_login:true
        },
        component:resolve=>(require(["pages/public/set-up/change-profile"],resolve))
    },
    {
        path:"/change-pwd",
        name:'change-pwd',
        meta:{
            alias:'setup-3',
            need_login:true
        },
        component:resolve=>(require(["pages/public/set-up/change-pwd"],resolve))
    },
    {
        path:"/frofile",
        name:'frofile',
        meta:{
            alias:'setup-4',
            need_login:true
        },
        component:resolve=>(require(["pages/public/set-up/profile"],resolve))
    },
    {
        path:'/upload-idcard',
        name:'upload-idcard',
        meta:{
            alias:'setup-5',
            need_login:true
        },
        component:resolve=>(require(["pages/public/set-up/upload-idcard"],resolve))
    },
    {
        path:'/service',
        name:'service',
        meta:{
            alias:'setup-6',
            need_login:true
        },
        component:resolve=>(require(["pages/public/set-up/service"],resolve))
    },
]
export default setup;