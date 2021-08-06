<template>
  <el-carousel :interval="4000" type="card" height="300px" trigger="click"
               @change="change" ref="carousel">
    <el-carousel-item style="width: 60%;" v-for="(item) in banners"
                      :key="item.imageUrl" ref="carouselItem">
      <el-image :src="item.imageUrl" style="width:100%;height:100%; "
                fit="contain" />

    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default {
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      carouselItemWidth: 0.6, // 上面设置的宽度百分比,
      currentIndex: 0,
      transitionNone: false,
      styleEl: null
    }
  },
  methods: {
    change (currentIndex) {
      this.currentIndex = currentIndex
      const carouselItems = this.$refs.carouselItem

      // 为除了当前carouselItem重置位置
      for (let i = 0; i < carouselItems.length; i++) {
        if (i !== currentIndex) {
          setTimeout(() => {
            const number = carouselItems[i].$el.style.transform.match(/-?\d+/)[0] - 60
            carouselItems[i].$el.style.transform = `translateX(${number}px) scale(0.83)`
          }, 30)
        } else {
          // 为当前carouselItem重置位置
          setTimeout(() => {
            carouselItems[currentIndex].$el.style.transform = `translateX(${this.currentTranslateX}px) scale(1)`
          }, 30)
        }
      }
    }
  },
  computed: {
    currentTranslateX () {
      const parentElWidth = this.$refs.carousel.$el.offsetWidth
      return (parentElWidth - (parentElWidth * this.carouselItemWidth)) / 2
    }
  },
  watch: {
    banners () {
      // ? 需要在外层完成这一行为，若在里面会使用计算属性会导致有过渡动画
      const translateX = this.currentTranslateX

      // 有数据之后并完成挂载之后更新初始位置
      this.$nextTick(() => {
        const carouselItems = this.$refs.carouselItem
        carouselItems[0].$el.style.transform = `translateX(${translateX}px) scale(1)`
        for (let i = 1; i < carouselItems.length; i++) {
          const number = carouselItems[i].$el.style.transform.match(/-?\d+/)[0] - 60
          carouselItems[i].$el.style.transform = `translateX(${number}px) scale(0.83)`
        }
      })
    }
  },
  activated () {
    this.$refs.carouselItem !== undefined && this.change(this.currentIndex)
  }
}
</script>

<style lang="less" scoped>
.el-carousel {
  margin: 20px 0 20px 0;
}
</styl>
