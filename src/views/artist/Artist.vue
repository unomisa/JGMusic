<template>
  <div class="container">
    <div class="content">
      <artist-tags :area.sync="area" :type.sync="type"
                   :initial.sync="initial" />
      <artist-list :artists="artists" :loading='artistsLoading' />
    </div>
  </div>
</template>

<script>
import ArtistTags from './childComp/ArtistTags.vue'
import ArtistList from './childComp/ArtistList.vue'

import { getArtists } from 'network/pageRequest/artist'
import { Artist } from 'network/common'
import { infiniteScroll } from 'common/mixin'
import { mapMutations } from 'vuex'

export default {
  mixins: [infiniteScroll],
  components: { ArtistTags, ArtistList },
  data () {
    return {
      area: '-1',
      type: '-1',
      initial: '-1',
      limit: 30,
      offset: 0,

      artists: [],
      artistsLoading: true
    }
  },
  methods: {
    ...mapMutations([
      'setInfiniteScrollDisabled'
    ]),

    reset () {
      this.artists = []
      this.offset = 0
      this.artistsLoading = true
    },

    getArtists () {
      getArtists(this.limit, this.offset, this.initial, this.type, this.area).then(res => {
        if (res.code === 200) {
          console.log('歌手列表为：', res)
          res.artists.forEach(artist => {
            this.artists.push(new Artist(artist))
          })
          this.artistsLoading = false
          if (res.more) {
            this.offset += this.limit
            this.setInfiniteScrollDisabled(false)
          } else {
            this.setInfiniteScrollDisabled(true)
          }
        }
      })
    }
  },
  created () {
    this.getArtists()
  },
  watch: {
    area () {
      this.reset()
      this.getArtists()
    },

    type () {
      this.reset()
      this.getArtists()
    },

    initial () {
      this.reset()
      this.getArtists()
    }
  },
  activated () {
    this.setInfiniteScrollDisabled(false)
    this.$bus.$on('infiniteScroll', this.getArtists)
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
}

.content {
  position: relative;
  width: var(--width-main);
  margin: 0 auto;
}
</style>