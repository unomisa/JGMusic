<template>
  <div class="song-list" @click="goSongListDetail"
       @contextmenu.prevent="context">
    <div class="cover-box" :style="imageStyle">
      <div class="shade"></div>
      <div v-if="songList.highQuality">
        <div class="quality"></div>
        <div class="quality-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-_huangguan"></use>
          </svg>
        </div>
      </div>
      <el-image class="cover "
                :src="songList.coverImgUrl + '?param='+imgHeight+'y'+imgHeight"
                fit="fill">
        <div slot="error" class="image-err" :style="imageStyle">
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

    <div class="text" v-if="showText">
      <div class="name">{{songList.name}}</div>
      <div class="trackCount" v-if="showTrackCount">{{songList.trackCount}}首
      </div>
    </div>

    <song-list-context :showContext.sync="showContext" :x.sync="context_x"
                       :y.sync="context_y" :songList="songList"
                       v-if="showContext" />
  </div>
</template>

<script>
import SongListContext from './songList/SongListContext.vue'
import { mapState } from 'vuex'

export default {
  components: { SongListContext },
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
    showText: {
      type: Boolean,
      default: true
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showContext: false,
      context_x: 0,
      context_y: 0
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    imageStyle () {
      return {
        height: this.imgHeight + 'px',
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
    },

    // 上下文菜单
    context (event) {
      const loginId = this.loginUser.userId
      const expectPath = '/userDetail/' + loginId // 期待路由
      if (this.$route.fullPath === expectPath && !(this.songList.specialType === 5)) { // 判断与期待路由是否一致
        if (event.button === 2) { // 如果为右键
          this.showContext = true // 显示上下文菜单
          this.context_x = event.clientX // 传递点击位置
          this.context_y = event.clientY
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.song-list {
  position: relative;
  user-select: none;
  box-sizing: border-box;
  width: 200px;
  overflow: hidden;
}

.cover {
  border-radius: 5px;
  border: 1px solid #f0f2f2;

  &-box {
    position: relative;
    cursor: pointer;
    overflow: hidden;

    &:hover + .text > .name {
      color: black;
    }

    &:hover > .play {
      opacity: 0.9;
    }
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

.quality {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border: 20px solid #f3b068;
  border-color: #f3b068 transparent transparent #f3b068;
  border-top-left-radius: 5px;

  &-icon {
    position: absolute;
    color: white;
    top: 4px;
    left: 4px;
    z-index: 1;
    transform: rotate(-46deg);
  }
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
