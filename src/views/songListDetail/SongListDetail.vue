<template>
  <div class="container">
    <div class="backdrop"></div>
    <div class="list-detail">
      <song-list-presentation :playList="playList" :loading="loading" />
      <song-list-content :tracks="tracks" :total="total" />
    </div>
  </div>
</template>

<script>
import SongListPresentation from './childComp/SongListPresentation.vue'
import SongListContent from './childComp/SongListContent.vue'

import { getPlayListDetail, SongListDetail } from 'network/pageRequest/songList'
import { Music } from 'network/common'
import { getMusicDetail } from 'network/pageRequest/musicdetail'
import { musicBean, updateComment } from 'common/mixin'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'songListDetail',
  mixins: [musicBean, updateComment],
  components: { SongListPresentation, SongListContent },
  data () {
    return {
      playList: {
        creator: {}
      },
      tracks: [],
      trackIds: [],
      total: 0,
      loading: true,
      startIndex: 0
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ])
  },
  methods: {
    ...mapMutations([
      'updateSubList'
    ]),

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
          this.total = res.playlist.commentCount

          if (this.trackIds.length > res.playlist.tracks.length) {
            this.getMusicDetail()
          } else {
            res.playlist.tracks.forEach((track, index) => {
              const music = new Music({
                ...this.musicBean(track),
                cp: res.privileges[index].cp
              })
              this.addOther(music, index)
              this.tracks.push(music)
            })
            this.loading = false
          }
        }
      })
    },

    getMusicDetail () {
      const ids = this.trackIds.map(trackId => trackId.id).join(',')
      getMusicDetail(ids).then(res => {
        if (res.code === 200) {
          console.log('歌曲详情为：', res)

          res.songs.forEach((track, index) => {
            const music = new Music({
              ...this.musicBean(track),
              cp: res.privileges[index].cp
            })
            this.addOther(music, index)
            this.tracks.push(music)
          })
          this.loading = false
        }
      })
    },

    // * 事件处理
    delMusic (lid, index) {
      this.tracks.splice(index, 1) // 删除歌曲，重绘页面
      this.playList.trackCount-- // 当前页面歌单总数-1
    }
  },
  created () {
    const id = this.$route.params.id
    this.getPlayListDetail(id)
    this.$bus.$on('songListDelMusic', this.delMusic) // 歌单删除歌曲
  },
  destroyed () {
    this.$bus.$off('songListDelMusic', this.delMusic)
  },
  deactivated () {
    this.$bus.$off('songListDelMusic', this.delMusic)
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