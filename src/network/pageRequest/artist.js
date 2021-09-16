import { request } from 'network/request'

// 获取热门歌手
export function getArtists (limit, offset, initial, type, area) {
  return request({
    url: '/artist/list',
    params: {
      limit,
      offset,
      initial,
      type,
      area
    }
  })
}