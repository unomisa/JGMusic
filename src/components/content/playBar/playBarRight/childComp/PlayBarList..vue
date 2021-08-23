<template>
  <div>
    <el-tooltip popper-class="tooltip" effect="light" content="播放列表"
                placement="top-end" :visible-arrow="false"
                :disabled="isShowList">
      <svg class="icon list" aria-hidden="true" @click="openList">
        <use xlink:href="#icon-yinleliebiao-"></use>
      </svg>
    </el-tooltip>

    <transition name="el-zoom-in-top">
      <el-card class="box-card" v-show="isShowList"
               body-style="padding-right:0;">
        <div class="title">
          <el-row type="flex" align="middle">
            <el-col :span="9" :offset="0">
              <i class="el-icon-headset" /> 播放列表
            </el-col>

            <el-col :span="5" :offset="0" class="count">
              共{{playListLength}}首 <i class="el-icon-collection-tag" />
            </el-col>

            <el-col :span="6" :offset="4" class="clear">
              <i class="el-icon-delete" /> 清空列表
            </el-col>
          </el-row>
        </div>

        <div v-bar class="scroll-area">
          <div>
            <div class="song" v-for="(song,index) of playList" :key="song.id"
                 @dblclick="selectMusic(index)"
                 :class="{'song-play': song.state.currentBroadcast}">
              <div class="song-title-box">
                <span class="song-title">{{song.name}}</span>
                <span class="song-alias" v-if="song.alias.length>0">(
                  {{song.alias}}
                  )</span>
              </div>

              <div class="song-artist">
                <span v-for="(artist,index) of song.artists" :key="artist.id">
                  {{artist.name}}
                  <span v-if="index!==song.artists.length-1">/</span>
                </span>
              </div>

              <div class="song-duration">
                {{song.duration}}
              </div>
            </div>
          </div>

        </div>

      </el-card>
    </transition>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      isShowList: false
    }
  },
  computed: {
    ...mapState([
      'playMusic',
      'playList'
    ]),
    playListLength () {
      return this.playList.length
    }
  },
  methods: {
    ...mapMutations([
      'setListCurrentIndex'
    ]),

    openList () {
      this.isShowList = !this.isShowList
    },
    selectMusic (index) {
      this.setListCurrentIndex(index)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-area {
  height: 440px;
}

.list {
  height: 30px;
  width: 30px;
  cursor: pointer;
}

.title {
  font-size: var(--font-size-large);
  margin-bottom: 1rem;
  padding-right: 20px;
}

.count {
  font-size: 12px;
  color: var(--color-gray);
}

.el-icon-collection-tag {
  vertical-align: bottom;
}

.clear {
  font-size: var(--font-size-small);
  color: #409eff;
  cursor: pointer;
  text-align: right;
}

.box-card {
  position: fixed;
  bottom: calc(var(--play-bar-height) + 1rem);
  right: 1rem;
  width: 400px;
  height: 500px;
  // overflow-y: auto;
}

.ellipsis {
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1; /** 显示的行数 **/
  overflow: hidden;
}

.song {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-small);
  line-height: 3;
  padding-right: 20px;
  user-select: none;

  &:nth-child(2n) {
    background-color: #fbfbfb;
  }

  &:hover {
    background-color: rgba(216, 57, 147, 0.1);
  }

  &-title {
    color: #333333;
    &-box {
      &:extend(.ellipsis);
      width: 150px;
    }
  }

  &-alias {
    color: var(--color-light-gray);
  }

  &-artist {
    &:extend(.ellipsis);
    color: var(--color-gray);
    width: 100px;
  }

  &-play {
    & * {
      color: var(--color-main);
      font-size: 14px !important;
    }
  }

  &-duration {
    font-size: 12px;
    letter-spacing: 2px;
  }
}
</style>