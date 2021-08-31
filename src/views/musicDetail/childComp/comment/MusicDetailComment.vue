<template>
  <div class="container">
    <comment class="comment" :hotComments="hotComments"
             :newComments="newComments" :total="totalCount"
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
  data () {
    return {
      totalCount: 0,
      hotComments: [],
      newComments: []
    }
  },
  computed: {
    ...mapGetters([
      'currentPlayMusic'
    ])
  },
  methods: {
    getHotComments (page) {
      getHotComment({ id: this.currentPlayMusic.id, limit: 10, offset: 0 })
        .then(res => {
          if (res.code === 200) {
            // console.log('最热门评论为:', res)
            const comments = res.hotComments
            this.hotComments = []
            comments.forEach(component => {
              this.hotComments.push(new UserComment(component))
            })
            // console.log('评论数据为:', comments)
            // console.log('包装好的评论热门数据为：', this.hotComments)
          }
        })
    },

    getNewComments (page, lastTime) {
      getCommentOld(this.currentPlayMusic.id, 20, 20 * (page - 1), lastTime)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            const comments = res.comments
            this.totalCount = res.total
            this.newComments = []
            comments.forEach(component => {
              this.newComments.push(new UserComment(component))
            })
            // console.log('最新评论数据为:', comments)
            // console.log('包装好的最新评论数据为：', this.newComments)
          }
        })
    },

    pageChange (page) {
      this.getHotComments(page)
      this.getNewComments(page)
    }

  },
  created () {
    this.pageChange(1)
  },
  watch: {
    currentPlayMusic (newMusic, oldMusic) {
      if (newMusic.id !== oldMusic.id) {
        this.pageChange(1)
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