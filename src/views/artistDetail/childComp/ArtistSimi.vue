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