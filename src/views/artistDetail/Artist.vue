<template>
  <div class="container">
    <div class="backdrop"></div>
    <div class="content">
      <artist-introduce :artist="artist" :loading="loading" />
      <artist-content />
    </div>
  </div>
</template>

<script>
import ArtistIntroduce from './childComp/ArtistIntroduce.vue'
import { getArtistDetail, ArtistBasic } from 'network/pageRequest/artist'
import ArtistContent from './childComp/ArtistContent.vue'

export default {
  name: 'artistDetail',
  components: { ArtistIntroduce, ArtistContent },
  data () {
    return {
      artist: {},
      loading: true
    }
  },
  methods: {
    getArtistDetail (id) {
      getArtistDetail(id, Date.now()).then(res => {
        if (res.code === 200) {
          // console.log('歌手详情为：', res)
          this.artist = new ArtistBasic(res.data)
          this.loading = false
        }
      })
    }
  },
  created () {
    const id = this.$route.params.id
    this.getArtistDetail(id)
  }

}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
}

.content {
  width: var(--width-main);
  margin: 0 auto;
}

.backdrop {
  content: "";
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 230px;
  background-image: linear-gradient(to top, #ffffff 0%, #ff94cc 100%);
}
</style>