import { request } from 'network/request'
import { alias, formatArtists, durationStr } from 'common/utils'

// * 歌曲相关
export function getSongUrl (id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 歌曲信息
export class Music {
  constructor (music) {
    this.id = music.id
    this.name = music.name
    this.picUrl = music.picUrl
    this.alias = alias(music.alias)
    this.artists = formatArtists(music.artists)
    this.album = new Album(music.album)
    this.duration = durationStr(music.duration)

    this.state = { // 保留属性：对象状态
      picLoad: false, // 与那个黑胶图片有关,为true时它才出现
      currentBroadcast: false
    }
  }
}

export class Album {
  constructor (album) {
    this.id = album.id
    this.name = album.name
  }
}

export class Artist {
  constructor (artist) {
    this.id = artist.id
    this.name = artist.name
  }
}

// 用户评论信息整合
export class UserCommentInfo {
  constructor (info) {
    this.avatarUrl = info.user.avatarUrl
    this.nickname = info.user.nickname
    this.userId = info.user.userId
    this.content = info.content
    this.time = info.time
    this.likedCount = info.likedCount
    this.commentId = info.commentId
    this.replied = {}
    if ('beReplied' in info && info.beReplied !== null && info.beReplied.length > 0) {
      this.replied.nickname = info.beReplied[0].user.nickname
      this.replied.userId = info.beReplied[0].user.userId
      this.replied.content = info.beReplied[0].content
    }
  }
}