import axios from '../utils/axios'

export function getEnumDict(name){
  return axios({
    url: 'edict',
    method: 'get',
    params: {
      name: name
    }
  })
}