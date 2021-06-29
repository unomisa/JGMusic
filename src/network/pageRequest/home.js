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
    this.alias = this.alias(info.song.alias)
    this.duration = this.durationStr(info.song.duration)
    this.currentBroadcast = false
    this.album = info.song.album
  }

  alias (item) {
    const aliasName = []
    item.forEach(item => {
      aliasName.push(item)
    })
    return aliasName.join(' / ')
  }

  durationStr (duration) {
    const multiple = duration / (60 * 1000)
    let minute
    if (parseInt(multiple) < 10) {
      minute = '0' + parseInt(multiple).toString()
    } else {
      minute = parseInt(multiple).toString()
    }
    const second = ((multiple.toFixed(2) - minute) * 0.6).toFixed(2).split('.')[1]
    return minute + ':' + second
  }
}