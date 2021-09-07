<template>
  <div class="content">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
      <el-menu-item index="1">歌曲列表</el-menu-item>
      <el-menu-item index="2">评论({{total}})</el-menu-item>
    </el-menu>

    <song-group :tracks="tracks" v-show="activeIndex==='1'" />
    <comment :newComments="newComments" :hotComments="hotComments"
             :total="total" :loading="commentLoading" @pageChange="pageChange"
             v-show="activeIndex==='2'" />

  </div>
</template>

<script>
import { getSongListComment } from 'network/pageRequest/songList'
import Comment from 'components/content/comment/Comment.vue'
import SongGroup from 'components/content/songGroup/SongGroup.vue'

import { UserComment } from 'network/common'

export default {
  components: { Comment, SongGroup },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      newComments: [],
      hotComments: [],
      activeIndex: '1',
      commentLoading: true
    }
  },
  methods: {
    getSongListComment (id, offset) {
      getSongListComment(id, 20, offset).then(res => {
        console.log('请求结果为：', res)
        if (res.code === 200) {
          this.newComments = []
          this.hotComments = []

          res.comments.forEach(comment => {
            this.newComments.push(new UserComment(comment, id, 2))
          })

          if ('hotComments' in res) {
            res.hotComments.forEach(comment => {
              this.hotComments.push(new UserComment(comment, id, 2))
            })
          }

          this.hotComments.length > 10 && (this.hotComments.length = 10)

          this.commentLoading = false
        }
      })
    },

    // * 事件处理
    select (index) {
      this.activeIndex = index

      const id = this.$route.params.id
      if (index === '2' && this.newComments.length === 0) {
        this.getSongListComment(id)
      }
    },

    pageChange (page) {
      const id = this.$route.params.id
      this.getSongListComment(id, (page - 1) * 20)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 2rem;
}

.el-menu {
  margin-bottom: 2rem;
}

.el-menu-item.is-active {
  font-weight: bold;
  border-bottom-width: 3px;
}

.el-menu-item {
  font-size: 18px;
  padding: 0;
  margin-right: 2rem;
}
</style>