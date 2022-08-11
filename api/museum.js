import axios from '../utils/axios'

export function getMuseumById(){
  
}
export function getCurrentMuseum(){
  return Promise.resolve(wx.getStorageSync('currentMuseumId') === 1 ? 
  {
    id: 5,
    name: '长风商标海报',
    logoUrl: 'https://www.snhm.org.cn/webpc/images/logo.png',
    description: '上海自然博物馆(上海科技馆分馆),位于上海市静安区北京西路510号(静安罹塑公园内),建筑面积45257平方米,展览教育服务面积32200平方米,是综合性博物馆。',
    location: '普陀',
    service: true,
  } : {
    id: 5,
    name: '长风商标海报',
    logoUrl: 'https://www.snhm.org.cn/webpc/images/logo.png',
    description: '米方平75254积面筑建,)内园公塑罹安静(号015路西京北区安静市海上于位,)馆分馆技科海上(馆物博然自海上',
    location: '普陀',
    service: true,
  });
  return axios({
    url: "museum/current",
    method: 'get'
  })
}

export function listMuseum(){
  const mu = [
    {
      name: '长风商标海报',
      logoUrl: 'https://www.snhm.org.cn/webpc/images/logo.png',
      description: '',
      location: '普陀',
      service: true,
    },
    {
      name: '上海艺术品博物馆',
      distance: '2.3km',
      location: '天山',
      actiserviceve: false
    },
    {
      name: '上海自然博物馆',
      distance: '5.7km',
      location: '北京西路',
      service: true
    },
    {
      name: '世博会博物馆',
      distance: '8.5km',
      location: '鲁班路',
      service: false
    }
  ];
  mu.forEach((e,i) => {
    e.id = i + 1;
    if(i === 0){
      e.tag = '距离最近'
    }
    if(!e.service){
      e.tag = '暂不可用'
    }
  });
  return Promise.resolve(mu);
  return axios({
    url: "museum",
    method: 'get'
  })
}