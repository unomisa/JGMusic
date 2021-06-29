<template>
  <div class="scroll-wrapper" ref='wrapper'>
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bscroll: null
    }
  },
  methods: {
    createBscroll () {
      this.bscroll = new BScroll(this.$refs.wrapper, {
        click: true, // 设置之后才能在滚动区域内点击
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
    },

    /**
     * * 函数封装
     */

    // 重新计算BetterScroll
    refresh () {
      this.bscroll.refresh()
    },

    // 滚动至坐标位置
    scrollTo (x, y, time = 500) {
      this.bscroll && this.bscroll.scrollTo(x, y, time)
    },

    // 使继续监听上拉行为
    finishPullUp () {
      this.bscroll && this.bscroll.finishPullUp()
    },

    // 获取已滚动位置
    getScrollY () {
      return this.bscroll ? this.bscroll.y : 0
    },

    // 滚动到元素
    scrollToElement (el, time) {
      this.bscroll && this.bscroll.scrollToElement(el, time)
    },

    /**
     * * 事件处理
     */

    // 添加滚动监听
    setScroolEvent () {
      if (this.probeType === 2 || this.probeType === 3) {
        this.bscroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }
    },

    // 上拉行为监听
    setPullUpLoadEvent () {
      if (this.pullUpLoad) {
        this.bscroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    }
  },
  mounted () {
    this.createBscroll()
    this.setScroolEvent()
    this.setPullUpLoadEvent()
  }
}
</script>

<style lang="less" scoped>
.scroll-wrapper {
  overflow: hidden;
}
</style>