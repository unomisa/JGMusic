<template>
  <el-col :span="6" class="container">
    <div class="image-box" @click="goDetail">

      <transition name="el-fade-in">
        <i class="el-icon-arrow-up arrow" v-show="!inMusicDetail"></i>
      </transition>
      <transition name="el-fade-in">
        <i class="el-icon-arrow-down arrow" v-show="inMusicDetail"></i>
      </transition>

      <el-image :src="currentPlayMusic.picUrl+ '?param=80y80'" class="song-pic"
                fit="contain" />
    </div>
    <div class="song-info">
      <div class="song-title">
        <span class="song-text">
          {{currentPlayMusic.name}}
          <span class="song-alias" v-if="currentPlayMusic.alias.length>0">(
            {{currentPlayMusic.alias}}
            )</span>
        </span>

        <like-song class="like-song" :id="currentPlayMusic.id" />

        <span class="sub" @click="subToList">
          <i class="el-icon-folder-add"></i>
        </span>
      </div>
      <div class="song-artist">
        <span v-for="(artist,index) of currentPlayMusic.artists"
              :key="artist.id">
          <span class="artist"
                @click="artistDetail(artist)">{{artist.name}}</span>
          <span v-if="index!==currentPlayMusic.artists.length-1"> / </span>
        </span>
      </div>
    </div>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex'
import LikeSong from 'components/content/miniCom/LikeSong.vue'

export default {
  components: { LikeSong },
  computed: {
    ...mapGetters([
      'currentPlayMusic',
      'isExistCurrentPlayMusic'
    ]),
    inMusicDetail () {
      return this.$route.path.includes('/musicDetail')
    }
  },
  methods: {
    // 跳转至详情
    goDetail () {
      if (this.inMusicDetail) {
        this.$router.back()
      } else {
        this.$router.push('/musicDetail')
      }
    },

    artistDetail (artist) {
      this.$router.push('/artistDetail/' + artist.id)
    },

    // 保存至歌单
    subToList () {
      const track = this.currentPlayMusic
      if (track.state.cp !== 0) {
        this.$bus.$emit('subMusicToList', track) // 将歌曲传递给收藏歌单页
      } else {
        this.$notify.topleft('歌曲暂无版权', 'error')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-col {
  height: 100%;
  display: flex;
}

.image-box {
  flex: 65px 0;
  position: relative;
  height: 65px;
  width: 0;
  margin-right: 1rem;
  cursor: pointer;

  &:hover > .song-pic {
    filter: blur(1px) brightness(90%);
  }

  &:hover > .arrow {
    display: block;
  }
}

.arrow {
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 3rem;
  color: white;
}

.omit {
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1; /** 显示的行数 **/
  overflow: hidden;
}

.song {
  &-pic {
    height: 100%;
    // width: 65px;
    border-radius: 2px;
    float: left;
  }

  &-info {
    width: 0;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    line-height: 2;
  }

  &-artist {
    &:extend(.omit);
    font-size: var(--font-size-small);
    color: var(--color-gray);
  }

  &-title {
    position: relative;
    // padding-right: 24px;
    // &:extend(.omit);
  }

  &-text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-alias {
    color: var(--color-gray);
  }
}

.like-song {
  position: absolute;
  margin-left: 5px;
}

.sub {
  position: absolute;
  margin-left: 2rem;
  color: #808080;
  font-size: 17px;
  cursor: pointer;
}

.artist {
  cursor: pointer;

  &:hover {
    color: black;
  }
}
</style>