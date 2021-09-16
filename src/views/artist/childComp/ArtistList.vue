<template>
  <lists-skeleton :loading="loading" :listCount="30">
    <div>
      <div class="artists">
        <div class="artist" v-for="artist in artists" :key="artist.id">
          <singer :singer="artist" />
        </div>
      </div>
    </div>
  </lists-skeleton>
</template>

<script>
import Singer from 'components/content/preview/singer.vue'
import ListsSkeleton from 'components/content/skeleton/ListsSkeleton.vue'

export default {
  components: { Singer, ListsSkeleton },
  props: {
    artists: {
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
.artists {
  display: flex;
  flex-wrap: wrap;
}

@listWidth: 200px;
.artist {
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