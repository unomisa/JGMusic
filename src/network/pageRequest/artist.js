import { request } from 'network/request'
import { formatDate } from '../../common/utils'

// 获取歌手详情
export function getArtistDetail (id, timestamp) {
  return request({
    url: '/artist/detail',
    params: {
      id,
      timestamp
    }
  })
}

// 获取歌手单曲
export function getArtistHotSongs (id) {
  return request({
    url: '/artists',
    params: {
      id
    }
  })
}

// 获取歌手专辑信息
export function getArtistAlbum (id, limit, offset) {
  return request({
    url: '/artist/album',
    params: {
      id,
      limit,
      offset
    }
  })
}

// 获取歌手描述
export function getArtistDesc (id) {
  return request({
    url: '/artist/desc',
    params: {
      id
    }
  })
}

// 获取相似歌手
export function getSimiArtist (id) {
  return request({
    url: '/simi/artist',
    params: {
      id
    }
  })
}

export class ArtistBasic {
  constructor (artist) {
    const artistInfo = artist.artist
    if ('user' in artist) {
      const user = artist.user
      this.followed = user.followed
      this.userId = user.userId
    }

    this.blacklist = artist.blacklist
    this.name = artistInfo.name
    this.cover = artistInfo.cover
    this.albumCount = artistInfo.albumSize
    this.musicCount = artistInfo.musicSize
    this.mvCount = artistInfo.mvSize
  }
}

export class ArtistAlbum {
  constructor (album) {
    this.id = album.id
    this.name = album.name
    this.picUrl = album.picUrl
    this.publishTime = formatDate(new Date(album.publishTime)).split(' ')[0]
    this.songs = []
  }
}