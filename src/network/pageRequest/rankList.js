import { request } from 'network/request'

// 获取排行榜内容
export function getTopList () {
  return request({
    url: '/toplist'
  })
}

// 所有榜单内容摘要
export function getTopListDetail () {
  return request({
    url: '/toplist/detail'
  })
}
