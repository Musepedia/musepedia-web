import axios from '../utils/axios'

export function getExhibitionHallByMuseumId(id){
  return axios({
    url: 'exhibition-hall',
    method: 'get',
    params: {id: id}
  });
}