/**
 * * 存放公共工具函数
 */

// 节流函数
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
