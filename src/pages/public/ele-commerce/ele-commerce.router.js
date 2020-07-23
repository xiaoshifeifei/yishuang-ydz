/*
 * @Author: your name
 * @Date: 2020-06-04 15:41:22
 * @LastEditTime: 2020-06-15 14:00:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\ele-commerce\ele-commerce.router.js
 */ 
const commerce=[
   
    {
        path:'/tb-detail/:id',
        name:'tb-detail',
        meta:{
            alias:'4',
            need_login:true
        },
        component:resolve=>(require(["pages/public/ele-commerce/tb-detail"],resolve))
    },
    {
        path:'/tb-review/:id',
        name:'tb-review',
        meta:{
            alias:'4',
            need_login:true
        },
        component:resolve=>(require(["pages/public/ele-commerce/tb-review"],resolve))
    },
 
    {
        path:'/jd-detail/:id',
        name:'jd-detail',
        meta:{
            alias:'5',
            need_login:true
        },
        component:resolve=>(require(["pages/public/ele-commerce/jd-detail"],resolve))
    },
    {
        path:'/jd-review/:id',
        name:'jd-review',
        meta:{
            alias:'5',
            need_login:true
        },
        component:resolve=>(require(["pages/public/ele-commerce/jd-review"],resolve))
    },
];
export default commerce;