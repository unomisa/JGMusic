<template>
  <div v-bar>
    <div class="container">
      <div class="backdrop"></div>
      <div class="album">
        <album-presentation :album='album' :loading="loading" />
        <album-content :tracks='tracks' :desc="album.description" />
      </div>
    </div>
  </div>
</template>

<script>
import AlbumContent from './childComp/AlbumContent.vue'
import AlbumPresentation from './childComp/AlbumPresentation.vue'

import { getAlbum, AlbumBasic, getAlbumDynamic } from 'network/pageRequest/albumdetail'
import { Music } from 'network/common'

export default {
  components: { AlbumPresentation, AlbumContent },
  data () {
    return {
      album: {},
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

    // 获取专辑内容
    getAlbum (id) {
      Promise.all([
        getAlbum(id, Date.now()),
        getAlbumDynamic(id, Date.now())
      ]).then(res => {
        this.album = new AlbumBasic(res[0].album, res[1])

        res[0].songs.forEach(track => {
          this.tracks.push(new Music(this.musicBean(track)))
        })

        this.loading = false
        console.log('专辑为：', res)
      })
    }
  },
  created () {
    const id = this.$route.params.id
    this.getAlbum(id)
  }

}
</script>

<style lang="less" scoped>
.container {
  position: relative;
}

.album {
  width: var(--width-main);
  margin: 0 auto;
}

.backdrop {
  position: absolute;
  z-index: -1;
  content: "";
  width: 100%;
  height: 230px;
  background-image: linear-gradient(0deg, #fffeff 0%, #c0fefc 100%);
  // border: 1px solid transparent;
}

.detail-card {
  height: 230px;
}
</style>