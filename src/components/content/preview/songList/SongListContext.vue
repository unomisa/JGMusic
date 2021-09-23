<template>
  <context v-bind="$attrs" v-on="$listeners">
    <context-item @click.native="delSongList">
      <template v-slot:icon>
        <i class="el-icon-delete"></i>
      </template>
      删除歌单
    </context-item>
  </context>
</template>

<script>
import Context from 'components/common/context/Context.vue'
import ContextItem from 'components/common/context/Context-Item.vue'
import { deleteSongList } from 'network/pageRequest/songList'
import { mapMutations } from 'vuex'

export default {
  components: { Context, ContextItem },
  props: {
    songList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    ...mapMutations([
      'unSubList'
    ]),
    delSongList () {
      const id = this.songList.id
      deleteSongList(id).then(res => {
        console.log('删除结果为：', res)
        this.$notify.topleft('删除歌单成功')
        this.unSubList(id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>