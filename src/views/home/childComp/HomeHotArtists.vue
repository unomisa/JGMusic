<template>
  <div>
    <div class="title">
      热门歌手
      <svg class="icon title-icon" aria-hidden="true">
        <use xlink:href="#icon-geshou"></use>
      </svg>
    </div>
    <el-carousel height="150px" trigger="click" @change="change"
                 indicator-position="outside">
      <el-carousel-item v-for="i in 3" :key="i">
        <div class="artists">
          <div class="artist" v-for="j in 8" :key="j"
               @click="artistDetail(picUrl(i,j))">
            <el-image class="artist-avatar"
                      :src="picUrl(i,j).picUrl + '?param=200y200'" fit="fill">
            </el-image>
            <div class="artist-name">{{picUrl(i,j).name}}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    hotArtists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    picUrl () {
      return function (i, j) {
        if (this.hotArtists.length > 0) {
          const index = (i - 1) * 8 + (j - 1)
          return this.hotArtists[index]
        } else {
          return {
            picUrl: '',
            name: '',
            id: 0
          }
        }
      }
    }
  },
  methods: {
    change () {

    },

    artistDetail (artist) {
      this.$router.push('/artistDetail/' + artist.id)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: inline-block;
  font-size: var(--font-size-title);
  margin: 2rem 0;
  cursor: pointer;

  &:hover {
    color: var(--color-main);
  }
}

.artist {
  width: 10.5%;
  cursor: pointer;

  &s {
    display: flex;
    justify-content: space-between;
  }

  &-avatar {
    border-radius: 100%;
    border: 1px solid #f3f3f3;
  }

  &:hover {
    color: black;
  }

  &-name {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>