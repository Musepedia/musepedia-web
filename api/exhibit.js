import axios from '../utils/axios'

export function getExhibitInfoById(id){
  return axios({
    url: 'exhibit',
    method: 'get',
    params: {
      id: id
    }
  });
}

export function getRandomExhibits(){
  return axios({
    url: 'exhibit/random',
    method: 'get'
  })
}