<template>
  <div>
    <div class="title">全球榜</div>
    <list-skeleton :listCount="30" :loading="loading">
      <div class="lists">
        <song-list class="list" v-for="list in globalList" :key="list.id"
                   :songList="list" :showTrackCount="false" :rank="true">

        </song-list>
      </div>
    </list-skeleton>
  </div>
</template>

<script>
import SongList from 'components/content/preview/SongList.vue'
import ListSkeleton from 'components/content/skeleton/ListsSkeleton.vue'

export default {
  components: { SongList, ListSkeleton },
  props: {
    globalList: {
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
.title {
  font-size: 28px;
  font-weight: bold;
  margin: 30px 0;
}

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
</style>