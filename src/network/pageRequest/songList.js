import { request } from 'network/request'
import { formatDate, formatPlayCount } from 'common/utils'

// * 歌单详情相关

// 获取歌单详情
export function getPlayListDetail (id, timestamp, s) {
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
export function getSongListComment (id, limit, offset, before) {
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset,
      before
    }
  })
}

//  歌单详情信息
export class SongListDetail {
  constructor (songList) {
    this.name = songList.name // 歌单名
    this.coverImgUrl = songList.coverImgUrl // 歌单图片
    this.createTime = formatDate(new Date(songList.createTime)).split(' ')[0] // 歌单创建时间
    this.updateTime = formatDate(new Date(songList.updateTime)).split(' ')[0] // 最近更新时间

    this.subCount = formatPlayCount(songList.subscribedCount, 10000) // 歌单被收藏次数
    this.shareCount = formatPlayCount(songList.shareCount, 10000) // 歌单分享次数
    this.subscribed = songList.subscribed // 用户是否收藏

    this.tags = songList.tags // 标签

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
