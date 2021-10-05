<template>
  <div class="hot" ref="hot">
    <div class="hot-left">
      <el-image class="cover" :src="require('assets/img/common/Top50-zip.png')"
                fit="fill" />
    </div>
    <div class="hot-right">
      <div class="title">{{hot.title}}</div>
      <song v-for="(song,index) in songsPart" :key="song.id" :track="song"
            :index="index+1" :areas="areas" :indexWidth="30" :gutter="20"
            @dblclick.native="play(index)" />

      <song class="more" @click.native="more" v-if="hot.songs.length>10">
        {{bottomText}}
        <i class="el-icon-caret-top" v-show="this.showAll"></i>
      </song>
    </div>
  </div>
</template>

<script>
import Song from 'components/content/songGroup/Song.vue'

import { mapMutations } from 'vuex'

export default {
  components: { Song },
  props: {
    hot: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showAll: false
    }
  },
  computed: {
    areas () {
      return {
        others: 3,
        name: 18,
        artists: 0,
        album: 0,
        duration: 3
      }
    },

    songsPart () {
      if (this.hot.songs.length < 10 || this.showAll) {
        return this.hot.songs
      } else {
        const arr = Array.from(this.hot.songs)
        arr.length = 10
        return arr
      }
    },

    bottomText () {
      if (!this.showAll) {
        return `查看全部${this.hot.songs.length}首歌曲 >`
      } else {
        return '收起'
      }
    }
  },
  methods: {
    ...mapMutations([
      'addToPlayList'
    ]),

    play (index) {
      this.addToPlayList({
        playList: this.hot.songs,
        index: index
      })
    },

    more () {
      if (!this.showAll) {
        this.showAll = true
      } else {
        this.showAll = false
        this.$refs.hot.scrollIntoView(true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hot {
  display: flex;
  margin-bottom: 50px;

  &-left {
    position: relative;
    flex: 2;
    width: 0;
  }

  &-right {
    position: relative;
    flex: 5;
    width: 0;
  }
}

.cover {
  position: relative;
  z-index: 1;
  height: 200px;
  width: 200px;
  border-radius: 5px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.more {
  padding: 0 20px;
  text-align: right;
  color: var(--color-main);
  cursor: pointer;
}
</style>