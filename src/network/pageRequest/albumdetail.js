import { request } from 'network/request'
import { formatArtists, formatPlayCount, formatDate } from 'common/utils'

// 获取专辑内容
export function getAlbum (id, timestamp = Date.now()) {
  return request({
    url: '/album',
    params: {
      id,
      timestamp
    }
  })
}

export function getAlbumComment (id, limit, offset, timestamp = Date.now()) {
  return request({
    url: '/comment/album',
    params: {
      id,
      limit,
      offset,
      timestamp
    }
  })
}

// 专辑动态信息,如是否收藏,收藏数,评论数,分享数
export function getAlbumDynamic (id, timestamp = Date.now()) {
  return request({
    url: '/album/detail/dynamic',
    params: {
      id,
      timestamp
    }
  })
}

export class AlbumBasic {
  constructor (album, dynamic) {
    this.id = album.id
    this.name = album.name
    this.picUrl = album.picUrl
    this.artists = formatArtists(album.artists)
    this.publishTime = formatDate(new Date(album.publishTime)).split(' ')[0]
    this.description = album.description
    this.subCount = dynamic.subCount
    this.shareCount = dynamic.shareCount
    this.isSub = dynamic.isSub // 专辑是否收藏
  }
}