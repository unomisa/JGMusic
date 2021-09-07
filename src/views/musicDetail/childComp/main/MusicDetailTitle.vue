<template>
  <div class="title" v-if="isExistCurrentPlayMusic">
    <div class="title-name">{{currentPlayMusic.name}}</div>
    <div class="title-alias">{{currentPlayMusic.alias}}</div>
    <div class="title-artists">
      <span v-for="(artist,index) of currentPlayMusic.artists" :key="artist.id">
        <span class="artist"
              @click="artistDetail(artist)">{{artist.name}}</span>
        <span class="separator"
              v-if="index!==currentPlayMusic.artists.length-1">/</span>
      </span>
      <span>
        ─
        <span class="album"
              @click="albumDetail">{{currentPlayMusic.album.name}}</span>
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
  },
  methods: {
    artistDetail (artist) {
      this.$router.push('/artistDetail/' + artist.id)
    },

    albumDetail () {
      this.$router.push('/album/' + this.currentPlayMusic.album.id)
    }
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

.separator {
  padding: 0 5px;
}

.artist,
.album {
  cursor: pointer;

  &:hover {
    color: black;
  }
}
</style>