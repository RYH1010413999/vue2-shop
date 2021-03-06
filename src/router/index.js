import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index.vue'], resolve)
const Category = resolve => require(['@/views/Category.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Car = resolve => require(['@/views/Car.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
const Search = resolve => require(['@/views/Search.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)

// 个人中心模块
const User = resolve => require(['@/views/User.vue'], resolve)
const Address = resolve => require(['@/components/user/address.vue'], resolve)
const AddressList = resolve => require(['@/components/user/addressList.vue'], resolve)
const UserDetail = resolve => require(['@/components/user/userDetail.vue'], resolve)
const Coupon = resolve => require(['@/components/user/coupon.vue'], resolve)
const Like = resolve => require(['@/components/user/like.vue'], resolve)


const ConsirmOrder = resolve => require(['@/components/detail/consirmOrder'], resolve) //确认订单页面
const Success = resolve => require(['@/components/detail/success'], resolve) //支付成功页面
const Myorder = resolve => require(['@/components/user/myorder'], resolve) //我的订单页面
const Payview = resolve => require(['@/views/pay.vue'], resolve) //我的订单页面
const Explain = resolve => require(['@/views/explain.vue'], resolve) //关于
const EditPassword = resolve => require(['@/components/user/editPassword.vue'], resolve) //关于
const MyorderDetail = resolve => require(['@/components/user/myorderDetail'], resolve) // 订单详情


export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: Index
  },
  {
    path: '/category',
    name: '分类页',
    redirect: '/category/all',
    component: Category,
    children: [{
      path: '/category/:tab',
      component: CategoryMain
    }]
  },
  {
    path: '/car',
    name: '购物车页',
    component: Car,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    },
  },
  {
    path: '/car/pay',
    name: '支付页',
    component: Pay,
    meta: {
      requireAuth: true,
    },
  },


  {
    path: '/user',
    name: '用户页',
    component: User,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/addressList/:status',
    component: AddressList,
    name: '收货地址',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/address/:type',
    component: Address,
    name: '增加收货地址',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/userDetail',
    component: UserDetail,
    name: '个人信息',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/coupon',
    component: Coupon,
    name: '优惠券',
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/like',
    component: Like,
    name: '收藏',
    meta: {
      requireAuth: true,
    },
  },


  {
    path: '/detail/:id',
    name: '详情页',
    component: Detail
  },
  {
    path: '/search/:type/:id',
    name: '搜索页',
    component: Search
  },
  {
    path: '/login',
    name: '登录页',
    component: Login
  },
  {
    path: '/confirm/order',
    name: '确认订单',
    component: ConsirmOrder,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/success',
    name: '订单完成',
    component: Success,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/myorder/:type',
    name: '我的订单',
    component: Myorder,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/payView',
    name: '支付方式',
    component: Payview,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/explain/:type',
    name: '关于',
    component: Explain
  },
  {
    path: '/user/editPassword',
    name: '关于',
    component: EditPassword
  },
  {
    path: '/myorder/detail/:id',
    name: '订单详情',
    component: MyorderDetail,
    meta: {
      requireAuth: true,
    },
  },
  ]
})
