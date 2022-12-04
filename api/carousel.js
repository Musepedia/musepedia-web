/**
 * 首页轮播图接口
 */
import axios from '../utils/axios'

export function getCarousel(){
  return Promise.resolve([
    {
      title: '钱学森图书馆活动',
      type: 'activity',
      detail: {},
      img: '//static.musepedia.cn/figs/t01164c3f691c15ebbf.jpg',
      link: 'https://mp.weixin.qq.com/s/HHq-AI1UpbsmqJo_L6j2fw'
    },
    {
      title: '自然博物馆活动',
      type: 'activity',
      detail: '是什么',
      img: '//static.musepedia.cn/figs/826eb2b2a42c55f7.jpg',
      link: 'https://musepedia.cn', 
    },
    {
      title: '长风海报收藏馆活动',
      type: 'creative',
      detail: {
        name: '罗维尼老城，克罗地亚',
        img: 'https://static.musepedia.cn/figs/cc1.jpg',
        description: `美丽而又历史悠久的罗维尼矗立在亚得里亚海边。圣尤菲米亚教堂200英尺高的钟楼俯瞰着罗维尼老城中心。这座教堂建于18世纪初，也充当着灯塔，照亮镇上渔船回家的路。
        2000多年前，罗维尼原本是一座独立的小岛，直到1763年，人们填海修路，将其与陆地连接了起来。如今，这座城市的经济主要来源于旅游业，浪漫的鹅卵石街道边满是酒吧、餐馆和博物馆。罗维尼被联合国教科文组织列入世界遗产名录，是伊斯特拉最受欢迎的旅游目的地之一。`
      },
      img: '//static.musepedia.cn/figs/100sh.jpg',
      link: 'https://cn.bing.com'
    }
  ])
  return axios({
    url: 'carousel',
    method: 'get',
  })
}