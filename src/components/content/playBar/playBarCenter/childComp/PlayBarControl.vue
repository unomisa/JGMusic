<template>
  <div>
    <el-row :gutter="20" class="control-row">
      <el-col :span="9" :offset="0" class="control-left">
        <!-- <span class="mode" @click="choiceModel">
          <el-tooltip popper-class="tooltip" :content="modes[modeIndex].type"
                      placement="top" effect="light" :visible-arrow="false">
            <svg class="icon mode-icon" aria-hidden="true">
              <use :xlink:href="modeIcon"></use>
            </svg>
          </el-tooltip>
        </span> -->
        <play-bar-play-mode />
      </el-col>

      <el-col :span="6" :offset="0" class="control-box">
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
      </el-col>

      <el-col :span="9" :offset="0">&nbsp;</el-col>
    </el-row>

  </div>
</template>

<script>
import PlayBarPlayMode from './PlayBarPlayMode.vue'

import { mapState, mapGetters } from 'vuex'

export default {
  components: { PlayBarPlayMode },
  computed: {
    ...mapState([
      'isLoadingMusic',
      'isPaused'
    ]),

    ...mapGetters([
      'isExistCurrentPlayMusic'
    ])

  },
  methods: {
    // 播放控制
    control () {
      if (this.$music.paused !== true) {
        this.$music.pause()
        this.$bus.$emit('clickPause', true) // 使唱针放至盘片
      } else {
        this.$music.play()
        this.$bus.$emit('clickPause', false)
      }
    },

    // 空格暂停
    spaceControl (event) {
      // * 播放列表不存在存在 || 为空格 || target为body
      if (!this.isExistCurrentPlayMusic || event.keyCode !== 32 || event.target !== document.body) return
      this.control()
      event.preventDefault()
    },

    // 上一首播放
    previous () {
      this.$control.previous()
    },

    // 处理下一首播放
    next () {
      this.$control.next()
    }
  },

  created () {
    document.addEventListener('keydown', this.spaceControl)
  },
  destroyed () {
    document.removeEventListener('keydown', this.spaceControl)
  }
}
</script>
<style lang="less">
.control-box .el-button:focus {
  color: initial !important;
  background-color: initial !important;
}
</style>

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
  cursor: pointer;

  &-row {
    display: flex;
    align-items: center;
  }

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

  &-left {
    text-align: right;
    height: 100%;
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
