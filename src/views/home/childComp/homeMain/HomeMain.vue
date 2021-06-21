<template>
  <el-main>
    <home-banner :banners="banners" />

    <home-recommend-songs :recommendSongs="recommendSongs" />
  </el-main>
</template>

<script>
import HomeBanner from './HomeBanner.vue'

import { getBanner, getRecommendSongs, RecommendSong, test } from 'network/pageRequest/home'
import HomeRecommendSongs from './HomeRecommendSongs.vue'

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
  created () {
    getBanner().then(res => {
      this.banners = res.banners
    })

    getRecommendSongs(15).then(res => {
      res.result.forEach(song => {
        this.recommendSongs.push(new RecommendSong(song))
      })
      console.log(res.result)
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