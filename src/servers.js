import axios from '@/axios/index.js';
const sendRegisterCode = (data) => axios.axiosPost(`/send/register/code/`, data);//发送注册验证码
const register = (data) => axios.axiosPost(`/oauth/login/`, data); // 登录 注册
const sendLoginCode= (data) => axios.axiosPost(`/send/login/code/`, data); // 验证码登录
const wechatOauth = (data) => axios.axiosPost(`/wechat/oauth/`, data); // 获取openid
const productsAll = (data) => axios.axiosGet(`/sales/products/all/`, data); // 获取所有产品
const productsDetail = (data) => axios.axiosGet(`/sales/products/detail/`, data); // 获取产品详情
const spectrum = (data) => axios.axiosGet(`/sales/spectrum/`, data); // 获取系列
const category = (data) => axios.axiosGet(`/sales/category/`, data); // 获取分类
const addressRreate = (data) => axios.axiosGet(`personal/address/create/`, data); // 创建地址
const productsPrice = (data) => axios.axiosPost(`/sales/products/price/`, data); // 产品价格查询
const productsSpectrum = (data) => axios.axiosGet(`/sales/products/spectrum/`, data); // 获取系列产品
const productsCategory = (data) => axios.axiosGet(`/sales/products/category/`, data); // 获取分类产品
const addressCreate = (data) => axios.axiosPost(`/personal/address/create/`, data); // 增加收货地址
const addressList = (data) => axios.axiosPost(`/personal/address/list/`, data); // 获取收货地址
const delAddress = (path,data) => axios.axiosDel(path, data); // 删除收货地址
const editAddress = (path,data) => axios.axiosPost(path, data); // 修改收货地址
const orderCreate = (data) => axios.axiosPost(`/consume/order/create/`, data); // 创建订单
const payCreate = (data) => axios.axiosPost(`/consume/pay/create/`, data); // 支付
const addressDefault = (data) => axios.axiosPost(`personal/address/default/`, data); // 获取默认地址
const orderList = (data) => axios.axiosPost(`personal/order/list/`, data); // 获取默认地址
const payCheck = (data) => axios.axiosGet(`personal/pay/check/`, data); // 判断支付状态
const shopInfo = (data) => axios.axiosGet(`shop/info/`, data); // 购物信息
const cancelOrder = (data) => axios.axiosPost(`personal/cancel/order/`, data); // 取消订单
const couponList = (data) => axios.axiosPost(`personal/coupon/list/`, data); // 获取优惠券
const couponEnable = (data) => axios.axiosPost(`personal/coupon/enable/`, data); // 获取可用优惠券
const cartHandle = (data) => axios.axiosPost(`personal/cart/handle/`, data); // 加入购物车
const cartList = (data) => axios.axiosPost(`personal/cart/list/`, data); // 购物车列表
const oauthLogout = (data) => axios.axiosPost(`oauth/logout/`, data); // 退出账号
const changePassword= (data) => axios.axiosPost(`personal/change/password/`, data); // 修改密码
const orderCalculate = (data) => axios.axiosPost(`consume/order/calculate/`, data); // 选择优惠券后的订单
const orderConfirm = (data) => axios.axiosPost(`consume/order/confirm/`, data); // 订单确认
export default {
  sendRegisterCode,
  register,
  sendLoginCode,
  wechatOauth,
  productsAll,
  productsDetail,
  spectrum,
  category,
  addressRreate,
  productsPrice,
  productsSpectrum,
  productsCategory,
  addressCreate,
  addressList,
  delAddress,
  editAddress,
  orderCreate,
  addressDefault,
  orderList,
  payCheck,
  payCreate,
  shopInfo,
  cancelOrder,
  couponList,
  couponEnable,
  cartHandle,
  cartList,
  oauthLogout,
  changePassword,
  orderCalculate,
  orderConfirm
}