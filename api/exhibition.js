import axios from '../utils/axios'

export function getExhibitInfo(id){
  return axios({
    url: 'exhibit',
    method: 'get',
    params: {
      id: id
    }
  });
}