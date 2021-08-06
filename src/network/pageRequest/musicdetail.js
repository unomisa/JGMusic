import { request } from 'network/request'
import { alias, durationStr } from 'common/utils'

// * 获取歌词
export function getLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

// * 获取歌曲详情
export function getMusicDetail (ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// * 获取相似歌曲
export function getSimiMusic (id) {
  return request({
    url: '/simi/song',
    params: {
      id
    }
  })
}

// * 获取包含该歌曲的歌单
export function getSimiList (id) {
  return request({
    url: '/simi/playlist',
    params: {
      id
    }
  })
}

// * 新版获取评论
export function getComment (id, type, pageNo, pageSize, sortType, cursor) {
  return request({
    url: '/comment/new',
    params: {
      id,
      type,
      pageNo,
      pageSize,
      sortType,
      cursor
    }
  })
}

// * 旧版获取热门评论
export function getHotComment ({ id, type = 0, limit, offset, before }) {
  return request({
    url: '/comment/hot',
    params: {
      id,
      type,
      limit,
      offset,
      before
    }
  })
}

// * 旧版获取最新评论
export function getCommentOld (id, limit, offset, before) {
  return request({
    url: '/comment/music',
    params: {
      id,
      limit,
      offset,
      before
    }
  })
}

// * 整合歌曲信息
export class SimiSongs {
  constructor (info) {
    this.picLoad = false
    this.id = info.id
    this.mvid = info.mvid
    this.name = info.name
    this.picUrl = info.album.picUrl
    this.artists = info.album.artists
    this.alias = alias(info.alias)
    this.duration = durationStr(info.duration)
    this.currentBroadcast = false
    this.album = info.album
  }
}