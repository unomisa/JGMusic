import { request } from 'network/request'
import { alias, formatArtists, durationStr } from 'common/utils'
import store from '@/store/index'
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
    url: '/artist/sub',
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
export function subPlaylist (id, t, timestamp = Date.now()) {
  return request({
    url: '/playlist/subscribe',
    params: {
      id,
      t,
      timestamp
    }
  })
}

// 收藏专辑
export function subAlbum (id, t, timestamp = Date.now()) {
  return request({
    url: '/album/sub',
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
    // 查看音乐是否已存在于播放列表
    if (store.getters.playListMap.has(music.id)) {
      // 存在列表中返回列表中已存在的对象
      const index = store.getters.playListMap.get(music.id) // 得到索引位置
      return store.state.playList[index] // 返回播放列表中的对象
    } else {
      // 不再列表中正常构造
      this.id = music.id
      this.name = music.name
      this.picUrl = music.picUrl
      this.alias = alias(music.alias)
      this.artists = formatArtists(music.artists)
      this.album = new Album(music.album)
      this.duration = durationStr(music.duration)
      this.pop = music.pop
      this.tns = music.tns

      this.state = { // 保留属性：对象状态
        picLoad: false, // 与那个黑胶图片有关,为true时它才出现
        currentBroadcast: false,
        cp: 'cp' in music ? music.cp : 1
      }
    }
  }
}

// 专辑信息
export class Album {
  constructor (album) {
    this.id = album.id
    this.name = album.name
    this.picUrl = 'picUrl' in album && album.picUrl
    this.artists = 'artists' in album && formatArtists(album.artists)
    this.alias = 'alias' in album && alias(album.alias)
    this.trans = 'transNames' in album && alias(album.transNames)
  }
}

// 歌手信息
export class Artist {
  constructor (artist) {
    this.id = artist.id
    this.name = artist.name
    this.picUrl = artist.picUrl
    this.alias = 'alias' in artist && alias(artist.alias)
    this.trans = 'trans' in artist && artist.trans // 翻译
    this.accountId = 'accountId' in artist ? artist.accountId : null // 网易云用户id
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

export class User {
  constructor (user) {
    this.id = user.userId
    this.name = user.nickname
    this.gender = user.gender
    this.followed = user.followed // 是否关注
    this.mutual = user.mutual // 是否相互关注
    this.followeds = user.followeds // 粉丝数
    this.avatarUrl = user.avatarUrl // 头像
    this.avatarDetail = user.avatarDetail ? user.avatarDetail : null // 头像额外内容
    this.authStatus = user.authStatus // 用户是否为网易云音乐人
    this.signature = user.signature
  }
}

// 用户评论信息整合
export class UserComment {
  constructor (info, rid, type) {
    this.rid = rid
    this.type = type

    this.avatarUrl = info.user.avatarUrl
    this.avatarDetail = info.user.avatarDetail ? info.user.avatarDetail : null
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
    this.specialType = songList.specialType
    // this.tracks = []

    if ('creator' in songList && songList.creator) {
      this.creator = {
        userId: songList.creator.userId, // 歌单创建用户id
        nickname: songList.creator.nickname // 歌单创建用户名
      }
    }

    this.bookCount = 'bookCount' in songList && songList.bookCount
  }
}