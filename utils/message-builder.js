import {formatTime} from './util'

export function CommonMessage(text, avatar, right = true){
  return {
    avatar: avatar,
    text: text,
    right: right,
    type: 'common'
  }
}

export function TimeInfo(){
  return {
    text: formatTime(new Date()),
    transparent: true,
    textCenter: true,
    fullWidth: true,
    type: 'common'
  }
}