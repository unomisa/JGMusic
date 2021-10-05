<template>
  <div class="container">
    <div class="content">
      <song-list-high-quality :list="highQualityList"
                              :loading="highQualityListLoading"
                              @click.native="goHightQualityLists"
                              v-if="showTop" />
      <song-list-tags :tag="tag" :tags="tags" />

      <song-lists :lists="lists" :loading="listsLoading"
                  v-if="!showHightQualityLists" />

      <high-quality-lists :lists="highQualityLists"
                          v-if="showHightQualityLists" />
    </div>
  </div>
</template>

<script>
import SongListHighQuality from './childComp/SongListHighQuality.vue'
import SongListTags from './childComp/SongListTags.vue'
import SongLists from './childComp/SongLists.vue'
import HighQualityLists from './childComp/HighQualityLists.vue'

import { getSongListCategory, getTopSongList, getSongListHighqualityTags, getSongListHighquality, HighQualityList } from 'network/pageRequest/songList'
import { SongList } from 'network/common'
import { mapMutations } from 'vuex'
import { infiniteScroll } from 'common/mixin'

export default {
  mixins: [infiniteScroll],
  components: { SongListTags, SongListHighQuality, SongLists, HighQualityLists },
  data () {
    return {
      highQualityList: {}, // 精品歌单推荐
      highQualityLists: [], // 精品歌单们
      highQualityListLoading: true, // 推荐是否加载完成
      showTop: true, // 是否显示推荐
      showHightQualityLists: false, // 是否显示精品歌单们
      hightQualityLists_LastTime: '',

      tags: [], // 标签们
      tag: '全部歌单', // 默认标签

      lists: [], // 推荐按歌单们
      listsLoading: true, // 推荐歌单是否加载完成
      listsLimit: 40,
      listsOffset: 0,

      more: true // 是否还有未加载数据
    }
  },
  methods: {
    ...mapMutations([
      'setInfiniteScrollDisabled'
    ]),

    goHightQualityLists () {
      this.$router.push({
        path: '/songList',
        query: {
          tag: this.tag,
          type: 'hightQuality'
        }
      })
    },

    getSongListCategory () {
      getSongListCategory().then(res => {
        if (res.code === 200) {
          // console.log('歌单分类有:', res)
          for (let i = 0; i < 5; i++) {
            this.tags.push([])
          }
          res.sub.forEach(tag => this.tags[tag.category].push(tag))
        }
      })
    },
    getTopSongList () {
      if (!this.more) return
      getTopSongList(this.tag, this.listsLimit, this.listsOffset).then(res => {
        if (res.code === 200) {
          res.playlists.forEach(list => {
            this.lists.push(new SongList(list))
          })

          if (res.more) {
            this.setInfiniteScrollDisabled(false)
            this.listsOffset += this.listsLimit
          } else {
            this.more = false
            this.setInfiniteScrollDisabled(true)
          }
          this.listsLoading = false
        }
      })
    },

    getSongListHighqualityTags () {
      getSongListHighqualityTags().then(res => {
        if (res.code === 200) {
          // console.log('精品歌单标签列表:', res)
          this.tags[0] = []
          this.tags[0] = res.tags
        }
      })
    },

    getSongListHighquality (limit = 24) {
      if (!this.more) return
      getSongListHighquality(this.tag, limit, this.hightQualityLists_LastTime).then(res => {
        if (res.code === 200) {
          // console.log('精品歌单内容为：', res)
          if (res.playlists.length > 0) {
            this.highQualityList = new HighQualityList(res.playlists[0])
            res.playlists.forEach(list => {
              this.highQualityLists.push(new HighQualityList(list))
            })
            this.highQualityListLoading = false

            if (res.more) {
              this.hightQualityLists_LastTime = res.lasttime
              this.setInfiniteScrollDisabled(false)
            } else {
              this.more = false
              this.setInfiniteScrollDisabled(true)
            }
          } else {
            this.showTop = false
          }
        }
      })
    }
  },
  created () {
    // 如果有tag则赋值，没有则使用默认
    if ('tag' in this.$route.query) {
      this.tag = this.$route.query.tag
    }

    // 判断时候为精品歌单，是则请求，不是则请求普通歌单
    if ('type' in this.$route.query && this.$route.query.type === 'hightQuality') {
      this.showTop = false
      this.showHightQualityLists = true
      this.getSongListHighqualityTags()
      this.getSongListHighquality()
    } else {
      this.getSongListHighquality(1)
      this.getSongListCategory()
      this.getTopSongList()
    }
  },
  mounted () {
    if ('type' in this.$route.query && this.$route.query.type === 'hightQuality') {
      this.$bus.$on('infiniteScroll', this.getSongListHighquality)
    } else {
      this.$bus.$on('infiniteScroll', this.getTopSongList)
    }
  },
  activated () {
    if ('type' in this.$route.query && this.$route.query.type === 'hightQuality') {
      this.$bus.$on('infiniteScroll', this.getSongListHighquality)
    } else {
      this.$bus.$on('infiniteScroll', this.getTopSongList)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  width: var(--width-main);
  margin: 0 auto;
}
</style>