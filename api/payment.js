import axios from '../utils/axios'

export function prepay(data){
  return axios({
    url: 'payment/prepay',
    method: 'post',
    data: data
  })
}