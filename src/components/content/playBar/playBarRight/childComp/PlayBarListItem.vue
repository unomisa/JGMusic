<template>
  <div class="song" :class="{'song-play': playing}" ref="song">
    <div class="song-title-box" :class="{nocp:song.state.cp===0}">
      <span class="song-title">{{song.name}}</span>
      <span class="song-alias" :class="{nocp:song.state.cp===0}"
            v-if=" song.alias.length>0">(
        {{song.alias}}
        )</span>
    </div>

    <div class="song-artist">
      <span v-for="(artist,index) of song.artists" :key="index">
        <span class="artist"
              @click="artistDetail(artist)">{{artist.name}}</span>
        <span v-if="index!==song.artists.length-1"> / </span>
      </span>
    </div>

    <div class="song-duration">
      {{song.duration}}
    </div>

    <div class="palying" v-if="song.state.currentBroadcast">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shengyin"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    playing () {
      if (this.song.state.currentBroadcast) {
        if (!this.$refs.song) { // 判断是否挂载
          // 没有挂载则在下次传递
          this.$nextTick(() => {
            this.$emit('currentSong', this.$refs.song) // 更新当前播放索引
          })
        } else {
          this.$emit('currentSong', this.$refs.song) // 更新当前播放索引
        }

        return true
      } else {
        return false
      }
    }
  },
  methods: {
    artistDetail (artist) {
      this.$router.push('/artistDetail/' + artist.id)
    }
  }
}
</script>

<style lang="less" scoped>
.ellipsis {
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1; /** 显示的行数 **/
  overflow: hidden;
}

.song {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-small);
  line-height: 3;
  padding-right: 20px;
  padding-left: 20px;
  user-select: none;

  &:nth-child(2n) {
    background-color: #fbfbfb;
  }

  &:hover {
    background-color: rgba(216, 57, 147, 0.1);
  }

  &-title {
    &-box {
      &:extend(.ellipsis);
      width: 150px;
    }
  }

  &-alias {
    color: var(--color-light-gray);
  }

  &-artist {
    &:extend(.ellipsis);
    color: var(--color-gray);
    width: 100px;
  }

  &-play {
    & * {
      color: var(--color-main);
      font-size: 14px !important;
    }
  }

  &-duration {
    font-size: 12px;
    letter-spacing: 2px;
  }
}

.palying {
  position: absolute;
  left: 0px;
}

.artist {
  cursor: pointer;

  &:hover {
    color: black;
  }
}

.nocp {
  color: #d9cad9;
}
</style>