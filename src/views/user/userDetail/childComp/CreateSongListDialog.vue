<template>
  <el-dialog title="创建歌单" :visible.sync="dialogVisible" width="30%" top="30vh"
             :center="true" :modal="false" :before-close="handleClose">

    <form v-on:submit.prevent="onSubmit">
      <div class="input">
        <el-input v-model="name" placeholder="请输入歌单名" size="normal" clearable
                  ref="inputName">
        </el-input>
      </div>

      <div class="create-btn">
        <el-button type="primary" size="default" native-type="submit">创建
        </el-button>
      </div>
    </form>
  </el-dialog>
</template>

<script>
import { createSongList } from 'network/pageRequest/songList'
import { SongList } from 'network/common'
import { mapMutations } from 'vuex'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    ...mapMutations([
      'insertSUubList'
    ]),

    handleClose () {
      this.$emit('update:dialogVisible', false)
      this.name = ''
    },
    onSubmit () {
      if (this.name.length === 0) {
        this.$notify.topleft('请输入歌单名', 'error')
        return
      }

      createSongList(this.name).then(res => {
        if (res.code === 200) {
          this.$notify.topleft('创建歌单成功')
          this.insertSUubList({
            list: new SongList(res.playlist),
            index: 1 // 插入位置：喜欢歌单之后的第一个歌单
          })
        } else {
          this.$notify.topleft('您输入的内容包含了敏感词汇，请重新检查', 'error')
        }
      })
      this.handleClose()
    }
  },
  watch: {
    dialogVisible (visible) {
      this.$nextTick(() => { // 也许是在动画之后
        if (visible && this.$refs.inputName) {
          this.$refs.inputName.focus() // 使之获取焦点
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  margin-bottom: 1rem;
}

.create-btn {
  text-align: center;
}
</style>