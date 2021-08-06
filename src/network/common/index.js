import { request } from 'network/request'

export function getSongUrl (id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 用户评论信息整合
export class UserCommentInfo {
  constructor (info) {
    this.avatarUrl = info.user.avatarUrl
    this.nickname = info.user.nickname
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