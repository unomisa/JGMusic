<template>
  <div class="recommend-songs">
    <div class="song" v-for="item of recommendSongs" :key="item.id">

      <div class="pic" @click="playMusic(item)">
        <el-image :src="item.picUrl" fit="fit" @load="picLoad(item)" />

        <el-image class="disc"
                  src="https://static1-music.taihe.com/client/img/f412d65.png"
                  fit="fill" v-show="item.picLoad" />
      </div>

      <div class="song-info">
        <div class="song-name">{{item.name}} <span style="color: #909389"
                v-if="alias(item).length>0">(
            {{alias(item)}} )</span></div>
        <div class="song-artist">{{artistsName(item)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getSongUrl } from 'network/common'

export default {
  props: {
    recommendSongs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    artistsName () {
      return function (item) {
        const artistName = []
        item.artists.forEach(artist => {
          artistName.push(artist.name)
        })
        return artistName.join(' / ')
      }
    },
    alias () {
      return function (item) {
        const aliasName = []
        item.alias.forEach(item => {
          aliasName.push(item)
        })
        return aliasName.join(' / ')
      }
    }
  },
  methods: {
    ...mapMutations([
      'switchMusic'
    ]),

    picLoad (item) {
      item.picLoad = true
    },

    playMusic (item) {
      getSongUrl(item.id).then(res => {
        const music = {
          id: item.id,
          title: item.name,
          alias: this.alias(item),
          artist: this.artistsName(item),
          pic: item.picUrl,
          src: res.data[0].url
        }
        this.switchMusic(music)
      })
    }
  }
}
</script>

<style lang="less" scoped>
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