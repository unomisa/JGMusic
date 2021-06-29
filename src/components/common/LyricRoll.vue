<template>
  <div v-bar class="scroll" ref="scroll">
    <div class="container" ref="container" @mousewheel="mousewheel">
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
      <div class="translator" v-if="translator.length>0">翻译贡献者: {{translator}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { animate, debounce } from 'common/utils'

export default {
  props: {
    lyric: {
      type: String,
      default: ''
    },
    tlyric: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentTime: 0,
      timers: [],
      currentLyricIndex: 0,
      translator: '',
      canScroll: true,
      debounceSetCanScroll: null
    }
  },
  computed: {
    ...mapState([
      'isPaused'
    ]),

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

    isCurrentLyric () {
      return function (index) {
        if (this.lyricArr[index].time < this.currentTime && (index + 1 <= this.lyricArr.length - 1 ? this.lyricArr[index + 1].time > this.currentTime : true)) {
          this.currentLyricIndex = index
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    mousewheel () {
      this.canScroll = false
      this.debounceSetCanScroll()
    },

    setCanScroll () {
      this.canScroll = true
      this.scrollLyric(this.currentLyricIndex) // 直接滚动至当前歌词位置
    },

    repetition () {
      if (this.$route.path.includes('/musicDetail')) {
        // 重复判断滚动条是否拖动,若拖动则使3s后才恢复歌词滚动
        if (this.$vuebar.getState(this.$refs.scroll).barDragging) {
          this.canScroll = false
          this.debounceSetCanScroll()
        }

        // 重复获取当前歌曲播放时间
        if (!this.isPaused) {
          this.currentTime = this.$music.currentTime
        }

        requestAnimationFrame(this.repetition)
      }
    },

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
    // 当当前歌词索引发生变化时，滚动歌词
    currentLyricIndex (index) {
      this.scrollLyric(index)
    }
  },
  mounted () {
    this.debounceSetCanScroll = debounce(this.setCanScroll, 3000) // 函数防抖
    this.repetition()
  }
}
</script>

<style lang="less" scoped>
@scrollHeight: 100%;
@scrollWidth: 400px;

.scroll {
  margin: 0 auto;
  height: @scrollHeight;
  width: @scrollWidth;
  text-align: center;
}

.currentLyric {
  font-weight: bold;
  font-size: 18px;
}

.lyric-box {
  line-height: 2;
  margin: 1.5rem 0;

  &:first-child {
    margin-top: @scrollHeight / 2;
  }

  &:last-child {
    margin-bottom: @scrollHeight / 2;
  }
}

.tlyric {
  font-size: var(--font-size-small);
}

.currentTlyric {
  font-size: 16px;
}

.translator {
  margin-top: 3rem;
  margin-bottom: @scrollHeight / 2;
}
</style>