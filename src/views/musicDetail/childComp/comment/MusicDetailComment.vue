<template>
  <div class="container">
    <comment class="comment" :hotComments="hotComments"
             :newComments="newComments" :total="totalCount" :loading="loading"
             @pageChange="pageChange"
             v-if="hotComments.length>0||newComments.length>0" />
  </div>
</template>

<script>
import Comment from 'components/content/comment/Comment.vue'

import { mapGetters } from 'vuex'
import { getCommentOld, getHotComment } from 'network/pageRequest/musicdetail'
import { UserComment } from 'network/common'

export default {
  components: { Comment },
  props: {
    showMusicDetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      totalCount: 0,
      hotComments: [],
      newComments: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'currentPlayMusic'
    ])
  },
  methods: {
    getHotComments (page, id) {
      if (this.hotComments.length !== 0) return
      return getHotComment({ id: id, limit: 10, offset: 0 })
        .then(res => {
          if (res.code === 200) {
            console.log('最热门评论为:', res)
            const comments = res.hotComments
            this.hotComments = []

            comments.forEach(component => {
              this.hotComments.push(new UserComment(component, id, 0))
            })
            // console.log('热门评论数据为:', comments)
            // console.log('包装好的评论热门数据为：', this.hotComments)
          }
        })
    },

    getNewComments (page, id, lastTime) {
      return getCommentOld(id, 20, 20 * (page - 1), lastTime)
        .then(res => {
          // console.log(res)
          if (res.code === 200) {
            const comments = res.comments
            this.totalCount = res.total
            this.newComments = []

            comments.forEach(component => {
              this.newComments.push(new UserComment(component, id, 0))
            })
            // console.log('最新评论数据为:', res)
            // console.log('包装好的最新评论数据为：', this.newComments)
          }
        })
    },

    pageChange (page) {
      Promise.all([
        this.getHotComments(page, this.currentPlayMusic.id),
        this.getNewComments(page, this.currentPlayMusic.id)
      ]).then(() => {
        this.loading = false
      })
    },

    reset () {
      this.loading = true
      this.totalCount = 0
      this.newComments = []
      this.hotComments = []
    }

  },
  activated () {
    if (this.newComments.length === 0) { // 活跃并没有评论时请求
      this.pageChange(1)
    }
  },
  watch: {
    currentPlayMusic (newMusic, oldMusic) {
      if (newMusic.id !== oldMusic.id) {
        this.reset()
        if (this.showMusicDetail) { // 如果音乐详情正在展示，则请求
          this.pageChange(1)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 800px;
  height: 800px;
  margin: 0 auto;
}

.comment {
  margin-top: 1.25rem;
}
</style>