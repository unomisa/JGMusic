<template>
  <el-card class="contextmenu" :style="contextStyle" shadow="always"
           :body-style="{ padding: '0 0' }" ref="contextmenu">
    <ul @click="closeMenu">
      <slot></slot>
    </ul>
  </el-card>
</template>

<script>

export default {
  props: {
    showContext: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  computed: {
    contextStyle () {
      return {
        top: this.y + 'px',
        left: this.x + 'px'
      }
    }

  },
  methods: {
    // * 事件处理
    // 判断是否点击在上下文菜单重，关闭上下文菜单
    close (event) {
      const contextmenu = this.$refs.contextmenu.$el
      const target = event.target
      if (contextmenu.contains(target)) return // 如果点击在上下文菜单中，不直接关闭
      this.closeMenu()
    },

    // 关闭上下文菜单
    closeMenu () {
      this.$emit('update:showContext', false)
    },

    // * 初始化
    // 若窗口剩余高度不够，则重新计算菜单位置
    RecalculatePosition () {
      const contextmenu = this.$refs.contextmenu.$el // 菜单
      document.body.append(contextmenu) // 添加至body

      const windowHeight = document.documentElement.clientHeight // 窗口高度
      const menuHeight = contextmenu.clientHeight // 菜单高度
      if ((windowHeight - this.y) < (menuHeight + 20)) {
        this.$emit('update:y', this.y - menuHeight - 10)
      }
    }
  },
  created () {
    document.body.addEventListener('mousedown', this.close)
  },
  destroyed () {
    document.body.removeEventListener('mousedown', this.close)
  },
  mounted () {
    this.RecalculatePosition()
  }
}
</script>

<style lang="less" scoped>
.contextmenu {
  position: fixed;
  z-index: 2000;
  // width: 150px;
  font-size: 14px;
  user-select: none;
  transition: none;
}
</style>