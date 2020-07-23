const footer = [
    {
        path:"/footer",
        name:"footer",
        id:'1',
        meta:{
            alias:'footer',
            keepAlive: true,
        },
        component:resolve=>(require(["pages/public/footer/footer"],resolve)),
        children:[
            {
                path:"/main",
                name:'main',
                meta:{
                    alias:'footer-1',
                    keepAlive: true
                },
                component:resolve=>(require(["pages/public/main/main"],resolve)),
            },
            {
                path:'/tb-commerce',
                name:'tb-commerce',
                meta:{
                    alias:'footer-2',
                    keepAlive: true,
                    need_login:true
                },
                redirect: '/tb-commerce/tb-buy',
                component:resolve=>(require(["pages/public/ele-commerce/tb-commerce"],resolve)),
                children:[
                    {
                        path:'tb-buy',
                        name:'tb-buy',
                        meta:{
                            alias:'footer-2-1',
                            keepAlive: true,
                            need_login:true
                        },
                        component:resolve=>(require(["pages/public/ele-commerce/tb/tb-buy"],resolve))
                    },
                    {
                        path:'tb-browse',
                        name:'tb-browse',
                        meta:{
                            alias:'footer-2-2',
                            keepAlive: true,
                            need_login:true
                        },
                        component:resolve=>(require(["pages/public/ele-commerce/tb/tb-browse"],resolve))
                    },
                    {
                        path:'tb-appraise',
                        name:'tb-appraise',
                        meta:{
                            alias:'footer-2-3',
                            keepAlive: true,
                            need_login:true
                        },
                        component:resolve=>(require(["pages/public/ele-commerce/tb/tb-appraise"],resolve))
                    },
                    {
                        path:'tb-appointment',
                        name:'tb-appointment',
                        meta:{
                            alias:'footer-2-4',
                            keepAlive: true,
                            need_login:true
                        },
                        component:resolve=>(require(["pages/public/ele-commerce/tb/tb-appointment"],resolve))
                    },
                    {path:'*' ,redirect:'/tb-commerce/tb-buy'}
                ],
            },
            {
                path:'/jd-commerce',
                name:'jd-commerce',
                meta:{
                    alias:'footer-3',
                    need_login:true
                },
                redirect: '/jd-commerce/jd-buy',
                component:resolve=>(require(["pages/public/ele-commerce/jd-commerce"],resolve)),
                children:[
                    {
                        path:'jd-buy',
                        name:'jd-buy',
                        meta:{
                            alias:'footer-3-1',
                            need_login:true
                        },
                        component:resolve=>(require(["pages/public/ele-commerce/jd/jd-buy"],resolve))
                    },
                    {
                        path:'jd-browse',
                        name:'jd-browse',
                        meta:{
                            alias:'footer-3-2',
                            need_login:true
                        },
                        component:resolve=>(require(["pages/public/ele-commerce/jd/jd-browse"],resolve))
                    },
                    {
                        path:'jd-appraise',
                        name:'jd-appraise',
                        meta:{
                            alias:'footer-3-3',
                            need_login:true
                        },
                        component:resolve=>(require(["pages/public/ele-commerce/jd/jd-appraise"],resolve))
                    },
                    {
                        path:'jd-appointment',
                        name:'jd-appointment',
                        meta:{
                            alias:'footer-3-4',
                            need_login:true
                        },
                        component:resolve=>(require(["pages/public/ele-commerce/jd/jd-appointment"],resolve))
                    },
                    {path:'*' ,redirect:'/jb-commerce/jb-buy'}
                ],
            },
            {
                path:"/mypages",
                name:'mypages',
                meta:{
                    alias:'footer-4',
                    keepAlive: true
                },
                component:resolve=>(require(["pages/public/mypages/mypages"],resolve))
            },
            {path:'/' ,redirect:'/main'}
        ]
    },
    {
        path:"/thirdpages",
        name:'thirdpages',
        meta:{
            alias:'2'
        },
        component:resolve=>(require(["pages/public/third-page/third-page"],resolve))
    }, 
]
export default footer;