<template>
  <div class="container">
    <el-image class="tone-arm" :class="{'tone-arm--rotate':isRotate}"
              :src="require('assets/img/musicDetail/toneArm(2).png')"
              fit="fill" />
    <div class="pic" :class="{'pic-pause':isPaused}">
      <el-image class="disk"
                src="https://static1-music.taihe.com/client/img/f412d65.png"
                fit="fill" />
      <el-image class="cover" :src="currentPlayMusic.picUrl+'?param=200y200'"
                fit="fill" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      isRotate: false
    }
  },
  computed: {
    ...mapState([
      'isPaused'
    ]),
    ...mapGetters([
      'currentPlayMusic'
    ])
  },
  methods: {
    clickPause (bool) {
      this.isRotate = bool
    }
  },
  mounted () {
    this.$bus.$on('clickPause', this.clickPause)
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.tone-arm {
  position: absolute;
  top: 105px;
  left: calc((100% - 1200px) / 2 + 10px);
  width: 200px;
  z-index: 1;
  transform-origin: top left;
  transition: transform 1s;

  &--rotate {
    transform: rotate(-25deg);
  }
}

.pic {
  animation: rotate 30s linear infinite;

  &-pause {
    animation-play-state: paused;
  }
}

.disk {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 300px;
  border: 10px solid rgba(201, 200, 200, 0.8);
  border-radius: 100%;
  background-color: rgba(201, 200, 200, 0.8);
}

.cover {
  height: 200px;
  width: 200px;
  border: 5px #1f1f1f outset;
  border-radius: 100%;
}
</style>