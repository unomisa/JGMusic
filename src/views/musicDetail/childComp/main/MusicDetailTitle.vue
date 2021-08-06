<template>
  <div class="title">
    <div class="title-name">{{currentPlayMusic.name}}</div>
    <div class="title-alias">{{currentPlayMusic.alias}}</div>
    <div class="title-artists">
      <span v-for="(artist,index) of currentPlayMusic.artists" :key="artist.id">
        {{artist.name}}
        <span v-if="index!==currentPlayMusic.artists.length-1">/</span>
      </span>
      <span>
        ─ {{currentPlayMusic.album.name}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'currentPlayMusic',
      'isExistCurrentPlayMusic'
    ])
  }
}
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  padding-bottom: 1rem;

  &-name {
    color: #333333;
    font-size: var(--font-size-title);
  }

  &-alias {
    color: var(--color-gray);
  }

  &-artists {
    color: var(--color-gray);
  }
}
</style>