<template>
  <detail-card class="detail-card" :loading='loading'>
    <template v-slot:left>
      <el-image class="cover" :src="album.picUrl + '?param=250y250' "
                fit="cover" />
      <div class="disc">
        <el-image style="height:100%;width:100%;"
                  src="https://static1-music.taihe.com/client/img/f412d65.png "
                  fit="cover" />
      </div>
    </template>
    <template v-slot:right>
      <div class="right">
        <div class="title">
          <span class="category">
            <el-tag effect="dark" size="small">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhuanji1"></use>
              </svg>
              专辑
            </el-tag>
          </span>
          <span class="name">
            {{album.name}}</span>
        </div>

        <dynamic :dynamic="album" :isSub="isSubAlbum" @sub="subAlbum" />

        <div class="artists">
          <span>歌手：</span>
          <el-link :underline="false" v-for="(artist,index) in album.artists"
                   :key="artist.id" @click="artistDetail(artist)">
            {{artist.name}}
            <span v-if="index!==album.artists.length-1">&nbsp;/&nbsp;</span>
          </el-link>
        </div>

        <div class="Time">
          <span>发布时间：</span>
          <span>{{album.publishTime}}</span>
        </div>
      </div>
    </template>
  </detail-card>
</template>

<script>
import DetailCard from 'components/content/detailCard/DetailCard.vue'
import Dynamic from 'components/content/miniCom/Dynamic.vue'

import { subAlbum } from 'network/common'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { DetailCard, Dynamic },
  props: {
    album: {
      type: Object,
      default () {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'AlbumSubList'
    ]),

    isSubAlbum () {
      if ('id' in this.album) {
        return String(this.album.id) in this.AlbumSubList
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations([
      'pushSubAlbum',
      'deleteSubAlbum'
    ]),

    artistDetail (artist) {
      this.$router.push('/artistDetail/' + artist.id)
    },

    subAlbum () {
      if (this.isSubAlbum) { // 判断是否已收藏专辑
        subAlbum(this.album.id, -1).then(res => {
          if (res.code === 200) {
            this.deleteSubAlbum(this.album.id)
            this.$notify.topleft('取消收藏专辑成功')
            this.$emit('subControl', -1)
          } else {
            this.$notify.topleft(res.message, 'error')
          }
        })
      } else {
        subAlbum(this.album.id, 1).then(res => {
          if (res.code === 200) {
            this.pushSubAlbum(this.album.id)
            this.$notify.topleft('收藏专辑成功')
            this.$emit('subControl', 1)
          } else {
            this.$notify.topleft(res.message, 'error')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cover {
  position: relative;
  z-index: 1;
  height: 190px;
  width: 190px;
  border-radius: 5px;
}

.right {
  & > * {
    margin-bottom: 24px;
  }
}

.disc {
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 0;
  height: 100%;
}

.category {
  vertical-align: bottom;
  margin-right: 10px;
}

.name {
  font-size: 24px;
  font-weight: bold;
}

.artists {
  display: flex;
  flex-wrap: wrap;
  line-height: 1.5;
}
</style>