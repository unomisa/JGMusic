<template>
  <div>
    <div>
      <el-button type="text" class="title" size="medium">
        新曲放送
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div class=" recommend-songs">
      <div class="song" v-for="item of recommendSongs" :key="item.id">
        <div class="pic" @click="playMusic(item)">
          <el-image :src="imgUrl(item.picUrl)" fit="fit"
                    @load="picLoad(item)" />

          <el-image class="disc"
                    src="https://static1-music.taihe.com/client/img/f412d65.png"
                    fit="fill" v-show="item.picLoad" />
        </div>

        <div class="song-info">
          <div class="song-name">{{item.name}} <span style="color: #909389"
                  v-if="item.alias.length>0">(
              {{item.alias}} )</span></div>
          <div class="song-artist">
            <span v-for="(artist,index) of item.artists" :key="artist.id">
              {{artist.name}}
              <span v-if="index!==item.artists.length-1">/</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    recommendSongs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      imgSize: '?param=120y120'
    }
  },
  computed: {
    ...mapGetters([
      'currentPlayMusic'
    ]),

    imgUrl () {
      return function (url) {
        return url + this.imgSize
      }
    }

  },
  methods: {
    ...mapMutations([
      'addToPlayList',
      'setListCurrentIndex'
    ]),

    picLoad (item) {
      item.picLoad = true
    },

    // 添加播放的音乐
    playMusic (newPlay) {
      if (newPlay === this.currentPlayMusic) return
      if (this.$music !== undefined) {
        this.$music.pause()
      }
      this.setListCurrentIndex(0)
      this.addToPlayList({ songs: this.recommendSongs, first: newPlay })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: var(--font-size-title);
  margin-bottom: var(--font-size-title);
}

.recommend-songs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.song {
  position: relative;
  flex: 0 30%;
  display: flex;
  font-size: var(--font-size-small);
  margin-bottom: 1rem;

  &-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 2;
  }

  &-name {
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1; /** 显示的行数 **/
    overflow: hidden;
  }

  &-artist {
    color: var(--color-gray);
  }
}

.pic {
  cursor: pointer;
}

.el-image {
  position: relative;
  z-index: 2;
  flex: 0 0 120px;
  height: 120px;
  width: 120px;
  float: left;
  margin-right: 2.5rem;

  &:hover + .disc {
    left: 25px;
  }
}

.disc {
  position: absolute;
  z-index: 1;
  left: 15px;
  transition: left 0.3s;

  &:hover {
    left: 25px;
  }
}
</style>