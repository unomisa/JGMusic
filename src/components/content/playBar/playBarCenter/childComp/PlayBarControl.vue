<template>
  <div class="control-box">
    <el-button class="previous" @click="previous">
      <svg class="icon previous-icon" aria-hidden="true">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
    </el-button>

    <div class="control">
      <el-button circle class="control-btn" :loading="isLoadingMusic"
                 v-show="isLoadingMusic">
      </el-button>

      <div class="control-btn" @click="control()" v-show="!isLoadingMusic">
        <svg class="icon play-icon" aria-hidden="true" v-show="isPaused">
          <use xlink:href="#icon-bofang"></use>
        </svg>

        <svg class="icon pause-icon" aria-hidden="true" v-show="!isPaused">
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>

    </div>

    <el-button class="next" @click="next">
      <svg class="icon next-icon" aria-hidden="true">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
    </el-button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'setListCurrentIndex'
    ]),

    // 播放控制
    control () {
      if (this.$music.paused !== true) {
        this.$music.pause()
      } else {
        this.$music.play()
      }
    },

    previous () {
      this.$music.pause()
      this.setListCurrentIndex(this.listCurrentIndex - 1)
    },

    next () {
      this.$music.pause()
      this.setListCurrentIndex(this.listCurrentIndex + 1)
    }
  },
  computed: {
    ...mapState([
      'listCurrentIndex',
      'isLoadingMusic',
      'isPaused'
    ])
  }
}
</script>

<style lang="less" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.control {
  &:extend(.flex-center);
  width: 60px;
  height: 40px;

  &-box {
    &:extend(.flex-center);
  }

  &-btn {
    &:extend(.flex-center);
    height: 40px;
    width: 40px;
    border: none;
    border-radius: 100%;
    background-color: #f4f4f4;

    &:hover {
      background-color: #e5e5e5;
    }
  }
}

.play-icon {
  height: 20px;
  width: 20px;
  padding-left: 3px;
}

.pause-icon {
  height: 20px;
  width: 20px;
}

.btn {
  border: none;
  padding: 3px 10px;
  color: #000;
}

.previous {
  &:extend(.btn);

  &:hover {
    color: var(--color-main) !important;
    background-color: #fbebf4 !important;
  }

  &-icon {
    height: 20px;
    width: 20px;
  }
}

.next {
  &:extend(.btn);
  transform: scaleX(-1);

  &:hover {
    color: var(--color-main) !important;
    background-color: #fbebf4 !important;
  }

  &-icon {
    height: 20px;
    width: 20px;
  }
}
</style>