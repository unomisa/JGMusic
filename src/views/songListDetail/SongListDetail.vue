<template>
  <div v-bar>
    <div>
      <div class="list-detail">
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
        <h2>歌单详情展示</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlayListDetail } from 'network/pageRequest/songList'
import { getMusicDetail } from '../../network/pageRequest/musicdetail'

export default {
  methods: {
    getPlayListDetail (id) {
      getPlayListDetail(id).then(res => {
        console.log('歌单详情为：', res)
      })
    }
  },
  created () {
    const id = this.$route.params.id
    this.getPlayListDetail(id)

    getMusicDetail(1864619253).then(res => {
      console.log('歌曲详情为：', res)
    })
  }
}
</script>

<style lang="less" scoped>
.list-detail {
  width: var(--width-main);
  margin: 0 auto;
}
</style>