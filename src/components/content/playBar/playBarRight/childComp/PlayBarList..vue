<template>
  <div>
    <el-tooltip popper-class="tooltip" effect="light" content="播放列表"
                placement="top-end" :visible-arrow="false"
                :disabled="isShowList">
      <svg class="icon list" aria-hidden="true" @click.stop="openList"
           ref="listIcon">
        <use xlink:href="#icon-yinleliebiao-"></use>
      </svg>
    </el-tooltip>

    <transition name="el-zoom-in-top">
      <el-card class="box-card" v-show="isShowList"
               body-style="padding-right:0;" ref="card">
        <div class="title">
          <el-row type="flex" align="middle">
            <el-col :span="9" :offset="0">
              <i class="el-icon-headset" /> 播放列表
            </el-col>

            <el-col :span="5" :offset="0" class="count">
              共{{playListLength}}首 <i class="el-icon-collection-tag" />
            </el-col>

            <el-col :span="6" :offset="4" class="clear"
                    @click.native.stop="clear">
              <i class="el-icon-delete" /> 清空列表
            </el-col>
          </el-row>
        </div>

        <div v-bar class="scroll-container">
          <div class="scroll-content" ref="scroll">
            <play-bar-list-item :song="song" :index="index"
                                v-for="(song,index) of playList" :key="song.id"
                                @dblclick.native="selectMusic(song,index)"
                                @currentSong="currentSong" />
          </div>
        </div>

      </el-card>
    </transition>
  </div>

</template>

<script>
import PlayBarListItem from './PlayBarListItem.vue'

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  components: { PlayBarListItem },
  data () {
    return {
      isShowList: false,
      playSongEl: null
    }
  },
  computed: {
    ...mapState([
      'playMusic',
      'playList'
    ]),

    ...mapGetters([
      'currentPlayMusic'
    ]),

    playListLength () {
      return this.playList.length
    }

  },
  methods: {
    ...mapMutations([
      'setListCurrentIndex',
      'clearList'
    ]),

    currentSong (songEl) {
      this.playSongEl = songEl
      this.scrollList(this.playSongEl)
    },

    // 滚动列表使元素至中间
    scrollList (songEl) {
      const scroll = this.$refs.scroll // 得到需要滚动的元素
      const expectClientHeight = parseInt((scroll.clientHeight - songEl.offsetHeight) / 2 - songEl.offsetHeight) // 期待位置
      const offsetTop = songEl.offsetTop // 得到当前歌曲距离顶部的高度
      scroll.scrollTop = offsetTop - expectClientHeight // 得到目标滚动位置
    },

    // 打开列表
    openList () {
      if (!this.isShowList) { // 如果不显示
        this.isShowList = true // 显示并添加事件
        // document.body.addEventListener('click', this.clickDetection)
      } else {
        this.closeList() // 显示就关闭
      }
    },

    // 关闭列表
    closeList () {
      this.isShowList = false
      // document.body.removeEventListener('click', this.clickDetection)
    },

    // 清空列表
    clear () {
      this.closeList()
      this.clearList()
    },

    // 添加事件
    clickDetection (event) {
      const target = event.target
      const card = this.$refs.card.$el

      if (this.isShowList && !card.contains(target)) {
        // console.log('关闭列表')
        this.closeList()
      }
    },

    // 选择歌曲
    selectMusic (song, index) {
      if (song.state.cp === 0) {
        this.$notify.topleft('音乐暂无版权', 'error')
        return
      }
      this.setListCurrentIndex(index)
    }
  },
  watch: {
    isShowList (isShow) {
      // 显示播放列表时滚动至当前播放
      if (isShow) {
        this.$nextTick(() => {
          this.scrollList(this.playSongEl)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.scroll {
  &-container {
    height: 440px;
  }

  &-content {
    position: relative;
  }
}

.list {
  height: 30px;
  width: 30px;
  cursor: pointer;
  outline: none;
}

.title {
  font-size: var(--font-size-large);
  margin-bottom: 1rem;
  padding-right: 20px;
}

.count {
  font-size: 12px;
  color: var(--color-gray);
}

.el-icon-collection-tag {
  vertical-align: bottom;
}

.clear {
  font-size: var(--font-size-small);
  color: #409eff;
  cursor: pointer;
  text-align: right;
}

.box-card {
  position: fixed;
  bottom: calc(var(--play-bar-height) + 1rem);
  right: 1rem;
  width: 400px;
  height: 500px;
  // overflow-y: auto;
}

.palying {
  position: absolute;
  left: 0px;
}
</style>