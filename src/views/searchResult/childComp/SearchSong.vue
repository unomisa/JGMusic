<template>
  <div>
    <loading :loading="loading" :empty="empty">
      <keyword-search :keywords="$route.query.keywords">
        <search-multimatch :result="multimatchResult" v-show="page === 1" />
      </keyword-search>
      <div class="title">找到{{this.count}}首单曲</div>

      <keyword-search :keywords="$route.query.keywords">
        <song-group :tracks="result" :areas="areas" :startIndex="startIndex"
                    single />
      </keyword-search>

      <el-pagination background layout=" prev, pager, next" :total="count"
                     :page-size="100" :pager-count="9"
                     @current-change="pageChange" />

      <template v-slot:empty>
        很抱歉，未能找到与"
        <span class="keywords">{{$route.query.keywords}}</span>
        "相关的任何单曲
      </template>
    </loading>
  </div>
</template>

<script>
import SongGroup from 'components/content/songGroup/SongGroup.vue'
import Loading from 'components/common/loading/Loading.vue'
import SearchMultimatch from './SearchMultimatch.vue'
import KeywordSearch from 'components/common/keywordSearch/KeywordSearch.vue'

import { search, searchMultimatch } from 'network/common/search'
import { musicBean } from 'common/mixin'
import { Music } from 'network/common'

export default {
  mixins: [musicBean],
  components: { SongGroup, Loading, SearchMultimatch, KeywordSearch },
  data () {
    return {
      count: 0,
      result: [],
      multimatchResult: {},
      startIndex: 0,
      page: 1,
      areas: {
        others: 3,
        name: 6,
        artists: 5,
        album: 5,
        duration: 2,
        pop: 3
      },
      loading: true,
      empty: false // 结果是否为空
    }
  },
  methods: {
    // * 网络请求
    serch (limit = 100, offset = 0) {
      const keywords = this.$route.query.keywords
      const type = this.$route.meta.type

      return search(keywords, type, limit, offset).then(res => {
        console.log('搜索结果为i:', JSON.parse(JSON.stringify(res)))
        if (res.code === 200) {
          this.count = res.result.songCount
          if (this.count !== 0) {
            this.result = res.result.songs.map(song => new Music({
              ...this.musicBean(song),
              cp: song.privilege.cp
            }))
          } else {
            this.empty = true // 若结果为0，那么搜索结果为空
          }
        }
      })
    },

    searchMultimatch () {
      const keywords = this.$route.query.keywords
      return searchMultimatch(keywords).then(res => {
        console.log('多重匹配结果为：', JSON.parse(JSON.stringify(res)))
        if (res.code === 200) {
          this.multimatchResult = res.result
        }
      })
    },

    // * 事件处理
    pageChange (page) {
      this.page = page
      this.loading = true // 切换页面，使其正在加载
      this.startIndex = (page - 1) * 100
      this.serch(100, this.startIndex).then(() => {
        this.loading = false // 使其解除加载
      })
    }
  },
  created () {
    Promise.all([
      this.searchMultimatch(),
      this.serch()
    ]).then(() => {
      this.loading = false // 使其解除加载
    })
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 24px 0;
  font-size: 20px;
  font-weight: bold;
}

.el-pagination {
  text-align: center;
  margin: 36px 0;
}

.keywords {
  color: #61b7ed;
}
</style>