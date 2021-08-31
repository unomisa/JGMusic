<template>
  <div v-bar>
    <div class="container">
      <div class="backdrop"></div>
      <div class="list-detail">
        <song-list-presentation :playList="playList" :loading="loading" />
        <song-list-content :tracks="tracks" />
      </div>
    </div>
  </div>
</template>

<script>
import SongListPresentation from './childComp/SongListPresentation.vue'

import { getPlayListDetail, SongListDetail } from 'network/pageRequest/songList'
import { Music } from 'network/common'
import SongListContent from './childComp/SongListContent.vue'

export default {
  components: { SongListPresentation, SongListContent },
  data () {
    return {
      playList: {
        creator: {}
      },
      tracks: [],
      loading: true
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

    getPlayListDetail (id) {
      getPlayListDetail(id, Date.now()).then(res => {
        if (res.code === 200) {
          // console.log('歌单详情为：', res)
          this.playList = new SongListDetail(res.playlist)
          res.playlist.tracks.forEach(track => {
            this.tracks.push(new Music(this.musicBean(track)))
          })
          this.loading = false
          // console.log('包装后的歌曲信息为：', JSON.parse(JSON.stringify(this.tracks)))
        }
      })
    }
  },
  created () {
    const id = this.$route.params.id
    this.getPlayListDetail(id)
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
}

.list-detail {
  width: var(--width-main);
  margin: 0 auto;
}

.backdrop {
  position: absolute;
  z-index: -1;
  content: "";
  width: 100%;
  height: 230px;
  background-image: linear-gradient(to top, #ffffff 0%, #ffd1ff 100%);
  // background-image: linear-gradient(to top, #ffd1ff 0%, #ffffff 100%);
  // border: 1px solid transparent;
}
</style>