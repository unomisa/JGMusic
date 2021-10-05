import axios from 'axios'
import Vue from 'vue'

let baseUrl = ''
// Vue.prototype.$httpRequestMap = new Map() // 存储请求的取消函数
// const CancelToken = axios.CancelToken

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://nicemusic-api.lxhcool.cn/'
}

export function request (config) {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    withCredentials: true // 允许跨域

  })

  axios.defaults.timeout = 10000 // 超时时间
  axios.defaults.retry = 3 // 请求次数
  axios.defaults.retryDelay = 1000

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // config.params = {
      //   _t: Date.parse(new Date()) / 1000,
      //   ...config.params
      // }

      // config.cancelToken = new CancelToken(c => { // 强行中断请求要用到的
      //   Vue.prototype.$httpRequestMap.set(config.url, c)
      // })

      return config
    },
    err => {
      console.log('请求的错误：', err)
    }
  )

  // 响应拦截
  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      console.log(err)

      // 如果请求超时则重新请求
      if (err.message.includes('timeout')) {
        console.log('请求时间超时')
        const config = err.config
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) return Promise.reject(err)

        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0

        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
          // Reject with the error
          return Promise.reject(err)
        }

        // Increase the retry count
        config.__retryCount += 1

        // Create new promise to handle exponential backoff
        const backoff = new Promise(function (resolve) {
          setTimeout(function () {
            resolve()
          }, config.retryDelay || 1)
        })

        // Return the promise in which recalls axios to retry the request
        return backoff.then(function () {
          return axios(config)
        })
      } else {
        if (err.response) {
          return err.response.data
        } else {
          return err
        }
      }
    }

  )

  return instance(config)
}