<template>
  <detail-card :loading="loading" :class="detailCardClass">
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
                <use xlink:href="#icon-gedan"></use>
              </svg>
              歌单
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

        <dynamic :dynamic="playList" />

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

        <div style="position:relative;transform: translateY(-3px);">
          <div class="desc" :class="descClass" v-if="playList.description"
               ref="desc">
            简介：
            <span class="desc-content">{{playList.description}}</span>

            <div class="desc-unfold" @click="unfold" v-show="descOverflow">
              <i class="desc-icon" :class="descIconClass"></i>
            </div>
          </div>

          <div class="desc-copy" v-if="playList.description" ref="descCopy">
            简介：
            <span class="desc-content">{{playList.description}}</span>
          </div>
        </div>
      </div>
    </template>
  </detail-card>
</template>

<script>
import Dynamic from 'components/content/miniCom/Dynamic.vue'
import DetailCard from 'components/content/detailCard/DetailCard.vue'

export default {
  components: { Dynamic, DetailCard },
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
      descOverflow: false,
      descUnfold: false
    }
  },
  computed: {
    detailCardClass () {
      return {
        'detail-card': this.descUnfold
      }
    },
    descClass () {
      return {
        'desc-open': this.descUnfold
      }
    },

    descIconClass () {
      return {
        'el-icon-caret-bottom': !this.descUnfold,
        'el-icon-caret-top': this.descUnfold
      }
    }
  },
  methods: {
    unfold () {
      this.descUnfold = !this.descUnfold
    },

    userDetail () {
      this.$router.push('/userDetail/' + this.playList.creator.userId)
    }
  },
  updated () {
    if (this.$refs.desc !== undefined) {
      const desc = this.$refs.desc
      const descCopy = this.$refs.descCopy
      if (descCopy.clientWidth > desc.clientWidth) {
        this.descOverflow = true
        console.log('溢出了')
      }
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
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
  text-align: justify;

  &-copy {
    position: absolute; // 移除文档流
    visibility: hidden; // 不显示
  }

  &-content {
    color: var(--color-gray);
    line-height: 2;
  }

  &-unfold {
    font-size: 20px;
    position: absolute;
    right: 20px;
    top: -5px;
  }

  &-icon {
    vertical-align: middle;
    color: var(--color-gray);
  }

  &-open {
    white-space: initial;
  }
}
</style>