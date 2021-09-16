import { request } from 'network/request'

// * 获取歌词
export function getLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

// * 获取歌曲详情
export function getMusicDetail (ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// * 获取相似歌曲
export function getSimiMusic (id) {
  return request({
    url: '/simi/song',
    params: {
      id
    }
  })
}

// * 获取包含该歌曲的歌单
export function getSimiList (id) {
  return request({
    url: '/simi/playlist',
    params: {
      id
    }
  })
}

// * 新版获取评论
export function getComment (id, type, pageNo, pageSize, sortType, cursor, timestamp = Date.now()) {
  return request({
    url: '/comment/new',
    params: {
      id,
      type,
      pageNo,
      pageSize,
      sortType,
      cursor,
      timestamp
    }
  })
}

// * 旧版获取热门评论
export function getHotComment ({ id, type = 0, limit, offset, before, timestamp = Date.now() }) {
  return request({
    url: '/comment/hot',
    params: {
      id,
      type,
      limit,
      offset,
      timestamp,
      before
    }
  })
}

// * 旧版获取最新评论
export function getCommentOld (id, limit, offset, timestamp = Date.now(), before) {
  return request({
    url: '/comment/music',
    params: {
      id,
      limit,
      offset,
      timestamp,
      before
    }
  })
}
