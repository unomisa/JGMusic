<template>
  <el-col :span="10" class="center">
    <el-button circle class="control-btn" :class="controlClass" control-btn
               :loading="isLoad" @click="control($event)" />

  </el-col>
</template>

<script>
export default {
  props: {
    isPlay: {
      type: Boolean,
      default: false
    },
    isLoad: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 播放控制
    control () {
      if (this.isPlay === true) {
        this.$music.pause()
      } else if (this.isPlay === false) {
        this.$music.play()
      }
    }
  },
  computed: {
    controlClass () {
      return {
        pause: this.isLoad === false && this.isPlay === true,
        play: this.isLoad === false && this.isPlay === false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.center {
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn {
  height: 40px;
  width: 40px;
  border: none;
  background-color: #f4f4f4;

  &:hover {
    background-color: #e5e5e5;
  }
}

.play {
  background: url("~assets/img/playbar/play.svg") no-repeat;
  background-size: 20px;
  background-position: 11.5px center;
  background-color: #f4f4f4;
}

.pause {
  background: url("~assets/img/playbar/pause.svg") no-repeat;
  background-size: 20px;
  background-position: center;
  background-color: #f4f4f4;
}
</style>