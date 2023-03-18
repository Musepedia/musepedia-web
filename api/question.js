import axios from '../utils/axios'

export function getAnswer(question, gpt = false){
  return axios({
    url: 'qa',
    method: 'get',
    params: {
      question: question,
      gpt: gpt
    }
  });
}