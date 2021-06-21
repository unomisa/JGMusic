<template>
  <div class="aplayer"
       v-if="isShowAplayer">
    <aplayer :music="musicInfo"
             @canplay="canplay"
             theme="#d83993"
             :list=[musicInfo]
             ref="aplayer" />
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'

import { mapState } from 'vuex'
import { getSongUrl } from 'network/common'

export default {
  components: {
    Aplayer
  },
  data () {
    return {
      musicInfo: {}
    }
  },
  computed: {
    ...mapState([
      'playMusic'
    ]),
    isShowAplayer () {
      if (Object.keys(this.musicInfo).length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    canplay () {
      this.$refs.aplayer.play()
    }
  },
  watch: {
    playMusic (music) {
      getSongUrl(music.id).then(res => {
        this.musicInfo = {
          src: res.data[0].url,
          title: music.title,
          artist: music.artist,
          pic: music.pic
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.aplayer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>