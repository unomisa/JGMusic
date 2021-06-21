<template>
  <el-col style="height:65px;" :span="6">
    <el-image :src="playMusic.pic" class="song-pic" fit="fill"></el-image>
    <div class="song-info">
      <div class="song-title">{{playMusic.title}} <span class="song-alias">(
          {{playMusic.alias}}
          )</span> </div>
      <div class="song-artist">{{playMusic.artist}}</div>
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    playMusic: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.song {
  &-pic {
    width: 65px;
    height: 65px;
    border-radius: 2px;
    margin-right: 1rem;
    float: left;
  }

  &-info {
    height: inherit;
    display: flex;
    justify-content: center;
    flex-direction: column;
    line-height: 1.5;
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