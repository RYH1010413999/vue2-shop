import axios from '@/axios/index.js';
const sendRegisterCode = (data) => axios.axiosPost(`/send/register/code/`, data);//发送注册验证码
const register = (data) => axios.axiosPost(`/oauth/login/`, data); // 登录 注册
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
const orderCreate = (data) => axios.axiosPost(`/consume/order/create/`, data); // 获取收货地址
export default {
  sendRegisterCode,
  register,
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
  orderCreate
}