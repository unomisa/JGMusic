<template>
  <detail-card :loading="loading">
    <template v-slot:left>
      <el-image class="cover" :src="playList.coverImgUrl + '?param=250y250' "
                fit="cover" />
    </template>

    <template v-slot:right>
      <div class="right">
        <div class="title">
          <span class="category">
            <el-tag effect="dark" size="small">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="iconType"></use>
              </svg>
              {{type}}
            </el-tag>
          </span>
          <span class="name">
            {{playList.name}}</span>
        </div>

        <div class="other">
          <div class="creator" @click="userDetail">
            <div class="avatar">
              <el-avatar icon="el-icon-user-solid" size="large" shape="circle"
                         :src="playList.creator.avatarUrl + '?param=40y40'">
              </el-avatar>
            </div>
            <div class="nickname">
              <el-link :underline="false">
                {{playList.creator.nickname}}
              </el-link>
            </div>
          </div>

          <div class="date">
            {{playList.createTime}} 创建
          </div>

          <div class="date">
            {{playList.updateTime}} 更新
          </div>
        </div>

        <dynamic :dynamic="playList" :isMyList="isMyList" :isSubList="isSubList"
                 @sub="subList" />

        <div class="tags" v-if="'tags' in playList && playList.tags.length>0">
          标签：
          <el-link class="tag" :underline="false"
                   v-for="(tag,index) in playList.tags" :key="index">
            {{tag}}<span
                  v-if="index!==playList.tags.length-1">&ensp;/&ensp;</span>
          </el-link>
        </div>

        <div class="song">
          <span class="track-count">歌曲：{{playList.trackCount}} </span>
          <span>播放：{{playList.playCount}}</span>
        </div>

        <collapsible-text v-if="playList.description">
          简介：
          <span class="desc-content">{{playList.description}}</span>
        </collapsible-text>

      </div>
    </template>
  </detail-card>
</template>

<script>
import Dynamic from 'components/content/miniCom/Dynamic.vue'
import DetailCard from 'components/content/detailCard/DetailCard.vue'

import { mapState, mapMutations } from 'vuex'
import { subPlaylist } from 'network/common'
import CollapsibleText from '../../../components/common/collapsibleText/collapsibleText.vue'

export default {
  components: { Dynamic, DetailCard, CollapsibleText },
  props: {
    playList: {
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
  data () {
    return {
      type: '歌单'
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    isMyList () {
      if (this.loginUser.userId === this.playList.creator.userId) {
        return true
      } else {
        return false
      }
    },

    isSubList () {
      const id = this.$route.params.id
      if ('subList' in this.loginUser) {
        if (id in this.loginUser.subList) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    iconType () {
      let iconType = ''
      switch (this.type) {
        case '排行榜': iconType = '#icon-paixingbang'; break
        default: iconType = '#icon-gedan'
      }
      return iconType
    }
  },
  methods: {
    ...mapMutations([
      'pushSubList',
      'unSubList'
    ]),

    userDetail () {
      this.$router.push('/userDetail/' + this.playList.creator.userId)
    },

    subList () {
      const id = this.$route.params.id
      if (this.isSubList) {
        subPlaylist(id, 2, Date.now()).then(() => {
          this.unSubList(id)
          this.$notify.topleft('取消歌单收藏')
        })
      } else {
        subPlaylist(id, 1, Date.now()).then(() => {
          this.pushSubList(id)
          this.$notify.topleft('收藏歌单成功')
        })
      }
    },

    listType (type) {
      switch (type) {
        case 'rank': this.type = '排行榜'
      }
    }
  },
  created () {
    if ('type' in this.$route.query) {
      this.listType(this.$route.query.type)
    }
  }
}
</script>

<style lang="less" scoped>
.detail-card {
  height: auto;
}

.right {
  & > * {
    margin-top: 0;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.cover {
  height: 190px;
  width: 190px;
  border-radius: 5px;
}

.title {
  // margin-bottom: 12px;
}

.category {
  vertical-align: bottom;
  margin-right: 10px;
}

.name {
  font-size: 24px;
  font-weight: bold;
}

.other {
  display: flex;
  align-items: center;
}

.creator {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar {
  margin-right: 0.5rem;
}

.nickname {
  transform: translateY(-2px);
}

.date {
  font-size: 14px;
  color: var(--color-light-gray);
  margin-left: 1rem;
}

.tags {
  display: flex;
}

.track-count {
  margin-right: 1rem;
}

.desc {
  &-content {
    color: var(--color-gray);
    line-height: 2;
  }
}
</style>