import { request } from './request';

//轮播和icon
export function getHomeMultidata() {
  return request({
     url:'/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}