<template>
  <div>
    <div class="title">
      推荐歌单
      <svg class="icon title-icon" aria-hidden="true">
        <use xlink:href="#icon-gedanshouye"></use>
      </svg>
    </div>
    <list-skeleton :loading="loading">
      <div>
        <div class="lists">
          <song-list class="list" :songList="list" :showTrackCount="false"
                     v-for="(list,index) in personalizedList" :key="index" />
        </div>
      </div>
    </list-skeleton>
  </div>
</template>

<script>
import SongList from 'components/content/preview/SongList'
import ListSkeleton from 'components/content/skeleton/ListsSkeleton.vue'

export default {
  components: { SongList, ListSkeleton },
  props: {
    personalizedList: {
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
@listWidth: 200px;
.list {
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

.title {
  display: inline-block;
  font-size: var(--font-size-title);
  margin: 2rem 0;
  cursor: pointer;

  &:hover {
    color: var(--color-main);
  }
}
</style>