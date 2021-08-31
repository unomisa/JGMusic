<template>
  <div class="content">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
      <el-menu-item index="1">歌曲列表</el-menu-item>
      <el-menu-item index="2">评论({{total}})</el-menu-item>
      <el-menu-item index="3" v-if="desc.length>0">专辑详情</el-menu-item>
    </el-menu>

    <song-group :tracks="tracks" v-show="activeIndex==='1'" />
    <comment :newComments="newComments" :hotComments="hotComments"
             :total="total" @pageChange="pageChange"
             v-show="activeIndex==='2'" />
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
    desc: {
      type: String,
      default: ''
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
    // 获取专辑评论
    getAlbumComment (id, offset) {
      getAlbumComment(id, 20, offset).then(res => {
        if (res.code === 200) {
          console.log('专辑评论为：', res)
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
      this.getAlbumComment(id, (page - 1) * 20)
    }
  },
  created () {
    const id = this.$route.params.id
    this.getAlbumComment(id)
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