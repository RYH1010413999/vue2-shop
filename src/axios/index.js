import axios from 'axios'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import router from '../router'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Indicator.open();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Indicator.close();
  return response;
}, function (error) {
  Toast({
    message: "服务器异常！",
    duration: 5000
  });
  Indicator.close();
  looding = false;
  // router.replace('/');
  // 对响应错误做点什么
  return Promise.reject(error);
});

// axios.defaults.baseURL = process.env.API_ROOT;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// get请求
const axiosGet = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: data,
      timeout: 5000,
      headers: {
        'oauth-key': localStorage.userInfo ? JSON.parse(localStorage.userInfo).oauth_key  : '',
        'personal-sign': localStorage.userInfo ? JSON.parse(localStorage.userInfo).personal_sign : ''
      },
    })
      .then(function (res) {
        if (res.data.status >= '40000') {
          Toast({
            message: res.data.msg,
            duration: 2000
          });
          if(res.data.status === '40106'){
            router.replace('/login');
          }
        }
        resolve(res.data)
      })
      .catch(function (error) {
        reject(error);
      })
  })
}

// post请求
const axiosPost = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      timeout: 5000,
      headers: {
        'oauth-key': localStorage.userInfo ? JSON.parse(localStorage.userInfo).oauth_key  : '',
        'personal-sign': localStorage.userInfo ? JSON.parse(localStorage.userInfo).personal_sign : ''
      },
    })
      .then(function (res) {
        if (res.data.status >= '40000') {
          Toast({
            message: res.data.msg,
            duration: 2000
          });
          if(res.data.status === '40106'){
            router.replace('/login');
          }
        }
        resolve(res.data)
      })
      .catch(function (error) {
        reject(error);
      })
  })

}

// del请求
const axiosDel = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: url,
      data: data,
      timeout: 5000,
      headers: {
        'oauth-key': localStorage.userInfo ? JSON.parse(localStorage.userInfo).oauth_key  : '',
        'personal-sign': localStorage.userInfo ? JSON.parse(localStorage.userInfo).personal_sign : ''
      },
    })
      .then(function (res) {
        if (res.data.status >= '40000') {
          Toast({
            message: res.data.msg,
            duration: 2000
          });
          if(res.data.status === '40106'){
            router.replace('/login');
          }
        }
        resolve(res.data)
      })
      .catch(function (error) {
        reject(error);
      })
  })

}
// 上传请求
const axiosUpload = (url, data, callback) => {
  let formData = new FormData();
  for (var item in data) {
    formData.append(item, data[item])
  }
  axios({
    method: 'post',
    url: url,
    data: formData
  })
    .then(function (res) {
      if (res.data.code == '1003') { window.store.commit('login_ture'); return false; }
      if (typeof (callback) == 'function') {
        callback(res)
      }
    })
    .catch(function (error) {
    })
}

// 参数校验
const parameterVerify = (data, slip) => {
  let verify = false;
  for (var item in data) {
    if (data[item] == false && item != slip) {
      verify = true
      break
    }
  };
  if (verify) {
    Toast({
      message: "请确认所有选项都填写完毕"
    });
    return 1;
  } else {
    return 0;
  }

}

export default {
  axiosGet,
  axiosPost,
  axiosUpload,
  parameterVerify,
  axiosDel
}
