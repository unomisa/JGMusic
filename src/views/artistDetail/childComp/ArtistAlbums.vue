<template>
  <div class="albums">
    <div class="album" v-for="album in albums" :key="album.id">
      <div class="album-left">
        <div class="album-img" @click="albumDetail(album)">
          <el-image class="cover" :src="album.picUrl + '?param=200y200'"
                    fit="fill" />
          <div class="disc">
            <el-image style="height:100%;width:100%;"
                      src="https://static1-music.taihe.com/client/img/f412d65.png "
                      fit="fill" />
          </div>
        </div>
        <div class="publish-time">{{album.publishTime}}</div>
      </div>
      <div class="album-right">
        <div class="name">{{album.name}}</div>
        <song v-for="(song,index) in songsPart(album.songs)" :key="song.id"
              :track="song" :index="index+1" :areas='areas' :indexWidth="30"
              :gutter="20" @dblclick.native="play(album.songs,index)" />

        <song class="more" @click.native="albumDetail(album)"
              v-if="album.songs.length>10">
          查看专辑{{album.songs.length}}首歌曲 >
        </song>
      </div>
    </div>
  </div>
</template>

<script>
import Song from 'components/content/songGroup/Song.vue'

import { mapMutations } from 'vuex'

export default {
  components: { Song },
  props: {
    albums: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    songsPart () {
      return function (songs) {
        if (songs.length > 10) {
          const arr = Array.from(songs)
          arr.length = 10
          return arr
        } else {
          return songs
        }
      }
    },
    areas () {
      return {
        others: 3,
        name: 18,
        artists: 0,
        album: 0,
        duration: 3
      }
    }
  },
  methods: {
    ...mapMutations([
      'addToPlayList'
    ]),

    albumDetail (album) {
      this.$router.push('/album/' + album.id)
    },

    play (songs, index) {
      this.addToPlayList({
        playList: songs,
        index: index
      })
    }
  }
}
</script>

<style lang="less" scoped>
.album {
  display: flex;
  margin-bottom: 50px;

  &-left {
    position: relative;
    flex: 2;
    width: 0;
  }

  &-right {
    position: relative;
    flex: 5;
    width: 0;
  }

  &-img {
    cursor: pointer;

    &:hover > .disc {
      left: 30px;
    }
  }
}

.cover {
  position: relative;
  z-index: 1;
  height: 200px;
  width: 200px;
  border-radius: 5px;
}

.disc {
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 0;
  height: 200px;
  width: 200px;
  transition: left 0.3s;
}

.publish-time {
  margin-top: 0.5rem;
  color: #a0a0a0;
}

.name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.more {
  padding: 0 20px;
  text-align: right;
  color: var(--color-main);
  cursor: pointer;
}
</style>
