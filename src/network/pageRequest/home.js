import { request } from 'network/request'

// * 数据请求

// 顶部轮播图
export function getBanner () {
  return request({
    url: '/banner'
  })
}

export function getNewSongs (limit) {
  return request({
    url: '/personalized/newsong',
    params: {
      limit
    }
  })
}
