import { request } from 'network/request'

// * 用户信息相关

// 获取用户详情
export function getUserDetail (uid) {
  return request({
    url: '/user/detail',
    params: {
      uid
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

// 查看用户歌单
export function getUserPlaylist (uid, limit, offset) {
  return request({
    url: '/user/playlist',
    params: {
      uid,
      limit,
      offset
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
