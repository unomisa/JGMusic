<template>
  <div class="content">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
      <el-menu-item index="1">歌曲列表</el-menu-item>
      <el-menu-item index="2">评论({{commentTotal}})</el-menu-item>
      <el-menu-item index="3" v-if="desc">专辑详情</el-menu-item>
    </el-menu>

    <song-group :tracks="tracks" :areas="areas" v-show="activeIndex==='1'" />

    <comment :newComments="newComments" :hotComments="hotComments"
             :total="commentTotal" :loading="commentLoading" :type="3" :rid="id"
             @pageChange="pageChange" v-show="activeIndex==='2'" />

    <pre v-show="activeIndex==='3'">{{desc}}</pre>
  </div>
</template>

<script>
import SongGroup from 'components/content/songGroup/SongGroup.vue'
import Comment from 'components/content/comment/Comment.vue'

import { UserComment } from 'network/common'
import { getAlbumComment } from 'network/pageRequest/albumdetail'

export default {
  components: { SongGroup, Comment },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    commentTotal: {
      type: Number,
      default: 0
    },
    desc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      newComments: [],
      hotComments: [],
      activeIndex: '1',
      commentLoading: true,
      areas: {
        others: 3,
        name: 6,
        artists: 5,
        album: 5,
        duration: 2,
        pop: 3
      }
    }
  },
  computed: {
    id () {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    // 获取专辑评论
    getAlbumComment (id, offset) {
      getAlbumComment(id, 20, offset).then(res => {
        if (res.code === 200) {
          console.log('专辑评论为：', res)
          this.newComments = []
          this.hotComments = []

          res.comments.forEach(comment => {
            this.newComments.push(new UserComment(comment, id, 3))
          })

          if ('hotComments' in res) {
            res.hotComments.forEach(comment => {
              this.hotComments.push(new UserComment(comment, id, 3))
            })
            this.hotComments.length > 10 && (this.hotComments.length = 10)
          }

          this.commentLoading = false
        }
      })
    },

    // * 事件处理
    select (index) {
      this.activeIndex = index

      const id = this.$route.params.id
      if (index === '2' && this.newComments.length === 0) {
        this.getAlbumComment(id)
      }
    },

    pageChange (page) {
      const id = this.$route.params.id
      this.getAlbumComment(id, (page - 1) * 20)
    }
  }
}
</script>

<style lang="less" scoped>
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