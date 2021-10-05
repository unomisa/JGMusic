import { request } from 'network/request'

// * 用户信息相关

// 获取用户详情
export function getUserDetail (uid, timestamp = Date.now()) {
  return request({
    url: '/user/detail',
    params: {
      uid,
      timestamp
    }
  })
}

// 获取账号信息
export function getUserAccount (timestamp = Date.now()) {
  return request({
    url: '/user/account',
    params: {
      timestamp
    }
  })
}

// 查看数量
export function getUserSubcount (timestamp = Date.now()) {
  return request({
    url: '/user/subcount',
    params: {
      timestamp
    }
  })
}

// 获取用户喜欢的音乐的列表
export function getLikeList (id, timestamp = Date.now()) {
  return request({
    url: '/likelist',
    params: {
      id,
      timestamp
    }
  })
}

// 获取用户收藏歌手
export function getArtistSubList (limit, offset, timestamp = Date.now()) {
  return request({
    url: '/artist/sublist',
    params: {
      limit,
      offset,
      timestamp
    }
  })
}

// 获取用户收藏专辑
export function getAlbumSubList (limit, offset, timestamp = Date.now()) {
  return request({
    url: '/album/sublist',
    params: {
      limit,
      offset,
      timestamp
    }
  })
}

// 获取用户关注用户
export function getUserFollows (uid, limit, offset, timestamp = Date.now()) {
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

// 获取用户粉丝用户
export function getUserFolloweds (uid, limit, offset, timestamp = Date.now()) {
  return request({
    url: '/user/followeds',
    params: {
      uid,
      limit,
      offset,
      timestamp
    }
  })
}

// 查看用户歌单
export function getUserPlaylist (uid, limit, offset, timestamp = Date.now()) {
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
    this.identify = profile.identify

    this.authStatus = info.authStatus // 用户是否为网易云音乐人
    this.avatarDetail = info.avatarDetail ? info.avatarDetail : null // 头像额外内容

    this.userId = info.userId
    this.nickname = info.nickname
    this.avatarUrl = info.avatarUrl
    this.backgroundUrl = info.backgroundUrl
    this.followeds = info.followeds
    this.mutual = info.mutual // 是否互相关注
    this.follows = info.follows
    this.signature = info.signature
    this.gender = info.gender
  }
}

export class LoginUser extends Profile {
  constructor (profile) {
    super(profile)
    this.likeListSet = new Set([]) // 喜欢列表
    this.followList = new Map([]) // 关注用户
    this.subList = new Map([]) // 收藏歌单
    this.artistSub = new Map([]) // 收藏歌手列表
    this.subAlbum = {}
  }
}
