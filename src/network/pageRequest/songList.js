import { request } from 'network/request'
import { alias, durationStr } from 'common/utils'

// * 歌单详情相关

// 获取歌单详情
export function getPlayListDetail (id, s) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
      s
    }
  })
}

//  歌单详情信息
export class songListDetail {
  constructor (songList) {
    this.name = songList.name // 歌单名
    this.coverImgUrl = songList.coverImgUrl // 歌单图片
    this.createTime = songList.createTime // 歌单创建时间
    this.updateTime = songList.updateTime // 最近更新时间

    this.subscribedCount = songList.subscribedCount // 歌单被收藏次数
    this.shareCount = songList.shareCount // 歌单分享次数
    this.subscribed = songList.subscribed // 用户是否收藏

    this.tags = songList.tags // 标签

    this.playCount = songList.playCount // 歌单播放数量
    this.trackCount = songList.trackCount // 歌曲数量
    this.description = songList.description // 简介

    this.creator.userId = songList.creator.userId // 歌单创建用户id
    this.creator.nickname = songList.creator.nickname // 歌单创建用户名
    this.creator.avatarUrl = songList.creator.avatarUrl // 歌单创建用户头像
  }
}

export class Track {
  constructor (track) {
    this.id = track.id
    this.musicName = track.name // 歌曲名
    this.alias = alias(track.alia) // 歌曲别名
    this.singers = track.ar // 歌手(数组)
    this.album = track.al// 专辑(对象)
    this.duration = durationStr(track.dt) // 时长
  }
}