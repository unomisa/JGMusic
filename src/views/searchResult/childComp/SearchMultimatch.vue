<template>
  <div v-if="albums.length !== 0 || artists.length !== 0">
    <div class="title">最佳匹配</div>
    <div class="result">
      <div class="result-item" v-for="(artist) in  artists" :key=artist.id
           @click="artistDetail(artist)">
        <div class="result-item-left">
          <el-image class="cover" :src="artist.picUrl + '?param=100y100'"
                    fit="fill" />
        </div>
        <div class="result-item-right">
          <div class="artist">
            <span class="name">歌手：{{artist.name}}</span>
            <span class="alias"
                  v-if="artist.alias.length>0">（{{artist.alias[0]}}）</span>
          </div>
        </div>
      </div>

      <div class="result-item" v-for="(album) in  albums" :key=album.id
           @click="albumDetail(album)">
        <div class="result-item-left">
          <el-image class="cover" :src="album.picUrl + '?param=100y100'"
                    fit="fill" />

          <div class="disc">
            <el-image style="height:100%;width:100%;"
                      src="https://static1-music.taihe.com/client/img/f412d65.png "
                      fit="fill" />
          </div>
        </div>
        <div class="result-item-right">
          <div class="name">专辑：{{album.name}}</div>
          <div class="artist artist-album">{{album.artist.name}}</div>
        </div>
      </div>

      <div class="result-item" v-for="(concert) in  concerts" :key=concert.id
           @click="concertDetail(concert)">
        <div class="result-item-left">
          <el-image class="cover" :src="concert.cover + '?param=100y100'"
                    fit="fill" />
        </div>
        <div class="result-item-right">
          <div class="concert-title">
            <span>演出：</span>
            {{concert.title}}
          </div>
          <div>
            <span class="date">
              {{formatDate(concert.time[0])}}
            </span>
          </div>
        </div>
      </div>

      <div class="result-item" v-for="item in  orpheus" :key=item.id
           @click="orpheusDetail(item)">
        <div class="result-item-left">
          <el-image class="cover" :src="item.picUrl + '?param=100y100'"
                    fit="fill" />
        </div>
        <div class="result-item-right">
          <div class="orpheus-content">
            <span>周边：</span>
            <span>{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    albums () {
      if ('album' in this.result) {
        return this.result.album
      } else {
        return []
      }
    },
    artists () {
      if ('artist' in this.result) {
        return this.result.artist
      } else {
        return []
      }
    },

    concerts () {
      if ('concert' in this.result) {
        return this.result.concert
      } else {
        return []
      }
    },

    orpheus () {
      if ('orpheus' in this.result) {
        return this.result.orpheus
      } else {
        return []
      }
    }
  },
  methods: {
    artistDetail (artist) {
      this.$router.push('/artistDetail/' + artist.id)
    },

    albumDetail (album) {
      this.$router.push('/album/' + album.id)
    },

    concertDetail (concert) {
      window.open(concert.url)
    },

    formatDate (timestamp) {
      const date = new Date(timestamp)
      return date.getMonth() + 1 + '月' + date.getDate() + '日'
    },

    orpheusDetail (orpheus) {
      window.open(orpheus.resourceUrl)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-weight: 600;
  margin: 1rem 0;
}

.result {
  display: flex;
  flex-wrap: wrap;

  &-item {
    flex: 32% 0;
    display: flex;
    height: 100px;
    background-color: #f4f4f4;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 2%;
    margin-bottom: 20px;

    &-left {
      position: relative;
      flex: 100px 0;
      width: 0;
      margin-right: 30px;
    }

    &-right {
      flex: 4;
      width: 0;
      padding-right: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 2;
    }

    &:hover .disc {
      left: 20px;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

.cover {
  position: relative;
  z-index: 1;
  width: 100px;
  // height: 100%;
  height: 100px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.disc {
  position: absolute;
  top: 0;
  left: 15px;
  z-index: 0;
  height: 100px;
  width: 100px;
  transition: left 0.3s;
}

.artist {
  &-album {
    font-size: 14px;
    color: var(--color-gray);
  }
}

.name,
.artist,
.concert-title,
.orpheus-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.alias {
  color: var(--color-light-gray);
}

.date {
  color: var(--color-light-gray);
  font-size: 12px;
}
</style>