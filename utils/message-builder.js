import {formatTime} from './util'

export function CommonMessage(text, avatar, right = true){
  return {
    avatar: avatar,
    text: text,
    right: right,
    fullWidth: false,
    transparent: false,
    textCenter: false,
    type: 'common'
  }
}

export function RecommendMessage(text, avatar, recommendHint, recommends){
  return {
    avatar: avatar,
    text: text,
    right: false,
    fullWidth: true,
    transparent: false,
    textCenter: false,
    type: 'recommend',
    recommendHint: recommendHint,
    recommends: recommends
  }
}

export function HintMessage(){
  return {
    text: formatTime(new Date()),
    type: 'hint'
  }
}