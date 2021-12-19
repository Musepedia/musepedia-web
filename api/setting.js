import axios from '../utils/axios'

export function getUserPreference(){
  return axios({
    url: 'setting/preference',
    method: 'get'
  })
}

export function updateUserPreference(data){
  return axios({
    url: 'setting/preference',
    method: 'post',
    data: data
  })
}