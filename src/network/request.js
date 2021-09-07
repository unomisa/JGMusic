import axios from 'axios'

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
    withCredentials: true // 允许跨域
  })

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
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
      console.log(err)
    }
  )

  return instance(config)
}