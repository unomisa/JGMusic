<template>
  <detail-card :loading="loading">
    <template v-slot:left>
      <el-image class="cover" :src="artist.cover + '?param=250y250'"
                fit="cover" />
    </template>
    <template v-slot:right>
      <div class="title">
        <span class="category">
          <el-tag effect="dark" size="small">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-geshou"></use>
            </svg>
            歌手
          </el-tag>
        </span>
        <span class="name">
          {{artist.name}}
        </span>
      </div>

      <el-divider content-position="right">
        <div class="btn">
          <el-button type="primary" round size="default"
                     v-if="!artist.blacklist" @click="userDetail">
            <i class="el-icon-user"></i>
            个人主页
          </el-button>

          <el-button plain round @click="sub">
            <i class="el-icon-folder-add" v-show="!isSubArtist"></i>
            <i class="el-icon-folder-checked" v-show="isSubArtist"></i>
            <span>{{subText}}</span>
          </el-button>

        </div>
      </el-divider>

      <div>
        <span class="count">单曲数：{{artist.musicCount}}</span>
        <span class="count">专辑数：{{artist.albumCount}}</span>
        <span class="count">MV数：{{artist.mvCount}}</span>
      </div>
    </template>
  </detail-card>
</template>

<script>
import DetailCard from 'components/content/detailCard/DetailCard.vue'
import { mapState, mapMutations } from 'vuex'
import { subArtist, Artist } from 'network/common'

export default {
  components: { DetailCard },
  props: {
    artist: {
      type: Object,
      default () {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: true
    }

  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    subText () {
      if (this.isSubArtist) {
        return '已收藏'
      } else {
        return '收藏'
      }
    },

    isSubArtist () {
      if ('artistSub' in this.loginUser) {
        const id = parseInt(this.$route.params.id)
        return this.loginUser.artistSub.has(id)
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations([
      'artistSub',
      'artistUnfollow'
    ]),

    sub () {
      const id = parseInt(this.$route.params.id)
      if (this.isSubArtist) {
        subArtist(id, 0, Date.now()).then(res => {
          if (res.code === 200) {
            // console.log('取消收藏：', res)
            this.artistUnfollow(id)
            this.$notify({
              position: 'top-left',
              title: '已取消收藏歌手',
              offset: 90,
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        subArtist(id, 1, Date.now()).then(res => {
          if (res.code === 200) {
            // console.log('收藏：', res)
            this.artistSub(new Artist({
              id: parseInt(this.$route.params.id),
              name: this.artist.name,
              picUrl: this.artist.cover
            }))
            this.$notify({
              position: 'top-left',
              title: '收藏歌手成功',
              offset: 90,
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    },
    userDetail () {
      this.$router.push('/userDetail/' + this.artist.userId)
    }
  }
}
</script>

<style lang="less" scoped>
.cover {
  height: 100%;
  border-radius: 5px;
}

.category {
  vertical-align: bottom;
  margin-right: 10px;
}

.name {
  font-size: 24px;
  font-weight: bold;
}

.count {
  margin-right: 2rem;
}
</style>