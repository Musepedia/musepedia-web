import axios from '../utils/axios'

export function userLogin(data){
  return axios({
    url: 'user/login',
    method: 'post',
    data: data
  })
}