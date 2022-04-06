//引入路由组件
import Home from "@/views/Home"
import Login from "@/views/Login"
import Register from "@/views/Register"
import Search from "@/views/Search"
import Detail from "@/views/Detail"
import AddCartSuccess from "@/views/AddCartSuccess"
import ShopCart from "@/views/ShopCart"
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
//引入二级路由组件
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'
//路由配置信息
export default [
    {
        path: "/home",
        component: Home,
        name: "home",
        meta: {
            show: true
        }
    },
    {
        path: "/login",
        component: Login,
        name: "login",
        meta: {
            show: false
        }
    },
    {
        path: "/register",
        component: Register,
        name: "register",
        meta: {
            show: false
        }
    },
    {
        path: "/search/:keyword",
        component: Search,
        name: "search",
        meta: {
            show: true
        }
    },
    {
        path: "/detail/:skuId",
        component: Detail,
        name: "detail",
        meta: {
            show: true
        }
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        name: "addcartsuccess",
    },
    {
        path: "/shopcart",
        component: ShopCart,
        name: "shopcart",
    },
    {
        path: "/trade",
        component: Trade,
        name: "trade",
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        name: "pay",
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        name: "paysuccess",
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: "/center",
        component: Center,
        name: "center",
        children:[
            {
                path:"myorder",
                name:"myorder",
                component:MyOrder
            },
            {
                path:"grouporder",
                name:"grouporder",
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    // 重定向 
    {
        path: "*",
        redirect: "/home"
    }
]