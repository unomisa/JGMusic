import { request } from 'network/request'

// * 用户信息相关

// 获取用户详情
export function getUserDetail (uid, timestamp) {
  return request({
    url: '/user/detail',
    params: {
      uid,
      timestamp
    }
  })
}

// 获取账号信息
export function getUserAccount () {
  return request({
    url: '/user/account'
  })
}

// 查看数量
export function getUserSubcount () {
  return request({
    url: '/user/subcount'
  })
}

// 获取用户喜欢的音乐的列表
export function getLikeList (id, timestamp) {
  return request({
    url: '/likelist',
    params: {
      id,
      timestamp
    }
  })
}

// 获取用户收藏歌手
export function getArtistSubList (limit, offset, timestamp) {
  return request({
    url: '/artist/sublist',
    params: {
      limit,
      offset,
      timestamp
    }
  })
}

// 获取用户关注用户
export function getUserFollows (uid, limit, offset, timestamp) {
  return request({
    url: '/user/follows',
    params: {
      uid,
      limit,
      offset,
      timestamp
    }
  })
}

// 查看用户歌单
export function getUserPlaylist (uid, limit, offset, timestamp) {
  return request({
    url: '/user/playlist',
    params: {
      uid,
      limit,
      offset,
      timestamp
    }
  })
}

export class Profile {
  constructor (profile) {
    const info = profile.profile
    this.level = profile.level
    this.userId = info.userId
    this.nickname = info.nickname
    this.avatarUrl = info.avatarUrl
    this.backgroundUrl = info.backgroundUrl
    this.followeds = info.followeds
    this.follows = info.follows
    this.signature = info.signature
    this.gender = info.gender

    this.likeListSet = new Set([])
    this.artistSub = new Map([])
    this.followList = new Map([])
  }
}

export class Follow {
  constructor (follow) {
    this.userId = follow.userId
    this.name = follow.nickname
    this.avatarUrl = follow.avatarUrl
    this.signature = follow.signature
    this.followeds = follow.followeds
  }
}

// 歌单展示信息
export class songList {
  constructor (songList) {
    this.id = songList.id
    this.name = songList.name
    this.coverImgUrl = songList.coverImgUrl
    this.playCount = songList.playCount
    this.trackCount = songList.trackCount
  }
}
