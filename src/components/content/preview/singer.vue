<template>
  <div @click="artistDetail">
    <el-image class="pic" :src="singer.picUrl + '?param=200y200'" fit="fill"
              @load="imgLoad" ref="pic">
    </el-image>
    <div class="name" :style="{width:nameWidth}" v-show="nameWidth!==0">
      {{singer.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    singer: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      nameWidth: 0
    }
  },
  methods: {
    artistDetail () {
      this.$router.push('/artistDetail/' + this.singer.id)
    },

    imgLoad () {
      this.nameWidth = this.$refs.pic.$el.clientWidth + 'px' // 将图片宽度赋值
    }
  }
}
</script>

<style lang="less" scoped>
.pic {
  cursor: pointer;
  border-radius: 5px;
}

.name {
  text-align: center;
  margin-top: 5px;
}
</style>