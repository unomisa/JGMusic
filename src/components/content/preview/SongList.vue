<template>
  <div class="song-list">
    <div class="before-fill" :style="beforeFillStyle" @click="goSongListDetail">
      <div class="shade"></div>
      <el-image class="infuse-image "
                :src="songList.coverImgUrl + '?param='+imgHeight+'y'+imgHeight"
                fit="cover">
        <div slot="error" class="image-err" :style="imageErrorStyle">
          <i class="el-icon-picture-outline "></i>
        </div>
      </el-image>

      <div class="play-count">
        <svg class="icon play-count-icon" aria-hidden="true">
          <use xlink:href="#icon-pause"></use>
        </svg>
        <span>{{playCount}}</span>
      </div>

      <div class="play">
        <svg class="icon play-icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
      </div>
    </div>

    <div :style="textStyle" class="text">
      <div class="name">{{songList.name}}</div>
      <div class="trackCount" v-if="showTrackCount">{{songList.trackCount}}首
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songList: {
      type: Object,
      default () {
        return {}
      }
    },
    imgHeight: {
      type: Number,
      default: 200
    },
    showTrackCount: {
      type: Boolean,
      default: true
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    textStyle () {
      return {
        width: this.imgHeight + 'px'
      }
    },

    imageErrorStyle () {
      return {
        height: this.imgHeight + 'px',
        width: this.imgHeight + 'px'
      }
    },
    beforeFillStyle () {
      return {
        'padding-top': this.imgHeight + 'px',
        width: this.imgHeight + 'px'
      }
    },

    playCount () {
      if (this.songList.playCount >= 100000) {
        return parseInt(this.songList.playCount / 10000) + '万'
      }
      return this.songList.playCount
    }
  },
  methods: {
    goSongListDetail () {
      if (this.rank) {
        this.$router.push({
          path: '/songList/' + this.songList.id,
          query: {
            type: 'rank'
          }
        })
      } else {
        this.$router.push('/songList/' + this.songList.id)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.song-list {
  user-select: none;
}

.before-fill {
  overflow: hidden;
  border: 1px solid #f0f2f2;
  border-radius: 5px;
  cursor: pointer;

  &:hover + .text > .name {
    color: black;
  }

  &:hover > .play {
    opacity: 0.9;
  }
}

.text {
  text-align: justify;
}

.name {
  margin: 0.5rem 0;
  cursor: pointer;

  &:hover {
    color: black;
  }
}

.trackCount {
  font-size: 14px;
  color: #b5b0d7;
}

.shade {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 10px 30px 2px rgb(0 0 0);
}

.play-count {
  position: absolute;
  z-index: 2;
  top: 5px;
  right: 8px;
  font-size: 14px;
  color: white;

  &-icon {
    margin-right: 5px;
  }
}

.play {
  position: absolute;
  content: "";
  right: 10px;
  bottom: 10px;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  background-color: #fdfcfa;
  opacity: 0;
  transition: opacity 0.8s;

  &-icon {
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: var(--color-main);
  }
}
</style>
