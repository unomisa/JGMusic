<template>
  <div class="song">
    <slot>
      <el-row :gutter="50">
        <el-col :span="3" class="other">
          <span class="other-index" v-if="!playing">
            {{fomtIndex}}
          </span>

          <span v-if="playing">
            <svg class="icon other-playing" aria-hidden="true">
              <use xlink:href="#icon-shengyin"></use>
            </svg>
          </span>

          <span class="other-love">
            <svg class="icon other-loveicon" aria-hidden="true" v-if="!ifLike"
                 @click.stop="like">
              <use xlink:href="#icon-aixin"></use>
            </svg>

            <svg class="icon other-loveicon" aria-hidden="true" v-if="ifLike"
                 @click.stop="like">
              <use xlink:href="#icon-aixin1-copy"></use>
            </svg>
          </span>
        </el-col>

        <el-col :span="showDetail ? 6 :18">
          {{track.name}}
          <span class="alias" v-if="track.alias">({{track.alias}})</span>
        </el-col>

        <el-col :span="7" class="artists" v-if="showDetail">
          <span v-for="(artist,index) in track.artists" :key="index">
            <span class="artist"
                  @click.stop="artistDetail(artist)">{{artist.name}}</span>
            <span v-if="index!==track.artists.length-1">&nbsp;/&nbsp;</span>
          </span>
        </el-col>

        <el-col :span="5" v-if="showDetail">
          <span class="album"
                @click.stop="albumDetail">{{track.album.name}}</span>
        </el-col>

        <el-col :span="3" class="duration">{{track.duration}}</el-col>
      </el-row>
    </slot>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { likeSong } from 'network/common'

export default {
  props: {
    track: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    },
    showDetail: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    ...mapGetters([
      'currentPlayMusic'
    ]),

    fomtIndex () {
      if (this.index < 10) {
        return '0' + this.index
      } else {
        return this.index
      }
    },

    playing () {
      return this.track.state.currentBroadcast
    },

    ifLike () {
      if ('likeListSet' in this.loginUser) {
        return this.loginUser.likeListSet.has(this.track.id)
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations([
      'setLikeListSet',
      'addLikeList',
      'delLikeList'
    ]),

    // * 事件处理
    artistDetail (artist) {
      this.$router.push('/artist/' + artist.id)
    },

    albumDetail () {
      this.$router.push('/album/' + this.track.album.id)
    },

    like () {
      likeSong(this.track.id, !this.ifLike).then(res => {
        console.log('喜欢后结果为：', res)
        if (res !== undefined && res.code === 200) {
          if (!this.ifLike) {
            this.addLikeList(this.track.id)
            this.$notify({
              position: 'top-left',
              title: '已添加至我喜欢的音乐',
              offset: 90,
              type: 'success',
              duration: 2000
            })
          } else {
            this.delLikeList(this.track.id)
            this.$notify({
              position: 'top-left',
              title: '已取消喜欢',
              offset: 90,
              type: 'success',
              duration: 2000
            })
          }
        } else {
          this.$notify({
            position: 'top-left',
            title: '该歌曲无法添加至喜欢列表',
            offset: 90,
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.song {
  height: 3rem;
  line-height: 3rem;
  user-select: none;
  background-color: white;

  &:hover {
    background-color: rgba(216, 57, 147, 0.1) !important;
  }

  &:nth-child(2n) {
    background-color: #f9f9f9;
  }
}

.el-row {
  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.alias {
  color: var(--color-light-gray);
}

.other {
  padding-left: 40px !important;
  color: var(--color-gray);

  &-index {
  }

  &-playing {
    font-size: 20px;
    transform: translateY(2px);
    color: var(--color-main);
  }

  &-love {
    position: absolute;
    left: 80px;

    &icon {
      cursor: pointer;
      font-size: 18px;
      transform: translateY(1px);
    }
  }
}

.duration {
  color: var(--color-light-gray);
}

.album {
  color: var(--color-gray);
  cursor: pointer;

  &:hover {
    color: black;
  }
}

.artists {
  color: #606266;
}

.artist {
  cursor: pointer;

  &:hover {
    color: black;
  }
}
</style>