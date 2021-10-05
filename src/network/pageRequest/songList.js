import { request } from 'network/request'
import { formatDate, formatPlayCount } from 'common/utils'

// * 歌单详情相关

// 获取歌单分类
export function getSongListCategory () {
  return request({
    url: '/playlist/catlist'
  })
}

// 获得网友精选碟
export function getTopSongList (cat, limit, offset, order) {
  return request({
    url: '/top/playlist',
    params: {
      cat,
      limit,
      offset,
      order
    }
  })
}

// 精品歌单标签列表
export function getSongListHighqualityTags () {
  return request({
    url: '/playlist/highquality/tags'
  })
}

// 获取精品歌单内容
export function getSongListHighquality (cat, limit, before) {
  return request({
    url: '/top/playlist/highquality',
    params: {
      cat,
      limit,
      before
    }
  })
}

// 获取歌单详情
export function getPlayListDetail (id, timestamp = Date.now(), s) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
      timestamp,
      s
    }
  })
}

// 获取歌单评论
export function getSongListComment (id, limit, offset, before, timestamp = Date.now()) {
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset,
      before,
      timestamp
    }
  })
}

// * 歌单操作
export function createSongList (name, timestamp = Date.now()) {
  return request({
    url: '/playlist/create',
    params: {
      name,
      timestamp
    }
  })
}

export function deleteSongList (id, timestamp = Date.now()) {
  return request({
    url: '/playlist/delete',
    params: {
      id,
      timestamp
    }
  })
}

//  歌单详情信息
export class SongListDetail {
  constructor (songList) {
    this.id = songList.id
    this.name = songList.name // 歌单名
    this.coverImgUrl = songList.coverImgUrl // 歌单图片
    this.createTime = formatDate(new Date(songList.createTime)).split(' ')[0] // 歌单创建时间
    this.updateTime = formatDate(new Date(songList.updateTime)).split(' ')[0] // 最近更新时间

    this.subCount = songList.subscribedCount// 歌单被收藏次数
    this.shareCount = songList.shareCount// 歌单分享次数
    this.subscribed = songList.subscribed // 用户是否收藏

    this.tags = songList.tags // 标签
    this.highQuality = songList.highQuality

    this.playCount = formatPlayCount(songList.playCount) // 歌单播放数量
    this.trackCount = songList.trackCount // 歌曲数量
    this.description = songList.description // 简介

    this.creator = {
      userId: songList.creator.userId, // 歌单创建用户id
      nickname: songList.creator.nickname, // 歌单创建用户名
      avatarUrl: songList.creator.avatarUrl // 歌单创建用户头像
    }
  }
}

export class HighQualityList {
  constructor (list) {
    this.id = list.id
    this.coverImgUrl = list.coverImgUrl
    this.playCount = list.playCount
    this.name = list.name
    this.copywriter = list.copywriter
    this.tag = list.tag
    this.highQuality = true

    this.creator = {
      name: list.creator.nickname,
      userId: list.creator.userId,
      identityLevel: list.creator.avatarDetail && list.creator.avatarDetail.identityLevel,
      identityIconUrl: list.creator.avatarDetail && list.creator.avatarDetail.identityIconUrl
    }
  }
}