<template>
  <transition name="fade">
    <div class="back-top" :style="backTopStyle" @click="backTop"
         v-show="visible">
      <img class="back-top-icon" src="./icon/回到顶部.svg">
    </div>
  </transition>
</template>

<script>
import { ElScrool, throttle } from 'common/utils'

export default {
  props: {
    target: {
      type: HTMLElement,
      default () {
        return null
      }
    },
    right: {
      type: Number,
      default: 100
    },
    bottom: {
      type: Number,
      default: 120
    },
    visibilityHeight: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      visible: false,
      throttledScrollHandler: null
    }
  },
  computed: {
    backTopStyle () {
      return {
        right: `${this.right}px`,
        bottom: `${this.bottom}px`
      }
    }
  },
  methods: {
    backTop () {
      ElScrool(this.target, 0)
    },

    onScroll () {
      const scrollTop = this.target.scrollTop // 获得目标滚动高度
      this.visible = scrollTop >= this.visibilityHeight // 滚动高度是否大于设置高度
    }
  },
  beforeDestroy () {
    this.target.removeEventListener('scroll', this.throttledScrollHandler)
  },
  watch: {
    target () {
      this.throttledScrollHandler = throttle(this.onScroll, 500)
      this.target.addEventListener('scroll', this.throttledScrollHandler)
    }
  }
}
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  background-color: #ffffff;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  color: #d83993;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 20px;
  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
  transition: all 0.3s;

  &:hover {
    background-color: #f2f6fc;
  }

  &-icon {
    height: 50%;
    width: 50%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>