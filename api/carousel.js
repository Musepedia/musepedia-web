/**
 * 首页轮播图接口
 */
import axios from '../utils/axios'

export function getCarousel(){
  return axios({
    url: 'carousel',
    method: 'get',
  })
}