<template>
  <el-main>
    <home-banner :banners="banners" />
    <home-personalized-list :personalizedList="personalizedList"
                            :loading="listLoading" />
    <home-hot-artists :hotArtists="hotArtists" />
    <home-recommend-songs :recommendSongs="recommendSongs" />
  </el-main>
</template>

<script>
import HomeBanner from './HomeBanner.vue'
import HomeRecommendSongs from './HomeNewSongs.vue'
import HomePersonalizedList from './HomePersonalizedList.vue'

import { getBanner, getNewSongs, getPersonalizedList } from 'network/pageRequest/home'
import { Music, SongList, Artist } from 'network/common'
import { getHotArtists } from '../../../network/pageRequest/home'
import HomeHotArtists from './HomeHotArtists.vue'

export default {
  components: {
    HomeBanner,
    HomeRecommendSongs,
    HomePersonalizedList,
    HomeHotArtists
  },
  data () {
    return {
      banners: [], // 轮播图
      recommendSongs: [],
      personalizedList: [],
      listLoading: true,
      hotArtists: []
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
    },

    getPersonalizedList () {
      getPersonalizedList().then(res => {
        if (res.code === 200) {
          // console.log('推荐歌单为：', res)
          this.personalizedList = res.result.map(list => {
            list.coverImgUrl = list.picUrl
            return new SongList(list)
          })
          this.personalizedList.length > 15 && (this.personalizedList.length = 15)
          this.listLoading = false
        }
      })
    },

    getHotArtists () {
      getHotArtists().then(res => {
        if (res.code === 200) {
          // console.log('热门歌手为：', res)
          this.hotArtists = res.artists.map(artist => new Artist(artist))
        }
      })
    }
  },
  created () {
    getBanner().then(res => {
      if (res.code === 200) {
        // console.log('banner为：', JSON.parse(JSON.stringify(res)))
        this.banners = res.banners
      }
    })

    getNewSongs(9).then(res => {
      if (res.code === 200) {
        res.result.forEach(song => {
          this.recommendSongs.push(new Music(this.musicBean(song)))
        })
      }
    })
    this.getPersonalizedList()
    this.getHotArtists()
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