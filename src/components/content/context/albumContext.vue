<template>
  <context v-bind="$attrs" v-on="$listeners">
    <context-item @click.native="play">
      <template v-slot:icon>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang2"></use>
        </svg>
      </template>
      播放专辑
    </context-item>

    <context-item @click.native="addToNextMusics">
      <template v-slot:icon>
        <i class="el-icon-plus"></i>
      </template>
      添加至播放列表
    </context-item>

    <context-item @click.native="subAlbum" v-if="!isSubAlbum">
      <template v-slot:icon>
        <i class="el-icon-folder-add"></i>
      </template>
      收藏专辑
    </context-item>

    <el-divider class="divider" v-if="isSubAlbum"></el-divider>
    <context-item @click.native="unSubAlbum" v-if="isSubAlbum">
      <template v-slot:icon>
        <i class="el-icon-delete"></i>
      </template>
      取消收藏
    </context-item>
  </context>
</template>

<script>
import Context from 'components/common/context/Context.vue'
import ContextItem from 'components/common/context/Context-Item.vue'

import { subAlbum, Music } from 'network/common'
import { mapGetters, mapMutations } from 'vuex'
import { getAlbum } from 'network/pageRequest/albumdetail'

import { musicBean } from 'common/mixin'

export default {
  components: { Context, ContextItem },
  mixins: [musicBean],
  props: {
    album: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tracks: []
    }
  },
  computed: {
    ...mapGetters([
      'AlbumSubList'
    ]),

    isSubAlbum () {
      return String(this.album.id) in this.AlbumSubList // 查看专辑id是否在收藏专辑列表中
    }
  },
  methods: {
    ...mapMutations([
      'addToPlayList',
      'addNextMusics',
      'pushSubAlbum',
      'deleteSubAlbum'
    ]),

    // * 网络请求
    getAlbum () {
      return getAlbum(this.album.id).then((res) => {
        // console.log('专辑为：', res)
        if (res.code === 200) {
          res.songs.forEach(track => {
            this.tracks.push(new Music({
              ...this.musicBean(track),
              cp: track.privilege.cp
            }))
          })
        } else {
          if ('message' in res) {
            this.$notify.topleft(res.message, 'error')
          }
        }
      })
    },

    // * 事件处理
    play () {
      this.getAlbum().then(() => {
        this.addToPlayList({
          playList: this.tracks,
          index: 0
        })
      })
    },

    addToNextMusics () {
      this.getAlbum().then(() => {
        this.addNextMusics(this.tracks)
      })
    },

    subAlbum () {
      subAlbum(this.album.id, 1).then(res => {
        if (res.code === 200) {
          this.pushSubAlbum(this.album.id)
          this.$notify.topleft('收藏专辑成功')
          this.$bus.$emit('subAlbumControl', 1, this.index) // 先发送事件
        } else {
          this.$notify.topleft(res.message, 'error')
        }
      })
    },

    unSubAlbum () {
      subAlbum(this.album.id, -1).then(res => {
        if (res.code === 200) {
          this.deleteSubAlbum(this.album.id)
          this.$notify.topleft('取消收藏专辑')
          this.$bus.$emit('subAlbumControl', -1, this.index) // 先发送事件
        } else {
          this.$notify.topleft(res.message, 'error')
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.divider {
  margin: 3px 0;
}
</style>