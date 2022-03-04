import {formatTime} from './util'

/**
 * 
 * @param {*} text 文本
 * @param {*} avatar 头像，如果为空则不显示箭头
 * @param {*} right 头像是否在右侧
 */
export function CommonMessage(text, avatar, right = true){
  return {
    avatar: avatar,
    text: text,
    showArrow: avatar && avatar.length,
    right: right,
    fullWidth: false,
    transparent: false,
    textCenter: false,
    type: 'common'
  }
}

/**
 * 
 * @param {*} text 文本
 * @param {*} avatar 头像，如果为空则不显示箭头
 * @param {*} recommendHint 推荐提示
 * @param {*} recommends 推荐信息
 */
export function RecommendMessage(text, avatar, recommendHint, recommends, data){
  return {
    avatar: avatar,
    text: text,
    showArrow: avatar && avatar.length,
    right: false,
    fullWidth: true,
    transparent: false,
    textCenter: false,
    type: 'recommend',
    recommendHint: recommendHint,
    recommends: recommends,
    data: data
  }
}

export function TimeMessage(){
  return {
    text: formatTime(new Date()),
    type: 'hint'
  }
}