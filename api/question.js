import axios from '../utils/axios'

export function getAnswer(question){
  return axios({
    url: 'qa',
    method: 'get',
    params: {
      question: question
    }
  });
}