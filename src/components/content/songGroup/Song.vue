<template>
  <div class="song" @dblclick="play" ref="song">
    <slot>
      <el-row :gutter="gutter" @contextmenu.native.prevent="context">
        <el-col :span="areas.others" class="other">

          <span class="other-startbox" :style="{width: indexWidth + 'px'}">
            <span class="other-index" v-if="!playing">
              {{fomtIndex}}
            </span>

            <span v-if="playing">
              <svg class="icon other-playing" aria-hidden="true">
                <use xlink:href="#icon-shengyin"></use>
              </svg>
            </span>
          </span>

          <span v-if="'rank' in track" class="rank-slot">
            <span class="rankicon ratio"
                  v-if="other(track.rank,index-1)==='ratio'">
              <span v-if="track.rank.ratio<10">&nbsp;&nbsp;</span>
              <span v-if="track.rank.ratio<100">&nbsp;</span>
              {{track.rank.ratio}}%
            </span>
            <span class="rankicon hold" v-if="other(track.rank,index-1)==='-'">
              <i class="el-icon-minus"></i>
            </span>
            <span class="rankicon up" v-if="other(track.rank,index-1)==='up'">
              <i class="el-icon-caret-top"></i>
            </span>
            <span class="rankicon down"
                  v-if="other(track.rank,index-1)==='down'">
              <i class="el-icon-caret-bottom"></i>
            </span>
            <span class="rankicon new" v-if="other(track.rank,index-1)==='new'">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xinde"></use>
              </svg>
            </span>
          </span>

          <like-song class="other-like" :id="track.id" v-if="showLike" />
        </el-col>

        <el-col :span="areas.name"
                :class="{nocp: isMusic && track.state.cp===0}">
          <span>{{track.name}} </span>
          <span class="alias" v-if="track.tns"
                :class="{nocp: isMusic && track.state.cp===0}">({{track.tns}})</span>
          <span class="alias" v-if="track.alias && !track.tns"
                :class="{nocp: isMusic && track.state.cp===0}">({{track.alias}})</span>
        </el-col>

        <el-col :span="areas.artists" class="artists">
          <span v-for="(artist,index) in track.artists" :key="index">
            <span class="artist" @click.stop="artistDetail(artist)">
              <span v-if="artist.name">{{artist.name}}</span>
              <span v-if="!artist.name">未知歌手</span>
            </span>
            <span v-if="index!==track.artists.length-1">&nbsp;/&nbsp;</span>
          </span>
        </el-col>

        <el-col :span="areas.album">
          <span class="album" @click.stop="albumDetail"
                v-if="track.album.name">{{track.album.name}}</span>
          <span v-if="!track.album.name" class="album">未知专辑</span>
        </el-col>

        <el-col :span="areas.duration" class="duration">
          {{track.duration}}
        </el-col>

        <el-col :span="areas.pop" v-if="areas.pop" class="pop">
          <el-progress class="progress" :percentage="track.pop"
                       :show-text="false"></el-progress>
        </el-col>

        <song-context :x.sync="context_x" :y.sync="context_y" :track="track"
                      :index="index-1" :showContext.sync="showContext"
                      v-if="showContext" />

      </el-row>

    </slot>
  </div>
</template>

<script>
import LikeSong from 'components/content/miniCom/LikeSong.vue'
import SongContext from './SongContext.vue'

import { mapGetters } from 'vuex'

export default {
  components: { LikeSong, SongContext },
  props: {
    areas: {
      type: Object,
      default () {
        return {
          others: 3,
          name: 6,
          artists: 7,
          album: 5,
          duration: 3,
          pop: 0
        }
      }
    },
    indexWidth: {
      type: Number,
      default: 40
    },
    gutter: {
      type: Number,
      default: 30
    },
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
    showLike: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showContext: false,
      context_x: 0,
      context_y: 0
    }
  },
  computed: {
    ...mapGetters([
      'currentPlayMusic',
      'playListMap'
    ]),

    fomtIndex () {
      if (this.index < 10) {
        return '0' + this.index
      } else {
        return this.index
      }
    },

    playing () {
      // console.log('计算是否播放')
      if (this.track.state.currentBroadcast) {
        // if (this.$refs.song) {
        //   this.$emit('playSong', this.$refs.song)
        // } else {
        //   // console.log('song还没有挂载s')
        // }
        return true
      } else {
        return false
      }
      // return this.track.id === this.currentPlayMusic.id // 这种方法性能太差,会导致切换歌曲全部都重新计算
    },

    other () {
      return function (rank, index) {
        if ('ratio' in rank) {
          return 'ratio'
        } else if ('lr' in rank) {
          if (rank.lr > index) {
            return 'up'
          } else if (rank.lr < index) {
            return 'down'
          } else {
            return '-'
          }
        } else {
          return 'new'
        }
      }
    },

    isMusic () {
      return Object.keys(this.track).length > 0
    }
  },
  methods: {
    // * 事件处理
    artistDetail (artist) {
      if (artist.name === '未知歌手' || !artist.name) return
      this.$router.push('/artistDetail/' + artist.id)
    },

    albumDetail () {
      this.$router.push('/album/' + this.track.album.id)
    },

    play (event) {
      if (this.isMusic && this.track.state.cp === 0) {
        this.$notify.topleft('音乐暂无版权', 'error')
        event.stopImmediatePropagation() // 阻止其它click事件处理
      }
    },

    context (event) {
      if (event.button === 2) { // 如果为右键
        this.showContext = true // 显示上下文菜单
        this.context_x = event.clientX // 传递点击位置
        this.context_y = event.clientY
      }
    }

  }
}
</script>

<style lang="less" scoped>
.song {
  overflow: hidden;
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
  height: inherit;
  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.alias {
  color: var(--color-light-gray);
}

.nocp {
  color: #d9cad9;
}

.other {
  color: var(--color-gray);
  min-width: 100px;

  &-startbox {
    display: inline-block;
    text-align: right;
  }

  &-index {
    text-align: right;
    display: inline-block;
    // width: 45px;
  }

  &-playing {
    font-size: 20px;
    // transform: translateY(2px);
    color: var(--color-main);
  }

  &-like {
    // position: absolute;
    // left: 80px;
    margin-left: 14px;
    transform: translateY(1px);
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
  color: var(--color-gray);
}

.artist {
  cursor: pointer;

  &:hover {
    color: black;
  }
}

.rankicon {
  display: inline-block;
  margin-left: 14px;
  // font-size: 20px;
  // width: 60px;
}

.ratio {
  font-size: 14px;
}

.hold,
.new,
.up,
.down {
  font-size: 20px;
}

.new {
  color: #00ead3;
}

.up {
  color: #fd7096;
}

.down {
  color: #3fdbf0;
}

.pop {
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem !important;
}
</style>