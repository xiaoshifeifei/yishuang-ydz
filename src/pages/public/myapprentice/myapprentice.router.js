/*
 * @Author: your name
 * @Date: 2020-06-03 10:27:04
 * @LastEditTime: 2020-06-04 14:07:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\myapprentice\myapprentice.router.js
 */ 
const apprentice = [
    {
        path:"/myapprentice",
        name:'myapprentice',
        meta:{
            alias:'pupil-1',
            need_login:true
        },
        component:resolve=>(require(["pages/public/myapprentice/myapprentice"],resolve)),
        children:[
            {
                path:'/apprentice',
                name:'apprentice',
                meta:{
                    alias:'pupil-1-1',
                    need_login:true
                },
                component:resolve=>(require(["pages/public/myapprentice/list-apprentice"],resolve))
            },
            {
                path:'/wait',
                name:'wait',
                meta:{
                    alias:'pupil-1-2',
                    need_login:true
                },
                component:resolve=>(require(["pages/public/myapprentice/list-wait"],resolve))
            },
            {
                path:'/black',
                name:'black',
                meta:{
                    alias:'pupil-1-3',
                    need_login:true
                },
                component:resolve=>(require(["pages/public/myapprentice/list-black"],resolve))
            },
            {path:'/' ,redirect:'/apprentice'}
        ]
    },
    {
        path:'/master-exam/:id',
        name:'master-exam',
        meta:{
            alias:'myapprentice-1',
            need_login:true
        },
        component:resolve=>(require(["pages/public/myapprentice/master-exam"],resolve))
    },
    {
        path:'/blacklist/:mobile',
        name:'blacklist',
        meta:{
            alias:'myapprentice-2',
            need_login:true
        },
        component:resolve=>(require(["pages/public/myapprentice/blacklist"],resolve))
    },
]
export default apprentice;