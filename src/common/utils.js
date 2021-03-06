import { Artist } from 'network/common'
/**
 * * 存放公共工具函数
 */

// 节流函数,每隔一段时间，只执行一次函数。
export function throttle (func, ms) {
  let isThrottled = false
  let savedArgs
  let savedThis

  function wrapper () {
    if (isThrottled) { // (2)
      savedArgs = arguments
      savedThis = this
      return
    }

    func.apply(this, arguments) // (1)

    isThrottled = true

    setTimeout(function () {
      isThrottled = false // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }

  return wrapper
}

// 防抖动函数
export function debounce (func, delay = 300) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)

    return timer
  }
}

// 日期处理函数
export function formatDate (date, fmt) {
  if (typeof date === 'string') {
    return date
  }

  if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss'

  if (!date || date == null) return null
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// 判断是否是浮点数
export function isFloat (number) {
  return ~~number !== number
}

// 生成从minNum到maxNum的随机数
export function randomNum (minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
  }
}

// 数组随机排序
export function shuffle (arr) {
  let i = arr.length
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]]
  }
}

export function arrSwap (arr, indexA, indexB) {
  const temp = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = temp
}

/**
 * * js 动画函数
 * @timing 时间函数
 * @draw 绘制函数
 * @duration 动画时间
 */
export function animate ({ timing, draw, duration }) {
  let start = performance.now()

  requestAnimationFrame(function animate (time) {
    // timeFraction 从 0 增加到 1
    // * 用当前时间减去开始时间除以总时间，得到当前进程百分比数
    let timeFraction = (time - start) / duration
    if (timeFraction > 1 || timeFraction < 0) timeFraction = 1 // 超出动画时间或手动暂停动画归1以正常结束

    // 计算当前动画状态
    const progress = timing(timeFraction)

    draw(progress) // 每次都会绘制

    if (timeFraction < 1) { // 如果动画时间未到达，继续绘制
      requestAnimationFrame(animate)
    }
  })

  return function () {
    start = start + duration // 使timeFraction为负数来使动画停止
  }
}

// 使节点滚动至固定位置（流畅动画）
export function ElScrool (el, scrollTop, time = 300) {
  const currentTop = el.scrollTop
  const scrollHeight = scrollTop - currentTop
  animate({
    duration: time,
    timing: function (timeFraction) {
      return timeFraction
    },
    draw: function (progress) {
      el.scrollTop = currentTop + (progress * scrollHeight)
    }
  })
}

// * 项目特有工具函数

// 别名格式化
export function alias (alias) {
  if (alias === undefined) return
  const aliasName = []
  alias.forEach(item => {
    aliasName.push(item)
  })
  return aliasName.join(' / ')
}

// 作者信息格式化
export function formatArtists (artists) {
  const newArtists = []
  artists.forEach((artist) => {
    newArtists.push(new Artist(artist))
  })
  return newArtists
}

// 歌曲时长处理
export function durationStr (millis) {
  let minutes = parseInt(Math.floor(millis / 60000))
  let seconds = parseInt(((millis % 60000) / 1000).toFixed(0))

  if (seconds === 60) {
    seconds = 0 // 置零
    minutes++ // 分钟加一
  }

  return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

// 播放次数格式化
export function formatPlayCount (playCount, threshold = 100000) {
  if (playCount >= threshold) {
    return parseInt(playCount / 10000) + '万'
  }
  return playCount
}
