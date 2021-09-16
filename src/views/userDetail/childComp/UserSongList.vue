<template>
  <div class="container">
    <div class="title">
      创建的歌单
      <span class="number">({{created.length}})</span>
    </div>

    <list-skeleton :loading="loading">
      <div>
        <div class="song-lists">
          <song-list class="song-list" :songList="list"
                     v-for="(list,index) in created" :key="index" />
        </div>
      </div>
    </list-skeleton>

    <div class="title" v-if="subscribed.length>0">
      收藏的歌单
      <span class="number">({{subscribed.length}})</span>
    </div>

    <list-skeleton :loading="loading">
      <div>
        <div class="song-lists">
          <song-list class="song-list" :songList="list"
                     v-for="(list,index) in subscribed" :key="index" />
        </div>
      </div>
    </list-skeleton>
  </div>
</template>

<script>
import SongList from 'components/content/preview/SongList'
import ListSkeleton from 'components/content/skeleton/ListsSkeleton'

export default {
  components: { SongList, ListSkeleton },
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
    },
    loading: {
      type: Boolean,
      default: true
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

@listWidth: 200px;
.song-list {
  width: @listWidth;
  margin-right: calc((100% - (@listWidth * 5)) / 4);
  margin-bottom: 2rem;

  &:nth-child(5n) {
    margin: 0;
  }

  &s {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
}
</style>