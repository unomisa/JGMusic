<template>
  <div v-bar class="scroll-lyric" ref="scroll" :style="scrollStyle">
    <div class="lyric-container" ref="container" @mousewheel="mousewheel">
      <div :style="containerStyle">
        <div v-if="isActive && !nolyric && !nowNolyric">
          <div class="lyric-box" v-for="(lyric,index) of lyricArr" :key="index"
               ref="lyric">
            <div :class="{currentLyric:isCurrentLyric(index)}" class="lyric">
              {{lyric.lyric}}
            </div>

            <div :class="{currentTlyric: isCurrentLyric(index)}" class="tlyric">
              {{lyric.tlyric}}
            </div>

            <br v-show="lyric.lyric===''">
          </div>
          <div class="translator" v-if="translator.length>0">翻译贡献者:
            {{translator}}
          </div>
        </div>

        <div v-show="nolyric">
          <h3>纯音乐,请欣赏</h3>
        </div>

        <div v-show="nowNolyric">
          <h3>暂无歌词</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { animate, debounce } from 'common/utils'

export default {
  props: {
    // 歌词
    lyric: {
      type: String,
      default: ''
    },
    // 翻译
    tlyric: {
      type: String,
      default: ''
    },
    nolyric: {
      type: Boolean,
      default: false
    },
    nowNolyric: {
      type: Boolean,
      default: false
    },
    // 高度
    height: {
      type: String,
      default: '100%'
    },
    // 宽度
    width: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      currentTime: 0, // 当前播放时间
      currentLyricIndex: 0, // 当前歌词索引位置
      translator: '', // 翻译者
      canScroll: true, // 是否可以滚动
      debounceSetCanScroll: null, // 存储防抖后的函数
      isShowLyric: true,
      isActive: false
    }
  },
  computed: {
    ...mapState([
      'isPaused'
    ]),

    ...mapGetters([
      'currentPlayMusic'
    ]),

    //  将歌词、翻译、事件打包在一起
    lyricArr () {
      if (this.lyric.length > 0) {
        const lyricArr = this.splitLyricStr(this.lyric)
        const tlyricArr = this.tlyricArr
        let next = 0

        lyricArr.map(lyric => {
          for (let i = 0; i < tlyricArr.length; i++) {
            if (tlyricArr[i].time === lyric.time) {
              this.$set(lyric, 'tlyric', tlyricArr[i].lyric)
              next = i + 1
              return lyric
            } else if (next < tlyricArr.length && tlyricArr[next].time === lyric.time) {
              this.$set(lyric, 'tlyric', tlyricArr[next].lyric)
              next++
              return lyric
            }
          }
          return lyric
        })
        // console.log('打包好的歌词为：', lyricArr)
        return lyricArr
      } else {
        return []
      }
    },

    tlyricArr () {
      if (this.tlyric.length > 0) {
        return this.splitLyricStr(this.tlyric)
      } else {
        return []
      }
    },

    // 计算当前歌词索引
    isCurrentLyric () {
      return function (index) {
        if (this.lyricArr[index].time < this.currentTime && (index + 1 <= this.lyricArr.length - 1 ? this.lyricArr[index + 1].time > this.currentTime : true)) {
          this.currentLyricIndex = index
          return true
        } else {
          return false
        }
      }
    },

    scrollStyle () {
      return {
        height: this.height,
        width: this.width
      }
    },

    containerStyle () {
      return {
        padding: `calc(${this.height} * 0.3) 0 calc(${this.height} * 0.3) 0`
      }
    }
  },
  methods: {
    reset () {
      this.currentTime = 0
      this.$refs.container.scrollTop = 0
      this.translator = ''
      this.canScroll = true
      clearTimeout(this.debounceSetCanScroll()) // 清除可能存在的延时滚动
    },

    mousewheel () {
      this.canScroll = false
      this.debounceSetCanScroll()
    },

    setCanScroll () {
      // console.log('重新滚动：', this.currentLyricIndex)
      this.canScroll = true
      this.scrollLyric(this.currentLyricIndex) // 直接滚动至当前歌词位置
    },

    repetition () {
      if (this.isActive) { // 活跃期间重复执行
        // 重复判断滚动条是否拖动,若拖动则使3s后才恢复歌词滚动
        // console.log('一直执行')
        if (this.$vuebar.getState(this.$refs.scroll).barDragging) {
          this.canScroll = false
          this.debounceSetCanScroll()
        }

        // 重复获取当前歌曲播放时间
        if (!this.isPaused) {
          this.currentTime = this.$music.currentTime
        }

        setTimeout(() => {
          requestAnimationFrame(this.repetition)
        }, 100)
      }
    },

    // 将歌词截取出来
    splitLyricStr (lyric) {
      let lyricArr = lyric.split('\n')
      lyricArr = lyricArr
        .filter(lyric => lyric.length > 0)
        .map((lyric) => {
          lyric = lyric.slice(1) // 截取第一个字符之后
          let splitLyric = lyric.split(']') // 分隔
          if (splitLyric[0].includes('by')) {
            this.translator = splitLyric[0].slice(3)
          }

          splitLyric = splitLyric.map(item => item.trim()) // 去空格
          splitLyric[0] = this.tsSecond(splitLyric[0])
          const lyricObj = {}
          lyricObj.time = splitLyric[0]
          lyricObj.lyric = splitLyric[splitLyric.length - 1]
          return lyricObj
        })
      return lyricArr
    },

    // 转换为秒
    tsSecond (timeStr) {
      const timeSplit = timeStr.split(':')
      const minute = parseInt(timeSplit[0])
      let second = parseFloat(timeSplit[1])
      second = minute * 60 + second
      return second
    },

    // 滚动歌词
    scrollLyric (index) {
      if (this.$refs.lyric !== undefined && this.canScroll) {
        const container = this.$refs.container // 外部滚动元素
        const ctnHeight = container.offsetHeight // 滚动元素高度
        const ctnScroolTop = container.scrollTop // 获取当前滚动高度
        const lyric = this.$refs.lyric[index] // 获取当前歌词
        const scrollHeight = lyric.offsetTop - ctnHeight * 0.2 - ctnScroolTop // 计算需要滚动的距离

        animate({
          duration: 500,
          timing: function (timeFraction) {
            return timeFraction
          },
          draw: function (progress) {
            container.scrollTop = ctnScroolTop + progress * scrollHeight
          }
        })
      }
    }

  },
  watch: {
    currentPlayMusic (newMusic, oldMusic) {
      if (newMusic.id !== oldMusic.id) {
        this.reset()
      }
    },
    // 当当前歌词索引发生变化时，滚动歌词
    currentLyricIndex (index) {
      this.scrollLyric(index)
    }

    // 不知道有什么用
    // isPaused () {
    //   this.scrollLyric(this.currentLyricIndex)
    // }
  },
  mounted () {
    this.$bus.$on('sliderChange', () => { this.canScroll = true })// 歌曲进度条改变使之可以滚动
    this.debounceSetCanScroll = debounce(this.setCanScroll, 3000) // 函数防抖
  },
  activated () {
    this.isActive = true
    this.repetition()
  },
  deactivated () {
    this.isActive = false
    clearTimeout(this.debounceSetCanScroll()) // 清除可能存在的延时滚动
  }
}
</script>

<style lang="less" scoped>
.scroll-lyric {
  margin: 0 auto;
  text-align: center;
}

.lyric-container {
  backface-visibility: hidden;
  margin-left: 8px !important;
  // height: 35% !important; // 这是减去padding的高度,不能动态计算因为会被覆盖
}

.currentLyric {
  font-weight: bold;
  font-size: 18px;
}

.lyric-box {
  line-height: 2;
  margin: 1.5rem 0;
}

.tlyric {
  font-size: 13px;
}

.currentTlyric {
  font-size: 16px;
}

.translator {
  margin-top: 3rem;
}
</style>

<style lang="less">
.scroll-lyric {
  & > .vb-dragger {
    display: none;
  }

  &:hover > .vb-dragger {
    display: block;
  }
}
</style>
