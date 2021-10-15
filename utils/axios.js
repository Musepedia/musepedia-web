import axios from '../miniprogram_npm/axios/index'
import adapter from '../miniprogram_npm/axios-miniprogram-adapter/index'
import qs from '../miniprogram_npm/qs/index'

const _axios = axios.create({
  baseURL: 'http://qa.neptu.cn/',
  headers: {
    'Content-Type': 'application/json'
  },
});
_axios.defaults.adapter = adapter;

// 请求拦截器
_axios.interceptors.request.use(
  function success(config) {
    const token = getApp().globalData.userToken;
    if(token){
      // 添加用户token
      config.headers['token'] = token;
    }

    // get请求格式化(具体根据后端接口参数要求)
    if(config.method.toLowerCase() === 'get'){
      config.paramsSerializer = params => qs.stringify(params,{indices:false});
    }
    return config;
  },
  function fail(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  function success(response) {
    const data = response.data;
    return data.data || data;
  },
  function fail(error) {
    // TODO 处理返回数据
    const resp = error.response;
    if(!resp){
      wx.Toast.fail('网络请求失败');
      return Promise.reject(error);
    }
    if(resp.status === 401){

    } else if(resp.status === 403){
      wx.Toast.fail('对不起，你没有权限进行此操作');
    } else {
      if(resp.data.message){
        wx.Toast.fail(resp.data.message);
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default _axios