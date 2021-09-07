<template>
  <el-main class="main">
    <music-detail-title class="title" v-show="isExistCurrentPlayMusic" />

    <div class="content">
      <div class="left">
        <music-detail-pic />
      </div>

      <div class="center">
        <div class="blur-top"></div>
        <lyric-roll :lyric="lyric.lrc" :tlyric="lyric.tlyric"
                    :nolyric="lyric.nolyric" :nowNolyric="lyric.nowNolyric"
                    ref="lyric" />
        <div class="blur-bottom"></div>
      </div>

      <div class="right">
        <music-detail-simi :simiSongs="simiSongs" :simiList="simiList" />
      </div>
    </div>

  </el-main>
</template>

<script>
import LyricRoll from 'components/content/lyricRoll/LyricRoll.vue'
import MusicDetailTitle from './MusicDetailTitle.vue'
import MusicDetailSimi from './MusicDetailSimi.vue'
import MusicDetailPic from './MusicDetailPic.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    LyricRoll,
    MusicDetailTitle,
    MusicDetailSimi,
    MusicDetailPic
  },
  props: {
    lyric: {
      type: Object,
      default () {
        return {
          lrc: '',
          tlyric: '',
          nolyric: false,
          nowNolyric: false
        }
      }
    },
    simiSongs: {
      type: Array,
      default () {
        return []
      }
    },
    simiList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters([
      'isExistCurrentPlayMusic',
      'currentPlayMusic'
    ])
  }
}
</script>

<style lang="less" scoped>
.main {
  position: relative;
  width: 1200px;
  height: 530px;
  margin: 0 auto;
  overflow: hidden;
}

.title {
  height: 25%;
}

.content {
  height: 75%;
  display: flex;
}

.left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;
}

.blur {
  content: "";
  position: absolute;
  left: -10px;
  z-index: 1;
  height: 24px;
  width: 105%;
  background-color: white;
  filter: blur(5px);

  &-top {
    &:extend(.blur);
    transform: translateY(-10px);
    top: 0;
  }

  &-bottom {
    &:extend(.blur);
    transform: translateY(10px);
    bottom: 0;
  }
}

.center {
  position: relative;
  flex: 1;
  overflow: hidden;
}
.right {
  flex: 1;
  overflow: hidden;
}
</style>