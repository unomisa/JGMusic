<template>
  <div class="album-detail">
    <div class="backdrop"></div>
    <div class="album">
      <album-presentation :album='album' :loading="loading"
                          @subControl="subControl" />
      <album-content :tracks='tracks' :desc="album.description"
                     :commentTotal="total" />
    </div>
  </div>
</template>

<script>
import AlbumContent from './childComp/AlbumContent.vue'
import AlbumPresentation from './childComp/AlbumPresentation.vue'

import { getAlbum, AlbumBasic, getAlbumDynamic } from 'network/pageRequest/albumdetail'
import { Music } from 'network/common'
import { updateComment, musicBean } from 'common/mixin'

export default {
  name: 'albumDetail',
  mixins: [updateComment, musicBean],
  components: { AlbumPresentation, AlbumContent },
  data () {
    return {
      album: {},
      tracks: [],
      total: 0,
      loading: true
    }
  },
  methods: {
    // 获取专辑内容
    getAlbum (id) {
      Promise.all([
        getAlbum(id, Date.now()),
        getAlbumDynamic(id, Date.now())
      ]).then(res => {
        this.album = new AlbumBasic(res[0].album, res[1])

        res[0].songs.forEach(track => {
          this.tracks.push(new Music({
            ...this.musicBean(track),
            cp: track.privilege.cp
          }))
        })

        this.loading = false
        this.total = res[1].commentCount
        // console.log('专辑为：', res)
      })
    },

    // 收藏控制
    subControl (flag) {
      if (flag === 1) {
        this.album.subCount++
      } else {
        this.album.subCount--
      }
    }
  },
  created () {
    const id = this.$route.params.id
    this.getAlbum(id)
  }
}
</script>

<style lang="less" scoped>
.album-detail {
  position: relative;
  overflow: hidden;
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