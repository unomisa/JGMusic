<template>
  <div class="progress">
    <span class="progress-time">{{currentTime}}</span>
    <el-slider class="hide-slider__button" v-model="percent"
               :show-tooltip="false" @change="sliderChange" :step="step"
               @input="sliderInput" />
    <span class="progress-time">{{currentPlayMusic.duration}}</span>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      timer: null,
      natural: true, // 是否是自然增长
      currentTime: '00:00',
      oldDuration: 0,
      oldSecond: 0,
      percent: 0,
      sliderValue: 0,
      isStartTimeout: false
    }
  },
  computed: {
    ...mapGetters([
      'currentPlayMusic'
    ]),

    ...mapState([
      'isPaused',
      'isLoadingMusic',
      'listCurrentIndex'
    ]),

    // 根据歌曲长度计算步长
    step () {
      const durationStr = this.currentPlayMusic.duration
      const minute = parseInt(durationStr.split(':')[0])
      const second = parseInt(durationStr.split(':')[1])
      return 1 / (minute * 60 + second)
    }
  },
  methods: {
    ...mapMutations([
      'setListCurrentIndex'
    ]),

    // 计算自然增长的时间
    durationStr (duration) {
      const multiple = duration / 60
      let minute = parseInt(multiple) // 得到分钟数
      let second = parseInt(((multiple.toFixed(2) - minute) * 0.6).toFixed(2).split('.')[1]) // 得到秒数

      const durationDif = duration - this.oldDuration
      const secondDif = second - this.oldSecond
      // console.log(`second:${second}，oldSecond:${this.oldSecond}，durationDif:${durationDif}，secondDif: ${secondDif}，秒数为： ${second}`)

      if (Math.abs(durationDif) < 2) {
        if (secondDif === 2 || secondDif === 0) {
          // console.log('普通校准')
          second = this.oldSecond + 1
        } else if (secondDif === -58) {
          // console.log('分钟校准')
          second = this.oldSecond + 1
          minute--
        }
      }

      if (second === 60) {
        second = 0 // 置零
        minute++ // 分钟加一
      }

      this.oldSecond = second
      minute < 10 && (minute = '0' + minute)
      second < 10 && (second = '0' + second)

      this.oldDuration = duration // 将当前时间变成旧时间
      return minute + ':' + second
    },

    // 计算非自然增长的时间
    current (currentTime) {
      const multiple = currentTime / 60
      let minute = parseInt(multiple) // 得到分钟数
      let second = parseInt(((multiple.toFixed(2) - minute) * 0.6).toFixed(2).split('.')[1]) // 得到秒数
      if (second === 60) {
        second = 0 // 置零
        minute++ // 分钟加一
      }

      minute < 10 && (minute = '0' + minute)
      second < 10 && (second = '0' + second)
      this.currentTime = minute + ':' + second
    },

    sliderChange (sliderValue) {
      // console.log('滚动位置：', sliderValue)
      if (sliderValue >= 99.9) { // 如果位置大于等于99.9直接手动切换下一首，而不使用播放完毕自动切换
        this.setListCurrentIndex(this.listCurrentIndex + 1) // 播放完毕之后切换至下一首，不然某些歌曲会出bug
      } else {
        this.$bus.$emit('sliderChange') // 滚动改变
        this.$music.currentTime = (sliderValue * this.$music.duration) / 100 // 计算出当前时间

        // 立即更改当前时间
        this.current(this.$music.currentTime)
      }
      this.repetition() // 拖拽结束重新自然增长
    },

    // 1s执行一次
    repetition () {
      this.timer = setTimeout(() => {
        if (!this.isPaused && !this.isLoadingMusic) {
          this.percent = (this.$music.currentTime / this.$music.duration) * 100 // 得到进度百分比
          this.natural = true
        } else {
          this.repetition()
        }
      }, 1000)
    },

    sliderInput (percent) {
      clearTimeout(this.timer) // 每次拖拽取消定时
      if (this.$music) {
        if (this.natural) { // 是否为自然增加的百分比
          this.currentTime = this.durationStr(this.$music.currentTime) // 得到当前时间
          this.repetition() // 继续增长
          this.natural = false
        } else { // 若是拖拽改变时间，立即得出拖拽位置的时间
          const time = (percent * this.$music.duration) / 100 // 计算出当前时间拖拽位置的时间
          this.current(time)
        }
      } else {
        this.repetition()
      }
    }
  },

  mounted () {
    this.repetition()
  },
  watch: {
    currentPlayMusic (newPlay, oldPlay) {
      if (newPlay.id !== oldPlay.id) {
        this.percent = 0
        this.currentTime = '00:00'
        this.repetition() // 切换歌曲需手动开始计时
      }
    }
  }
}
</script>

<style lang="less" scoped>
.progress {
  display: flex;
  align-items: center;
  justify-content: center;

  &-time {
    font-size: 14px;
    letter-spacing: 2px;
  }
}

.el-slider {
  width: 100%;
  margin: 0 1rem;
}
</style>
