import { request } from 'network/request'

// * 数据请求

// 顶部轮播图
export function getBanner () {
  return request({
    url: '/banner'
  })
}

// 获取新歌
export function getNewSongs (limit) {
  return request({
    url: '/personalized/newsong',
    params: {
      limit
    }
  })
}

// 获取推荐歌单
export function getPersonalizedList (limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

// 获取热门歌手
export function getHotArtists (limit, offset) {
  return request({
    url: '/top/artists',
    params: {
      limit,
      offset
    }
  })
}