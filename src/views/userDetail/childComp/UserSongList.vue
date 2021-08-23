<template>
  <div class="container">
    <div class="title">
      创建的歌单<span class="number">({{created.length}})</span>
    </div>

    <div class="song-lists">
      <song-list class="song-list" :songList="list" v-for="list in created"
                 :key="list.coverImgUrl" />
    </div>

    <div class="title">收藏的歌单
      <span class="number">({{subscribed.length}})</span>
    </div>

    <div class="song-lists">
      <song-list class="song-list" :songList="list" v-for="list in subscribed"
                 :key="list.coverImgUrl" />
    </div>
  </div>
</template>

<script>
import SongList from 'components/content/songList/SongList'

export default {
  components: { SongList },
  props: {
    created: {
      type: Array,
      default () {
        return []
      }
    },
    subscribed: {
      type: Array,
      default () {
        return []
      }
    }
  }
}

</script>

<style lang="less" scoped>
.container {
  margin-top: 3rem;
}

.number {
  font-size: 18px;
  letter-spacing: 1px;
}

.title {
  font-size: 28px;
}

.song-list {
  height: 250px;
  width: 0;
  flex: 20% 0;
  margin-bottom: 2rem;

  &s {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
}
</style>