import axios from 'axios'
import Vue from 'vue'

let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://nicemusic-api.lxhcool.cn/'
}

export function request (config) {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    withCredentials: true, // 允许跨域
    retry: 4,
    retryDelay: 1000
  })

  // 在main.js设置全局的请求次数，请求的间隙
  // * 自动重新请求功能

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // config.params = {
      //   _t: Date.parse(new Date()) / 1000,
      //   ...config.params
      // }
      return config
    },
    err => {
      console.log(err)
    }
  )

  // 响应拦截
  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      // if (err.message.includes('timeout')) {
      //   Vue.prototype.$notify.topleft('请求超时，请检查网络', 'error')
      // }
      console.log(err)
      const config = err.config
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) {
        console.log('没有设置')
        return Promise.reject(err)
      }

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
    }
  )

  return instance(config)
}