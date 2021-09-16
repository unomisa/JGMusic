<template>
  <transition name="el-zoom-in-bottom">
    <div class="detail" v-if="isExistCurrentPlayMusic">
      <div class="container" ref="container">
        <el-container>
          <music-detail-main :lyric="lyric" :simiSongs="simiSongs"
                             :simiList="simiList" />
          <el-footer height="">
            <music-detail-comment :showMusicDetail="showMusicDetail" />
          </el-footer>
        </el-container>
      </div>
    </div>
  </transition>
</template>

<script>

import MusicDetailMain from 'views/musicDetail/childComp/main/MusicDetailMain.vue'
import MusicDetailComment from './childComp/comment/MusicDetailComment.vue'

import { mapGetters } from 'vuex'
import { getSimiMusic, getLyric, getSimiList } from 'network/pageRequest/musicdetail'
import { Music, SimiList } from 'network/common'

export default {
  name: 'musicDetail',
  components: {
    MusicDetailMain,
    MusicDetailComment
  },
  data () {
    return {
      // lrc: '',
      // tlyric: '',
      lyric: {
        lrc: '',
        tlyric: '',
        nolyric: false,
        nowNolyric: false
      },
      simiSongs: [],
      simiList: [],
      showMusicDetail: false,
      fromPath: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentPlayMusic',
      'isExistCurrentPlayMusic'
    ])
  },
  methods: {
    musicBean (music) {
      return {
        id: music.id,
        name: music.name,
        picUrl: music.album.picUrl,
        alias: music.alias,
        artists: music.artists,
        album: music.album,
        duration: music.duration
      }
    },
    // 请求歌词
    getLyric () {
      const musicId = this.currentPlayMusic.id
      getLyric(musicId)
        .then(res => {
          if (res.code === 200) {
            console.log('歌词为：', res)
            if ('lrc' in res && 'tlyric' in res) {
              if (!res.lrc.lyric.length > 0) {
                this.lyric.nowNolyric = true
              } else {
                this.lyric.lrc = res.lrc.lyric
                this.lyric.tlyric = res.tlyric.lyric
              }
            } else if ('nolyric' in res) {
              (this.lyric.nolyric = res.nolyric)
            } else {
              this.lyric.nowNolyric = true
            }
          }
        })
    },

    // 请求相似歌曲
    getSimiMusic () {
      getSimiMusic(this.currentPlayMusic.id)
        .then(res => {
          // console.log('推荐歌曲为', JSON.parse(JSON.stringify(res)))
          res.songs.forEach(info => {
            this.simiSongs.push(new Music(this.musicBean(info)))
          })
        })
    },

    // 请求包含该歌曲歌单
    getSimiList () {
      getSimiList(this.currentPlayMusic.id)
        .then(res => {
          if (res.code === 200) {
            // console.log('推荐歌单为:', res)
            this.simiList = res.playlists.map(list => new SimiList(list))
          }
        })
    },

    // 页面回顶
    backTop () {
      this.$bus.$emit('scroll')
    },

    // 重置各数据
    resetData () {
      // console.log('重置歌词')
      this.lyric.lrc = ''
      this.lyric.tlyric = ''
      this.lyric.nolyric = false
      this.lyric.nowNolyric = false
      this.simiSongs = []
      this.simiList = []
    }

  },
  created () {
    if (!this.isExistCurrentPlayMusic) {
      this.$router.back()
    }
  },
  activated () {
    this.showMusicDetail = true
    if (this.isExistCurrentPlayMusic) {
      if (this.lyric.lrc.length === 0 && !this.lyric.nolyric && !this.lyric.nowNolyric) {
        this.getLyric()
      }
      if (this.simiSongs.length === 0 && this.simiList.length === 0) {
        this.getSimiMusic()
        this.getSimiList()
      }
    }
  },
  deactivated () {
    this.showMusicDetail = false
  },
  watch: {
    currentPlayMusic (newMusic, oldMusic) {
      if (newMusic.id !== oldMusic.id) {
        // 每次切换歌曲重置数据及请求歌词
        this.resetData()
        this.getLyric()

        // 若展开音乐详情则请求相关
        if (this.showMusicDetail) {
          this.backTop()
          this.getSimiMusic()
          this.getSimiList()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
}
</style>