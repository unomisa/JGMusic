<template>
  <div class="content">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
      <el-menu-item index="1">专辑</el-menu-item>
      <el-menu-item index="2">歌手详情</el-menu-item>
      <el-menu-item index="3">相似歌手</el-menu-item>
    </el-menu>

    <div v-show="activeIndex==='1'">
      <artist-hot :hot="hot" />
      <artist-albums :albums="albumsFilter" />
    </div>

    <div v-show="activeIndex==='2'">
      <artist-desc :artistDesc="artistDesc" />
    </div>

    <div v-show="activeIndex==='3'">
      <artist-simi :simiArtists="simiArtists" />
    </div>
  </div>
</template>

<script>
import { getArtistAlbum, getArtistHotSongs, ArtistAlbum, getArtistDesc, getSimiArtist } from 'network/pageRequest/artist'
import ArtistAlbums from './ArtistAlbums.vue'
import ArtistHot from './ArtistHot.vue'
import ArtistDesc from './ArtistDesc.vue'
import ArtistSimi from './ArtistSimi.vue'

import { getAlbum } from 'network/pageRequest/albumdetail'
import { Music, Artist } from 'network/common'

export default {
  components: { ArtistAlbums, ArtistHot, ArtistDesc, ArtistSimi },
  props: {
    scrollDisabled: {
      type: Boolean,
      default: true
    },
    activeIndex: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      albums: [],
      albumLimit: 3,
      albumPage: 1,
      hot: { songs: [] },
      artistDesc: {},
      simiArtists: []
    }
  },
  computed: {
    albumsFilter () {
      return this.albums.filter(album => album.songs.length !== 0)
    }
  },
  methods: {
    musicBean (music) {
      return {
        id: music.id,
        name: music.name,
        picUrl: music.al.picUrl,
        alias: music.alia,
        artists: music.ar,
        album: music.al,
        duration: music.dt
      }
    },

    select (index) {
      const id = this.$route.params.id
      this.$emit('update:activeIndex', index)

      if (index === '2' && Object.keys(this.artistDesc).length === 0) {
        this.getArtistDesc(id)
      } else if (index === '3' && this.simiArtists.length === 0) {
        this.getSimiArtist(id)
      }
    },

    getArtistAlbum (id, limit = 50, offset = 0) {
      return getArtistAlbum(id, limit, offset).then(res => {
        if (res.code === 200) {
          // console.log('歌手专辑信息为：', res)
          this.albums = res.hotAlbums.map(album => new ArtistAlbum(album))

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
            songs: res.hotSongs.map(song => new Music(this.musicBean(song)))
          }
        }
      })
    },

    getAlbum (album) {
      return getAlbum(album.id).then(res => {
        if (res.code === 200) {
          res.songs.forEach(song => {
            album.songs.push(new Music(this.musicBean(song)))
          })
        }
      })
    },

    getAlbums () {
      const promiseArr = []
      const start = this.albumLimit * (this.albumPage - 1)
      let end = this.albumLimit * this.albumPage
      end = end > this.albums.length ? this.albums.length : end

      if (start < this.albums.length) {
        for (let i = start; i < end; i++) {
          promiseArr.push(this.getAlbum(this.albums[i])) // 多次请求专辑内容
        }

        Promise.all(promiseArr).then(() => {
          this.$emit('update:scrollDisabled', false) // 恢复下拉加载
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
          this.simiArtists = res.artists.map(artist => new Artist(artist))
        }
      })
    }
  },
  created () {
    const id = this.$route.params.id
    this.getArtistAlbum(id).then(() => {
      this.getAlbums()
    })
    this.getArtistHotSongs(id)
  },
  mounted () {
    this.$bus.$on('artistAlbumMore', this.getAlbums) // 接收下拉刷新事件
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
</style>