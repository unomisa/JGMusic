<template>
  <div>
    <div class="write-comment">
      <el-button class="write-btn" type="info" size="default" round plain
                 @click="showDialog">
        <i class="el-icon-edit"></i>
        <span>写评论</span>
      </el-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    rid: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showDialog () {
      this.$comment.init({
        type: this.type,
        rid: this.rid
      })
    }
  }

}
</script>

<style lang="less" scoped>
.write {
  &-comment {
    position: fixed;
    z-index: 10;
    bottom: calc(var(--play-bar-height) + 10px);
    left: 50%;
    transform: translateX(-50%);
  }

  &-btn {
    border: none;
    color: #333333;
  }
}
</style>