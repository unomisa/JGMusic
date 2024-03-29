<template>
  <div class="content">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
      <el-menu-item index="1">专辑</el-menu-item>
      <el-menu-item index="2">歌手详情</el-menu-item>
      <el-menu-item index="3">相似歌手</el-menu-item>
    </el-menu>

    <div v-show="activeIndex==='1'">
      <div v-if="!albumEmpty">
        <artist-hot :hot="hot" />
        <artist-albums :albums="albumsFilter" />
      </div>

      <div v-if="albumEmpty">
        <div class="empty">没有相关专辑</div>
      </div>
    </div>

    <div v-show="activeIndex==='2'">
      <artist-desc :artistDesc="artistDesc" />
    </div>

    <div v-show="activeIndex==='3'">
      <artist-simi :simiArtists="simiArtists" :empty="simiEmpty" />
    </div>
  </div>
</template>

<script>
import { getArtistAlbum, getArtistHotSongs, ArtistAlbum, getArtistDesc, getSimiArtist } from 'network/pageRequest/artistDetail'
import ArtistAlbums from './ArtistAlbums.vue'
import ArtistHot from './ArtistHot.vue'
import ArtistDesc from './ArtistDesc.vue'
import ArtistSimi from './ArtistSimi.vue'

import { mapMutations } from 'vuex'
import { getAlbum } from 'network/pageRequest/albumdetail'
import { Music, Artist } from 'network/common'
import { infiniteScroll, musicBean } from 'common/mixin'

export default {
  mixins: [infiniteScroll, musicBean],
  components: { ArtistAlbums, ArtistHot, ArtistDesc, ArtistSimi },
  data () {
    return {
      activeIndex: '1',
      albums: [],
      albumEmpty: false,
      albumLimit: 3,
      albumPage: 1,
      hot: { songs: [] },
      artistDesc: {},
      simiArtists: [],
      simiEmpty: false
    }
  },
  computed: {
    albumsFilter () {
      return this.albums.filter(album => album.songs.length !== 0)
    }
  },
  methods: {
    ...mapMutations([
      'setInfiniteScrollDisabled'
    ]),

    select (index) {
      const id = this.$route.params.id
      this.activeIndex = index
      if (index === '1') {
        this.setInfiniteScrollDisabled(false) // 只在专辑选项时才加载
      } else if (index === '2' && Object.keys(this.artistDesc).length === 0) {
        this.getArtistDesc(id)
        this.setInfiniteScrollDisabled(true)
      } else if (index === '3' && this.simiArtists.length === 0) {
        this.getSimiArtist(id)
        this.setInfiniteScrollDisabled(true)
      }
    },

    getArtistAlbum (id, limit = 50, offset = 0) {
      return getArtistAlbum(id, limit, offset).then(res => {
        if (res.code === 200) {
          console.log('歌手专辑信息为：', res)

          if (res.hotAlbums.length === 0) {
            this.albumEmpty = true
          } else {
            res.hotAlbums.forEach(album => {
              this.albums.push(new ArtistAlbum(album))
            })
          }

          if (res.more === true) {
            this.getArtistAlbum(id, limit, offset + limit)
          }
        }
      })
    },

    getArtistHotSongs (id) {
      getArtistHotSongs(id).then(res => {
        if (res.code === 200) {
          // console.log('歌手热门歌曲为：', res)
          this.hot = {
            title: '热门50首',
            songs: res.hotSongs.map(song => new Music({
              ...this.musicBean(song),
              cp: song.privilege.cp
            }))
          }
        }
      })
    },

    getAlbum (album) {
      return getAlbum(album.id).then(res => {
        if (res.code === 200) {
          console.log('专辑歌曲为：', res)
          res.songs.forEach(song => {
            album.songs.push(new Music({
              ...this.musicBean(song),
              cp: song.privilege.cp
            }))
          })
        }
      })
    },

    getAlbums () {
      if (this.activeIndex !== '1' || this.albums.length === 0) return // 非专辑选项不请求
      const promiseArr = []
      const start = this.albumLimit * (this.albumPage - 1)
      let end = this.albumLimit * this.albumPage
      end = end > this.albums.length ? this.albums.length : end

      if (start < this.albums.length) {
        for (let i = start; i < end; i++) {
          promiseArr.push(this.getAlbum(this.albums[i])) // 多次请求专辑内容
        }

        Promise.all(promiseArr).then(() => {
          this.setInfiniteScrollDisabled(false) // 恢复下拉加载
          this.albumPage++ // 增加
        })
      }
    },

    // 获取歌手描述
    getArtistDesc (id) {
      getArtistDesc(id).then(res => {
        if (res.code === 200) {
          // console.log('歌手描述为：', res)
          this.artistDesc = res
        }
      })
    },

    // 获取相似歌手
    getSimiArtist (id) {
      getSimiArtist(id).then(res => {
        if (res.code === 200) {
          // console.log('相似歌手为：', res)
          if (res.artists.length === 0) {
            this.simiEmpty = true
          } else {
            this.simiArtists = res.artists.map(artist => new Artist(artist))
          }
        }
      })
    }
  },
  created () {
    const id = this.$route.params.id
    this.getArtistHotSongs(id) // 请求歌手热门歌曲
    this.getArtistAlbum(id).then(() => { // 先请求歌曲专辑信息
      this.getAlbums() // 然后请求多个专辑
    })
  },
  mounted () {
    this.$bus.$on('infiniteScroll', this.getAlbums) // 接收下拉刷新事件
  },
  activated () {
    this.$bus.$on('infiniteScroll', this.getAlbums) // 接收下拉刷新事件
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  margin-bottom: 2rem;
}

.el-menu-item.is-active {
  font-weight: bold;
  border-bottom-width: 3px;
}

.el-menu-item {
  font-size: 18px;
  padding: 0;
  margin-right: 2rem;
}

.empty {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
</style>