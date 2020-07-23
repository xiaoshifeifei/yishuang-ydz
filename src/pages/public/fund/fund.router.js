/*
 * @Author: your name
 * @Date: 2020-06-03 10:27:04
 * @LastEditTime: 2020-07-03 09:26:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydz_web\src\pages\public\fund\fund.router.js
 */ 
const fund = [
    {
        path:'/cash-out',
        name:'cash-out',
        meta:{
            alias:'fund',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/cash-out"],resolve))
    },
    {
        path:'/fund-record/:id',
        name:'fund-record',
        meta:{
            alias:'fund-1',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/fund-record"],resolve))
    },
    {
        path:'/fund-transfer/:id',
        name:'fund-transfer',
        meta:{
            alias:'fund-2',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/fund-transfer"],resolve))
    },
    {
        path:'/cash-record',
        name:'cash-record',
        meta:{
            alias:'fund-3',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/cashout-record"],resolve))
    },
    {
        path:'/running-water/:id',
        name:'running-water',
        meta:{
            alias:'fund-4',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/running-water"],resolve))
    },
    {
        path:'/tb-flow/:id',
        name:'tb-flow',
        meta:{
            alias:'fund-5',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/tb-flow"],resolve))
    },
    {
        path:'/jd-flow/:id',
        name:'jd-flow',
        meta:{
            alias:'fund-6',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/jd-flow"],resolve))
    },
    {
        path:'/centre-bill',
        name:'centre-bill',
        meta:{
            alias:'fund-7',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/centre-bill"],resolve))
    },
    {
        path:'/centre-particulars/:id',
        name:'centre-particulars',
        meta:{
            alias:'fund-8',
            need_login:true
        },
        component:resolve=>(require(["pages/public/fund/centre-particulars"],resolve))
    },
]
export default fund;