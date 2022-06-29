import axios from '../utils/axios'

export function questionFeedback(data){
  return axios({
    url: 'feedback',
    method: 'post',
    data: data
  })
}