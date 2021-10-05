<template>
  <div>
    <loading :loading="loading" :empty="empty">
      <div class="title">共收藏{{this.count}}张专辑</div>

      <album-preview v-for="(album,index) in result" :key="album.id"
                     :album="album" :index="index" />

      <el-pagination background layout=" prev, pager, next" :total="count"
                     :page-size="20" :pager-count="9"
                     @current-change="pageChange" />

      <template v-slot:empty>
        你还没有收藏的专辑哦~
      </template>
    </loading>
  </div>
</template>

<script>
import Loading from 'components/common/loading/Loading.vue'
import AlbumPreview from 'components/content/preview/preview_row/album_row/AlbumPreview.vue'

import { getAlbumSubList } from 'network/pageRequest/user'
import { Album } from 'network/common'

export default {
  components: { Loading, AlbumPreview },
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
    getAlbumSubList (offset = 0) {
      return getAlbumSubList(this.limit, offset).then(res => {
        // console.log('收藏专辑为：', res)
        if (res.code === 200) {
          res.count && (this.count = res.count)
          if (this.count === 0) {
            this.empty = true
          } else {
            this.result = res.data.map(artist => new Album(artist))
          }
        }
      })
    },

    pageChange (page) {
      this.loading = true // 切换页面，使其正在加载
      const offset = (page - 1) * this.limit
      this.getAlbumSubList(offset).then(() => {
        this.loading = false
      })
    },

    subControl (flag, index) {
      console.log('index: ', index)
      if (flag === -1) {
        this.count-- // 总数减一
        this.result.splice(index, 1) // 删除收藏
      }
    }
  },
  created () {
    this.getAlbumSubList().then(() => {
      this.loading = false
    })
  },
  mounted () {
    this.$bus.$on('subAlbumControl', this.subControl)
  },
  destroyed () {
    this.$bus.$off('subAlbumControl', this.subControl)
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