<template>
  <el-main>
    <home-banner :banners="banners" />

    <home-recommend-songs :recommendSongs="recommendSongs" />
    <!-- <home-recommend-songs class="recommend-songs" /> -->
  </el-main>
</template>

<script>
import HomeBanner from './HomeBanner.vue'

import { getBanner, getNewSongs, NewSong } from 'network/pageRequest/home'
import HomeRecommendSongs from './HomeNewSongs.vue'

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

    getNewSongs(9).then(res => {
      res.result.forEach(song => {
        this.recommendSongs.push(new NewSong(song))
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