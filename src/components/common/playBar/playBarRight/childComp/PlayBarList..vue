<template>
  <div>
    <el-tooltip popper-class="tooltip" effect="light" content="播放列表"
                placement="top-end" :visible-arrow="false"
                :disabled="isShowList">
      <el-image class="list" :src="require('assets/img/playbar/list.svg')"
                @click="openList" />
    </el-tooltip>

    <transition name="el-zoom-in-top">
      <el-card class="box-card" v-show="isShowList">
        <div class="song">
          <div class="song-title-box">
            <span class="song-title">{{playMusic.title}}</span>
            <span class="song-alias">( {{playMusic.alias}} )</span>
          </div>
          <div class="song-artist">{{playMusic.artist}}</div>
        </div>
      </el-card>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      isShowList: false
    }
  },
  computed: {
    ...mapState([
      'playMusic'
    ])
  },
  methods: {
    openList () {
      this.isShowList = !this.isShowList
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  float: right;
  height: 30px;
  width: 30px;
  cursor: pointer;
}

.box-card {
  position: fixed;
  bottom: calc(var(--play-bar-height) + 1rem);
  right: 1rem;
  width: 400px;
}

.song {
  display: flex;
  align-items: center;
  font-size: var(--font-size-small);

  &-title {
    color: #333333;
    &-box {
      width: 150px;
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 1; /** 显示的行数 **/
      overflow: hidden;

      margin-right: 1rem;
    }
  }

  &-alias {
    color: var(--color-light-gray);
  }

  &-artist {
    color: var(--color-gray);
  }
}
</style>