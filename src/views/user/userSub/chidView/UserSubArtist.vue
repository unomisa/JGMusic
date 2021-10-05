<template>
  <div>
    <loading :loading="loading" :empty="empty">
      <div class="title">共收藏{{this.count}}位歌手</div>

      <artist-preview v-for="artist in result" :key="artist.id"
                      :artist="artist" />

      <el-pagination background layout=" prev, pager, next" :total="count"
                     :page-size="20" :pager-count="9"
                     @current-change="pageChange" />

      <template v-slot:empty>
        你还没有收藏的歌手哦~
      </template>
    </loading>
  </div>
</template>

<script>
import Loading from 'components/common/loading/Loading.vue'
import ArtistPreview from 'components/content/preview/preview_row/artist_row/artistPreview.vue'

import { getArtistSubList } from 'network/pageRequest/user'
import { Artist } from 'network/common'

export default {
  components: { Loading, ArtistPreview },
  data () {
    return {
      count: 0,
      result: [],
      loading: true,
      empty: false,
      limit: 20
    }
  },
  methods: {
    getArtistSubList (offset = 0) {
      getArtistSubList(this.limit, offset).then(res => {
        // console.log('收藏歌手为：', res)
        if (res.code === 200) {
          res.count && (this.count = res.count)
          if (this.count === 0) {
            this.empty = true
          } else {
            this.result = res.data.map(artist => new Artist(artist))
            this.loading = false
          }
        }
      })
    },

    pageChange (page) {
      this.loading = true // 切换页面，使其正在加载
      const offset = (page - 1) * this.limit
      this.getArtistSubList(offset)
    }
  },
  created () {
    this.getArtistSubList()
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
</style>