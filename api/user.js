import axios from '../utils/axios'

export function userLogin(data){
  return axios({
    url: 'user/login-wx',
    method: 'post',
    data: data
  })
}

export function getUserInfo(){
  return axios({
    url: 'user/info',
    method: 'get'
  })
}

export function updateUserProfile(data){
  return axios({
    url: 'user/profile',
    method: 'put',
    data: data
  })
}