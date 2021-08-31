<template>
  <div class="artists">
    <div class="artist" v-for="artist in this.simiArtists" :key="artist.id">
      <singer :singer="artist" />
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
    }
  }
}
</script>

<style lang="less" scoped>
.artists {
  display: flex;
  flex-wrap: wrap;
}

.artist {
  flex: 0 20%;
  margin-bottom: 2rem;
}
</style>