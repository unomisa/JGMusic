import { request } from 'network/request'

// * 数据请求

// 顶部轮播图
export function getBanner () {
  return request({
    url: '/banner'
  })
}

export function getRecommendSongs (limit) {
  return request({
    url: '/personalized/newsong',
    params: {
      limit
    }
  })
}

export function test (url) {
  return request({
    url: url
  })
}

// * 整合类
export class RecommendSong {
  constructor (info) {
    this.picLoad = false
    this.id = info.id
    this.name = info.name
    this.picUrl = info.picUrl
    this.artists = info.song.artists
    this.alias = info.song.alias
  }
}