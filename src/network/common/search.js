import { request } from 'network/request'
import { alias, formatArtists } from 'common/utils'

// 搜索
export function search (keywords, type, limit, offset) {
  return request({
    url: '/cloudsearch',
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}

// 最佳匹配
export function searchMultimatch (keywords) {
  return request({
    url: '/search/multimatch',
    params: {
      keywords
    }
  })
}

// 默认搜索关键字
export function searchDefault (timestamp = Date.now()) {
  return request({
    url: '/search/default',
    params: {
      timestamp
    }
  })
}

// 热门搜索列表
export function searchHot (timestamp = Date.now()) {
  return request({
    url: '/search/hot/detail',
    params: {
      timestamp
    }
  })
}

// 搜索建议
export function searchSuggest (keywords, type) {
  return request({
    url: '/search/suggest',
    params: {
      keywords,
      type
    }
  })
}

export class SuggestSong {
  constructor (song) {
    this.id = song.id
    this.name = song.name
    this.alias = alias(song.alias)
    this.artists = formatArtists(song.artists)
    this.transName = 'transNames' in song && song.transNames[0]
  }
}