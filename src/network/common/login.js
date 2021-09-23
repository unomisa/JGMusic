import { request } from 'network/request'
// * 登录相关

// 查询登录状态
export function getLoginStatus (timestamp) {
  return request({
    url: '/login/status',
    params: {
      timestamp
    }
  })
}

// 刷新登录状态
export function refreshStatus (timestamp) {
  return request({
    url: '/login/refresh',
    params: {
      timestamp
    }
  })
}

// 登出
export function logOut (timestamp) {
  return request({
    url: '/logout',
    params: {
      timestamp
    }
  })
}

// 手机登录：密码/验证码
export function phoneLogin (phone, captcha) {
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      captcha
    }
  })
}

// 向手机发送验证码
export function sendCaptcha (phone, ctcode, timestamp = Date.now()) {
  return request({
    url: '/captcha/sent',
    params: {
      phone,
      ctcode,
      timestamp
    }
  })
}

// 校验验证码是否正确
export function captchaVerify (phone, captcha, ctcode) {
  return request({
    url: '/captcha/verify',
    params: {
      phone,
      captcha,
      ctcode
    }
  })
}

// 生成二维码key
export function getQRKey (timestamp) {
  return request({
    url: '/login/qr/key',
    params: {
      timestamp
    }
  })
}

// 生成二维码
export function getQRImg (key, qrimg, timestamp) {
  return request({
    url: '/login/qr/create',
    params: {
      key,
      qrimg,
      timestamp
    }
  })
}

// 查询二维码状态
export function getQRCodeStatus (key, timestamp) {
  return request({
    url: '/login/qr/check',
    params: {
      key,
      timestamp
    }
  })
}

// * 注册相关
// 查看手机号是否注册
export function phoneExistence (phone, timestamp = Date.now()) {
  return request({
    url: '/cellphone/existence/check',
    params: {
      phone,
      timestamp
    }
  })
}

// 注册
export function register (phone, password, captcha, nickname, timestamp = Date.now()) {
  return request({
    url: '/register/cellphone',
    params: {
      phone,
      password,
      captcha,
      nickname,
      timestamp
    }
  })
}
