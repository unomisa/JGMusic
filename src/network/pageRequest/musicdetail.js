import { request } from 'network/request'

export function getLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}