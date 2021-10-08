<template>
  <context v-bind="$attrs" v-on="$listeners">
    <context-item @click.native="play">
      <template v-slot:icon>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang2"></use>
        </svg>
      </template>
      播放歌单
    </context-item>

    <context-item @click.native="addToNextMusics">
      <template v-slot:icon>
        <i class="el-icon-plus"></i>
      </template>
      添加至播放列表
    </context-item>

    <context-item @click.native="subSongList" v-if="isMyList && isLogin">
      <template v-slot:icon>
        <i class="el-icon-folder-add"></i>
      </template>
      收藏歌单
    </context-item>

    <el-divider class="divider" v-if="isMyProfile"></el-divider>
    <context-item @click.native="delSongList" v-if="isMyProfile">
      <template v-slot:icon>
        <i class="el-icon-delete"></i>
      </template>
      删除歌单
    </context-item>
  </context>
</template>

<script>
import Context from 'components/common/context/Context.vue'
import ContextItem from 'components/common/context/Context-Item.vue'

import { deleteSongList, getPlayListDetail } from 'network/pageRequest/songList'
import { getMusicDetail } from 'network/pageRequest/musicdetail'
import { mapMutations, mapState } from 'vuex'
import { subPlaylist, SongList, Music } from 'network/common'
import { musicBean } from '@/common/mixin'

export default {
  mixins: [musicBean],
  components: { Context, ContextItem },
  props: {
    songList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      tracks: [],
      trackIds: []
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'loginUser'
    ]),

    // 是否为当前用户详情页面
    isMyProfile () {
      const loginId = this.loginUser.userId
      const expectPath = '/user/detail/' + loginId // 期待路由
      if (this.$route.fullPath === expectPath && !(this.songList.specialType === 5)) {
        return true
      }
      return false
    },

    // 是否为当前用户收藏歌单
    isMyList () {
      if (this.loginUser.subList) {
        return !this.loginUser.subList.has(this.songList.id)
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapMutations([
      'addNextMusics',
      'unSubList',
      'insertSUubList',
      'addToPlayList'
    ]),

    play () {
      if (this.songList.specialType === 5 && !this.isLogin) {
        this.$notify.topleft('需要登录才能查看', 'warning')
      } else {
        this.getPlayListDetail(this.songList.id).then(tracks => {
          this.addToPlayList({
            playList: tracks,
            index: 0
          })
        })
      }
    },

    addToNextMusics () {
      if (this.songList.specialType === 5 && !this.isLogin) {
        this.$notify.topleft('需要登录才能查看', 'warning')
      } else {
        this.getPlayListDetail(this.songList.id).then(tracks => {
          this.addNextMusics(tracks)
        })
      }
    },

    subSongList () {
      subPlaylist(this.songList.id, 1, Date.now()).then(() => {
        const lists = Array.from(this.loginUser.subList.values())
        const createListsLength = lists.filter(list => !list.subscribed).length
        this.insertSUubList({
          index: createListsLength,
          list: {
            ...new SongList(this.songList),
            subscribed: true
          }
        })
        this.$notify.topleft('收藏歌单成功')
      })
    },

    delSongList () {
      const id = this.songList.id
      deleteSongList(id).then(res => {
        this.$notify.topleft('删除歌单成功')
        this.unSubList(id)
      })
    },

    getPlayListDetail (id) {
      return getPlayListDetail(id, Date.now()).then(res => {
        if (res.code === 200) {
          // console.log('歌单详情为：', res)
          this.trackIds = res.playlist.trackIds

          if (this.trackIds.length > res.playlist.tracks.length) {
            return this.getMusicDetail()
          } else {
            res.playlist.tracks.forEach((track, index) => {
              const music = new Music({
                ...this.musicBean(track),
                cp: res.privileges[index].cp
              })
              this.tracks.push(music)
            })
            return this.tracks
          }
        }
      })
    },

    getMusicDetail () {
      const ids = this.trackIds.map(trackId => trackId.id).join(',')
      return getMusicDetail(ids).then(res => {
        if (res.code === 200) {
          // console.log('歌曲详情为：', res)
          res.songs.forEach((track, index) => {
            const music = new Music({
              ...this.musicBean(track),
              cp: res.privileges[index].cp
            })
            this.tracks.push(music)
          })
          return this.tracks
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.divider {
  margin: 3px 0;
}
</style>