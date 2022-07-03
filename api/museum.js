import axios from '../utils/axios'

export function getMuseumById(){
  
}

export function listMuseum(){
  return axios({
    url: "museum",
    method: 'get'
  })
}