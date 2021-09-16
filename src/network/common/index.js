import { request } from 'network/request'
import { alias, formatArtists, durationStr } from 'common/utils'

export function getSongUrl (id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 喜欢音乐
export function likeSong (id, like) {
  return request({
    url: '/like',
    params: {
      id,
      like
    }
  })
}

// 收藏歌手
export function subArtist (id, t, timestamp) {
  return request({
    url: '/artistDetail/sub',
    params: {
      id,
      t,
      timestamp
    }
  })
}

// 关注用户
export function followUser (id, t, timestamp) {
  return request({
    url: '/follow',
    params: {
      id,
      t,
      timestamp
    }
  })
}

// 收藏歌单
export function subPlaylist (id, t, timestamp) {
  return request({
    url: '/playlist/subscribe',
    params: {
      id,
      t,
      timestamp
    }
  })
}

// 点赞评论
export function likeComment (id, cid, t, type, timestamp = Date.now()) {
  return request({
    url: '/comment/like',
    params: {
      id,
      cid,
      t,
      type,
      timestamp
    }
  })
}

// 歌单添加或删除歌曲
export function playlistManagement (op, pid, tracks, timestamp = Date.now()) {
  return request({
    url: '/playlist/tracks',
    params: {
      op,
      pid,
      tracks,
      timestamp
    }
  })
}

// 发送或删除评论
export function commentHandle (t, type, id, content, commentId, timestamp = Date.now()) {
  return request({
    url: '/comment',
    params: {
      t,
      type,
      id,
      content,
      commentId,
      timestamp
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
      currentBroadcast: false,
      cp: 'cp' in music ? music.cp : 1
    }
  }
}

// 专辑信息
export class Album {
  constructor (album) {
    this.id = album.id
    this.name = album.name
  }
}

// 歌手信息
export class Artist {
  constructor (artist) {
    this.id = artist.id
    this.name = artist.name
    this.picUrl = artist.picUrl
    this.accountId = 'accountId' in artist ? artist.accountId : null
  }
}

// 推荐歌单信息
export class SimiList {
  constructor (list) {
    this.id = list.id
    this.name = list.name
    this.picUrl = list.coverImgUrl
  }
}

// 用户评论信息整合
export class UserComment {
  constructor (info, rid, type) {
    this.rid = rid
    this.type = type

    this.avatarUrl = info.user.avatarUrl
    this.nickname = info.user.nickname
    this.userId = info.user.userId
    this.authStatus = info.user.authStatus

    this.content = info.content
    this.time = info.time
    this.likedCount = 'likedCount' in info ? info.likedCount : 0 // 点赞数
    this.liked = 'liked' in info ? info.liked : false // 是否点赞
    this.commentId = info.commentId
    this.replied = {}

    if ('beReplied' in info && info.beReplied !== null && info.beReplied.length > 0) {
      this.replied.nickname = info.beReplied[0].user.nickname
      this.replied.userId = info.beReplied[0].user.userId
      this.replied.content = info.beReplied[0].content
    }
  }
}

// 歌单展示信息
export class SongList {
  constructor (songList) {
    this.id = songList.id
    this.name = songList.name
    this.coverImgUrl = songList.coverImgUrl
    this.playCount = songList.playCount
    this.trackCount = songList.trackCount
    this.toplist = 'ToplistType' in songList
    this.updateTime = songList.updateTime
    this.highQuality = songList.highQuality
    this.subscribed = songList.subscribed ? songList.subscribed : false
    // this.tracks = []
  }
}