import axios from '../utils/axios'

export function getQuestionHistory(){
  return axios({
    url: 'question/mine',
    method: 'get'
  })
}