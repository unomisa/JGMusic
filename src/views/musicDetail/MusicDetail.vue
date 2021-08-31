<template>
  <transition name="el-zoom-in-bottom">
    <div class="detail">
      <div v-bar class="scroll">
        <div class="container" ref="container">
          <el-container>
            <music-detail-main :lrc="lrc" :tlyric="tlyric"
                               :simiSongs="simiSongs" :simiList="simiList" />
            <el-footer height="">
              <music-detail-comment />
            </el-footer>
          </el-container>

          <el-backtop target=".container" :right="300" :bottom="100">

          </el-backtop>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import MusicDetailMain from 'views/musicDetail/childComp/main/MusicDetailMain.vue'
import MusicDetailComment from './childComp/comment/MusicDetailComment.vue'

import { mapGetters } from 'vuex'
import { getSimiMusic, getLyric, getSimiList } from 'network/pageRequest/musicdetail'
import { ElScrool } from 'common/utils'
import { Music, SimiList } from 'network/common'

export default {
  name: 'musicDetail',
  components: {
    MusicDetailMain,
    MusicDetailComment
  },
  data () {
    return {
      lrc: '',
      tlyric: '',
      simiSongs: [],
      simiList: []
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
          this.lrc = res.lrc.lyric
          this.tlyric = res.tlyric.lyric
        })
    },

    // 请求相似歌曲
    getSimiMusic () {
      getSimiMusic(this.currentPlayMusic.id)
        .then(res => {
          console.log('推荐歌曲为', JSON.parse(JSON.stringify(res)))
          res.songs.forEach(info => {
            this.simiSongs.push(new Music(this.musicBean(info)))
          })
          console.log('歌曲信息格式化之后:', JSON.parse(JSON.stringify(this.simiSongs)))
        })
    },

    // 请求包含该歌曲歌单
    getSimiList () {
      getSimiList(this.currentPlayMusic.id)
        .then(res => {
          if (res.code === 200) {
            console.log('推荐歌单为:', res)
            this.simiList = res.playlists.map(list => new SimiList(list))
          }
        })
    },

    // 页面回顶
    backTop () {
      ElScrool(this.$refs.container, 0, 0)
    },

    // 重置各数据
    resetData () {
      this.lrc = ''
      this.tlyric = ''
      this.simiSongs = []
      this.simiList = []
    }

  },
  created () {
    if (this.isExistCurrentPlayMusic) {
      this.getLyric()
      this.getSimiMusic()
      this.getSimiList()
    } else {
      this.$router.replace('/home')
    }
  },
  watch: {
    currentPlayMusic (newMusic, oldMusic) {
      if (newMusic.id !== oldMusic.id) {
        this.resetData()
        this.backTop()
        this.getLyric()
        this.getSimiMusic()
        this.getSimiList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.scroll {
  height: inherit;
}

.detail {
}

.container {
  position: relative;
}
</style>