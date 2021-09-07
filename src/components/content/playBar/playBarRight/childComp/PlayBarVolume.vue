<template>
  <div class="voice-control">
    <div class="voice-icons" @click="voiceControl">
      <svg class="icon voice-icon" aria-hidden="true" v-show="!isMute">
        <use xlink:href="#icon-shengyin"></use>
      </svg>

      <svg class="icon voice-icon" aria-hidden="true" v-show="isMute">
        <use xlink:href="#icon-jingyin"></use>
      </svg>
    </div>
    <el-slider class="hide-slider__button" v-model="volume"
               :show-tooltip="false" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      volume: 30,
      oldVolume: 50,
      isMute: false
    }
  },
  methods: {
    voiceControl () {
      if (!this.isMute) {
        this.oldVolume = this.volume
        this.volume = 0
      } else {
        this.volume = this.oldVolume
      }
    }
  },
  watch: {
    volume (volume) {
      this.$music !== undefined && (this.$music.volume = volume / 100)
      if (volume === 0) {
        this.isMute = true
      } else {
        this.isMute = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.voice {
  &-control {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &-icon {
    height: 30px;
    width: 30px;
  }

  &-icons {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.el-slider {
  flex: 1;
  padding: 0 0.5rem;
}
</style>

<style lang="less">
// 设置该类为父类之后隐藏那个点点
.hide-slider__button {
  & .el-slider__button-wrapper {
    display: none;
  }

  &:hover .el-slider__button-wrapper {
    display: block;
  }

  &:active .el-slider__button-wrapper {
    display: block;
  }
}
</style>