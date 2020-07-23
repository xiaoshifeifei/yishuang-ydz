const mycenter = [
    {
        path:"/invite",
        name:'invite',
        meta:{
            alias:'invite-0',
            keepAlive: false,
            need_login:true
        },
        component:resolve=>(require(["pages/public/invite/invite"],resolve)),
    },
    {
        path:'/fund-manager',
        name:'fund-manager',
        meta:{
            alias:'mypage-1',
            need_login:true,
            keepAlive: false,
        },
        component:resolve=>(require(["pages/public/mypages/fund-manager"],resolve))
    },
    {
        path:'/debit-card',
        name:'debit-card',
        meta:{
            alias:'mypage-2',
            need_login:true
        },
        component:resolve=>(require(["pages/public/mypages/debit-card"],resolve))
    },
    {
        path:'/debit-card-detail/:id',
        name:'debit-card-detail',
        meta:{
            alias:'mypage-3',
            need_login:true
        },
        component:resolve=>(require(["pages/public/mypages/debit-card-detail"],resolve))
    },
    {
        path:'/bind-accout',
        name:'bind-accout',
        meta:{
            alias:'mypage-4',
            need_login:true
        },
        component:resolve=>(require(["pages/public/mypages/bind-accout"],resolve))
    },
    {
        path:'/bind-wangwang/:id',
        name:'bind-wangwang',
        meta:{
            alias:'mypage-5',
            need_login:true
        },
        component:resolve=>(require(["pages/public/mypages/bind-wang"],resolve))
    },
]
export default mycenter;