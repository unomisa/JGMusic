<template>
  <el-main>
    <home-banner :banners="banners" />

    <home-recommend-songs :recommendSongs="recommendSongs" />
  </el-main>
</template>

<script>
import HomeBanner from './HomeBanner.vue'

import { getBanner, getNewSongs } from 'network/pageRequest/home'
import HomeRecommendSongs from './HomeNewSongs.vue'
import { Music } from 'network/common'

export default {
  components: {
    HomeBanner,
    HomeRecommendSongs
  },
  data () {
    return {
      banners: [], // 轮播图
      recommendSongs: []
    }
  },
  methods: {
    musicBean (music) {
      return {
        id: music.id,
        name: music.name,
        picUrl: music.picUrl,
        alias: music.song.alias,
        artists: music.song.artists,
        album: music.song.album,
        duration: music.song.duration
      }
    }
  },
  created () {
    getBanner().then(res => {
      this.banners = res.banners
    })

    getNewSongs(9).then(res => {
      if (res.code === 200) {
        res.result.forEach(song => {
          this.recommendSongs.push(new Music(this.musicBean(song)))
        })
      }
    })
  }

}
</script>

<style lang="less" scoped>
.el-main {
  overflow: hidden;
  padding: 0;
  background-color: white;
}
</style>