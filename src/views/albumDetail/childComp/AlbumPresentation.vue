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

        <dynamic :dynamic="album" />

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
  methods: {
    artistDetail (artist) {
      this.$router.push('/artistDetail/' + artist.id)
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
}
</style>