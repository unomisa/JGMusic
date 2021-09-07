<template>
  <div>
    <div class="title">官方榜</div>
    <top-list-skeleton :loading="loading">
      <div>
        <div class="list" v-for="list in topList" :key="list.id">
          <div class="list-left" @click="rankDetail(list)">
            <el-image class="cover" :src="list.coverImgUrl + '?param=300y300'"
                      fit="fill" />
            <div class="play">
              <svg class="icon play-icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
            </div>

            <div class="updatetime">{{updateTime(list.updateTime)}}更新</div>
          </div>
          <div class="list-right">
            <song class="toplist-song" :track="track"
                  v-for="(track,index) in list.tracks" :key="index"
                  :index="index+1" :areas="songAreas" :gutter="0"
                  :showLike="false" :indexWidth='30'
                  @click.native="play(track)">
            </song>
            <div class="more" @click="rankDetail(list)">查看全部 ></div>
          </div>
        </div>
      </div>
    </top-list-skeleton>
  </div>
</template>

<script>
import Song from 'components/content/songGroup/Song.vue'
import TopListSkeleton from '../skeleton/TopListSkeleton.vue'

import { mapMutations } from 'vuex'

export default {
  components: { Song, TopListSkeleton },
  props: {
    topList: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    songAreas () {
      return {
        others: 2,
        name: 7,
        artists: 14,
        album: 0,
        duration: 0
      }
    },

    updateTime () {
      return function (updateTime) {
        const date = new Date(updateTime)
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return `${month}月${day}日`
      }
    }
  },
  methods: {
    ...mapMutations([
      'addMusic'
    ]),

    rankDetail (list) {
      this.$router.push({
        path: '/songList/' + list.id,
        query: {
          type: 'rank'
        }
      })
    },

    play (music) {
      this.addMusic(music)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 28px;
  font-weight: bold;
  margin: 30px 0;
}

.cover {
  width: 250px;
  height: 250px;
  border-radius: 10px;
}

.list {
  display: flex;
  margin-bottom: 80px;

  &-left {
    flex: 250px 0;
    position: relative;
    margin-right: 50px;
    cursor: pointer;

    &:hover > .play {
      opacity: 0.9;
    }
  }

  &-right {
    position: relative;
    flex: 3;
    display: flex;
    flex-direction: column;
  }
}

.more {
  position: absolute;
  left: 0;
  bottom: -30px;
  color: var(--color-gray);
  cursor: pointer;

  &:hover {
    color: black;
  }
}

.toplist-song {
  flex: 1;

  &:nth-child(2n + 1) {
    background-color: #f9f9f9;
  }

  &:nth-child(2n) {
    background-color: white;
  }
}

.play {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  height: 80px;
  width: 80px;
  border-radius: 100%;
  background-color: #fdfcfa;
  opacity: 0;
  transition: opacity 0.5s;

  &-icon {
    color: var(--color-main);
    transform: translateX(3px);
  }
}

.updatetime {
  position: absolute;
  left: 50%;
  top: 65%;
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
  letter-spacing: 2px;
}
</style>

<style lang="less">
.toplist-song {
  & .artists {
    text-align: right;
  }

  & .other {
    display: flex;

    & > .rank-slot {
      flex: 1;

      & .rankicon {
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-left: 0 !important;
      }
    }
  }
}
</style>