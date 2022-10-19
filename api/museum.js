import axios from '../utils/axios'
import {geoDistance} from '../utils/util'

export function getCurrentMuseum(){
  return axios({
    url: "museum/current",
    method: 'get'
  })
}

/**
 * 
 * @param {Array<Number>} pos 用户坐标 [longitude, latitude]
 */
export function queryMuseumWithDistance(query, pos){
  return queryMuseum(query).then(data => {
    data.forEach(museum => {
      if(!museum.longitude || !museum.latitude || !pos){
        museum.distance = undefined; // 便于排序
      } else {
        museum.distance = geoDistance(pos[1], pos[0], museum.latitude, museum.longitude)
      }
      console.log(museum);
    })
    return Promise.resolve(data)
  })
}

export function queryMuseum(query){
  return axios({
    url: "museum",
    method: 'get'
  })
}