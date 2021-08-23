import { getLoginStatus } from 'network/common/login'
import { mapMutations } from 'vuex'
import { getUserDetail, Profile } from 'network/pageRequest/user'

// 更新登录状态
export const updateLoginStatus = {
  methods: {
    ...mapMutations([
      'setIsLogin',
      'setLoginUser'
    ]),

    getLoginStatus () {
      getLoginStatus(Date.now()).then(res => {
        const data = res.data
        if (data.code === 200 && data.account !== null && data.profile !== null) {
          getUserDetail(data.profile.userId).then(res => {
            this.setLoginUser(new Profile(res))
            this.setIsLogin(true)
            // console.log('登陆成功后：用户详细信息为:', res)
          })
        } else {
          this.setIsLogin(false)
        }
        // console.log('状态信息为：', res)
      })
    }
  }
}