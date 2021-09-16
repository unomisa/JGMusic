<template>
  <div>
    <lists-skeleton :loading="loading" :listCount="25">
      <div>
        <div class="song-lists">
          <song-list class="song-list" :songList="list"
                     v-for="(list,index) in lists" :key="index" />
        </div>
      </div>
    </lists-skeleton>
  </div>
</template>

<script>
import SongList from 'components/content/preview/SongList'
import ListsSkeleton from 'components/content/skeleton/ListsSkeleton.vue'

export default {
  components: { SongList, ListsSkeleton },
  props: {
    lists: {
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