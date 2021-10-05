<template>
  <div v-bar :style="suggestHeight">
    <div>
      <div class="suggest">

        <div v-show="songs.length > 0">
          <div class="type">
            <svg class="icon type-icon" aria-hidden="true">
              <use xlink:href="#icon-yinle"></use>
            </svg>
            单曲
          </div>

          <div class="suggest-list">
            <div class="suggest-item" v-for="song in songs" :key="song.id"
                 @click="play(song)">
              <span>{{song.name}}</span>
              <span class="tns" v-if="song.transName">
                ({{song.transName}})</span>
              <span class="alias" v-if="!song.transName && song.alias">
                ({{song.alias}})</span>
              <span> - </span>
              <span v-for="(artist,index) in  song.artists" :key="artist.id">
                <span>{{artist.name}}</span>
                <span v-if="index !== song.artists.length-1"> /
                </span>
              </span>
            </div>
          </div>
        </div>

        <div v-if="artists.length > 0">
          <div class="type">
            <svg class="icon type-icon" aria-hidden="true">
              <use xlink:href="#icon-geshou"></use>
            </svg>
            歌手
          </div>
          <div class="suggest-list">
            <div class="suggest-item" v-for="artist in artists" :key="artist.id"
                 @click="aritstDetail(artist)">
              <span>{{artist.name}}</span>
            </div>
          </div>
        </div>

        <div v-if="albums.length > 0">
          <div class="type">
            <svg class="icon type-icon" aria-hidden="true">
              <use xlink:href="#icon-zhuanji"></use>
            </svg>
            专辑
          </div>
          <div class="suggest-list">
            <div class="suggest-item" v-for="album in albums" :key="album.id"
                 @click="albumDetail(album)">
              <span>{{album.name}}</span>
              <span> - </span>
              <span>{{album.artist.name}}</span>
            </div>
          </div>
        </div>

        <div v-if="songLists.length > 0">
          <div class="type">
            <svg class="icon type-icon" aria-hidden="true">
              <use xlink:href="#icon-gedanshouye"></use>
            </svg>
            歌单
          </div>
          <div class="suggest-list">
            <div class="suggest-item" v-for="list in songLists" :key="list.id"
                 @click="listDetail(list)">
              <span>{{list.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { SuggestSong } from 'network/common/search'
import { getMusicDetail } from 'network/pageRequest/musicdetail'
import { Music } from 'network/common'
import { musicBean } from 'common/mixin'

export default {
  mixins: [musicBean],
  props: {
    suggest: {
      type: Object,
      default () {
        return {}
      }
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    suggestHeight () {
      return {
        height: this.height + 'px'
      }
    },

    songs () {
      if ('songs' in this.suggest) {
        return this.suggest.songs.map(song => new SuggestSong(song))
      } else {
        return []
      }
    },

    artists () {
      if ('artists' in this.suggest) {
        return this.suggest.artists
      } else {
        return []
      }
    },

    albums () {
      if ('albums' in this.suggest) {
        return this.suggest.albums
      } else {
        return []
      }
    },

    songLists () {
      if ('playlists' in this.suggest) {
        return this.suggest.playlists
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapMutations([
      'addMusic'
    ]),

    close () {
      this.$emit('close')
    },

    play (song) {
      // 请求歌曲详情并添加至播放列表
      getMusicDetail(song.id).then(res => {
        const music = new Music({
          ...this.musicBean(res.songs[0]),
          cp: res.privileges[0].cp
        })
        this.addMusic(music)
      })

      this.close()
    },

    aritstDetail (aritst) {
      this.$router.push('/artistDetail/' + aritst.id)
      this.close()
    },

    albumDetail (album) {
      this.$router.push('/album/' + album.id)
      this.close()
    },

    listDetail (list) {
      this.$router.push('/songList/' + list.id)
      this.close()
    }
  }
}
</script>

<style lang="less" scoped>
.suggest {
  line-height: 2;
  font-size: 13px;

  &-list {
  }

  &-item {
    padding-left: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      background-color: rgba(216, 57, 147, 0.1);
    }
  }
}

.type {
  font-weight: bold;
  color: var(--color-main);
  background-color: rgba(216, 57, 147, 0.05);

  &-icon {
    width: 20px;
  }
}

.alias,
.tns {
  color: var(--color-light-gray);
}
</style>