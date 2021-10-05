<template>
  <div>
    <loading :loading="loading" :empty="empty">
      <div class="title">找到{{this.count}}张专辑</div>

      <keyword-search :keywords="$route.query.keywords">
        <album-preview v-for="album in result" :key="album.id" :album="album" />
      </keyword-search>

      <el-pagination background layout=" prev, pager, next" :total="count"
                     :page-size="20" :pager-count="9"
                     @current-change="pageChange" />

      <template v-slot:empty>
        很抱歉，未能找到与"
        <span class="keywords">{{$route.query.keywords}}</span>
        "相关的任何专辑
      </template>
    </loading>
  </div>
</template>

<script>
import AlbumPreview from 'components/content/preview/preview_row/album_row/AlbumPreview.vue'
import KeywordSearch from 'components/common/keywordSearch/KeywordSearch.vue'
import Loading from 'components/common/loading/Loading.vue'

import { Album } from 'network/common'
import { search } from 'network/common/search'

export default {
  components: { AlbumPreview, Loading, KeywordSearch },
  data () {
    return {
      count: 0,
      result: [],
      loading: true,
      empty: false
    }
  },
  methods: {
    serch (limit = 20, offset = 0) {
      const keywords = this.$route.query.keywords
      const type = this.$route.meta.type

      search(keywords, type, limit, offset).then(res => {
        console.log('搜索结果为i:', res)
        if (res.code === 200) {
          this.count = res.result.albumCount

          if (this.count !== 0) {
            this.result = res.result.albums.map(album => new Album(album))
          } else {
            this.empty = true
          }
          this.loading = false
        }
      })
    },

    pageChange (page) {
      this.loading = true // 切换页面，使其正在加载
      this.startIndex = (page - 1) * 20
      this.serch(20, this.startIndex)
    }
  },
  created () {
    this.serch()
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