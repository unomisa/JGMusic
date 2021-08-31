<template>
  <div v-bar class="scroll-simi">
    <div class="content">
      <div class="simi-list" v-if="simiList.length>0">
        <div class="title">
          <svg class="icon-simi-song" aria-hidden="true">
            <use xlink:href="#icon-ziyuan20"></use>
          </svg>
          包含这首歌的歌单
        </div>
        <div class="list-content">
          <div class="item" v-for="(item) in simiList" :key="item.id"
               @click="listDetail(item)">
            <div class="img-box">
              <el-image class="img" :src="item.picUrl+'?param=50y50'"
                        fit="fill" />
            </div>
            <div class="list-name">{{item.name}}</div>
          </div>
        </div>
      </div>

      <div class="simi-songs" v-if="simiSongs.length>0">
        <div class="title">
          <svg class="icon-simi-song" aria-hidden="true">
            <use xlink:href="#icon-icon-"></use>
          </svg>
          喜欢这首歌的人也听
        </div>
        <div class="simi-list">
          <div class="item" v-for="(item) in simiSongs" :key="item.id"
               @click="addSong(item)">
            <div class="img-box">
              <el-image class="img" :src="item.picUrl+'?param=50y50'"
                        fit="fill" />
            </div>
            <div class="song-info">
              <div class="song-name">
                {{item.name}}</div>
              <div class="song-artists">
                <span v-for="(artist,index) of item.artists" :key="artist.id">
                  {{artist.name}}
                  <span v-if="index!==item.artists.length-1">/</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    simiSongs: {
      type: Array,
      default () {
        return []
      }
    },
    simiList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    ...mapMutations([
      'addMusic'
    ]),

    addSong (song) {
      this.addMusic(song)
    },

    listDetail (list) {
      this.$router.push('/songList/' + list.id)
    }
  }
}
</script>

<style lang="less" scoped>
.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title {
  margin: 1rem 0;
  padding-left: 5px;
  font-size: 18px;
  font-weight: bold;
}

.img {
  width: 45px;
  height: 45px;
  border-radius: 7px;

  &-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.625rem;
  }
}

.item {
  height: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;

  &:hover {
    border-radius: 7px;
    background-color: rgba(216, 57, 147, 0.1);
  }
}

.scroll-simi {
  height: 100%;
}

.content {
  padding-left: 4rem;
  padding-right: 1rem;
  user-select: none;
  box-sizing: border-box;
}

.list {
  &-name {
    &:extend(.omit);
  }
}

.simi {
  &-list {
  }

  &-songs {
  }

  &-list {
  }
}

.icon {
  &-simi-song {
    height: 1.5rem;
    width: 1.5rem;
    vertical-align: text-bottom;
    color: var(--color-main);
  }
}

.song {
  &-info {
    flex: 1;
    width: 0;
  }

  &-name {
    &:extend(.omit);
    margin-bottom: 0.5rem;
  }

  &-artists {
    &:extend(.omit);
    font-size: 12px;
    height: 1rem;
    color: var(--color-gray);
  }
}
</style>

<style lang="less">
.scroll-simi {
  & > .vb-dragger {
    display: none;
  }

  &:hover > .vb-dragger {
    display: block;
  }
}

.vb-dragger {
  &:active {
    display: block;
  }
}
</style>