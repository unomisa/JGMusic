<template>
  <div class="container">
    <div class="backdrop"></div>
    <div class="content">
      <rank-top-list :topList="topList" :loading="topListLoading" />
      <rank-global-list :globalList="globalList" :loading="globalListLoading" />
    </div>
  </div>
</template>

<script>
import { getTopList } from 'network/pageRequest/rankList'
import { getPlayListDetail } from 'network/pageRequest/songList'
import { SongList, Music } from 'network/common'
import { musicBean } from 'common/mixin'
import RankGlobalList from './childComp/RankGlobalList.vue'
import RankTopList from './childComp/RankTopList.vue'

export default {
  mixins: [musicBean],
  components: { RankGlobalList, RankTopList },
  data () {
    return {
      topList: [],
      globalList: [],
      topListLoading: true,
      globalListLoading: true
    }
  },
  methods: {
    getTopList () {
      getTopList().then(res => {
        // console.log('所有榜单为：', res)
        const promiseArr = []
        const lists = res.list.map(list => new SongList(list))

        lists.forEach(list => {
          if (list.toplist) {
            this.topList.push(list)
            promiseArr.push(this.getPlayListDetail(list))
          } else {
            this.globalList.push(list)
          }
        })

        this.globalListLoading = false
        Promise.all(promiseArr).then(() => {
          this.topListLoading = false
        })
      })
    },

    getPlayListDetail (list) {
      return getPlayListDetail(list.id).then(res => {
        if (res.code === 200) {
          // console.log('排行歌单详情为:', res)
          const trackIds = res.playlist.trackIds
          this.$set(list, 'tracks', res.playlist.tracks)
          list.tracks.length = 5
          list.tracks = list.tracks.map((track, index) => {
            const other = {}
            if ('ratio' in trackIds[index]) {
              other.ratio = trackIds[index].ratio
            } else if ('lr' in trackIds[index]) {
              other.lr = trackIds[index].lr
            } else {
              other.new = true
            }
            const music = new Music(this.musicBean(track))
            this.$set(music, 'rank', other)
            return music
          })
        }
      })
    }
  },
  created () {
    this.getTopList()
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
}

.content {
  width: var(--width-main);
  margin: 0 auto;
}

.backdrop {
  content: "";
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 230px;
  // background-image: linear-gradient(to top, #ffffff 0%, #ff94cc 100%);
}
</style>