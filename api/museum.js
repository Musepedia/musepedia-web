import axios from '../utils/axios'

export function getMuseumById(){
  
}
export function getCurrentMuseum(){
  return axios({
    url: "museum/current",
    method: 'get'
  })
}

export function listMuseum(){
  return axios({
    url: "museum",
    method: 'get'
  })
}