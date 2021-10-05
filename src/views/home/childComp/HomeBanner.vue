<template>
  <el-carousel :interval="4000" type="card" height="250px" trigger="click"
               @change="change">
    <el-carousel-item class="banner" v-for="(item) in banners"
                      :key="item.imageUrl" @click.native="click(item)">
      <el-image :src="item.imageUrl + '?param=600y250'"
                style="width:100%;height:100%; " fit="fill" />

      <div class="footnote">
        {{item.typeTitle}}
      </div>

    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getMusicDetail } from 'network/pageRequest/musicdetail'
import { Music } from '../../../network/common'
import { mapMutations } from 'vuex'

export default {
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    ...mapMutations([
      'addMusic'
    ]),

    musicBean (music) {
      return {
        id: music.id,
        name: music.name,
        picUrl: music.al.picUrl,
        alias: music.alia,
        artists: music.ar,
        album: music.al,
        duration: music.dt
      }
    },

    change (currentIndex) {
      this.currentIndex = currentIndex
    },
    click (banner) {
      switch (banner.targetType) {
        case 1: this.music(banner.targetId); break
        case 10: this.album(banner.targetId); break
        case 1000: this.songList(banner.targetId); break
        case 3000: this.actitve(banner.url); break
        default: console.log('不知道是什么类型')
      }
    },

    // 歌曲
    music (id) {
      getMusicDetail(id).then(res => {
        if (res.code === 200) {
          this.addMusic(new Music(this.musicBean(res.songs[0])))
        }
      })
    },

    // 专辑
    album (id) {
      this.$router.push('/album/' + id)
    },

    // 歌单
    songList (id) {
      this.$router.push('/songList/' + id)
    },

    // 活动
    actitve (url) {
      window.open(url)
    }
  }
}
</script>

<style lang="less" scoped>
.el-carousel {
  margin: 50px 0;
}

.banner {
  cursor: pointer;
  border-radius: 5px;
}

.footnote {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #cc4a4a;
  color: white;
  font-size: 14px;
  border-radius: 5px 0 5px 0;
  padding: 5px 8px;
}
</style>
