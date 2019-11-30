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
    component: Car
  },
  {
    path: '/car/pay',
    name: '支付页',
    component: Pay
  },


  {
    path: '/user',
    name: '用户页',
    component: User,
    meta: {
      requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    },
  },
  {
    path: '/addressList',
    component: AddressList,
    name: '收货地址'
  },
  {
    path: '/address',
    component: Address,
    name: '增加收货地址'
  },
  {
    path: '/userDetail',
    component: UserDetail,
    name: '个人信息'
  },
  {
    path: '/coupon',
    component: Coupon,
    name: '优惠券'
  },
  {
    path: '/like',
    component: Like,
    name: '收藏'
  },


  {
    path: '/detail',
    name: '详情页',
    component: Detail
  }, 
  {
    path: '/search',
    name: '搜索页',
    component: Search
  }, 
  {
    path: '/login',
    name: '登录页',
    component: Login
  }
  ]
})
