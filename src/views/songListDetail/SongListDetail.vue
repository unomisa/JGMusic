<template>
  <div class="container">
    <div class="backdrop"></div>
    <div class="list-detail">
      <song-list-presentation :playList="playList" :loading="loading" />
      <song-list-content :tracks="tracks" :total="commentTotal" />
    </div>
  </div>
</template>

<script>
import SongListPresentation from './childComp/SongListPresentation.vue'

import { getPlayListDetail, SongListDetail } from 'network/pageRequest/songList'
import { Music } from 'network/common'
import SongListContent from './childComp/SongListContent.vue'
import { getMusicDetail } from 'network/pageRequest/musicdetail'
import { musicBean } from 'common/mixin'

export default {
  name: 'songListDetail',
  mixins: [musicBean],
  components: { SongListPresentation, SongListContent },
  data () {
    return {
      playList: {
        creator: {}
      },
      tracks: [],
      trackIds: [],
      commentTotal: 0,
      loading: true
    }
  },
  methods: {
    addOther (music, index) {
      if (this.$route.query.type !== 'rank') return
      const other = {}
      if ('ratio' in this.trackIds[index]) {
        other.ratio = this.trackIds[index].ratio
      } else if ('lr' in this.trackIds[index]) {
        other.lr = this.trackIds[index].lr
      } else {
        other.new = true
      }
      this.$set(music, 'rank', other)
    },

    getPlayListDetail (id) {
      getPlayListDetail(id, Date.now()).then(res => {
        if (res.code === 200) {
          console.log('歌单详情为：', res)
          this.playList = new SongListDetail(res.playlist) // 歌单描述
          this.trackIds = res.playlist.trackIds
          this.commentTotal = res.playlist.commentCount

          if (this.trackIds.length > res.playlist.tracks.length) {
            this.getMusicDetail(res.playlist.tracks)
          } else {
            res.playlist.tracks.forEach((track, index) => {
              const music = new Music(this.musicBean(track))
              this.addOther(music, index)
              this.tracks.push(music)
            })
            this.loading = false
          }

          // console.log('包装后的歌曲信息为：', JSON.parse(JSON.stringify(this.tracks)))
        }
      })
    },

    getMusicDetail (existingTracks) {
      const startIndex = existingTracks.length
      const idArr = this.trackIds.filter((track, index) => index >= startIndex).map(track => track.id)
      getMusicDetail(idArr.join(',')).then(res => {
        if (res.code === 200) {
          console.log('歌曲详情为：', res)
          existingTracks.forEach((track, index) => {
            const music = new Music(this.musicBean(track))
            this.addOther(music, index)
            this.tracks.push(music)
          })

          res.songs.forEach((track, index) => {
            const music = new Music(this.musicBean(track))
            this.addOther(music, startIndex + index)
            this.tracks.push(music)
          })
          this.loading = false
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
  overflow: hidden;
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