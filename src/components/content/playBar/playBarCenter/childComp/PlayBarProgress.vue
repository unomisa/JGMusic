<template>
  <div class="progress">
    <span class="progress-time">{{currentTime}}</span>
    <el-slider class="hide-slider__button" v-model="percent"
               :show-tooltip="false" @change="sliderChange" />
    <span class="progress-time">{{currentPlayMusic.duration}}</span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
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
      'isLoadingMusic'
    ])
  },
  methods: {
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

    sliderChange (sliderValue) {
      this.$music.currentTime = (sliderValue * this.$music.duration) / 100
      // console.log('sliderValue：', sliderValue)
      // console.log('过去了:', this.$music.currentTime)

      // 立即更改当前时间
      const multiple = this.$music.currentTime / 60
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

    repetition () {
      setTimeout(() => {
        if (!this.isPaused) {
          this.percent = (this.$music.currentTime / this.$music.duration) * 100
          this.currentTime = this.durationStr(this.$music.currentTime)
          this.repetition()
        } else {
          this.repetition()
        }
      }, 1000)
    }

  },
  watch: {
    isLoadingMusic () {
      // 监听是否正在加载，未在加载就开始计时
      if (this.isLoadingMusic === false && this.isStartTimeout === false) {
        this.repetition()
        this.isStartTimeout = true
      }
    },

    currentPlayMusic () {
      this.percent = 0
      this.currentTime = '00:00'
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
