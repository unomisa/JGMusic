import { request } from 'network/request'
import { alias, durationStr } from 'common/utils'

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

// * 整合类
export class NewSong {
  constructor (info) {
    this.picLoad = false
    this.id = info.id
    this.name = info.name
    this.picUrl = info.picUrl
    this.artists = info.song.artists
    this.alias = alias(info.song.alias)
    this.duration = durationStr(info.song.duration)
    this.currentBroadcast = false
    this.album = info.song.album
  }
}