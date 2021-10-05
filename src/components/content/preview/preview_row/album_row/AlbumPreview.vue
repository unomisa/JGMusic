<template>
  <div class="preview" @click="albumDetail" @contextmenu.prevent="context">
    <div class="preview-left">
      <el-image class="cover" :src="album.picUrl + '?param=100y100'"
                fit="fill" />

      <div class="disc">
        <el-image style="height:100%;width:100%;"
                  src="https://static1-music.taihe.com/client/img/f412d65.png "
                  fit="fill" />
      </div>
    </div>
    <div class="preview-right">
      <div class="name-box">
        <span>{{album.name}}</span>&nbsp;
        <span class="alias" v-if="album.trans">({{album.trans}})</span>
        <span class="alias"
              v-if="album.alias && !album.trans">({{album.alias}})</span>
      </div>

      <div class="artist-box">
        <span v-for="(artist,index) in album.artists" :key="index">
          <span class="artist"
                @click.stop="artistDetail(artist)">{{artist.name}}</span>
          <span v-if="index!==album.artists.length-1">&nbsp;/&nbsp;</span>
        </span>
      </div>
    </div>

    <album-context :x.sync="context_x" :y.sync="context_y" :album="album"
                   :showContext.sync="showContext" v-bind="$attrs"
                   v-if="showContext" />
  </div>
</template>

<script>
import AlbumContext from 'components/content/context/albumContext.vue'

export default {
  components: { AlbumContext },
  props: {
    album: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showContext: false,
      context_x: 0,
      context_y: 0
    }
  },
  methods: {
    albumDetail () {
      this.$router.push('/album/' + this.album.id)
    },
    artistDetail (artist) {
      if (artist.name === '未知歌手') return
      this.$router.push('/artistDetail/' + artist.id)
    },
    context (event) {
      if (event.button === 2) { // 如果为右键
        this.showContext = true // 显示上下文菜单
        this.context_x = event.clientX // 传递点击位置
        this.context_y = event.clientY
      }
    }
  }
}
</script>

<style lang="less" scoped>
@height: 100px;

.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview {
  position: relative;
  display: flex;
  height: @height;
  cursor: pointer;
  padding: 10px 30px;
  border-radius: 3px;

  &:nth-child(2n + 1) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #fbebf4;
  }

  &:hover .disc {
    left: 20px;
  }

  &-left {
    position: relative;
    flex: @height 0;
    margin-right: 2rem;
  }

  &-right {
    flex: 1;
    display: flex;
    align-items: center;
  }
}

.cover {
  position: relative;
  z-index: 1;
  height: @height;
  width: @height;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  border-right: none;
}

.disc {
  position: absolute;
  top: 0;
  left: 15px;
  z-index: 0;
  height: 100px;
  width: 100px;
  transition: left 0.3s;
}

.name-box {
  &:extend(.omit);
  flex: 1;
  padding-right: 1rem;
}

.artist {
  color: var(--color-gray);

  &:hover {
    color: black;
  }

  &-box {
    flex: 1;
  }
}

.alias {
  color: var(--color-light-gray);
}
</style>