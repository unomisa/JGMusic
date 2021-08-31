<template>
  <div v-bar>
    <div class="load" v-infinite-scroll="load" infinite-scroll-distance="500"
         :infinite-scroll-disabled="scrollDisabled"
         :infinite-scroll-immediate="false">
      <div class="container">
        <artist-introduce :artist="artist" :loading="loading" />
        <artist-content :activeIndex.sync="activeIndex"
                        :scrollDisabled.sync="scrollDisabled" />
      </div>
    </div>
  </div>
</template>

<script>
import ArtistIntroduce from './childComp/ArtistIntroduce.vue'
import { getArtistDetail, ArtistBasic } from 'network/pageRequest/artist'
import ArtistContent from './childComp/ArtistContent.vue'

export default {
  components: { ArtistIntroduce, ArtistContent },
  data () {
    return {
      artist: {},
      loading: true,
      scrollDisabled: true,
      activeIndex: '1'
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
    },
    load () {
      if (this.activeIndex !== '1') return // 只有在专辑选项时，才下拉加载
      console.log('触发正在加载')
      this.scrollDisabled = true // 每次加载使之停止继续接收时间
      this.$bus.$emit('artistAlbumMore') // 发送加载事件
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
  width: var(--width-main);
  margin: 0 auto;
}

.load {
  overflow: hidden scroll;
}
</style>