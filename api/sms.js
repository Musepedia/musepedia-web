import axios from '../utils/axios'

export function sendSMS(params){
  return axios({
    url: 'sms',
    method: 'get',
    params: params
  })
}