<template>
  <div>
    <div v-if="!empty" class="artists">
      <div class="artist" v-for="artist in this.simiArtists" :key="artist.id">
        <singer :singer="artist" />
      </div>
    </div>

    <div v-if="empty" class="empty">
      <span>没有找到相似歌手</span>
    </div>
  </div>
</template>

<script>
import singer from 'components/content/preview/singer.vue'

export default {
  components: { singer },
  props: {
    simiArtists: {
      type: [],
      default () {
        return []
      }
    },
    empty: {
      type: Boolean,
      default: false
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

.empty {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
</style>