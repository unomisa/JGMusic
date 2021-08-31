<template>
  <div class="content">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
      <el-menu-item index="1">歌曲列表</el-menu-item>
      <el-menu-item index="2">评论({{total}})</el-menu-item>
    </el-menu>

    <song-group :tracks="tracks" v-show="activeIndex==='1'" />
    <comment :newComments="newComments" :hotComments="hotComments"
             :total="total" @pageChange="pageChange"
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
    }
  },
  data () {
    return {
      newComments: [],
      hotComments: [],
      total: 0,
      activeIndex: '1'
    }
  },
  methods: {
    getSongListComment (id, offset) {
      getSongListComment(id, 20, offset).then(res => {
        if (res.code === 200) {
          this.newComments = []
          this.hotComments = []
          this.total = res.total

          res.comments.forEach(comment => {
            this.newComments.push(new UserComment(comment))
          })

          if ('hotComments' in res) {
            res.hotComments.forEach(comment => {
              this.hotComments.push(new UserComment(comment))
            })
          }

          this.hotComments.length > 10 && (this.hotComments.length = 10)
        }
      })
    },

    // * 事件处理
    select (index) {
      this.activeIndex = index
    },

    pageChange (page) {
      const id = this.$route.params.id
      this.getSongListComment(id, (page - 1) * 20)
    }
  },
  created () {
    const id = this.$route.params.id
    this.getSongListComment(id)
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