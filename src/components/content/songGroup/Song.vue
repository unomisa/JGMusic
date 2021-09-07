<template>
  <div class="song">
    <slot>
      <el-row :gutter="gutter">
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

        <el-col :span="areas.name">
          {{track.name}}
          <span class="alias" v-if="track.alias">({{track.alias}})</span>
        </el-col>

        <el-col :span="areas.artists" class="artists">
          <span v-for="(artist,index) in track.artists" :key="index">
            <span class="artist"
                  @click.stop="artistDetail(artist)">{{artist.name}}</span>
            <span v-if="index!==track.artists.length-1">&nbsp;/&nbsp;</span>
          </span>
        </el-col>

        <el-col :span="areas.album">
          <span class="album"
                @click.stop="albumDetail">{{track.album.name}}</span>
        </el-col>

        <el-col :span="areas.duration" class="duration">
          {{track.duration}}
        </el-col>
      </el-row>
    </slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LikeSong from '../miniCom/LikeSong.vue'

export default {
  components: { LikeSong },
  props: {
    areas: {
      type: Object,
      default () {
        return {
          others: 3,
          name: 6,
          artists: 7,
          album: 5,
          duration: 3
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
  computed: {
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
    }
  },
  methods: {
    // * 事件处理
    artistDetail (artist) {
      this.$router.push('/artistDetail/' + artist.id)
    },

    albumDetail () {
      this.$router.push('/album/' + this.track.album.id)
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
    transform: translateY(2px);
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
</style>