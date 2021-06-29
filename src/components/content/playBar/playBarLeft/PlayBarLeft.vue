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
      <div class="song-title">{{currentPlayMusic.name}} <span class="song-alias"
              v-if="currentPlayMusic.alias.length>0">(
          {{currentPlayMusic.alias}}
          )</span> </div>
      <div class="song-artist">
        <span v-for="(artist,index) of currentPlayMusic.artists"
              :key="artist.id">
          {{artist.name}}
          <span v-if="index!==currentPlayMusic.artists.length-1">/</span>
        </span>
      </div>
    </div>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
  position: relative;
  height: 65px;
  width: 65px;
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

.song {
  &-pic {
    height: 100%;
    // width: 65px;
    border-radius: 2px;
    float: left;
  }

  &-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    line-height: 2;
  }

  &-artist {
    font-size: var(--font-size-small);
    color: var(--color-gray);
  }

  &-title {
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1; /** 显示的行数 **/
    overflow: hidden;
  }

  &-alias {
    color: var(--color-gray);
  }
}
</style>