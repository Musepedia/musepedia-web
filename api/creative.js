/**
 * 文创产品接口
 */
import axios from '../utils/axios'

export function recommendCreative(params){
  return axios({
    url: 'creative/random',
    method: 'get',
    params: params
  })
}