<template>
  <span class="mode" @click="choiceModel">
    <el-tooltip popper-class="tooltip" :content="modes[modeIndex].type"
                placement="top" effect="light" :visible-arrow="false">
      <svg class="icon mode-icon" aria-hidden="true">
        <use :xlink:href="modeIcon"></use>
      </svg>
    </el-tooltip>
  </span>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState, mapGetters } from 'vuex'
import { shuffle, arrSwap } from 'common/utils'

export default {
  data () {
    return {
      playSort: [],
      indexInSort: 0,
      oldIndexInSort: -1,
      modeIndex: 0,
      modes: [
        { type: '顺序播放', icon: '#icon-shunxubofang-', fnc: () => { } },
        { type: '随机播放', icon: '#icon-suijibofang', fnc: this.randomIndex },
        { type: '单曲循环', icon: '#icon-danquxunhuan', fnc: this.singleCycle }
      ]
    }
  },
  computed: {
    ...mapState([
      'listCurrentIndex',
      'isLoadingMusic',
      'isPaused'
    ]),

    ...mapGetters([
      'playList'
    ]),

    modeIcon () {
      return this.modes[this.modeIndex].icon
    }
  },
  methods: {
    ...mapMutations([
      'setListCurrentIndex'
    ]),

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

    // 上一首播放
    previous (category) {
      const type = this.modes[this.modeIndex].type
      switch (type) {
        case '顺序播放': this.orderPrevious(); break
        case '随机播放': this.randomPrevious(category); break
        case '单曲循环': this.singleCyclePrevious(); break
      }
    },

    /**
     * * 处理下一首播放
     * @ category 播放类别
     */
    next (category) {
      const type = this.modes[this.modeIndex].type
      switch (type) {
        case '顺序播放': this.orderNext(); break
        case '随机播放': this.randomNext(category); break
        case '单曲循环': this.singleCycleNext(category); break
      }
    },

    // * 播放模式
    choiceModel () {
      if (this.modeIndex + 1 === this.modes.length) {
        this.modeIndex = 0
      } else {
        this.modeIndex++
      }
      this.modes[this.modeIndex].fnc() // 切换到模式时执行附带函数
    },

    // 顺序下一首
    orderNext () {
      this.setListCurrentIndex(this.listCurrentIndex + 1)
    },

    // 顺序上一首
    orderPrevious () {
      this.setListCurrentIndex(this.listCurrentIndex - 1)
    },

    // 随机下一首
    randomNext (category) {
      const sort = this.playSort
      if (category === 'invalid') {
        this.randomOrientation()
      } else {
        this.addIndexInSort()
        const next = sort[this.indexInSort] // 得到实际位置
        this.setListCurrentIndex(next)
      }
    },

    // 随机上一首
    randomPrevious (category) {
      const sort = this.playSort
      if (category === 'invalid') {
        this.randomOrientation()
      } else {
        this.subIndexInSort()
        const previous = sort[this.indexInSort] // 得到实际位置
        this.setListCurrentIndex(previous)
      }
    },

    // 判断是往后走还是往前走
    randomOrientation () {
      if (this.indexInSort > this.oldIndexInSort) { // 若当前索引值大于旧索引值
        this.randomNext() // 大于，则为向后
      } else {
        this.randomPrevious() // 小于，则为向前
      }
    },

    // 以当前播放列表随机排序
    randomIndex () {
      const type = this.modes[this.modeIndex].type
      if (type !== '随机播放') return // 若当前播放模式不是随机,则不执行

      this.playSort = this.playList.map((list, index) => index)
      shuffle(this.playSort) // 得到随机索引数组
      this.indexInSort = this.playSort.indexOf(this.listCurrentIndex) // 找到当前播放索引在数组中的位置

      // console.log('this.indexInSort: ', this.indexInSort)
      // console.log('随机顺序为：', this.playSort)
    },

    // 索引增加
    addIndexInSort () {
      const sort = this.playSort
      if ((this.indexInSort + 1) >= sort.length) {
        this.indexInSort = 0 // 回到开头
      } else {
        this.indexInSort++ // 顺序索引+1
      }
    },

    // 索引减少
    subIndexInSort () {
      const sort = this.playSort
      if ((this.indexInSort - 1) < 0) {
        this.indexInSort = sort.length - 1 // 回到最后
      } else {
        this.indexInSort-- // 顺序索引+1
      }
    },

    addMusic (index) {
      const type = this.modes[this.modeIndex].type
      if (type !== '随机播放') return // 若当前播放模式不是随机,则不执行

      if (index) {
        const existSortIndex = this.playSort.indexOf(index) // 找到播放列表中的下标在排序列表中的位置
        this.addIndexInSort() // 索引变更为下一位置
        arrSwap(this.playSort, this.indexInSort, existSortIndex) // 将下一位置与所在位置交换，以变为下一播放
        console.log('随机顺序为：', this.playSort)
      } else {
        this.addSortIndexBehind() // 因为新增加了歌曲，因此需将当前排序位置后的索引增加
        this.playSort.splice(this.indexInSort + 1, 0, this.playSort[this.indexInSort] + 1)// 在当前排序下一位置添加
        this.addIndexInSort() // 索引增加
        console.log('随机顺序为：', this.playSort)
      }
    },

    addNextMusic (index) {
      const type = this.modes[this.modeIndex].type
      if (type !== '随机播放') { // 若当前播放模式不是随机,则不执行
        return ''
      } else {
        if (index) {
          const existSortIndex = this.playSort.indexOf(index) // 找到播放列表中的下标在排序列表中的位置
          arrSwap(this.playSort, this.indexInSort + 1, existSortIndex) // 将下一位置与所在位置交换，以变为下一播放
        } else {
          this.addSortIndexBehind() // 因为新增加了歌曲，因此需将当前排序位置后的索引增加
          this.playSort.splice(this.indexInSort + 1, 0, this.playSort[this.indexInSort] + 1)// 在当前排序下一位置添加
        }
      }
    },

    // 处理批量增加
    addNextMusics () {
      this.randomIndex()
    },

    // 将当前排序位置后的索引增加
    addSortIndexBehind () {
      this.playSort = this.playSort.map(item => {
        if (item > this.playSort[this.indexInSort]) {
          item++
          return item
        } else {
          return item
        }
      })
    },

    singleCycle () {
      // console.log('设置循环播放')
    },

    singleCycleNext (category) {
      if (category === 'ended') {
        this.$music.currentTime = 0 // 将当前播放歌曲重新开始
        this.$bus.$emit('singleCycle') // 发送单曲循环事件
      } else {
        this.setListCurrentIndex(this.listCurrentIndex + 1)
      }
    },

    singleCyclePrevious () {
      this.setListCurrentIndex(this.listCurrentIndex - 1)
    }
  },
  created () {
    Vue.prototype.$control = this // 将该组件挂载至Vue上
    this.$bus.$on('replacePlayList', this.randomIndex)
    this.$bus.$on('addMusic', this.addMusic)
    this.$bus.$on('addNextMusic', this.addNextMusic)
    this.$bus.$on('addNextMusics', this.addNextMusics)
  },
  watch: {
    indexInSort (newIndex, oldIndex) {
      this.oldIndexInSort = oldIndex // 记录下旧值
    }
  }
}
</script>

<style lang="less" scoped>
.mode {
  cursor: pointer;

  &-icon {
    font-size: 1.1em;
    color: black;
    vertical-align: -0.2em;
  }
}
</style>