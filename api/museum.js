import axios from '../utils/axios'

export function listMuseum(){
  return axios({
    url: "museum",
    method: 'get'
  })
}