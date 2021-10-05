<template>
  <el-card class="contextmenu" :style="contextStyle" shadow="always"
           :body-style="{ padding: '0 0' }" ref="contextmenu">
    <ul @click="closeMenu">
      <!-- <li class="contextmenu-item">
        <svg class="icon item-icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        查看评论
      </li> -->

      <li class="contextmenu-item" @click="playMusic">
        <svg class="icon item-icon" aria-hidden="true">
          <use xlink:href="#icon-bofang2"></use>
        </svg>
        播放歌曲
      </li>

      <li class="contextmenu-item" @click="nextMusic">
        <svg class="icon item-icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        下一首播放
      </li>
      <li class="contextmenu-item" @click="subMusicToList">
        <i class="el-icon-folder-add item-icon"></i>
        收藏到歌单
      </li>
      <el-divider class="divider" v-if="isMyList"></el-divider>
      <li class="contextmenu-item" v-if="isMyList" @click="delMusic">
        <i class="el-icon-delete item-icon"></i>
        从歌单中删除
      </li>
    </ul>
  </el-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { playlistManagement } from 'network/common'

export default {
  props: {
    track: {
      type: Object,
      default () {
        return {}
      }
    },
    index: { // 在数组中的下标位置
      type: Number,
      default: 0
    },
    showContext: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      activeIndex: '0'
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    contextStyle () {
      return {
        top: this.y + 'px',
        left: this.x + 'px'
      }
    },

    isMyList () {
      if (this.$route.path.includes('songList') && 'id' in this.$route.params) {
        const sid = parseInt(this.$route.params.id)
        if (this.loginUser.subList.has(sid) && !this.loginUser.subList.get(sid).subscribed) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    listId () {
      if (this.isMyList) {
        return parseInt(this.$route.params.id)
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations([
      'addNextMusic',
      'addMusic',
      'delLikeList'
    ]),

    // * 事件处理
    // 判断是否点击在上下文菜单重，关闭上下文菜单
    close (event) {
      const contextmenu = this.$refs.contextmenu.$el
      const target = event.target
      if (contextmenu.contains(target)) return // 如果点击在上下文菜单中，不直接关闭
      this.closeMenu()
    },

    // 关闭上下文菜单
    closeMenu () {
      this.$emit('update:showContext', false)
    },

    // 删除音乐
    delMusic () {
      playlistManagement('del', this.listId, this.track.id).then(res => {
        console.log('删除歌曲后为：', res)
        if (res.body.code === 200) {
          this.$notify.topleft('删除歌曲成功')
          const list = this.loginUser.subList.get(this.listId) // 获取用户歌单
          list.trackCount = res.body.count // 更新歌曲数量
          this.$bus.$emit('songListDelMusic', this.listId, this.index) // 全局发送删除歌曲事件

          if (list.specialType === 5) {
            this.delLikeList(this.track.id)
          }
        } else {
          this.$notify.topleft('歌曲删除失败', 'error')
        }
      })
    },

    // 全局发送收藏歌曲至歌单
    subMusicToList () {
      if (this.track.state.cp !== 0) {
        this.$bus.$emit('subMusicToList', this.track) // 将歌曲传递给收藏歌单页
      } else {
        this.$notify.topleft('歌曲暂无版权', 'error')
      }
    },

    // 歌曲添加至下一首播放
    nextMusic () {
      if (this.track.state.cp !== 0) {
        this.addNextMusic(this.track)
        this.$notify.topleft('已添加至下一首播放')
      } else {
        this.$notify.topleft('歌曲暂无版权', 'error')
      }
    },

    // 播放歌曲
    playMusic () {
      this.addMusic(this.track)
    },

    // * 初始化
    // 若窗口剩余高度不够，则重新计算菜单位置
    RecalculatePosition () {
      const contextmenu = this.$refs.contextmenu.$el // 菜单
      document.body.append(contextmenu) // 添加至body

      const windowHeight = document.documentElement.clientHeight // 窗口高度
      const menuHeight = contextmenu.clientHeight // 菜单高度
      if ((windowHeight - this.y) < (menuHeight + 20)) {
        this.$emit('update:y', this.y - menuHeight - 10)
      }
    }

    // * 网络请求
  },
  created () {
    document.body.addEventListener('mousedown', this.close)
  },
  destroyed () {
    document.body.removeEventListener('mousedown', this.close)
  },
  mounted () {
    this.RecalculatePosition()
  }
}
</script>

<style lang="less" scoped>
.contextmenu {
  position: fixed;
  z-index: 2000;
  width: 150px;
  font-size: 14px;
  user-select: none;
  transition: none;

  &-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;

    &:hover {
      background-color: #fbebf4;
    }
  }
}

.item-icon {
  margin-right: 1rem;
  font-size: 18px;
}

.divider {
  margin: 3px 0;
}
</style>